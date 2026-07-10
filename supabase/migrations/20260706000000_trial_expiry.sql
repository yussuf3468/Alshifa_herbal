-- ============================================================
-- Free-trial time limit + subscription expiry enforcement
--
-- Design: store only timestamps, DERIVE the expired state — no
-- cron jobs, nothing to flip. Access rules:
--   free      → active while now() < trial_ends_at (45-day trial,
--               clock starts when this migration runs / store created)
--   pro / max → active while now() < renews_at + 5-day grace
--               (renews_at NULL = manually managed, never expires)
--
-- Enforcement: a write-freeze trigger on all business tables.
-- READS stay open on purpose — the merchant can still see their
-- data, and upgrading instantly restores everything.
--
-- Operator notes (Supabase SQL editor):
--   Exempt / upgrade your own store:
--     update public.store_subscription
--        set plan = 'max', renews_at = null, updated_at = now();
--   Extend a trial:
--     update public.store_subscription
--        set trial_ends_at = now() + interval '45 days', updated_at = now();
--   Activate a paid month after payment:
--     update public.store_subscription
--        set plan = 'pro', renews_at = now() + interval '30 days',
--            updated_at = now();
-- ============================================================

-- 1. Trial deadline (existing row gets now() + 45 days at migration time)
alter table public.store_subscription
  add column if not exists trial_ends_at timestamptz
    not null default (now() + interval '45 days');

-- 2. The public storefront (anon) also needs to know whether the store is
--    open, so subscription status becomes world-readable (plan name + dates
--    only — nothing sensitive).
drop policy if exists "authenticated read subscription" on public.store_subscription;
drop policy if exists "anyone reads subscription" on public.store_subscription;
create policy "anyone reads subscription" on public.store_subscription
  for select using (true);
grant select on public.store_subscription to anon, authenticated;

-- 3. Single source of truth for "is this store allowed to operate?"
create or replace function public.subscription_is_active()
returns boolean
language sql stable security definer set search_path = public as $$
  select case
    when s.plan = 'free' then now() < s.trial_ends_at
    else s.renews_at is null or now() < s.renews_at + interval '5 days'
  end
  from public.store_subscription s
  limit 1;
$$;

-- 4. Write-freeze: block INSERT/UPDATE/DELETE on business data once expired.
--    Fails OPEN (allows writes) if the subscription row is missing, so a
--    half-configured store never bricks itself.
create or replace function public.enforce_active_subscription()
returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if not coalesce(public.subscription_is_active(), true) then
    raise exception
      'Subscription expired: the free trial has ended. Upgrade your plan to continue using the system.';
  end if;
  return coalesce(new, old);
end $$;

do $$
declare t text;
begin
  foreach t in array array[
    'products','sales','orders','order_items','expenses',
    'customer_credits','credit_payments','returns','debts','debt_payments',
    'initial_investments','cyber_services','sale_drafts',
    'stock_receipts','stock_receipt_items','stock_movements',
    'customers','customer_payments','cash_reconciliation',
    'store_balances','profit_tracker_history'
  ] loop
    if to_regclass('public.' || t) is not null then
      execute format(
        'drop trigger if exists %I on public.%I',
        t || '_enforce_subscription', t);
      execute format(
        'create trigger %I before insert or update or delete on public.%I
         for each row execute function public.enforce_active_subscription()',
        t || '_enforce_subscription', t);
    end if;
  end loop;
end $$;

-- Rebrand the seed tenant from Hassan Bookshop to Al-Shifa Herbal.
-- Safe to run on existing databases where the foundation migration
-- (20260612000000_create_tenant_foundation.sql) already inserted the
-- original tenant. On a fresh database the foundation migration now
-- seeds Al-Shifa Herbal directly, so this update simply matches nothing.
update public.tenants
   set name  = 'Al-Shifa Herbal',
       slug  = 'al-shifa-herbal',
       email = 'info@alshifaherbal.co.ke'
 where slug = 'hassan-bookshop'
    or name = 'Hassan Bookshop';

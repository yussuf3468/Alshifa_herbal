import { Crown, LogOut, MessageCircle, RefreshCw, Store } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { BILLING_WHATSAPP } from "../config/subscriptionPlans";
import { formatDate } from "../utils/dateFormatter";

interface TrialLockScreenProps {
  /** True when the free trial ran out; false when a paid plan lapsed. */
  isTrial: boolean;
  endsAt: string | null;
}

/**
 * Full-screen lock shown when the store's trial/subscription has expired.
 * Data is untouched — upgrading (operator updates the plan in the DB)
 * restores access instantly.
 */
export default function TrialLockScreen({ isTrial, endsAt }: TrialLockScreenProps) {
  const { signOut } = useAuth();

  const whatsappLink = `https://wa.me/${BILLING_WHATSAPP}?text=${encodeURIComponent(
    isTrial
      ? "Hi! My Al-Shifa Herbal free trial has ended and I'd like to upgrade to a paid plan. Please send me the payment details."
      : "Hi! My Al-Shifa Herbal subscription has expired and I'd like to renew it. Please send me the payment details.",
  )}`;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl shadow-xl p-8 text-center">
        <div className="mx-auto w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center mb-5">
          <Store className="w-7 h-7" />
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-900/30 border border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-300 text-xs font-bold uppercase tracking-wide mb-4">
          <Crown className="w-3.5 h-3.5" />
          {isTrial ? "Free trial ended" : "Subscription expired"}
        </div>

        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          {isTrial
            ? "Your free trial has ended"
            : "Your subscription has expired"}
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          {isTrial
            ? `Your 45-day trial finished${endsAt ? ` on ${formatDate(endsAt)}` : ""}. `
            : `Your plan lapsed${endsAt ? ` on ${formatDate(endsAt)}` : ""}. `}
          All your products, sales and records are <strong>safe and saved</strong> —
          upgrade to pick up exactly where you left off.
        </p>

        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-sm transition-colors"
        >
          <MessageCircle className="w-5 h-5" />
          {isTrial ? "Upgrade via WhatsApp" : "Renew via WhatsApp"}
        </a>

        <button
          onClick={() => window.location.reload()}
          className="mt-3 flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          I've upgraded — refresh
        </button>

        <button
          onClick={() => void signOut()}
          className="mt-5 inline-flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Sign out
        </button>
      </div>
    </div>
  );
}

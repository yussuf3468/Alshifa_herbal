import { lazy, Suspense, useEffect, useMemo } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./storefront.css";
import CartDrawer from "./components/CartDrawer";
import CompareTray from "./components/CompareTray";
import Footer from "./components/Footer";
import Header from "./components/Header";
import MobileTabBar from "./components/MobileTabBar";
import QuickView from "./components/QuickView";
import SearchOverlay from "./components/SearchOverlay";
import { storeConfig } from "./config/store";
import { RouteProvider, useRoute } from "./lib/router";
import { StorefrontUIProvider, useStorefrontUI } from "./lib/ui-context";
import HomePage from "./pages/HomePage";
import { useStoreSubscription } from "../hooks/useSupabaseQuery";
import { getSubscriptionAccess } from "../config/subscriptionPlans";

// Only the homepage ships in the first paint; every other page and
// dialog loads on demand so the public bundle stays light.
const ProductsPage = lazy(() => import("./pages/ProductsPage"));
const ProductDetailPage = lazy(() => import("./pages/ProductDetailPage"));
const CategoriesPage = lazy(() => import("./pages/CategoriesPage"));
const CollectionsPage = lazy(() => import("./pages/CollectionsPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const WishlistPage = lazy(() => import("./pages/WishlistPage"));
const TrackOrderPage = lazy(() => import("./pages/TrackOrderPage"));
const AccountPage = lazy(() => import("./pages/AccountPage"));
const Checkout = lazy(() => import("./components/Checkout"));
const OrderTrackingModal = lazy(() => import("../components/OrderTrackingModal"));
const AuthModal = lazy(() => import("../components/AuthModal"));

function PageFallback() {
  return (
    <div className="mx-auto w-full max-w-7xl px-5 pb-16 pt-28 sm:px-8">
      <div className="sf-shimmer mb-4 h-10 w-56 rounded-2xl" />
      <div className="sf-shimmer mb-8 h-4 w-80 max-w-full rounded-full" />
      <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="sf-shimmer aspect-[4/5] rounded-3xl" />
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   STOREFRONT — the public commerce experience. Fully config-
   driven (see config/store.ts): swap the StoreConfig and the
   same code serves any retail vertical.
   ═══════════════════════════════════════════════════════════════ */

interface StorefrontAppProps {
  onAdminClick: () => void;
}

/** Discreet closed-shutter page shown to shoppers when the store is expired. */
function StoreUnavailable({ onAdminClick }: { onAdminClick: () => void }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#faf8f4] px-6">
      <div className="max-w-md text-center">
        <div
          className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl text-2xl font-bold text-white"
          style={{ background: storeConfig.theme.accent }}
        >
          {storeConfig.monogram}
        </div>
        <h1 className="text-2xl font-semibold text-slate-900">
          {storeConfig.name} is temporarily unavailable
        </h1>
        <p className="mt-3 text-[15px] leading-relaxed text-slate-600">
          We're doing a little housekeeping. Please check back soon — or reach
          us on{" "}
          <a
            href={`https://wa.me/${storeConfig.contact.whatsapp}`}
            className="font-semibold underline"
            style={{ color: storeConfig.theme.accent }}
          >
            WhatsApp
          </a>{" "}
          for anything urgent.
        </p>
        <button
          onClick={onAdminClick}
          className="mt-8 text-xs text-slate-400 hover:text-slate-600"
        >
          Store owner? Sign in
        </button>
      </div>
    </div>
  );
}

export default function StorefrontApp({ onAdminClick }: StorefrontAppProps) {
  const { data: subscription } = useStoreSubscription();
  const access = getSubscriptionAccess(subscription);
  // The storefront ships one deliberate palette and ignores the app's
  // dark-mode preference (like any brand site). Strip the `dark` class
  // while mounted so shared components render light, and restore it
  // for the admin side on unmount.
  useEffect(() => {
    const root = document.documentElement;
    const hadDark = root.classList.contains("dark");
    root.classList.remove("dark");
    return () => {
      if (hadDark) root.classList.add("dark");
    };
  }, []);

  // Inject the merchant palette as CSS variables so the entire
  // design system re-brands from config alone.
  const themeVars = useMemo(
    () =>
      ({
        "--sf-accent": storeConfig.theme.accent,
        "--sf-accent-deep": storeConfig.theme.accentDeep,
        "--sf-accent-ink": storeConfig.theme.accentInk,
        "--sf-accent-soft": storeConfig.theme.accentSoft,
        "--sf-accent-glow": storeConfig.theme.accentGlow,
        "--sf-gold": storeConfig.theme.gold,
      }) as React.CSSProperties,
    [],
  );

  // Expired store → closed-shutter page (shoppers never see billing details).
  if (!access.active) {
    return <StoreUnavailable onAdminClick={onAdminClick} />;
  }

  return (
    <RouteProvider>
      <StorefrontUIProvider onAdminClick={onAdminClick}>
        <div className="sf-root min-h-screen" style={themeVars}>
          <Header />
          <main>
            <Suspense fallback={<PageFallback />}>
              <CurrentPage />
            </Suspense>
          </main>
          <Footer />
          <MobileTabBar />

          {/* Overlays */}
          <SearchOverlay />
          <CartDrawer />
          <QuickView />
          <CompareTray />
          <CommerceDialogs />

          <ToastContainer
            position="bottom-center"
            autoClose={2200}
            hideProgressBar
            newestOnTop
            closeOnClick
            pauseOnHover={false}
            theme="light"
            toastClassName="!rounded-2xl !shadow-lg"
          />
        </div>
      </StorefrontUIProvider>
    </RouteProvider>
  );
}

function CurrentPage() {
  const route = useRoute();
  const [head] = route.segments;

  switch (head) {
    case undefined:
      return <HomePage />;
    case "products":
      return <ProductsPage />;
    case "product":
      return <ProductDetailPage />;
    case "categories":
      return <CategoriesPage />;
    case "collections":
      return <CollectionsPage />;
    case "offers":
      return <CollectionsPage offersOnly />;
    case "about":
      return <AboutPage />;
    case "contact":
      return <ContactPage />;
    case "wishlist":
      return <WishlistPage />;
    case "track":
      return <TrackOrderPage />;
    case "account":
      return <AccountPage />;
    default:
      return <HomePage />;
  }
}

function CommerceDialogs() {
  const ui = useStorefrontUI();
  return (
    <Suspense fallback={null}>
      {ui.checkoutOpen && <Checkout onClose={ui.closeCheckout} />}
      {ui.trackingOpen && (
        <OrderTrackingModal
          isOpen={ui.trackingOpen}
          onClose={ui.closeTracking}
          initialLookup={
            ui.trackingOrderNumber ? { orderNumber: ui.trackingOrderNumber } : undefined
          }
        />
      )}
      {ui.authOpen && <AuthModal isOpen={ui.authOpen} onClose={ui.closeAuth} />}
    </Suspense>
  );
}

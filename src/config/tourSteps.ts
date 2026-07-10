import type { TourStep } from "../components/GuidedTour";

/**
 * The admin onboarding walkthrough. Each step can spotlight an element
 * (by its `data-tour` attribute) and switch to the relevant tab first.
 */
export const TOUR_STEPS: TourStep[] = [
  {
    title: "Welcome to Al-Shifa Herbal 👋",
    body: "Here's a quick 60-second tour of how your shop works. You can replay it any time from the ? button in the top bar.",
  },
  {
    target: "nav-dashboard",
    tab: "dashboard",
    title: "Your Dashboard",
    body: "Your daily snapshot — today's sales, profit, low-stock alerts and recent activity all in one place.",
  },
  {
    target: "add-product",
    tab: "inventory",
    title: "Add your products",
    body: "Open Products, then click Add Product. Enter a name, buying & selling price, and stock. It appears in your online store right away.",
  },
  {
    target: "nav-sales",
    tab: "sales",
    title: "Make a sale",
    body: "Search a product to drop it in the cart, choose a customer (or Walk-in), then press Charge. Stock and reports update automatically.",
  },
  {
    target: "nav-orders",
    tab: "orders",
    title: "Online Orders",
    body: "Orders customers place on your website land here. Confirm them, update the status, or message the customer on WhatsApp.",
  },
  {
    target: "nav-customer-credit",
    tab: "customer-credit",
    title: "Customer Credit",
    body: "Sold something on credit? Track who owes you, record repayments, and open any customer to see every debt they took.",
  },
  {
    target: "nav-reports",
    tab: "reports",
    title: "Reports",
    body: "Export clean sales and inventory reports as PDF whenever you need them — great for records and stock-taking.",
  },
  {
    target: "nav-subscription",
    tab: "subscription",
    title: "Your plan",
    body: "See your plan and product limit here, and upgrade as your shop grows. You're on the Free plan to start.",
  },
  {
    title: "You're all set! 🌿",
    body: "That's the tour. Start by adding a few products, then record your first sale. Tap the ? button any time to see this again.",
  },
];

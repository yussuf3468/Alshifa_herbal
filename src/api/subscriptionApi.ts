import { apiClient } from "./client";

export interface StoreSubscription {
  plan: string;
  renews_at: string | null;
}

const FREE_FALLBACK: StoreSubscription = { plan: "free", renews_at: null };

/**
 * Current store subscription. Falls back to the Free plan when the
 * store_subscription table doesn't exist yet (migration not applied)
 * so the app keeps working with the most conservative limits.
 */
export async function getStoreSubscription(): Promise<StoreSubscription> {
  try {
    const { data, error } = await (apiClient as never as {
      from: (table: string) => {
        select: (cols: string) => {
          limit: (n: number) => {
            maybeSingle: () => Promise<{
              data: StoreSubscription | null;
              error: unknown;
            }>;
          };
        };
      };
    })
      .from("store_subscription")
      .select("plan,renews_at")
      .limit(1)
      .maybeSingle();

    if (error || !data) return FREE_FALLBACK;
    return data;
  } catch {
    return FREE_FALLBACK;
  }
}

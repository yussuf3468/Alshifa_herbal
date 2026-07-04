import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 30 * 60 * 1000,
      retry: 1,
      refetchOnWindowFocus: false,
      // Refetch when a view remounts if its data is stale/invalidated. This is
      // what makes the dashboard/inventory pick up a just-recorded sale without
      // a full page refresh — cached data is reused until a mutation
      // invalidates it, then the next mount refetches (no extra baseline reads).
      refetchOnMount: true,
      refetchOnReconnect: true,
    },
    mutations: {
      retry: 0,
    },
  },
});

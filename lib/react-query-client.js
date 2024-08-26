// src/lib/react-query-client.js
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10 * 1000, // 10 วินาที
      cacheTime: 15 * 60 * 1000, // 15 นาที
    },
  },
});

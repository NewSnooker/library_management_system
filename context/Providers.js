"use client";
import { ThemeProvider } from "next-themes";
import React from "react";
import { Toaster } from "react-hot-toast";
import { Provider as ReduxProvider } from "react-redux";
import { SessionProvider } from "next-auth/react";
import { store } from "@/redux/store";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/react-query-client";
import LoadingFullScreen from "@/components/LoadingFullScreen";

export default function Providers({ children }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Toaster position="top-center" reverseOrder={true} />
      <SessionProvider>
        <ReduxProvider store={store}>
          <QueryClientProvider client={queryClient}>
            <LoadingFullScreen>{children}</LoadingFullScreen>
          </QueryClientProvider>
        </ReduxProvider>
      </SessionProvider>
    </ThemeProvider>
  );
}

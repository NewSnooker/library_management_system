"use client";
import { ThemeProvider } from "next-themes";
import React from "react";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import { SessionProvider } from "next-auth/react";
import { store } from "@/redux/store";
import LoadingFullScreen from "@/components/LoadingFullScreen";
export default function Providers({ children }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
      <Toaster position="top-center" reverseOrder={true} />
      <SessionProvider>
        <Provider store={store}>
          <LoadingFullScreen>{children}</LoadingFullScreen>
        </Provider>
      </SessionProvider>
    </ThemeProvider>
  );
}

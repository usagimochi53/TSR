"use client";

import { useEffect } from "react";

export function ServiceWorkerRegister() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) {
      return;
    }

    async function unregisterServiceWorkersForDevelopment() {
      const registrations = await navigator.serviceWorker.getRegistrations();
      await Promise.all(
        registrations.map((registration) => registration.unregister()),
      );

      if ("caches" in window) {
        const cacheNames = await window.caches.keys();
        await Promise.all(
          cacheNames
            .filter((cacheName) => cacheName.startsWith("kyou-no-sanpomichi"))
            .map((cacheName) => window.caches.delete(cacheName)),
        );
      }
    }

    // 開発中は古いHTMLキャッシュと新しいJSが混ざるとHydrationエラーになるため、SWを使わず掃除します。
    if (process.env.NODE_ENV !== "production") {
      unregisterServiceWorkersForDevelopment().catch((error) => {
        console.error("Service Worker cleanup failed:", error);
      });
      return;
    }

    function registerServiceWorker() {
      navigator.serviceWorker.register("/sw.js").catch((error) => {
        console.error("Service Worker registration failed:", error);
      });
    }

    if (document.readyState === "complete") {
      registerServiceWorker();
      return;
    }

    window.addEventListener("load", registerServiceWorker);

    return () => {
      window.removeEventListener("load", registerServiceWorker);
    };
  }, []);

  return null;
}

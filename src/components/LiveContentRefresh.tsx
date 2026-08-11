"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

type VersionResponse = { contentVersion: string; codeVersion: string };

export default function LiveContentRefresh() {
  const router = useRouter();
  const version = useRef<VersionResponse | null>(null);

  useEffect(() => {
    let active = true;

    async function checkForUpdates() {
      try {
        const response = await fetch(`/api/site-version?t=${Date.now()}`, { cache: "no-store" });
        if (!response.ok || !active) return;
        const latest = (await response.json()) as VersionResponse;
        const previous = version.current;
        version.current = latest;
        if (!previous) return;

        if (latest.codeVersion !== previous.codeVersion) {
          window.location.reload();
          return;
        }
        if (latest.contentVersion !== previous.contentVersion) {
          router.refresh();
        }
      } catch {
        // A temporary network error should not disturb visitors.
      }
    }

    void checkForUpdates();
    const interval = window.setInterval(checkForUpdates, 5000);
    const onVisible = () => { if (document.visibilityState === "visible") void checkForUpdates(); };
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      active = false;
      window.clearInterval(interval);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [router]);

  return null;
}

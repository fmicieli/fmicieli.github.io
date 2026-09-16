"use client";

import { useSyncExternalStore } from "react";
import { useScrolled } from "@/components/useScrolled";
import { useTranslation } from "@/lib/i18n/ui";

const STORAGE_KEY = "cookie-consent";

function subscribe(callback: () => void) {
  window.addEventListener("cookie-consent-change", callback);
  return () => window.removeEventListener("cookie-consent-change", callback);
}

function getSnapshot() {
  return localStorage.getItem(STORAGE_KEY) === null;
}

function getServerSnapshot() {
  return false;
}

function dismiss() {
  localStorage.setItem(STORAGE_KEY, "dismissed");
  window.dispatchEvent(new Event("cookie-consent-change"));
}

export function CookieBanner() {
  const consentPending = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const scrolled = useScrolled();
  const t = useTranslation();

  if (!consentPending || !scrolled) return null;

  return (
    <div
      role="status"
      className="fixed inset-x-4 bottom-4 z-50 flex flex-col gap-3 rounded-card border border-border border-t-[var(--color-border-top-highlight)] bg-surface p-4 text-sm shadow-card backdrop-blur-card sm:inset-x-auto sm:right-4 sm:max-w-sm"
    >
      <p className="text-text-secondary">{t.cookieBanner.text}</p>
      <button
        type="button"
        onClick={dismiss}
        className="inline-flex h-9 shrink-0 items-center justify-center self-start rounded-control bg-text-primary px-5 text-[14px] font-medium text-bg transition hover:scale-[1.03] hover:bg-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
      >
        {t.cookieBanner.button}
      </button>
    </div>
  );
}

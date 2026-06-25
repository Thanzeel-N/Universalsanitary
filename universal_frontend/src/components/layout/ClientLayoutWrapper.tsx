"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";
import CookieConsent from "./CookieConsent";

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAppArea = pathname?.startsWith("/admin") || pathname?.startsWith("/login");
  const isHomePage = pathname === "/";

  return (
    <>
      {!isAppArea && <Header isHomePage={isHomePage} />}
      <main className={!isAppArea && !isHomePage ? "pt-24" : ""}>
        {children}
      </main>
      {!isAppArea && <Footer />}
      <CookieConsent />
    </>
  );
}

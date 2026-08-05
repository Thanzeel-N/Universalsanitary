"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";
import CookieConsent from "./CookieConsent";

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAppArea = pathname?.startsWith("/admin") || pathname?.startsWith("/login");
  const isHomePage = pathname === "/";
  const isNecoPage = pathname === "/neco" || pathname === "/brands/neco";
  const isHeroPage = isHomePage || isNecoPage;

  return (
    <>
      {!isAppArea && !isNecoPage && <Header isHomePage={isHomePage} />}
      <main className={!isAppArea && !isHeroPage ? "pt-24" : ""}>
        {children}
      </main>
      {!isAppArea && !isNecoPage && <Footer />}
      <CookieConsent />
    </>
  );
}

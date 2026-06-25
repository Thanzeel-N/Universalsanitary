"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Cookies from "js-cookie";
import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const token = Cookies.get("access_token");
    if (!token) {
      router.push("/login");
    } else {
      setMounted(true);
    }
  }, [router]);

  if (!mounted) return null;

  const handleLogout = () => {
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col md:flex-row">
      {/* Mobile Admin Header */}
      <header className="md:hidden bg-white border-b border-neutral-200 px-6 py-4 flex justify-between items-center shrink-0">
        <Link href="/" className="font-playfair text-xl font-bold tracking-widest text-[#222]">
          Universal
        </Link>
        <div className="flex gap-4 items-center">
          <Link href="/admin" className={`text-xs uppercase tracking-wider font-bold ${pathname === '/admin' ? 'text-primary' : 'text-neutral-500'}`}>
            Dashboard
          </Link>
          <button onClick={handleLogout} className="text-xs uppercase tracking-wider text-red-500 font-bold cursor-pointer">
            Logout
          </button>
        </div>
      </header>

      <aside className="w-64 bg-white border-r border-neutral-200 p-6 flex flex-col hidden md:flex shrink-0">
        <Link href="/" className="font-playfair text-2xl font-bold tracking-widest mb-12 block text-[#222]">
          Universal
        </Link>
        
        <nav className="flex-1 flex flex-col gap-4">
          <Link href="/admin" className={`text-sm tracking-wide ${pathname === '/admin' ? 'font-bold text-[#222]' : 'text-neutral-500 hover:text-[#222]'}`}>
            Dashboard
          </Link>
        </nav>

        <button onClick={handleLogout} className="text-left text-sm text-red-500 hover:text-red-700 font-bold tracking-wide mt-auto">
          Logout
        </button>
      </aside>
      <main className="flex-1 p-6 md:p-10 overflow-auto">
        {children}
      </main>
    </div>
  );
}

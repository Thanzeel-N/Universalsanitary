"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X } from "lucide-react";

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // 1. Set visitor cookie immediately on entry
    if (!Cookies.get("universal_visitor")) {
      Cookies.set("universal_visitor", "true", { expires: 365, path: '/' });
    }

    // 2. Check if cookie consent is already set
    const consent = Cookies.get("universal_cookie_consent");
    if (!consent) {
      // Delay showing the banner slightly for better UX
      const timer = setTimeout(() => {
        setShowBanner(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    Cookies.set("universal_cookie_consent", "accepted", { expires: 365, path: '/' });
    setShowBanner(false);
  };

  const handleDecline = () => {
    Cookies.set("universal_cookie_consent", "declined", { expires: 365, path: '/' });
    setShowBanner(false);
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed bottom-4 md:bottom-8 left-4 right-4 md:left-auto md:right-8 md:w-[400px] z-50 bg-[#0f172a]/95 backdrop-blur-md border border-[#1e293b] p-6 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] text-white"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 bg-sky-500/10 rounded-xl text-sky-400 shrink-0">
              <Cookie size={24} />
            </div>
            <div className="flex-1">
              <h4 className="font-playfair text-base font-bold mb-2 tracking-wide text-white">Cookie Preferences</h4>
              <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                We use cookies to personalize your experience, provide social media features, and analyze traffic. Let us know if you accept.
              </p>
              <div className="flex gap-3 justify-end items-center">
                <button
                  onClick={handleDecline}
                  className="text-xs uppercase tracking-widest font-bold text-neutral-400 hover:text-white px-3 py-2 transition-colors cursor-pointer"
                >
                  Decline
                </button>
                <button
                  onClick={handleAccept}
                  className="bg-sky-500 hover:bg-sky-600 text-white text-xs uppercase tracking-widest font-bold px-5 py-2.5 rounded-lg shadow-md transition-all duration-300 active:scale-95 cursor-pointer"
                >
                  Accept All
                </button>
              </div>
            </div>
            <button
              onClick={() => setShowBanner(false)}
              className="text-neutral-500 hover:text-neutral-300 transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

"use client";
import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
// import { Link } from "react-router-dom";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
}) => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      let direction = current - scrollYProgress.getPrevious();
      setVisible(scrollYProgress.get() < 0.05 || direction < 0);
    }
  });

  const primaryNavItems = navItems.slice(0, 3);
  const secondaryNavItems = navItems.slice(3);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 1, y: -100 }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{ duration: 0.2 }}
        className={cn(
          "flex flex-col max-w-fit md:min-w-[70vw] lg:min-w-fit fixed z-[5000] top-10 inset-x-0 mx-auto px-6 md:px-10 py-4 rounded-lg shadow-md",
          className
        )}
        style={{
          backdropFilter: "blur(16px) saturate(180%)",
          backgroundColor: "rgba(17, 25, 40, 0.75)",
          borderRadius: "12px",
          border: "1px solid rgba(255, 255, 255, 0.125)",
        }}
      >
        <div className="flex items-center justify-between w-full">
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((navItem, idx) => (
              <Link
                key={`desktop-${idx}`}
                href={navItem.link}
                className="relative text-neutral-50 items-center flex space-x-1 hover:text-neutral-300"
              >
                {navItem.icon && <span>{navItem.icon}</span>}
                <span className="text-sm cursor-pointer">{navItem.name}</span>
              </Link>
            ))}
          </div>

          {/* Mobile Primary Nav */}
          <div className="flex md:hidden items-center space-x-4">
            {primaryNavItems.map((navItem, idx) => (
              <Link
                key={`mobile-primary-${idx}`}
                href={navItem.link}
                className="relative text-neutral-50 items-center flex space-x-1 hover:text-neutral-300"
              >
                {navItem.icon && <span>{navItem.icon}</span>}
                <span className="text-sm cursor-pointer">{navItem.name}</span>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          {secondaryNavItems.length > 0 && (
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden ml-4 p-2 text-neutral-50 hover:text-neutral-300 rounded-lg transition-colors"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          )}
        </div>

        {/* Mobile Secondary Nav */}
        <AnimatePresence>
          {isMenuOpen && secondaryNavItems.length > 0 && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden"
            >
              <div className="pt-4 mt-4 border-t border-white/10">
                {secondaryNavItems.map((navItem, idx) => (
                  <Link
                    key={`mobile-secondary-${idx}`}
                    href={navItem.link}
                    className="relative text-neutral-50 items-center flex space-x-1 hover:text-neutral-300 py-2"
                  >
                    {navItem.icon && <span>{navItem.icon}</span>}
                    <span className="text-sm cursor-pointer">
                      {navItem.name}
                    </span>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
};

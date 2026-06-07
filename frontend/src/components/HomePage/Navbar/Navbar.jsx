"use client";

import Image from "next/image";
import { Button } from "@heroui/react";
import MobileMenuIcon from "./MobileMenuIcon";
import MobileResponsiveDropDown from "./MobileResponsiveDropDown";
import { useState } from "react";
import Link from "next/link";

const AppNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuItems = [
    {
      link: "Browse Jobs",
      href: "/browsejob",
    },
    {
      link: "Company",
      href: "/company",
    },
    {
      link: "Pricing",
      href: "/pricing",
    },
  ];
  return (
    <div className="px-4 py-4 bg-[#010103]">
      <nav className="max-w-7xl mx-auto h-[62px] bg-[#1E1E20]/30 border border-white/5 rounded-2xl px-6 flex items-center justify-between shadow-2xl shadow-black/40">
        {/* Left Side: Logo Image Section */}
        <div className="flex items-center">
          <Link
            href="/"
            className="flex items-center transition-opacity hover:opacity-90"
          >
            <Image
              src="/images/logo.png"
              alt="hireLoop Logo"
              width={500}
              height={500}
              priority
              className="object-contain h-auto w-auto"
            />
          </Link>
        </div>

        {/* Right Side: Desktop All Links */}
        <div className="hidden md:flex gap-6">
          {/* Desktop Navigation Links */}
          <ul className="hidden md:flex items-center gap-6">
            {menuItems.map((item, idx) => (
              <li key={idx}>
                <Link
                  href={item.href}
                  className="text-sm text-white/85 font-medium hover:text-white"
                >
                  {item.link}
                </Link>
              </li>
            ))}
          </ul>

          {/*Actions (Sign In + Divider + Get Started) */}
          <div className="hidden md:flex items-center gap-5">
            {/* Divider */}
            <span className="hidden md:inline text-white/20 text-xl">|</span>

            <Link
              className="text-sm font-semibold text-[#6366F1] hover:text-[#818CF8] hover:underline transition-colors "
              href="signin"
            >
              Sign In
            </Link>

            <Button className="bg-[#5850EC] hover:bg-[#685FFF] text-white font-semibold text-sm px-6 h-10 rounded-xl transition-all duration-200 active:scale-95 shadow-md">
              <Link href="signup">Get Started</Link>
            </Button>
          </div>
        </div>

        {/* Mobile menu toggle for smaller screens */}
        <MobileMenuIcon isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      </nav>

      {/* Mobile Responsive Dropdown Menu */}
      <MobileResponsiveDropDown
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        menuItems={menuItems}
      />
    </div>
  );
};

export default AppNavbar;


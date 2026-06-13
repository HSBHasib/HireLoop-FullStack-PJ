"use client";

import Image from "next/image";
import { Button, Spinner } from "@heroui/react";
import MobileMenuIcon from "./MobileMenuIcon";
import MobileResponsiveDropDown from "./MobileResponsiveDropDown";
import { useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { usePathname, useRouter } from "next/navigation";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await authClient.signOut();
      toast.success("Logged out Successful!", { duration: 1000 });
      router.refresh();
    } catch (err) {
      toast.error("Logout runtime error.");
    }
  };
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const pathName = usePathname();

  const menuItems = [
    {
      link: "Browse Jobs",
      href: "/browse-jobs",
    },
    {
      link: "Company",
      href: "/company",
    },
    {
      link: "Pricing",
      href: "/plans",
    },
  ];

  // SetUp and add Dashboard Links Based On user Type
  const dashboardLinks = {
    admin: "/dashboard/admin",
    seeker: "/dashboard/seeker",
    recruiter: "/dashboard/recruiter",
  };

  if (user?.email) {
    menuItems.push({
      link: "Dashboard",
      href: dashboardLinks[user?.role || 'seeker']
    });
  }

  return (
    <div className="sticky top-4 z-40 w-full px-4 h-20">
      <nav className="max-w-7xl mx-auto flex items-center justify-between">
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
              className="object-contain h-auto w-25"
            />
          </Link>
        </div>

        {/* Right Side: Desktop All Links */}
        <div className="hidden md:flex gap-6 h-15.5 bg-[#1E1E20]/60 border border-white/5 rounded-2xl px-6">
          {/* Desktop Navigation Links */}
          <ul className="hidden md:flex items-center gap-3">
            {menuItems.map((item, idx) => (
              <li key={idx}>
                <Link
                  href={item.href}
                  className={`text-sm text-white/85 font-medium hover:text-white px-3 rounded-2xl hover:border-b hover:border-[#5850EC80] hover:pb-1 transition-all duration-200 ease-in  ${pathName === item.href && "text-white/100 border-b border-[#5850EC] pb-1"}`}
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

            {isPending ? (
              <div className=" flex items-center justify-center">
                <Spinner
                  color="purple"
                  label="Fetching session streams..."
                  size="lg"
                />
              </div>
            ) : user ? (
              <>
                <span className="text-white/85">
                  Hi, {user?.name || "NameUndefined"}!
                </span>
                <Button
                  onClick={handleSignOut}
                  className="bg-[#5850EC] hover:bg-[#685FFF] text-white font-semibold text-sm px-6 h-10 rounded-xl transition-all duration-200 active:scale-95 shadow-md"
                >
                  SignOut
                </Button>
              </>
            ) : (
              <>
                <Link
                  className="text-sm font-semibold text-[#6366F1] hover:text-[#818CF8] hover:underline transition-colors "
                  href="/auth/signin"
                >
                  Sign In
                </Link>

                <Button className="bg-[#5850EC] hover:bg-[#685FFF] text-white font-semibold text-sm px-6 h-10 rounded-xl transition-all duration-200 active:scale-95 shadow-md">
                  <Link href="/auth/signup">Get Started</Link>
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Mobile menu toggle for smaller screens */}
        <MobileMenuIcon isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      </nav>

      {/* Mobile Responsive Dropdown Menu */}
      <MobileResponsiveDropDown
        isPending={isPending}
        user={user}
        handleSignOut={handleSignOut}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        menuItems={menuItems}
      />
    </div>
  );
};

export default Navbar;

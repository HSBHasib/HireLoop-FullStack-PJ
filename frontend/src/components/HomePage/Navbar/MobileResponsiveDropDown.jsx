import { Button } from "@heroui/react";
import Link from "next/link";

const MobileResponsiveDropDown = ({menuItems, isMenuOpen, setIsMenuOpen}) => {
  return (
    <>
      {isMenuOpen && (
        <div className="absolute top-20 left-4 right-4 bg-[#1E1E20]/95 backdrop-blur-xl border border-white/5 rounded-3xl p-6 flex flex-col gap-4 md:hidden shadow-xl z-40">
          {menuItems.map((item) => (
            <Link
              key={item}
              className="w-full text-white hover:text-[#EA580C] font-medium text-base py-1.5 transition-colors border-b border-white/5"
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.link}
            </Link>
          ))}
          <div className="flex flex-col gap-3 pt-2">
            <Link
              className="text-center font-semibold text-[#6366F1] py-2"
              href="signin"
            >
              Sign In
            </Link>
            <Button
              as={Link}
              className="w-full bg-[#5850EC] text-white font-semibold py-2.5 rounded-xl text-center"
              href="#"
            >
              Get Started
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileResponsiveDropDown;


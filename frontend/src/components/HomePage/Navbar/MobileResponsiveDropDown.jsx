import { Button, Spinner } from "@heroui/react";
import Link from "next/link";

const MobileResponsiveDropDown = ({
  menuItems,
  isMenuOpen,
  setIsMenuOpen,
  isPending,
  user,
  handleSignOut,
  isBanned,
}) => {
  return (
    <>
      {isMenuOpen && (
        <div
          className={`w-[50%] absolute top-12 right-4 bg-[#1E1E20]/70 backdrop-blur-xl border border-white/5 rounded-xl p-6 flex flex-col gap-4 md:hidden shadow-xl z-40`}
        >
          {menuItems.map((item, idx) => (
            <Link
              key={idx}
              className="w-full text-white/85 hover:text-white font-medium text-sm py-1.5 transition-colors border-b border-white/5"
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.link}
            </Link>
          ))}

          {isPending ? (
            <div className=" flex items-center justify-center">
              <Spinner
                color="purple"
                label="Fetching session streams..."
                size="lg"
              />
            </div>
          ) : user ? (
            <div className="flex flex-col gap-3 pt-2">
              {isBanned && (
                <div className="flex items-center justify-center gap-2 -mb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-[10px] bg-red-500/10 border border-red-500/30 px-1.5 py-0.5 rounded-md text-red-400 font-semibold uppercase tracking-wider">
                    Suspended
                  </span>
                </div>
              )}
              <span className="text-white/85 text-center">
                Hi, {user?.name || "Undefined"}!
              </span>
              <Button
                onClick={handleSignOut}
                className="w-full bg-[#5850EC] text-white font-semibold py-2.5 rounded-xl text-center"
              >
                SignOut
              </Button>
            </div>
          ) : (
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
          )}
        </div>
      )}
    </>
  );
};

export default MobileResponsiveDropDown;

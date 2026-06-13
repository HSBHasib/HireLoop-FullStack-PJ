"use client";

import React from "react";
import { HiLockClosed, HiArrowLeft } from "react-icons/hi2";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";

const UnauthorizedContent = () => {
  const { data: session } = authClient.useSession();
  const role = session?.role || "seeker";
  const router = useRouter();
  return (
    <section className="text-white flex items-center justify-center my-8 relative overflow-hidden antialiased">
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-125 h-72 bg-red-500/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Main Core Card Container */}
      <div className="w-full max-w-2xl bg-[#1E1E20]/20 border border-neutral-800 rounded-[24px] p-8 flex flex-col items-center text-center shadow-2xl relative z-10 ring-1 ring-neutral-900/40">
        {/* Glowing Lock Icon */}
        <div className="w-16 h-16 bg-red-950/30 border border-red-900/30 rounded-full flex items-center justify-center text-red-400 mb-6 relative shadow-[0_0_30px_rgba(239,68,68,0.05)]">
          <div className="absolute inset-0 bg-red-500/5 blur-md rounded-full" />
          <HiLockClosed size={26} className="relative z-10 animate-bounce" />
        </div>

        {/* Badge Alert Pill */}
        <span className="bg-red-950/40 border border-red-900/40 text-red-400 text-[10px] font-bold tracking-widest uppercase px-4 py-1 rounded-full mb-4 select-none">
          401 Access Denied
        </span>

        {/* Main Headline & Subtitle */}
        <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-3">
          Restricted Area
        </h1>

        <p className="text-neutral-400 text-sm leading-relaxed max-w-[320px] mb-2">
          You don't have permission to access this resource.
        </p>

        <p className="text-neutral-500 text-xs leading-relaxed max-w-[340px] mb-8">
          This portal is protected. Your current active role is logged as{" "}
          <span className="text-zinc-300 font-semibold capitalize">
            "{role}"
          </span>
          , which does not grant clearing for this specific route.
        </p>

        {/* Action Buttons Stack */}
        <div className="w-full flex flex-col gap-3">
          {/* Main Action: Send to their respective dashboard */}
          <Link
            href={`/dashboard/${role}`}
            className="w-full bg-white/90 hover:bg-white/80 text-black h-12 rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-center gap-2 group cursor-pointer shadow-md"
          >
            <span>Go to Your Dashboard</span>
          </Link>

          {/* Secondary Action: Go Back to previous page */}
          <button
            onClick={() => router.back()}
            className="w-full bg-zinc-900/50 hover:bg-zinc-900 border border-zinc-800 text-zinc-300 h-12 rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-center gap-2 group cursor-pointer"
          >
            <HiArrowLeft
              size={14}
              className="group-hover:-translate-x-0.5 transition-transform duration-200"
            />
            <span>Go Back</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default UnauthorizedContent;

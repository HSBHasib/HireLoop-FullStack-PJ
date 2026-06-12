import React from "react";
import { redirect } from "next/navigation";
import { stripe } from "@/lib/stripe";
import { HiCheck, HiOutlineShieldCheck, HiArrowRight } from "react-icons/hi2";
import Link from "next/link";

const PaymentSuccessfulPage = async ({ searchParams }) => {
  const resolvedParams = await searchParams;
  const sessionId = resolvedParams?.session_id;

  if (!sessionId) {
    return redirect("/plans");
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items", "payment_intent"],
    });

    if (session.status === "open") {
      return redirect("/plans");
    }

    if (session.status === "complete") {
      const customerEmail = session.customer_details?.email || "your email";
      
      const amountTotal = session.amount_total ? (session.amount_total / 100).toFixed(2) : "20.00";

      return (
        <section className="max-h-screen text-white flex items-center justify-center p-4 relative overflow-hidden antialiased">
          {/* Core Premium Success Card Container */}
          <div className="w-full max-w-110 bg-[#1E1E20]/50 border border-neutral-950 rounded-[24px] p-8 flex flex-col items-center text-center shadow-2xl relative z-10 ring-1 ring-neutral-900/40">
            
            {/* Glowing Success Checkmark Animated Icon */}
            <div className="w-16 h-16 bg-emerald-950/40 border border-emerald-800/40 rounded-full flex items-center justify-center text-emerald-400 mb-6 relative shadow-[0_0_30px_rgba(16,185,129,0.1)]">
              <div className="absolute inset-0 bg-emerald-500/10 blur-md rounded-full" />
              <HiCheck size={28} className="relative z-10 animate-bounce" />
            </div>

            {/* Badge Text Pill */}
            <span className="bg-blue-950/40 border border-blue-900/40 text-[#527df4] text-[10px] font-bold tracking-widest uppercase px-5 py-1 rounded-full mb-4 select-none">
              Upgrade Successful
            </span>

            {/* Main Headline & Subtitle */}
            <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-3">
              Welcome to Hireloop Pro
            </h1>
            
            <p className="text-neutral-400 text-sm leading-relaxed max-w-[340px] mb-2">
              Your payment of <span className="text-white font-semibold">${amountTotal}</span> was received perfectly.
            </p>

            <p className="text-neutral-500 text-xs leading-relaxed max-w-[340px] mb-8">
              All advanced premium recruiting modules are unlocked on your account.{" "}
              <span className="text-emerald-500 font-medium">You may need to re-authenticate to see the effect.</span>
            </p>

            {/* Session ID Verification Box Group */}
            <div className="w-full bg-[#111113] border border-neutral-900 rounded-xl p-3 flex items-center justify-between gap-3 mb-6">
              <div className="flex items-center gap-2 text-neutral-400 text-xs min-w-0">
                <HiOutlineShieldCheck size={16} className="text-neutral-500 shrink-0" />
                <span className="truncate">Session ID verified</span>
              </div>
              {/* Shortened Session Token View */}
              <div className="bg-neutral-900 border border-neutral-800 text-neutral-500 font-mono text-[10px] px-2.5 py-1 rounded-md truncate max-w-37.5 select-all">
                {sessionId.substring(0, 10)}...{sessionId.substring(sessionId.length - 4)}
              </div>
            </div>

            <Link
              href="/" 
              className="w-full bg-white/90 hover:bg-white/80 text-black h-12 rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-center gap-2 group cursor-pointer shadow-md"
            >
              <span>Go to Workspace Dashboard</span>
              <HiArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform duration-200" />
            </Link>

          </div>
        </section>
      );
    }
  } catch (err) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-4">
        <div className="bg-[#0b0b0c] border border-neutral-900 p-6 rounded-2xl text-center max-w-sm">
          <p className="text-xs text-neutral-500 mb-2">Verification Failed</p>
          <p className="text-xs text-neutral-400">{err.message}</p>
        </div>
      </div>
    );
  }

  return null;
};

export default PaymentSuccessfulPage;
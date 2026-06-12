import Link from "next/link";
import React from "react";
import {
  HiArrowRight,
} from "react-icons/hi2";

const JobApplicationLimitOutCard = ({plan, monthlyLimit, applicationLength}) => {
  return (
    <div className="max-w-3xl mx-auto relative">
      {/* Soft Mesh Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative bg-[#0b0b0c] border border-neutral-900 rounded-[28px] p-6 md:p-8 shadow-2xl overflow-hidden">
        {/* Subtle Linear Edge Gradient */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-neutral-800 to-transparent" />

        {/* Header Section - Fixed responsiveness with flex-row instead of full break */}
        <div className="flex items-start justify-between gap-4 mb-8">
          <div className="min-w-0 flex-1">
            <span className="inline-block text-[10px] font-bold tracking-widest text-red-500 uppercase bg-red-500/10 px-2 py-0.5 rounded border border-red-500/20 whitespace-nowrap">
              Action Required
            </span>
            <h2 className="text-xl md:text-2xl font-black text-white/90 tracking-tight mt-2 break-words">
              Quota Fully Depleted
            </h2>
          </div>

          {/* Monospace Fractional Indicator */}
          <div className="text-right shrink-0">
            <div className="text-xl md:text-2xl font-bold text-white leading-none">
              {applicationLength}
              <span className="text-neutral-600">/</span>
              {monthlyLimit}
            </div>
            <div className="text-[9px] md:text-[10px] uppercase tracking-wider text-neutral-500 mt-1 md:mt-2">
              Applications Used
            </div>
          </div>
        </div>

        {/* --- LIVE INTERACTIVE PROGRESS BAR ZONE --- */}
        <div className="bg-[#111113] border border-neutral-900/60 rounded-2xl p-5 mb-8">
          <div className="flex justify-between items-center mb-2.5 text-xs gap-2">
            <span className="text-neutral-400 font-medium truncate">
              Current Workspace Volume
            </span>
            <span className="font-bold text-red-400 shrink-0">
              100% Capacity
            </span>
          </div>

          {/* Progress Bar Track */}
          <div className="w-full h-2.5 bg-neutral-900 border border-neutral-800 rounded-full overflow-hidden p-[2px]">
            {/* Animated Glowing Fill Indicator */}
            <div
              className="h-full bg-linear-to-r from-indigo-500 via-purple-500 to-red-500 rounded-full shadow-[0_0_12px_rgba(239,68,68,0.4)] transition-all duration-1000 ease-out relative"
              style={{
                width: `${Math.min((applicationLength / monthlyLimit) * 100, 100)}%`,
              }}
            >
              {/* Subtle light bar reflect effect */}
              <div className="absolute inset-0 bg-linear-to-b from-white/20 to-transparent" />
            </div>
          </div>

          <div className="flex justify-between items-center mt-3 text-[10px] text-neutral-500 gap-2">
            <span className="truncate">0 Used (Min)</span>
            <span className="text-right truncate">Threshold Limit Reached</span>
          </div>
        </div>

        {/* Explanatory Context */}
        <p className="text-xs md:text-sm text-neutral-400 mb-8 leading-relaxed">
          Your repository node is running on the{" "}
          <span className="text-white font-semibold uppercase text-[11px] bg-neutral-800 px-1.5 py-0.5 rounded">
            {plan.name} Tier
          </span>
          . To submit more applications and bypass upcoming threshold checks,
          please upgrade your active token.
        </p>

        {/* Premium Clean Action CTA */}
        <Link
          href="/plans"
          className="w-full h-12 rounded-xl bg-white/90 hover:bg-neutral-200 text-black font-bold text-xs tracking-wide transition-all duration-200 flex items-center justify-between px-4 md:px-5 group shadow-lg cursor-pointer gap-2"
        >
          <span className="truncate">Upgrade System Capacity</span>
          <div className="flex items-center gap-1.5 md:gap-2 text-black/80 group-hover:text-black transition-colors shrink-0">
            <span className="text-[10px] font-medium whitespace-nowrap">
              View Plans
            </span>
            <HiArrowRight
              size={14}
              className="group-hover:translate-x-1 transition-transform"
            />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default JobApplicationLimitOutCard;

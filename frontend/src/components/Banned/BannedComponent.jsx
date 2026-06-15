import Link from "next/link";
import React from "react";
import RouterBack from "../reusebaleComponents/Router";

const BannedComponent = () => {
  return (
    <div className="text-white min-h-[70vh] flex items-center justify-center p-4">
      <div className="border border-red-950/30 bg-[#1E1E20]/30 p-8 rounded-2xl max-w-lg text-center shadow-xl relative overflow-hidden flex flex-col items-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-red-500/50 blur-sm" />

        <p className="text-lg text-red-500 font-bold mb-2 tracking-tight">
          Account Suspended
        </p>
        <p className="text-sm text-neutral-400 leading-relaxed mb-6">
          Your account has been suspended due to a violation of our terms of
          service. You can no longer apply for any positions.
        </p>

        <div className="border border-neutral-900 bg-[#111111] px-4 py-3 rounded-xl text-xs text-neutral-500 w-full mb-6">
          Please contact support at:{" "}
          <Link
            href="mailto:hasibhsb19@gmail.com"
            className="text-indigo-400 hover:underline font-medium block mt-1 text-sm select-all"
          >
            hasibhsb19@gmail.com
          </Link>
        </div>

        <RouterBack className="w-full">
          <button className="w-full bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 text-xs font-semibold py-2.5 px-4 rounded-xl transition-colors duration-200 cursor-pointer">
            Go Back
          </button>
        </RouterBack>
      </div>
    </div>
  );
};

export default BannedComponent;

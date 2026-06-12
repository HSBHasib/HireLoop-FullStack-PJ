"use client";

import PricingCard from "@/components/MemberShip/pricingCard/PricingCard";
import SwitchBtn from "@/components/MemberShip/SwitchBtn";
import {
  PRICING_DATA,
  TABS_CONFIG,
} from "@/components/reusebaleComponents/PricingCardData";
import React, { useState } from "react";

const PricingSection = () => {
  const [activeTab, setActiveTab] = useState("seekers");
  const PricingData = PRICING_DATA;
  const tabConfig = TABS_CONFIG;

  return (
    <div className="text-white px-4">
      {/* Top Header Label */}
      <div className="flex items-center justify-center gap-2 mb-3 text-xs font-semibold tracking-widest uppercase text-[#5850EC]">
        <span>■</span>
        <span className="text-[#D0D0D0]">Pricing</span>
        <span>■</span>
      </div>

      {/* Main Heading */}
      <h2 className="text-3xl md:text-[44px] leading-12 font-semibold text-center max-w-2xl mx-auto mb-12">
        Pay for the leverage <br /> not the listings
      </h2>

      {/* --- Job Seeker and Recruiter Toggle Button --- */}
      <SwitchBtn
        TABS_CONFIG={tabConfig}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Pricing Card */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        {PricingData[activeTab].map((planItem) => (
          <PricingCard key={planItem.id} planItem={planItem} />
        ))}
      </div>
    </div>
  );
};

export default PricingSection;

"use client";

import React, { useState } from "react";
import {
  FaCrown,
  FaBolt,
  FaChartLine,
  FaBriefcase,
  FaBuilding,
} from "react-icons/fa";
import PricingCard from "@/components/MemberShip/pricingCard/PricingCard";
import SwitchBtn from "@/components/MemberShip/SwitchBtn";
import FAQComponet from "@/components/faq/FAQ";
import {
  PRICING_DATA,
  TABS_CONFIG,
} from "@/components/reusebaleComponents/PricingCardData";

const MemberShipPlan = () => {
  const [activeTab, setActiveTab] = useState("seekers");

  // Pricing Data & Tabs structure configuration
  const PricingData = PRICING_DATA;
  const tabConfig = TABS_CONFIG;

  const FAQ_DATA = [
    {
      title: "How does plan switching work?",
      content:
        "You can upgrade or downgrade your tier plan at any point inside your active dashboard settings. When moving to an escalated tier, system credits are pro-rated instantly.",
    },
    {
      title: "What is your cancellation policy?",
      content:
        "All subscriptions can be terminated anytime with absolute zero friction. You will retain operational access to your active premium features until the exact calendar date of your next billing interval cycle.",
    },
    {
      title: "Can I request a payment refund?",
      content:
        "We provide an explicit 7-day refund guarantee window if our premium pipelines fail to meet your system specifications, provided active usage tracking remains under our evaluation threshold limit.",
    },
    {
      title: "Which global payment methods are accepted?",
      content:
        "Our secured infrastructure processes all major credit/debit networks, local digital banking aggregators, and enterprise invoices safely protected under standard SSL tokens.",
    },
  ];

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="bg-[#050505] text-white min-h-screen pb-16 pt-10 px-4 sm:px-6 lg:px-8">
      {/* Header Info */}
      <div className="max-w-3xl mx-auto text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
          Flexible Upgrades For Everyone
        </h1>
        <p className="text-[12.5px] text-white/50 mt-2 max-w-sm mx-auto leading-relaxed">
          Bypass traditional limits with streamlined access tailored
          specifically for tech ecosystem participants.
        </p>
      </div>

      {/* --- Job Seeker and Recruiter Toggle Button --- */}
      <SwitchBtn
        TABS_CONFIG={tabConfig}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* --- MemberShip Pricing CARD --- */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        {PricingData[activeTab].map((planItem) => (
          <PricingCard key={planItem.id} planItem={planItem} />
        ))}
      </div>

      {/* --- FAQ Section --- */}
      <FAQComponet
        FAQ_DATA={FAQ_DATA}
        openFaq={openFaq}
        toggleFaq={toggleFaq}
      />
    </div>
  );
};

export default MemberShipPlan;


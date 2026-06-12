'use client'

import React, { useState } from "react";
import { FaCrown, FaBolt, FaChartLine, FaBriefcase, FaBuilding } from "react-icons/fa";
import PricingCard from "@/components/MemberShip/pricingCard/PricingCard";
import SwitchBtn from "@/components/MemberShip/SwitchBtn";
import FAQComponet from "@/components/faq/FAQ";

const MemberShipPlan = () => {
  const [activeTab, setActiveTab] = useState("seekers");
  const [openFaq, setOpenFaq] = useState(null); 

  // Tabs structure configuration
  const TABS_CONFIG = [
    { id: "seekers", label: "For Job Seekers", icon: FaBriefcase },
    { id: "recruiters", label: "For Recruiters", icon: FaBuilding },
  ];

  // Pricing Dets
  const PRICING_DATA = {
    seekers: [
      {
        id: "seeker-free",
        name: "Free",
        price: "0",
        period: "/forever",
        icon: FaCrown,
        iconColor: "text-neutral-400",
        cardVariant: "default",
        subtitle: "Essential tools to start your journey:",
        buttonText: "Free Plan",
        features: [
          { text: "Browse & save up to 10 jobs", disabled: false },
          { text: "Apply to up to 3 jobs per month", disabled: false },
          { text: "Basic profile setup", disabled: false },
          { text: "Instant email alerts", disabled: false },
        ],
      },
      {
        id: "seeker-pro",
        name: "Pro",
        price: "19",
        period: "/month",
        icon: FaChartLine,
        iconColor: "text-indigo-400",
        cardVariant: "tertiary",
        subtitle: "Accelerate your hiring response:",
        buttonText: "Upgrade to Pro",
        features: [
          { text: "Apply to up to 30 jobs per month", disabled: false, highlightText: true },
          { text: "Unlimited saved jobs", disabled: false },
          { text: "Real-time application tracking", disabled: false },
          { text: "Advanced salary insights", disabled: false },
        ],
      },
      {
        id: "seeker-premium",
        name: "Premium",
        price: "39",
        period: "/month",
        icon: FaBolt,
        iconColor: "text-purple-400",
        cardVariant: "default",
        subtitle: "Maximum competitive advantage:",
        buttonText: "Upgrade to Premium",
        features: [
          { text: "Everything in Pro included", disabled: false },
          { text: "Unlimited job applications", disabled: false },
          { text: "Profile boost directly to recruiters", disabled: false },
          { text: "Early access to newly posted jobs", disabled: false },
          { text: "Priority developer support", disabled: false },
        ],
      },
    ],
    recruiters: [
      {
        id: "recruiter-free",
        name: "Free",
        price: "0",
        period: "/forever",
        icon: FaCrown,
        iconColor: "text-neutral-400",
        cardVariant: "default",
        subtitle: "Great for your first year of hiring:",
        buttonText: "Start Free",
        features: [
          { text: "Up to 3 active job posts", disabled: false },
          { text: "Basic applicant management pipeline", disabled: false },
          { text: "Standard listing visibility tier", disabled: false },
        ],
      },
      {
        id: "recruiter-growth",
        name: "Growth",
        price: "49",
        period: "/month",
        icon: FaChartLine,
        iconColor: "text-indigo-400",
        cardVariant: "tertiary",
        subtitle: "Scale your core engineering squads:",
        buttonText: "Upgrade to Growth",
        features: [
          { text: "Up to 10 active job posts", disabled: false, highlightText: true },
          { text: "Full ATS Applicant tracking systems", disabled: false },
          { text: "Basic recruitment analytics", disabled: false },
          { text: "Direct email support desk", disabled: false },
        ],
      },
      {
        id: "recruiter-enterprise",
        name: "Enterprise",
        price: "149",
        period: "/month",
        icon: FaBolt,
        iconColor: "text-purple-400",
        cardVariant: "default",
        subtitle: "High-volume corporate infrastructure:",
        buttonText: "Contact Sales",
        features: [
          { text: "Up to 50 active job posts dashboard", disabled: false },
          { text: "Advanced analytics & custom metrics", disabled: false },
          { text: "Featured premium job listings", disabled: false },
          { text: "Team collaboration & seats access", disabled: false },
          { text: "Custom branding & white-labeled portal", disabled: false },
          { text: "Priority dedicated success manager", disabled: false },
        ],
      },
    ],
  };

  const FAQ_DATA = [
    {
      title: "How does plan switching work?",
      content: "You can upgrade or downgrade your tier plan at any point inside your active dashboard settings. When moving to an escalated tier, system credits are pro-rated instantly.",
    },
    {
      title: "What is your cancellation policy?",
      content: "All subscriptions can be terminated anytime with absolute zero friction. You will retain operational access to your active premium features until the exact calendar date of your next billing interval cycle.",
    },
    {
      title: "Can I request a payment refund?",
      content: "We provide an explicit 7-day refund guarantee window if our premium pipelines fail to meet your system specifications, provided active usage tracking remains under our evaluation threshold limit.",
    },
    {
      title: "Which global payment methods are accepted?",
      content: "Our secured infrastructure processes all major credit/debit networks, local digital banking aggregators, and enterprise invoices safely protected under standard SSL tokens.",
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
          Bypass traditional limits with streamlined access tailored specifically for tech ecosystem participants.
        </p>
      </div>

      {/* --- Job Seeker and Recruiter Toggle Button --- */}
      <SwitchBtn TABS_CONFIG={TABS_CONFIG} activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* --- MemberShip Pricing CARD --- */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        {PRICING_DATA[activeTab].map((planItem) => (
          <PricingCard key={planItem.id} planItem={planItem} />
        ))}
      </div>

      {/* --- FAQ Section --- */}
      <FAQComponet FAQ_DATA={FAQ_DATA} openFaq={openFaq} toggleFaq={toggleFaq} />
      
    </div>
  );
};


export default MemberShipPlan;


import React from "react";
import { FaCrown, FaBolt, FaChartLine } from "react-icons/fa";
import { HiArrowRight, HiPlus } from "react-icons/hi2";

const MemberShipPlan = () => {
  // MemberShip Plan Data
  const PLANS_DATA = [
    {
      id: "starter",
      name: "Starter",
      price: "0",
      icon: FaCrown,
      iconColor: "text-pink-400",
      isHighlighted: false,
      subtitle: "Start building your insights hub:",
      buttonText: "Free Plan",
      features: [
        { text: "Daily AI match brief (top 5)", disabled: false },
        { text: "Verified salary bands", disabled: false },
        { text: "Company insight dashboards", disabled: false },
        { text: "1-click apply, unlimited", disabled: true },
      ],
    },
    {
      id: "growth",
      name: "Growth",
      price: "17",
      icon: FaChartLine,
      iconColor: "text-indigo-400",
      isHighlighted: true,
      subtitle: "Start building your insights hub:",
      buttonText: "Upgrade to Growth",
      features: [
        { text: "Daily AI match brief (top 5)", disabled: false },
        { text: "Verified salary bands", disabled: false },
        { text: "Company insight dashboards", disabled: false },
        {
          text: "1-click apply, unlimited",
          disabled: false,
          highlightText: true,
        },
      ],
    },
    {
      id: "premium",
      name: "Premium",
      price: "99",
      icon: FaBolt,
      iconColor: "text-purple-400",
      isHighlighted: false,
      subtitle: "Start building your insights hub:",
      buttonText: "Upgrade to Premium",
      features: [
        { text: "Everything in Pro", disabled: false },
        { text: "Multi-profile career portfolios", disabled: false },
        { text: "Shared talent rooms", disabled: false },
        { text: "Recruiter view (read-only)", disabled: false },
      ],
    },
  ];

  return (
    <div className="bg-[#050505] text-white max-h-screen pb-16 pt-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
          Select Your Upgrade Path
        </h1>
        <p className="text-xs text-white/50 mt-2 max-w-sm mx-auto leading-relaxed">
          Unlock absolute freedom with zero submission limits and priority
          pipelines straight to tech recruiting teams.
        </p>
      </div>

      {/* MemberShip Plan Card */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {PLANS_DATA.map((planItem) => {
            const IconComponent = planItem.icon;

            return (
              <div
                key={planItem.id}
                className={`rounded-[20px] p-6 flex flex-col justify-between shadow-xl hover:shadow transition-all duration-300 ease-in ${
                  planItem.isHighlighted
                    ? "bg-[#111113] hover:border-neutral-700 border border-neutral-800 lg:scale-105 shadow-2xl ring-1 ring-neutral-700/30"
                    : "bg-[#0b0b0c] border hover:border-neutral-800 border-neutral-900"
                }`}
              >
                <div>
                  {/* Header Segment */}
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-2.5">
                      <span className="w-8 h-8 bg-neutral-900 border border-neutral-800 rounded-lg flex items-center justify-center text-sm">
                        <IconComponent className={planItem.iconColor} />
                      </span>
                      <span
                        className={`text-lg font-medium ${planItem.isHighlighted ? "text-white" : "text-neutral-200"}`}
                      >
                        {planItem.name}
                      </span>
                    </div>
                    <div className="flex items-baseline text-white">
                      <span className="text-3xl font-bold">
                        ${planItem.price}
                      </span>
                      <span className="text-neutral-500 text-xs ml-1">
                        /month
                      </span>
                    </div>
                  </div>

                  <p
                    className={`text-xs font-medium mb-5 ${planItem.isHighlighted ? "text-neutral-300" : "text-neutral-400"}`}
                  >
                    {planItem.subtitle}
                  </p>

                  {/* Features List Group */}
                  <ul className="space-y-3.5 mb-8 text-xs">
                    {planItem.features.map((feature, fIdx) => (
                      <li
                        key={fIdx}
                        className={`flex items-start gap-2.5 leading-relaxed ${
                          feature.disabled
                            ? "text-neutral-500"
                            : feature.highlightText
                              ? "font-semibold text-indigo-400"
                              : planItem.isHighlighted
                                ? "text-neutral-300"
                                : "text-neutral-400"
                        }`}
                      >
                        {/* Plus Sign Icon Box */}
                        <span
                          className={`w-4 h-4 rounded flex items-center justify-center shrink-0 mt-0.5 border ${
                            feature.disabled
                              ? "bg-neutral-900 border-neutral-800 text-neutral-600"
                              : feature.highlightText
                                ? "bg-indigo-950 border-indigo-800 text-indigo-400"
                                : planItem.isHighlighted
                                  ? "bg-neutral-800 border-neutral-700 text-neutral-300"
                                  : "bg-neutral-900 border-neutral-800 text-neutral-500"
                          }`}
                        >
                          <HiPlus size={10} />
                        </span>
                        <span>{feature.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Purchase Button */}
                <button
                  className={`w-full h-11 rounded-xl text-xs flex items-center justify-between px-4 cursor-pointer  ${
                    planItem.isHighlighted
                      ? "bg-white/90 hover:bg-white/80 text-black font-bold"
                      : "bg-neutral-900 hover:bg-neutral-800 text-neutral-300 font-medium"
                  }`}
                >
                  <span>{planItem.buttonText}</span>
                  <HiArrowRight size={14} />
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default MemberShipPlan;

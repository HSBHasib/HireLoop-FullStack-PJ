import React from 'react'
import { Card } from "@heroui/react";

import { 
  FiSearch, 
  FiTrendingUp, 
  FiBriefcase, 
  FiBookmark, 
  FiZap, 
  FiFileText, 
  FiCheckCircle, 
  FiAward 
} from "react-icons/fi";

const Featured = () => {

    // Card Items Dets
    const featuresData = [
    {
      id: 1,
      title: "Smart Search",
      description: "Find your ideal job with advanced filters.",
      icon: FiSearch, 
    },
    {
      id: 2,
      title: "Salary Insights",
      description: "Get real salary data to negotiate confidently.",
      icon: FiTrendingUp,
    },
    {
      id: 3,
      title: "Top Companies",
      description: "Apply to vetted companies that are hiring.",
      icon: FiBriefcase,
    },
    {
      id: 4,
      title: "Saved Jobs",
      description: "Manage apps & favorites on your dashboard.",
      icon: FiBookmark,
    },
    {
      id: 5,
      title: "One-Click Apply",
      description: "Simplify your job applications for an easier process!",
      icon: FiZap,
    },
    {
      id: 6,
      title: "Resume Builder",
      description: "Create professional resumes with modern templates.",
      icon: FiFileText,
    },
    {
      id: 7,
      title: "Skill-Based Matching",
      description: "Discover jobs that match your skills and experience.",
      icon: FiCheckCircle,
    },
    {
      id: 8,
      title: "Career Growth Resources",
      description: "Boost your career with quick interview tips.",
      icon: FiAward,
    },
  ];

  return (
    <section className=" text-white py-20 px-4 min-h-screen flex flex-col items-center justify-center">
      {/* Top Header Label */}
      <div className="flex items-center gap-2 mb-3 text-xs font-semibold tracking-widest uppercase text-[#5850EC]">
        <span>■</span>
        <span className="text-[#D0D0D0]">Features Job</span>
        <span>■</span>
      </div>

      {/* Main Heading */}
      <h2 className="text-3xl md:text-5xl font-semibold text-center max-w-2xl  mb-12">
        Everything you need <br /> to succeed
      </h2>

      {/* Features Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-7xl">
        {featuresData.map((item) => {
          const IconComponent = item.icon;

          return (
            <Card 
              key={item.id} 
              className="bg-[#010102] border border-neutral-800 rounded-xl hover:border-neutral-700 transition-all duration-300"
              radius="lg"
              shadow="none"
            >
              <Card.Content className="flex flex-row items-start gap-4 py-3 p-2 overflow-visible">
                
                {/* Icon Container */}
                <div className="flex items-center justify-center p-3 rounded-xl bg-linear-to-b from-[#010102] to-[#31313180] border border-neutral-800 text-gray-300 min-w-12 h-12 shrink-0">
                    {/* Icons */}
                  <IconComponent size={22} className="text-[#F7C2FF]" />
                </div>

                {/* Text Contents */}
                <div className="flex flex-col gap-1">
                  <h3 className="text-sm font-semibold text-white tracking-wide">
                    {item.title}
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>

              </Card.Content>
            </Card>
          );
        })}
      </div>
    </section>
  );
}

export default Featured






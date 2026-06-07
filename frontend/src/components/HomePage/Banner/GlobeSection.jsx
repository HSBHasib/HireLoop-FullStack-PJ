import React from "react";
import Image from "next/image";
import { FiBriefcase, FiGrid, FiUsers, FiStar } from "react-icons/fi";

const GlobeSection = () => {
  const statsData = [
    { id: 1, icon: FiBriefcase, value: "50K", label: "Active Jobs" },
    { id: 2, icon: FiGrid, value: "12K", label: "Companies" },
    { id: 3, icon: FiUsers, value: "2M", label: "Job Seekers" },
    { id: 4, icon: FiStar, value: "97%", label: "Satisfaction Rate" },
  ];
  return (
    <div className="relative w-full text-white pt-40 pb-24 px-4 overflow-hidden flex flex-col items-center justify-end h-full">
      {/* Globe Image Style */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[42%] w-[1200px] h-[700px] md:w-[1600px] md:h-[900px] pointer-events-none z-10 animate-pulse animation-duration-5000 ">
        <Image
          src="/images/globee.png"
          alt="Globe Background"
          fill
          priority
          className="object-contain object-top opacity-70"
        />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[85%] h-[60%] bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.25)_0%,transparent_70%)] blur-3xl" />
      </div>

      {/* Text Content in globe */}
      <div className="relative z-10 text-center max-w-2xl mb-16 px-4 md:mt-20">
        <h2 className="text-xl md:text-3xl tracking-tight leading-relaxed text-[#B9B9C8]">
          Assisting over{" "}
          <span className="font-medium text-white">15,000 job seekers</span>{" "}
          <br />
          find their dream positions.
        </h2>
      </div>

      {/* Cards */}
      <div className="relative z-10 max-w-6xl w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {statsData.map((stat) => {
          const IconComponent = stat.icon;
          return (
            <div
              key={stat.id}
              className="bg-linear-to-br from-[#121214] via-[#0b0b0c] to-[#050505] backdrop-blur-md border border-white/5 rounded-2xl p-7 flex flex-col gap-8 shadow-2xl hover:border-white/10 transition-all duration-300"
            >
              {/* Icons */}
              <div>
                <IconComponent size={20} />
              </div>

              {/* Data */}
              <div className="flex flex-col gap-4">
                <span className="text-3xl md:text-4xl font-bold tracking-tight text-white">
                  {stat.value}
                </span>
                <span className="text-xs tracking-wide">
                  {stat.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GlobeSection;

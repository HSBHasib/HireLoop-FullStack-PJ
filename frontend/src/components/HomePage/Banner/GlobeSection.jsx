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
    <div className="relative w-full mt-16 text-white pt-56 pb-24 sm:pt-35 px-4 overflow-hidden flex flex-col items-center justify-end min-h-[700px]">
      {/* Globe Image Style */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[700px] md:w-[1500px] md:h-[850px] pointer-events-none z-0">
        <Image
          src="/images/globee.png"
          alt="Globe Background"
          fill
          priority
          className="object-contain object-top opacity-90"
        />
      </div>

      {/* Text Content in globe */}
      <div className="relative z-10 text-center max-w-2xl mb-16 md:mb-20 px-4 md:mt-20">
        <h2 className="max-[400px]:text-xl text-2xl md:text-3xl tracking-tight leading-7 md:leading-10 text-[#B9B9C8]">
          Assisting over{" "}
          <span className="font-medium text-white">15,000 job seekers</span>{" "}
          <br />
          find their dream positions.
        </h2>
      </div>

      {/* Cards */}
      <div className="relative z-10 max-w-6xl w-full grid grid-cols-2 lg:grid-cols-4 gap-5">
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
                <span className="text-xs tracking-wide">{stat.label}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GlobeSection;

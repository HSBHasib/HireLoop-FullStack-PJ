import React from "react";
import { FiSearch, FiMapPin } from "react-icons/fi";

const BannerTopDets = () => {
  const bannerTopData = [
    { id: 1, label: "Product Designer" },
    { id: 2, label: "AI Engineering" },
    { id: 3, label: "Dev-ops Engineer" },
  ];

  return (
    <div className="w-full h-auto flex flex-col items-center justify-start px-4">
      <div className="text-center max-w-4xl flex flex-col items-center mt-16">
        
        {/* Tag */}
        <div className="border border-white/5 bg-[#111115]/40 backdrop-blur-md px-5 py-1.5 rounded-full text-xs font-semibold tracking-wider space-x-2 shadow-inner text-[#868687] mb-3">
          <span className="text-orange-500 text-base animate-pulse">💼</span> 
          <span className="text-white text-xs mr-1.5 font-bold">50,000+</span>NEW JOBS THIS MONTH
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3 max-w-3xl leading-tight text-white">
          Find Your Dream Job Today
        </h1>

        {/* Sub Heading */}
        <p className="text-[#8A8A8B] text-sm md:text-base max-w-2xl mb-10 leading-relaxed font-normal">
          HireLoop connects top talent with world class companies. Browse
          thousands of curated opportunities and land your next role — faster.
        </p>

        {/* SearchBar */}
        <div className="w-full max-w-3xl bg-[#111115]/80 border border-white/5 p-2 rounded-2xl flex flex-col sm:flex-row items-center gap-2 shadow-2xl backdrop-blur-md mb-6">
          <div className="w-full flex items-center gap-3 px-3 py-2 border-b sm:border-b-0 sm:border-r border-white/5">
            <FiSearch className="text-[#CCCCCD] text-lg flex-shrink-0" />
            <input
              type="text"
              placeholder="Job title, skill or company"
              className="w-full bg-transparent border-none outline-none text-sm placeholder-gray-600 text-white"
            />
          </div>

          <div className="w-full flex items-center gap-3 px-3 py-2">
            <FiMapPin className="text-[#CCCCCD] text-lg flex-shrink-0" />
            <input
              type="text"
              placeholder="Location or Remote"
              className="w-full bg-transparent border-none outline-none text-sm placeholder-gray-600 text-white"
            />
          </div>

          <button className="w-full sm:w-auto bg-[#5850EC] hover:bg-[#4d45d0] text-white p-3.5 px-5 rounded-xl transition-all flex items-center justify-center active:scale-95 cursor-pointer">
            <FiSearch className="text-lg" />
          </button>
        </div>

        {/* Trending Position */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-[#8A8A8B]">
          <span className="mr-2">Trending Position:</span>
          {bannerTopData.map((item) => (
            <button
              key={item.id}
              className="px-4 py-1.5 rounded-full bg-white/5 border border-white/5 text-gray-300 hover:bg-white/10 transition-colors"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BannerTopDets;




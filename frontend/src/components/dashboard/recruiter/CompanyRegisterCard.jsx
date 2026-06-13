import React from "react";
import { FiBriefcase, FiPlus } from "react-icons/fi";

const CompanyRegisterCard = ({openFormModal}) => {
  return (
    <>
      <div className="max-w-[90%] lg:max-w-[80%] w-full p-8 bg-[#0A0A0A] border border-zinc-800 rounded-2xl shadow-2xl flex flex-col items-center justify-center text-center">
        <div className="p-3 bg-zinc-800/30 rounded-full mb-6 border border-zinc-800">
          <FiBriefcase size={30} className="text-white/60 animate-pulse" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight mb-2 text-white/90">
          No Company Registered
        </h1>
        <p className="text-white/75 text-sm max-w-105 mb-8 leading-relaxed">
          To start recruiting on{" "}
          <span className="text-white font-medium">hireLoop</span>, you need to
          register your company configuration first.
        </p>
        <button
          onClick={() => openFormModal("add")}
          className="flex items-center gap-2 bg-white text-black font-semibold text-sm tracking-wide rounded-xl px-6 py-3 hover:bg-zinc-200 transition-all cursor-pointer"
        >
          Register Company <FiPlus size={16} />
        </button>
      </div>
    </>
  );
};

export default CompanyRegisterCard;

import Image from "next/image";
import Link from "next/link";
import React from "react";

// React Icons
import {
  FiGlobe,
  FiEdit3,
  FiBriefcase,
  FiMapPin,
  FiUsers,
} from "react-icons/fi";

const CompanyProfile = ({ getStatusBadge, openFormModal, company }) => {
  {
    /* Compnay Industry, Location, Emplyess Details In array of object */
  }
  const companyInfo = [
    { id: "industry", icon: FiBriefcase, label: "Industry" },
    { id: "location", icon: FiMapPin, label: "Location" },
    { id: "employeeCount", icon: FiUsers, label: "Employees" },
  ];

  return (
    <>
      <div className="max-w-200 w-full p-5 bg-[#0A0A0A] border border-zinc-800 rounded-2xl shadow-xl space-y-6">
        {/* Company Logo, Name and Edit Option */}
        <div className="flex flex-wrap gap-4 justify-between items-start border-b border-zinc-800 pb-6">
          <div className="flex gap-5 items-center">
            {company.logoUrl ? (
              <Image
                src={company.logoUrl}
                alt="Company Logo"
                width="200"
                height="200"
                className="w-20 h-20 border-2 border-zinc-800 rounded-xl bg-zinc-900 object-cover"
              />
            ) : (
              <div className="w-20 h-20 border-2 border-zinc-800 rounded-xl bg-zinc-900 flex items-center justify-center text-zinc-600">
                <FiBriefcase size={32} />
              </div>
            )}
            <div className="space-y-1.5">
              <div className="flex items-center gap-3 flex-wrap">
                <h2 className="text-2xl font-bold tracking-tight text-white">
                  {company.name}
                </h2>
                {getStatusBadge(company.status)}
              </div>
              {company.website && (
                <a
                  href={company.website}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#7D7F80] text-sm hover:text-white flex items-center gap-1.5 transition-colors"
                >
                  <FiGlobe size={14} />
                  {company.website.replace(/^https?:\/\//, "")}
                </a>
              )}
            </div>
          </div>
          <button
            onClick={() => openFormModal("edit", company)}
            className="flex items-center gap-1.5 border border-zinc-800 text-[#7D7F80] hover:text-white/85 hover:bg-zinc-800/50 px-4 py-2 rounded-xl text-sm font-medium transition-colors cursor-pointer"
          >
            <FiEdit3 size={14} /> Edit Profile
          </button>
        </div>

        {/* Company Dets display in Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
          {/* Compnay Industry, Location, Emplyess Details */}
          {companyInfo.map(({ id, icon: Icon, label }) => (
            <div
              key={id}
              className="bg-zinc-900/40 border border-zinc-800 p-4 rounded-xl flex items-center gap-3.5"
            >
              <div className="p-2.5 bg-zinc-800/50 rounded-lg text-[#7D7F80]">
                <Icon size={20} />
              </div>
              <div>
                <p className="text-xs text-[#7D7F80] font-medium">{label}</p>
                <p className="text-sm font-semibold text-zinc-200">
                  {id === "employeeCount"
                    ? company[id] || "Not Specified"
                    : company[id]}
                </p>
              </div>
            </div>
          ))}

          <div className="md:col-span-3 space-y-2 mt-2">
            <p className="text-sm font-medium text-[#7D7F80]">
              Brief Description
            </p>
            <div className="bg-zinc-900/40 border border-zinc-800 p-5 rounded-xl text-zinc-300 text-sm leading-relaxed whitespace-pre-wrap">
              {company.description || "No description provided."}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompanyProfile;

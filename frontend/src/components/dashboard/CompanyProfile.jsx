import React from "react";

const CompanyProfile = (getStatusBadge, openFormModal) => {
  return (
    <>
      <div className="max-w-200 w-full p-5 bg-[#0A0A0A] border border-zinc-800 rounded-2xl shadow-xl space-y-6">
        <div className="flex justify-between items-start border-b border-zinc-800 pb-6">
          <div className="flex gap-5 items-center">
            {company.logoUrl ? (
              <img
                src={company.logoUrl}
                alt="Company Logo"
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
                  href={formatWebsiteUrl(company.website)}
                  target="_blank"
                  rel="noreferrer"
                  className="text-zinc-400 text-sm hover:text-white flex items-center gap-1.5 transition-colors"
                >
                  <FiGlobe size={14} /> {company.website}
                </a>
              )}
            </div>
          </div>
          <button
            onClick={() => openFormModal("edit", company)}
            className="flex items-center gap-1.5 border border-zinc-800 text-zinc-300 hover:bg-zinc-800/50 px-4 py-2 rounded-xl text-sm font-medium transition-colors cursor-pointer"
          >
            <FiEdit3 size={14} /> Edit Profile
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          <div className="bg-zinc-900/40 border border-zinc-800 p-4 rounded-xl flex items-center gap-3.5">
            <div className="p-2.5 bg-zinc-800/50 rounded-lg text-zinc-400">
              <FiBriefcase size={20} />
            </div>
            <div>
              <p className="text-xs text-zinc-500 font-medium">Industry</p>
              <p className="text-sm font-semibold text-zinc-200">
                {company.industry}
              </p>
            </div>
          </div>

          <div className="bg-zinc-900/40 border border-zinc-800 p-4 rounded-xl flex items-center gap-3.5">
            <div className="p-2.5 bg-zinc-800/50 rounded-lg text-zinc-400">
              <FiMapPin size={20} />
            </div>
            <div>
              <p className="text-xs text-zinc-500 font-medium">Location</p>
              <p className="text-sm font-semibold text-zinc-200">
                {company.location}
              </p>
            </div>
          </div>

          <div className="bg-zinc-900/40 border border-zinc-800 p-4 rounded-xl flex items-center gap-3.5">
            <div className="p-2.5 bg-zinc-800/50 rounded-lg text-zinc-400">
              <FiUsers size={20} />
            </div>
            <div>
              <p className="text-xs text-zinc-500 font-medium">Employees</p>
              <p className="text-sm font-semibold text-zinc-200">
                {company.employeeCount || "Not Specified"}
              </p>
            </div>
          </div>

          <div className="md:col-span-3 space-y-2 mt-2">
            <p className="text-sm font-medium text-zinc-400">
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

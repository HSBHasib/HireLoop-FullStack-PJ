import { getJobById } from "@/lib/api/jobs";
import { getUserSession } from "@/lib/core/session";
import { redirect } from "next/navigation";
import React from "react";
import JobApplyForm from "./job-apply-form/page";
import { HiBuildingOffice2, HiMapPin, HiBriefcase } from "react-icons/hi2";
import { FaBackspace } from "react-icons/fa";
import RouterBack from "@/components/reusebaleComponents/Router";

const JobApplicationPage = async ({ params }) => {
  const { id } = await params;

  // Get User Data
  const user = await getUserSession();

  if (!user) {
    redirect(`/auth/signin?redirect=/jobs/${id}/apply`);
  }

  const role = user?.role || "userRole";
  if (role !== "job seeker") {
    return (
      <div className="bg-[#050505] text-white min-h-[70vh] flex items-center justify-center p-4">
        <div className="border border-neutral-900 bg-[#0a0a0a] p-8 rounded-2xl max-w-md text-center shadow-xl">
          <p className="text-base text-red-400 font-semibold mb-1">
            Access Denied
          </p>
          <p className="text-sm text-neutral-400">
            Only users with the "job seeker" role can apply for positions.
          </p>
        </div>
      </div>
    );
  }

  const job = await getJobById(id);

  if (!job) {
    return (
      <div className="bg-[#050505] text-white min-h-screen flex items-center justify-center">
        <p className="text-sm text-neutral-500">
          Job post not found or inactive.
        </p>
      </div>
    );
  }

  return (
    <main className="text-neutral-200 min-h-screen py-12 md:pb-20 md: pt-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto flex flex-col gap-8">
        {/* Job Heading */}
        <div className="bg-[#1E1E20]/40 border border-neutral-900 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-xl relative">
        
          {/* Back Icon */}
          <RouterBack className="absolute right-0 top-0 p-2.5 transition-colors duration-200 cursor-pointer hover:bg-[#1E1E20] mt-2 mr-2 rounded-full">
            <FaBackspace size={23} />
          </RouterBack>

          <div className="flex items-center gap-4">
            {job.companyLogo && (
              <div className="w-12 h-12 bg-[#111111] border border-neutral-800 rounded-xl flex items-center justify-center p-2 shrink-0">
                <img
                  src={job.companyLogo}
                  alt={job.companyName}
                  className="w-full h-full object-contain"
                />
              </div>
            )}
            <div className="flex flex-col">
              <span className="text-[10px] font-mono font-bold tracking-widest text-indigo-400 uppercase">
                {job.category}
              </span>
              <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                {job.title}
              </h1>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-xs text-neutral-400">
                <span className="flex items-center gap-1">
                  <HiBuildingOffice2 className="text-neutral-500" />{" "}
                  {job.companyName}
                </span>
                <span className="text-neutral-700">•</span>
                <span className="flex items-center gap-1">
                  <HiMapPin className="text-neutral-500" /> {job.location}
                </span>
                <span className="text-neutral-700">•</span>
                <span className="flex items-center gap-1">
                  <HiBriefcase className="text-neutral-500" /> {job.type}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Application Form */}
        <JobApplyForm applicant={user} job={job} />
      </div>
    </main>
  );
};

export default JobApplicationPage;

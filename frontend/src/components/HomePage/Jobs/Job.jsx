import { getAllJobs } from "@/lib/api/jobs";
import React from "react";
import JobCard from "./JobCards";
import Link from "next/link";

const JobSection = async () => {
  const { jobs } = await getAllJobs();
  const getSixJobsData = jobs.slice(0, 6);

  return (
    <div className="bg-black text-white px-4 flex flex-col items-center justify-center">
      {/* Top Header Label */}
      <div className="flex items-center gap-2 mb-3 text-xs font-semibold tracking-widest uppercase text-[#5850EC]">
        <span>■</span>
        <span className="text-[#D0D0D0]">SMART JOB DISCOVERY</span>
        <span>■</span>
      </div>

      {/* Main Heading */}
      <h2 className="text-3xl md:text-[44px] leading-12 font-semibold text-center max-w-2xl  mb-12">
        The roles you'd never <br /> find by searching
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full max-w-7xl px-2">
        {getSixJobsData && getSixJobsData.map((job) => <JobCard key={job._id} job={job} />)}
      </div>

      <div className="mt-10">
        <Link href="browse-jobs" className="bg-white text-black font-semibold text-sm px-6 py-3 rounded-xl hover:bg-neutral-200 transition-colors shadow-lg">
          View all job open
        </Link>
      </div>
    </div>
  );
};

export default JobSection;

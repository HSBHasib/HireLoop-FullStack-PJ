import { getAllJobs } from "@/lib/api/jobs";
import React from "react";
import JobCard from "./JobCards";

const JobSection = async () => {
  const jobs = await getAllJobs();

  return (
    <section className="bg-black text-white py-20 px-4 min-h-screen flex flex-col items-center justify-center">
      <div className="flex items-center gap-2 mb-4 text-xs font-semibold tracking-widest uppercase text-blue-500">
        <span>▪</span>
        <span className="text-indigo-400 tracking-wider font-mono">
          Smart Job Discovery
        </span>
        <span>▪</span>
      </div>

      <h2 className="text-3xl md:text-5xl font-bold text-center max-w-2xl leading-tight mb-16">
        The roles you'd never <br /> find by searching
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full max-w-7xl px-2">
        {jobs && jobs.map((job) => <JobCard key={job._id} job={job} />)}
      </div>

      <div className="mt-16">
        <button className="bg-white text-black font-semibold text-sm px-6 py-3 rounded-xl hover:bg-neutral-200 transition-colors shadow-lg">
          View all job open
        </button>
      </div>
    </section>
  );
};

export default JobSection;

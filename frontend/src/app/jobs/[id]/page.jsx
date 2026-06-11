import { getJobById } from "@/lib/api/jobs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  HiBriefcase,
  HiMapPin,
  HiCurrencyDollar,
  HiCalendarDays,
  HiBuildingOffice2,
  HiArrowUpRight,
  HiCheckCircle,
} from "react-icons/hi2";

const JobDetailsPage = async ({ params }) => {
  const { id } = await params;
  const job = await getJobById(id);

  const sectionConfig = [
    {
      id: "description",
      title: "Job Description",
      value: job.description,
    },
    {
      id: "responsibilities",
      title: "Key Responsibilities",
      value: job.responsibilities,
    },
    {
      id: "requirements",
      title: "Requirements",
      value: job.requirements,
    },
    {
      id: "benefits",
      title: "Benefits",
      value: job.benefits,
    },
  ];

  if (!job) {
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center">
        <p className="text-neutral-400 text-sm border border-neutral-800 p-6 rounded-2xl bg-[#121212]">
          Job profile data template not found or active status disabled.
        </p>
      </div>
    );
  }

  // Currency Fomat
  const formatSalary = (amount, currencyCode) => {
    const value = parseFloat(amount?.toString().replace(/,/g, "")) || 0;
    const symbol =
      currencyCode?.toUpperCase() === "USD"
        ? "$"
        : currencyCode?.toUpperCase() === "EUR"
          ? "€"
          : "৳";
    return `${symbol}${value.toLocaleString()}`;
  };

  return (
    <div className="bg-black text-white min-h-screen pb-16 pt-10 px-4 md:px-8 lg:px-16 ">
      <div className="max-w-5xl mx-auto flex flex-col gap-5">
        <div className="w-full bg-[#121212] border border-neutral-900 rounded-[32px] p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-5 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-600/5 blur-[120px] rounded-full pointer-events-none transition-all duration-300 group-hover:bg-indigo-600/10" />

          <div className="flex items-start md:items-center gap-5">
            {/* Company logo */}
            <div className="w-16 h-16 md:w-20 md:h-20 bg-[#1c1a1e] border border-neutral-800 rounded-2xl overflow-hidden flex items-center justify-center p-2 shrink-0 shadow-md">
              {job.companyLogo ? (
                <Image
                  src={job.companyLogo}
                  alt={job.companyName || "Company Logo"}
                  width="200"
                  height="200"
                  className="w-full h-full object-contain filter brightness-95"
                />
              ) : (
                <HiBuildingOffice2 className="text-3xl text-neutral-600" />
              )}
            </div>

            {/* Title and Tags */}
            <div className="flex flex-col gap-1.5">
              <span className="text-[11px] font-bold tracking-wider text-indigo-400 uppercase">
                {job.category || "General Technology"}
              </span>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
                {job.title}
              </h1>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-1 text-xs text-neutral-400">
                <span className="flex items-center gap-1">
                  <HiBuildingOffice2 className="text-neutral-500 text-base" />
                  {job.companyName || "DocAppointment"}
                </span>
                <span className="text-neutral-700">•</span>
                <span className="flex items-center gap-1 capitalize">
                  <HiMapPin className="text-neutral-500 text-base" />
                  {job.location}
                </span>
              </div>
            </div>
          </div>

          {/* Apply Button */}
          <div className="shrink-0 pt-4 md:pt-0 border-t border-neutral-900 md:border-0 flex flex-col sm:flex-row items-stretch md:items-center gap-4">
            <Link href={`/jobs/${id}/apply`} className="h-12 px-8 rounded-xl border-none bg-linear-to-r from-indigo-600 to-indigo-700 hover:from-indigo-50 to-indigo-100 text-white hover:text-black font-semibold text-sm shadow-lg shadow-indigo-600/10 active:scale-[0.98] transition-all duration-300 ease-out flex items-center justify-center gap-2 cursor-pointer border border-transparent hover:border-white hover:font-semibold">
              <span>Apply Now</span>
              <HiArrowUpRight className="text-base transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">
          {/* Left Side */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            {sectionConfig.map((jobData, idx) => (
              <section
                key={idx}
                className="bg-[#121212] border border-neutral-900 rounded-[24px] p-6 flex flex-col shadow-xl"
              >
                <h3 className="text-lg font-bold text-white tracking-wide border-b border-neutral-900 pb-3 flex items-center gap-2">
                  <span className="w-1.5 h-4 bg-indigo-500 rounded-full" />
                  {jobData.title}
                </h3>
                <p className="text-sm xl:text-base text-white/60 font-light">
                  {jobData.value || "Job Description"}
                </p>
              </section>
            ))}
          </div>

          {/* Right Side: Job OverView */}
          <div className="flex flex-col gap-4 lg:sticky lg:top-6">
            <div className="bg-[#121212] border border-neutral-900 rounded-[24px] p-6 flex flex-col gap-5 shadow-xl relative overflow-hidden">
              <div>
                <h4 className="text-sm font-semibold tracking-widest text-white/60 uppercase pb-3 border-b border-neutral-800 ">
                  Job Overview Matrix
                </h4>
              </div>

              {/* Salary  */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#1c1a1e] border border-neutral-800 rounded-xl flex items-center justify-center text-xl text-[#A5B4FC]">
                  <HiCurrencyDollar />
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] text-neutral-500 uppercase tracking-wide">
                    Salary Range
                  </span>
                  <span className="text-sm font-semibold text-neutral-200">
                    {formatSalary(job.minSalary, job.currency)} -{" "}
                    {formatSalary(job.maxSalary, job.currency)}
                  </span>
                </div>
              </div>

              {/* Job Type */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#1c1a1e] border border-neutral-800 rounded-xl flex items-center justify-center text-xl text-[#A5B4FC]">
                  <HiBriefcase />
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] text-neutral-500 uppercase tracking-wide">
                    Job Schedule
                  </span>
                  <span className="text-sm font-semibold text-neutral-200 capitalize">
                    {job.type || "Full-time"}
                  </span>
                </div>
              </div>

              {/* Application DeadLine */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#1c1a1e] border border-neutral-800 rounded-xl flex items-center justify-center text-xl text-[#A5B4FC]">
                  <HiCalendarDays />
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] text-neutral-500 uppercase tracking-wide">
                    Application Deadline
                  </span>
                  <span className="text-sm font-semibold text-red-400/90 ">
                    {job.deadline
                      ? new Date(job.deadline).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "2026-07-02"}
                  </span>
                </div>
              </div>

              {/* Status */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#1c1a1e] border border-neutral-800 rounded-xl flex items-center justify-center text-xl text-[#A5B4FC]">
                  <HiCheckCircle className="text-emerald-500" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] text-neutral-500 uppercase tracking-wide">
                    Status Indicator
                  </span>
                  <span className="text-xs font-semibold tracking-widest text-emerald-400 uppercase bg-emerald-950/40 border border-emerald-900/50 px-2.5 py-0.5 rounded-md w-fit mt-0.5">
                    {job.status || "Active"}
                  </span>
                </div>
              </div>
            </div>

            {/* Company Quick Info Card*/}
            <div className="bg-[#121212] border border-neutral-900 rounded-[24px] p-5 text-center flex flex-col items-center gap-3 shadow-md">
              <p className="text-xs text-neutral-500">
                Posted by platform verfied entity
              </p>
              <h5 className="text-sm font-bold text-neutral-300">
                {job.companyName || "DocAppointment"}
              </h5>
              <span className="text-[11px] text-neutral-600">
                ID: {job.companyId}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsPage;

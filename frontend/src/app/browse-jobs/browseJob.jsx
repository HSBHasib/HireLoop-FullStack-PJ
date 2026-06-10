"use client";

import React, { useState } from "react";
import { Select, Label, Description, ListBox } from "@heroui/react";
import { HiMagnifyingGlass, HiBriefcase, HiMapPin, HiCurrencyDollar, HiOutlineFunnel, HiChevronDown } from "react-icons/hi2";
import JobCard from "@/components/homePage/Jobs/JobCards";

const BrowseJob = ({ initialJobs = [] }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedSalary, setSelectedSalary] = useState("");

  const bdKeywords = ["dhaka", "chattogram", "sylhet", "rajshahi", "khulna", "gazipur", "tongi", "barishal", "rangpur", "mymensingh", "bangladesh"];

  const jobsList = Array.isArray(initialJobs) ? initialJobs : [];

  const filteredJobs = jobsList.filter((job) => {
    // Search Filter login
    const matchesSearch =
      !searchQuery ||
      job.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.companyName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description?.toLowerCase().includes(searchQuery.toLowerCase());

    // Location Filter login
    let matchesLocation = true;
    if (selectedLocation) {
      const dbLocationLower = job.location?.toLowerCase().trim() || "";
      const isBdJob = bdKeywords.some(keyword => dbLocationLower.includes(keyword));

      if (selectedLocation === "international") {
        matchesLocation = !isBdJob;
      } else {
        matchesLocation = dbLocationLower.includes(selectedLocation.toLowerCase().trim());
      }
    }

    // Job Tpe Filter login
    let matchesType = true;
    if (selectedType) {
      const cleanSelectedType = selectedType.toLowerCase().trim();
      const cleanDbType = job.type?.toLowerCase().trim() || "";
      matchesType = cleanDbType.includes(cleanSelectedType) || cleanSelectedType.includes(cleanSelectedType);
    }

    // Salary Filter login
    let matchesSalary = true;
    if (selectedSalary) {
      const rawSalaryValue = parseFloat(job.minSalary?.toString().replace(/,/g, "").trim()) || 0;
      const currency = job.currency?.toUpperCase().trim() || "BDT";
      
      let salaryInBDT = rawSalaryValue;
      if (currency === "USD") {
        salaryInBDT = rawSalaryValue * 118; 
      } else if (currency === "EUR") {
        salaryInBDT = rawSalaryValue * 126; 
      }

      if (selectedSalary === "under-30k") matchesSalary = salaryInBDT < 30000;
      else if (selectedSalary === "30k-50k") matchesSalary = salaryInBDT >= 30000 && salaryInBDT <= 50000;
      else if (selectedSalary === "50k-80k") matchesSalary = salaryInBDT >= 50000 && salaryInBDT <= 80000;
      else if (selectedSalary === "80k-120k") matchesSalary = salaryInBDT >= 80000 && salaryInBDT <= 120000;
      else if (selectedSalary === "120k-180k") matchesSalary = salaryInBDT >= 120000 && salaryInBDT <= 180000;
      else if (selectedSalary === "above-180k") matchesSalary = salaryInBDT > 180000;
    }

    return matchesSearch && matchesLocation && matchesType && matchesSalary;
  });

  const handleReset = () => {
    setSearchQuery("");
    setSelectedLocation("");
    setSelectedType("");
    setSelectedSalary("");
  };

  return (
    <div className="bg-black text-white min-h-screen py-16 px-4 md:px-8 flex flex-col items-center">
      
      {/* Headers */}
      <div className="text-center max-w-3xl mb-12 flex flex-col items-center">
        <div className="flex items-center gap-2 mb-2 text-[11px] font-semibold tracking-widest uppercase text-[#A5B4FC]">
          <span>▪</span> Explore All Openings <span>▪</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          Find Your Next Career Move
        </h1>
        <p className="text-sm text-white/60 leading-relaxed">
          Browse through live opportunities instantly. Use the advanced multi-input filtering system below.
        </p>
      </div>

        {/* Search and Filter */}
      <div className="w-full max-w-6xl bg-[#121212] border border-neutral-900 rounded-[28px] p-6 mb-12 flex flex-col gap-5 shadow-2xl">
        
        {/* Search Input */}
        <div className="w-full flex items-center gap-3 bg-[#1c1a1e] px-4 rounded-2xl border border-neutral-800 focus-within:border-[#4F46E5] focus-within:ring-1 focus-within:ring-[#4F46E5] transition-all duration-200">
          <HiMagnifyingGlass className="text-xl text-neutral-500 shrink-0" />
          <input 
            type="text"
            placeholder="Search by job title, company name, or keywords..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent border-0 text-white placeholder:text-neutral-500 text-sm h-14 focus:outline-none"
          />
        </div>

        {/* Drop Down Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
          
          {/* Location */}
          <div className="flex flex-col gap-1.5 w-full">
            <Select 
              selectedKey={selectedLocation} 
              onSelectionChange={(key) => setSelectedLocation(String(key || ""))}
            >
              <Label className="text-xs text-neutral-400 font-medium">Location</Label>
              <Select.Trigger className="w-full bg-[#1c1a1e] border border-neutral-800 rounded-xl h-12 px-3 text-neutral-200 text-sm flex items-center justify-between hover:bg-neutral-800 focus:border-[#4F46E5] outline-none transition-colors">
                <div className="flex items-center gap-2">
                  <HiMapPin className="text-lg text-[#A5B4FC] shrink-0" />
                  <Select.Value placeholder="Select Location" />
                </div>
                <Select.Indicator><HiChevronDown className="text-neutral-500 text-xs" /></Select.Indicator>
              </Select.Trigger>
              <Select.Popover className="bg-[#121212] border border-neutral-800 text-white rounded-xl shadow-xl mt-1 z-50">
                <ListBox className="p-1 outline-none">
                  <ListBox.Item id="dhaka" className="p-2 text-sm rounded-lg hover:bg-neutral-800 cursor-pointer outline-none"><Label>Dhaka</Label></ListBox.Item>
                  <ListBox.Item id="chattogram" className="p-2 text-sm rounded-lg hover:bg-neutral-800 cursor-pointer outline-none"><Label>Chattogram</Label></ListBox.Item>
                  <ListBox.Item id="sylhet" className="p-2 text-sm rounded-lg hover:bg-neutral-800 cursor-pointer outline-none"><Label>Sylhet</Label></ListBox.Item>
                  <ListBox.Item id="gazipur" className="p-2 text-sm rounded-lg hover:bg-neutral-800 cursor-pointer outline-none"><Label>Gazipur</Label></ListBox.Item>
                  <ListBox.Item id="international" className="p-2 text-sm rounded-lg hover:bg-neutral-800 text-indigo-400 font-semibold cursor-pointer outline-none"><Label>Outside Bangladesh</Label></ListBox.Item>
                </ListBox>
              </Select.Popover>
            </Select>
          </div>

          {/* Job Type */}
          <div className="flex flex-col gap-1.5 w-full">
            <Select 
              selectedKey={selectedType} 
              onSelectionChange={(key) => setSelectedType(String(key || ""))}
            >
              <Label className="text-xs text-neutral-400 font-medium">Job Type</Label>
              <Select.Trigger className="w-full bg-[#1c1a1e] border border-neutral-800 rounded-xl h-12 px-3 text-neutral-200 text-sm flex items-center justify-between hover:bg-neutral-800 focus:border-[#4F46E5] outline-none transition-colors">
                <div className="flex items-center gap-2">
                  <HiBriefcase className="text-lg text-[#A5B4FC] shrink-0" />
                  <Select.Value placeholder="Job Type" />
                </div>
                <Select.Indicator><HiChevronDown className="text-neutral-500 text-xs" /></Select.Indicator>
              </Select.Trigger>
              <Select.Popover className="bg-[#121212] border border-neutral-800 text-white rounded-xl shadow-xl mt-1 z-50">
                <ListBox className="p-1 outline-none">
                  <ListBox.Item id="Full-time" className="p-2 text-sm rounded-lg hover:bg-neutral-800 cursor-pointer outline-none"><Label>Full-time</Label></ListBox.Item>
                  <ListBox.Item id="Part-time" className="p-2 text-sm rounded-lg hover:bg-neutral-800 cursor-pointer outline-none"><Label>Part-time</Label></ListBox.Item>
                  <ListBox.Item id="Contract" className="p-2 text-sm rounded-lg hover:bg-neutral-800 cursor-pointer outline-none"><Label>Contract</Label></ListBox.Item>
                  <ListBox.Item id="Internship" className="p-2 text-sm rounded-lg hover:bg-neutral-800 cursor-pointer outline-none"><Label>Internship</Label></ListBox.Item>
                </ListBox>
              </Select.Popover>
            </Select>
          </div>

          {/* Salary  */}
          <div className="flex flex-col gap-1.5 w-full">
            <Select 
              selectedKey={selectedSalary} 
              onSelectionChange={(key) => setSelectedSalary(String(key || ""))}
            >
              <Label className="text-xs text-neutral-400 font-medium">Salary</Label>
              <Select.Trigger className="w-full bg-[#1c1a1e] border border-neutral-800 rounded-xl h-12 px-3 text-neutral-200 text-sm flex items-center justify-between hover:bg-neutral-800 focus:border-[#4F46E5] outline-none transition-colors">
                <div className="flex items-center gap-2">
                  <HiCurrencyDollar className="text-lg text-[#A5B4FC] shrink-0" />
                  <Select.Value placeholder="Salary Range" />
                </div>
                <Select.Indicator><HiChevronDown className="text-neutral-500 text-xs" /></Select.Indicator>
              </Select.Trigger>
              <Select.Popover className="bg-[#121212] border border-neutral-800 text-white rounded-xl shadow-xl mt-1 z-50">
                <ListBox className="p-1 outline-none">
                  <ListBox.Item id="under-30k" className="p-2 text-sm rounded-lg hover:bg-neutral-800 cursor-pointer outline-none"><Label>Under ৳30k (or Equiv.)</Label></ListBox.Item>
                  <ListBox.Item id="30k-50k" className="p-2 text-sm rounded-lg hover:bg-neutral-800 cursor-pointer outline-none"><Label>৳30k - ৳50k</Label></ListBox.Item>
                  <ListBox.Item id="50k-80k" className="p-2 text-sm rounded-lg hover:bg-neutral-800 cursor-pointer outline-none"><Label>৳50k - ৳80k</Label></ListBox.Item>
                  <ListBox.Item id="80k-120k" className="p-2 text-sm rounded-lg hover:bg-neutral-800 cursor-pointer outline-none"><Label>৳80k - ৳120k</Label></ListBox.Item>
                  <ListBox.Item id="120k-180k" className="p-2 text-sm rounded-lg hover:bg-neutral-800 cursor-pointer outline-none"><Label>৳120k - ৳180k</Label></ListBox.Item>
                  <ListBox.Item id="above-180k" className="p-2 text-sm rounded-lg hover:bg-neutral-800 cursor-pointer outline-none"><Label>Above ৳180k+</Label></ListBox.Item>
                </ListBox>
              </Select.Popover>
            </Select>
          </div>

          {/* Filter Clear Button */}
          <button
            onClick={handleReset}
            className="w-full bg-[#1c1a1e] border border-neutral-800 hover:bg-neutral-800 text-neutral-300 hover:text-white font-medium rounded-xl h-12 flex items-center justify-center gap-2 text-sm transition-all shadow-md cursor-pointer mb-[1px]"
          >
            <HiOutlineFunnel className="text-base text-[#A5B4FC]" />
            <span>Clear Filters</span>
          </button>

        </div>

        {/* রেজাল্ট কাউন্টার */}
        <div className="text-xs text-neutral-500 pl-1">
          Showing {filteredJobs.length} available job results
        </div>
      </div>

      {/* If Jobs availble than show it other wise show else section code */}
      {filteredJobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl px-2">
          {filteredJobs.map((job) => (
            <JobCard key={job._id || job.id} job={job} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-neutral-800 w-full max-w-6xl rounded-[28px] bg-[#121212]">
          <p className="text-neutral-400 font-medium mb-1">No jobs match your specific criteria.</p>
          <p className="text-xs text-neutral-600">Try clearing the fields or searching for different tech keywords.</p>
        </div>
      )}
    </div>
  );
};

export default BrowseJob;
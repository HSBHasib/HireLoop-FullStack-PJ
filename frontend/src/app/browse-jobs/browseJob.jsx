"use client";

import React, { useEffect, useState } from "react";
import { Description } from "@heroui/react";
import { HiOutlineFunnel } from "react-icons/hi2";
import JobCard from "@/components/homePage/Jobs/JobCards";
import { useRouter } from "next/navigation";
import SearchFilter from "@/components/searchFilter/SearchFilter";

const BrowseJob = ({ filters, jobs = [] }) => {
  const [searchQuery, setSearchQuery] = useState(filters.search);
  const [selectedLocation, setSelectedLocation] = useState(
    filters.location || "all",
  );
  const [selectedType, setSelectedType] = useState(filters.type || "all");
  const [selectedCategory, setSelectedCategory] = useState(
    filters.category || "all",
  );

  const router = useRouter();

  useEffect(() => {
    const sp = new URLSearchParams();

    // Search
    if (searchQuery) {
      sp.set("search", searchQuery);
    }

    // Location
    if (selectedLocation !== "all") {
      sp.set("location", selectedLocation);
    }

    // Job Type
    if (selectedType !== "all") {
      sp.set("type", selectedType);
    }

    // Job Category
    if (selectedCategory !== "all") {
      sp.set("category", selectedCategory);
    }

    const path = `?${sp.toString()}`;
    router.push(path);
  }, [router, searchQuery, selectedLocation, selectedType, selectedCategory]);

  return (
    <div className="bg-black text-white min-h-screen pb-16 pt-10 px-4 md:px-8 flex flex-col items-center">
      {/* Headers */}
      <div className="text-center max-w-3xl mb-12 flex flex-col items-center">
        <div className="flex items-center gap-2 mb-2 text-[11px] font-semibold tracking-widest uppercase text-[#A5B4FC]">
          <span>▪</span> Explore All Openings <span>▪</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          Find Your Next Career Move
        </h1>
        <p className="text-sm text-white/60 leading-relaxed">
          Browse through live opportunities instantly. Use the advanced
          multi-input filtering system below.
        </p>
      </div>

      {/* Search and Filter */}
      <SearchFilter
        jobs={jobs}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {/* Total Jobs Length */}
      <div className="w-full max-w-6xl text-left">
        <div className="flex items-center gap-2 pl-3 my-6 text-sm font-medium text-white/80">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#5850EC] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#5850EC]"></span>
        </span>
        <span>Showing {jobs.length} available jobs</span>
      </div>
      </div>

      {/* If Jobs availble than show it other wise show else section code */}
      {jobs.length > 0 ? (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl px-2">
            {jobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-neutral-800 w-full max-w-6xl rounded-[28px] bg-[#121212]">
          <p className="text-neutral-400 font-medium mb-1">
            No jobs match your specific criteria.
          </p>
          <p className="text-xs text-neutral-600">
            Try clearing the fields or searching for different tech keywords.
          </p>
        </div>
      )}
    </div>
  );
};

export default BrowseJob;

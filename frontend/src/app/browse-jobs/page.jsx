import React from "react";
import { getAllJobs } from "@/lib/api/jobs";
import BrowseJob from "./browseJob";

const BrowseJobContainer = async ({searchParams}) => {
  const searchQuery = await searchParams;

  const querySearch = new URLSearchParams(searchQuery);
  const queryString = querySearch.toString();

  const {total, jobs} = await getAllJobs(queryString);

  return (
    <div className="w-full">
      <BrowseJob filters={searchQuery} jobs={jobs || []} total={total} />
    </div>
  );
};

export default BrowseJobContainer;



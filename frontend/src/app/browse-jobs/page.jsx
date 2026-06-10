import React from "react";
import { getAllJobs } from "@/lib/api/jobs";
import BrowseJob from "./browseJob";

const BrowseJobContainer = async () => {
  const jobs = await getAllJobs();

  return (
    <div className="w-full">
      <BrowseJob initialJobs={jobs || []} />
    </div>
  );
};

export default BrowseJobContainer;



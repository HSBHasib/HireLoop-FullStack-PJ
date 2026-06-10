import { getAllJobs } from "@/lib/api/jobs";
import React from "react";

const BrowseJob = async () => {
  const jobs = await getAllJobs();
  return (<div>
    This is browse jobs 
  </div>);
};

export default BrowseJob;

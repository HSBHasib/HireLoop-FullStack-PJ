import JobsTable from "@/components/dashboard/recruiter/JobsTable";
import { getLoggedInRecruiterCompany } from "@/lib/api/companies";
import { getCompanyJobs } from "@/lib/api/jobs";
import React from "react";

const RecruiterJobs = async () => {
  const company = await getLoggedInRecruiterCompany();
  const companyId = company._id;
  
  const getCompanyWiseJobDets = (await getCompanyJobs(companyId)) || [];
  
  return (
    <div className="p-5">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-2xl font-bold">All Jobs</h2>
      </div>

      {/* Get Job Data form of Table */}
      <JobsTable jobs={getCompanyWiseJobDets} />
    </div>
  );
};

export default RecruiterJobs;

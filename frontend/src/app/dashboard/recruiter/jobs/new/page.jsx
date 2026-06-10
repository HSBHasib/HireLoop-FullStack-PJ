import React from "react";
import NewJobs from "./newJob";
import { getLoggedInRecruiterCompany } from "@/lib/api/companies";

const NewJobContainer = async () => {
  // const companyId = company?.recruiterId;
  // console.log('company data from job contaner - ', company)
  
  const company = await getLoggedInRecruiterCompany();
  const companyId = company._id;
  
  
  return (
    <div>
      <NewJobs companyId={companyId} />
    </div>
  );
};

export default NewJobContainer;

import React from "react";
import NewJobs from "./newJob";
import { getLoggedInRecruiterCompany } from "@/lib/api/companies";

const NewJobContainer = async () => {
  // const companyId = company?.recruiterId;
  // console.log('company data from job contaner - ', company)

  const company = await getLoggedInRecruiterCompany();

  return (
    <div>
      <NewJobs company={company} />
    </div>
  );
};

export default NewJobContainer;

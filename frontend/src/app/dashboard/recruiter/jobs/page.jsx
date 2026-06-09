import JobsTable from '@/components/dashboard/JobsTable';
import { getCompanyJobs } from '@/lib/api/jobs'
import React from 'react'

const RecruiterJobs = async () => {
  const companyId = "Saboo_19"
  const getCompanyWiseJobDets = await getCompanyJobs(companyId) || [];
  
  console.log('Company all jobs data - ', getCompanyWiseJobDets);

  return (
    <div className="p-5">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-2xl font-bold">All Jobs</h2>
      </div>

      {/* Get Job Data form of Table */}
      <JobsTable jobs={getCompanyWiseJobDets} />
    </div>
  )
}

export default RecruiterJobs

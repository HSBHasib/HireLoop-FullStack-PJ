import React from 'react'
import SeekerApplicationsTable from '@/components/dashboard/seeker/SeekerApplicationsTable';
import { getJobApplicationDataByApplicantId } from '@/lib/api/jobApplication';
import { getUserSession } from '@/lib/core/session'

const SeekerApplicationsPage = async () => {
    const user = await getUserSession();
    const applications = await getJobApplicationDataByApplicantId(user?.id);

  return (
    <div className='p-5'>
      <SeekerApplicationsTable initialApplications={applications} />
    </div>
  )
}

export default SeekerApplicationsPage

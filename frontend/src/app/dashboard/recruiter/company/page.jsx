import React from 'react'
import { getUserSession } from '@/lib/core/session'
import CompanyProfileDets from './companyProfileDets';
import { getRecruiterCompany } from '@/lib/api/companies';

const CompanyProfileContainer = async () => {
  const user = await getUserSession();
  const recruiterCompany = await getRecruiterCompany(user.id) || [];

  return (
    <div>
      <CompanyProfileDets recruiterCompany={recruiterCompany} recruiter={user} />
    </div>
  )
}

export default CompanyProfileContainer

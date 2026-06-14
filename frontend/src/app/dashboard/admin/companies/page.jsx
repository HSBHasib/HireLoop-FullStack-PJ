import CompaniesTable from '@/components/dashboard/admin/CompaniesTable';
import { getCompanies } from '@/lib/api/companies'
import React from 'react'

const AdminCompaniesPageContainer = async () => {
    const companies = await getCompanies() || [];
    
    return (
      <div className="w-full p-6 bg-[#060607] min-h-screen text-white">
        <div className="mb-6">
          <h1 className="text-xl font-bold tracking-wide text-zinc-100">Manage Companies</h1>
          <p className="text-xs text-zinc-500 mt-1">Review, approve, or reject company profiles across the platform.</p>
        </div>

        {/* Companies Data in Table */}
        <CompaniesTable companies={companies} />
      </div>
    )
}

export default AdminCompaniesPageContainer
import UserTable from '@/components/dashboard/admin/UserTable';
import { getUserData } from '@/lib/api/users'
import React from 'react'

const AllUsersData = async () => {
    const data = await getUserData();
    const users = data?.users || [];
    const totalUser = data?.total || users.length;

    return (
        <div className="p-6 bg-[#0b0b0c] min-h-screen text-zinc-100">
            <div className="mb-6 flex flex-col gap-1">
                <h1 className="text-xl font-bold tracking-tight">Admin Users Dashboard</h1>
                <p className="text-xs text-zinc-500">Manage all system users, roles, and account statuses.</p>
            </div>
            
            <UserTable users={users} />
        </div>
    )
}

export default AllUsersData


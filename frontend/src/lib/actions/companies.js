"use server"

import { revalidatePath } from "next/cache";
import { serverMutation } from "../core/server";

// Pass Company Data in Backend
export const createCompanyFunc = async (companyData) => {
    return serverMutation(`/api/companies`, companyData); 
}

// Pass Updated Company Data in Backend
export const UpdateCompany = async (id, data) => {
    const result = serverMutation(`/api/company/${id}`, data, "PATCH");
    
    revalidatePath("/dashboard/admin/companies");
    return result;
}

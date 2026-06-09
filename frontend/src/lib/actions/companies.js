"use server"

import { serverMutation } from "../core/server";

// Pass Company Data in Backend
export const createCompanyFunc = async (companyData) => {
    return serverMutation(`/api/companies`, companyData); 
}


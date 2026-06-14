import { protectedFetch, serverFetch } from "../core/server";

// Get All Jobs Data
export const getAllJobs = async () => {
  return serverFetch("/api/jobs");
};

// Get Indivisual Jobs Data By Thier ID
export const getJobById = async (id) => {
  return serverFetch(`/api/jobs/${id}`);
};

// Get Job Data based on Company
export const getCompanyJobs = async (companyId) => {
  return protectedFetch(`/api/my-company-jobs?companyId=${companyId}`);
};


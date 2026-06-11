import { serverFetch } from "../core/server";

// Pass Job Application Data in Backend
export const getJobApplicationData = async (applicantId) => {
    return serverFetch(`/api/job-applications?applicantId=${applicantId}`); 
}
import { serverFetch } from "../core/server";

// Get Job Application Data From MongoDB based on applicantId
export const getJobApplicationDataByApplicantId = async (applicantId) => {
    return serverFetch(`/api/job-applications?applicantId=${applicantId}`); 
}


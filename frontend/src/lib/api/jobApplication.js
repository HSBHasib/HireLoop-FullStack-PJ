import { protectedFetch } from "../core/server";

// Get Job Application Data From MongoDB based on applicantId
export const getJobApplicationDataByApplicantId = async (applicantId) => {
    return protectedFetch(`/api/job-applications?applicantId=${applicantId}`); 
}


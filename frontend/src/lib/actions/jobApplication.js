"use server"

import { serverMutation } from "../core/server";

// Pass Job Application Data in Backend
export const createJobApplicationFunc = async (jobApplicationData) => {
    return serverMutation(`/api/job-applications`, jobApplicationData); 
}


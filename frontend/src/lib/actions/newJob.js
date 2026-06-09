'use server'

"use server"

import { serverMutation } from "../core/server";

// Pass New Jobs Data in Backend
export const newJobsFunc = async (newJobData) => {
    return serverMutation(`/api/jobs`, newJobData); 
}


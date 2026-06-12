import { serverFetch } from "../core/server";

// Get Job Seeker Plans Data From MongoDB based on PlanId
export const getSeekerPlansById = async (plan_id) => {
    return serverFetch(`/api/seeker-plans?plan_id=${plan_id}`); 
}


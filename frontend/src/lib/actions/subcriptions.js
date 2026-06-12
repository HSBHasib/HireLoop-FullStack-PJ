'use server'

import { serverMutation } from "../core/server";

// Pass Subcription Data in Backend
export const createSubcription = async (subcriptionData) => {
    return serverMutation(`/api/subcriptions`, subcriptionData); 
}

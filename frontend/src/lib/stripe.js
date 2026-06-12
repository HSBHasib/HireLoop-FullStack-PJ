import 'server-only'

import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)


export const PLAN_PRICE_ID = {
    'seeker_pro' : process.env.JOB_SEEKER_PRO_PLAN_PRICE_ID,
    'seeker_premium' : process.env.JOB_SEEKER_PREMIUM_PLAN_PRICE_ID,
    'recruiter_growth' : process.env.RECRUITER_GROWTH_PLAN_PRICE_ID,
    'recruiter_enterprise' : process.env.RECRUITER_ENTERPRISE_PLAN_PRICE_ID
} 

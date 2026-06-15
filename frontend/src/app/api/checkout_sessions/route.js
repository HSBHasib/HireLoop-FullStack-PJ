import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "../../../lib/stripe";
import { PLAN_PRICE_ID } from "@/lib/stripe";
import { getUserSession } from "@/lib/core/session";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const planId = formData.get("plan_id");
    const priceId = PLAN_PRICE_ID[planId];

    // User Infos
    const user = await getUserSession();
    const customerEmail = user?.email;

    const headersList = await headers();
    const origin = headersList.get("origin");

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "subscription",
      metadata: {planId, customerEmail},
      success_url: `${origin}/plans/success?session_id={CHECKOUT_SESSION_ID}`,
    });
    return NextResponse.redirect(session.url, 303);
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 },
    );
  }
}

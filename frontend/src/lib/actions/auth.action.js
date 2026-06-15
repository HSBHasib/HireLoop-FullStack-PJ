"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/auth";

export async function signUpWithRole({ name, email, password, image, role, plan }) {
  const result = await auth.api.signUpEmail({
    body: { name, email, password, image, plan },
  });

  if (!result?.user?.id) {
    throw new Error("Signup failed");
  }

  await db.collection("user").updateOne(
    { id: result.user.id },
    { $set: { role } }
  );

  return result;
}

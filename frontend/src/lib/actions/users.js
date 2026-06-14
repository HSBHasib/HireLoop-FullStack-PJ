"use server";

import { revalidatePath } from "next/cache";

const { headers } = require("next/headers");
const { auth } = require("../auth");

export const updateUserRole = async (userId, role) => {
  const data = await auth.api.setRole({
    body: {
      userId,
      role,
    },
    headers: await headers(),
  });

  revalidatePath('/dashboard/admin/users')
  return data;
};



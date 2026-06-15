"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { auth } from "../auth";

// Status
export const updateUserStatus = async (userId, bannedValue) => {
  try {
    const data = await auth.api.adminUpdateUser({
      body: {
        userId: userId, 
        data: { 
          banned: bannedValue 
        }, 
      },
      headers: await headers(),
    });

    revalidatePath('/dashboard/admin/users');
    return { modifiedCount: data ? 1 : 0 };
    
  } catch (error) {
    console.error("Status update failed:", error);
    return { modifiedCount: 0 };
  }
};


// Role
export const updateUserRole = async (userId, roleValue) => {
  try {
    const data = await auth.api.setRole({
      body: {
        userId: userId,
        role: roleValue, 
      },
      headers: await headers(),
    });

    revalidatePath('/dashboard/admin/users');
    return { modifiedCount: data ? 1 : 0 };

  } catch (error) {
    console.error("Role update failed:", error);
    return { modifiedCount: 0 };
  }
};


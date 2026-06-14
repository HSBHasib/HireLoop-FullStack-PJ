import { redirect } from "next/navigation";
import { getUserToken } from "./session";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// Auth Header
export const authHeader = async () => {
  const token = await getUserToken();
  const header = token ? {
        authorization: `Bearer ${token}`,
    } : {};

  return header;
};

// Server Fetch
export const serverFetch = async (path) => {
  const res = await fetch(`${baseUrl}${path}`);
  
  return handleStatusCode(res)
};

// Protected Fetch Data From DB
export const protectedFetch = async (path) => {
  const res = await fetch(`${baseUrl}${path}`, 
        {
            headers: await authHeader(),
        }
    );

  return handleStatusCode(res);
};

// Server Mutation
export const serverMutation = async (path, data, method = "POST") => {
  const res = await fetch(`${baseUrl}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(await authHeader()),
    },
    body: JSON.stringify(data),
  });

  return handleStatusCode(res);
};

const handleStatusCode = (res) => {
  if (res.status === 401) {
    redirect("/unauthorized");
  } else if (res.status === 403) {
    redirect("/unauthorized");
    // redirect('/forbidden');
  }

  return res.json();
};

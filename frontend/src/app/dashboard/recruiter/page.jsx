import StatCards from "@/components/dashboard/StatCards";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import React from "react";

const RecruiterDashboard = async () => {
  const { data: session } = await auth.api.getSession({
    headers: await headers(),
  });
 const recruiterName = session?.name || "Recruiter Name"; 

  console.log("session data - ", session);
  console.log("Name is  - ", recruiterName);
  return (
    <div className="p-4 mt-1">
      <div className="mb-8 mt-12 lg:mt-0">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-100">
          Welcome back, {recruiterName}
        </h1>
      </div>
      <StatCards />
    </div>
  );
};

export default RecruiterDashboard;

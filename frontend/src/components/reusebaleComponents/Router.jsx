"use client";

import React from "react";
import { useRouter } from "next/navigation";

const RouterBack = ({ children, className = "" }) => {
  const router = useRouter();

  return (
    <div onClick={() => router.back()} className={className}>
      {children}
    </div>
  );
};

export default RouterBack;


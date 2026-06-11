"use client";

import React, { useState } from "react";
// Pure React Icons pack integration
import {
  LuLayoutDashboard,
  LuBuilding2,
  LuBriefcase,
  LuFileSpreadsheet,
  LuSettings,
} from "react-icons/lu";
import { Avatar, Button, Drawer, Spinner } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { FaRegBell } from "react-icons/fa";

import { PiMagnifyingGlassDuotone } from "react-icons/pi";

import { LayoutSideContentLeft } from "@gravity-ui/icons";
import { usePathname } from "next/navigation";

export default function DashboardSideBar() {
  // const [activeTab, setActiveTab] = useState("Dashboard");
  const [activeTab, setActiveTab] = useState( "/dashboard/recruiter");

  const pathName = usePathname();
  console.log('pathName - ', pathName)

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  // Recruiter Dashboard core navigation items list
  const navItems = [
    { icon: LuLayoutDashboard, href: "/dashboard/recruiter", label: "Dashboard" },
    { icon: PiMagnifyingGlassDuotone, href: "/dashboard/recruiter/jobs", label: "Manage Jobs" },
    { icon: FaRegBell, href: "/dashboard/recruiter/jobs/new", label: "Create A Jobs" },
    { icon: LuBuilding2, href: "/dashboard/recruiter/company", label: "Company Profile" },
    { icon: LuFileSpreadsheet, href: "/", label: "Applications" },
    { icon: LuSettings, href: "/", label: "Settings" },
  ];

  const sideBarContent = (
    <>
      <div className="flex flex-col h-full bg-[#0A0A0A] p-0.5 lg:p-5 w-full ">
        {/* 1. Company Logo Area */}
        {/* <div className="hidden lg:block mb-6 px-2 items-center gap-2">
          <Link
            href="/"
            className="flex items-center transition-opacity hover:opacity-90"
          >
            <Image
              src="/images/logo.png"
              alt="hireLoop Logo"
              width={500}
              height={500}
              priority
              className="object-contain h-auto w-25"
            />
          </Link>
        </div> */}

        {/* 2. Profile Details Component Box */}
        {isPending ? (
          <div className=" flex items-center justify-center pb-4">
            <Spinner
              color="purple"
              label="Fetching session streams..."
              size="lg"
            />
          </div>
        ) : (
          <>
            {/* 2. Profile Details Component Box */}
            <div className="mb-7 px-2 flex flex-col items-start gap-3 border-b border-zinc-900 pb-6">
              <div className="flex items-center gap-3">
                {/* Image */}
                <Avatar>
                  <Avatar.Image src={user?.image} alt={user?.name} className="object-cover" />
                  <Avatar.Fallback>{user?.name.charAt[0]}</Avatar.Fallback>
                </Avatar>

                {/* Name */}
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-zinc-100 tracking-wide">
                    {user?.name || "Recruiter Name"}
                  </span>

                  {/* Role */}
                  <span className="text-[11px] text-[#7D7F80] font-medium capitalize">
                    {user?.role || "Recruiter"}
                  </span>
                </div>
              </div>
            </div>
          </>
        )}

        {/* 3. Navigation Buttons Loop */}
        <nav className="flex flex-col gap-1.5 flex-1">
          {navItems.map((item) => {
            return (
              <Link
              key={item.label}
              href={item.href}
                onClick={() => {
                  setActiveTab(item.herf);
                }}
                className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 group relative ${
                  pathName === item.href
                    ? "bg-zinc-900 text-white border-r-2 border-white"
                    : "text-[#7D7F80] hover:bg-zinc-900/40 hover:text-zinc-200"
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon
                    className={`size-4.5 transition-colors ${
                      pathName === item.href
                      ? "text-[#5850EC]"
                        : "text-zinc-500 group-hover:text-zinc-400"
                    }`}
                  />
                  <span>{item.label}</span>
                </div>
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );

  return (
    <>
      {/* --- DESKTOP VIEW --- */}
      <aside className="hidden lg:flex w-64 h-min-screen border-r border-t border-zinc-900 bg-[#0A0A0A] shrink-0 z-10">
        {sideBarContent}
      </aside>

      {/* --- MOBILE VIEW --- */}
      <div className="lg:hidden fixed top-15 left-4 z-50">
        <Drawer>
          <Button
            isIconOnly
            variant="light"
            className="lg:hidden flex justify-center items-center bg-zinc-950/80 border border-zinc-800 text-zinc-300 backdrop-blur-md rounded-xl drawer__trigger"
          >
            <LayoutSideContentLeft className="size-5" />
          </Button>

          {/* HeroUI v3 Explicit Backdrop Structural Layer with backdrop blur styling */}
          <Drawer.Backdrop className="drawer__backdrop fixed inset-0 bg-black/60 backdrop-blur-sm z-50" />

          <Drawer.Content
            placement="left"
            className="drawer__content fixed top-0 bottom-0 left-0 w-60 z-50 h-screen bg-[#0A0A0A] border-r border-zinc-900 outline-none"
          >
            <Drawer.Dialog className="drawer__dialog h-full w-full bg-[#0A0A0A] flex flex-col relative">
              <Drawer.CloseTrigger className="drawer__close-trigger absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors z-50 focus:outline-none" />

              {/* Main body it contains the full sideBarItems */}
              <Drawer.Body className="drawer__body p-0 m-0 overflow-y-auto h-full w-full flex flex-col">
                {sideBarContent}
              </Drawer.Body>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer>
      </div>
    </>
  );
}

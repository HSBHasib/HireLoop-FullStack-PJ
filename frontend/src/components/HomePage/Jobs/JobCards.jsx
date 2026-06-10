import React from "react";
import { Button, Card } from "@heroui/react";
import { HiMapPin, HiBriefcase } from "react-icons/hi2";
import { FaCircleDollarToSlot } from "react-icons/fa6";
import { HiArrowUpRight } from "react-icons/hi2";
import Link from "next/link";

const JobCard = ({ job }) => {
  const { 
    title, 
    description, 
    location, 
    type, 
    minSalary, 
    maxSalary, 
    currency,
    companyName,
    companyLogo 
  } = job;

  // SetUp Currency Symbol based on Currency
  const currencySymbol =
    currency === "EUR" ? "€" : currency === "USD" ? "$" : currency;

  const chipsData = [
    {
      id: "location",
      icon: HiMapPin,
      text: location || "New York, USA",
    },
    {
      id: "type",
      icon: HiBriefcase,
      text: type || "Hybrid",
    },
    {
      id: "salary",
      icon: FaCircleDollarToSlot,
      text: `${currencySymbol}${minSalary || "25"}-${currencySymbol}${maxSalary || "40"}/hour`,
    },
  ];

  return (
    <Card
      className="bg-[#121212] border border-neutral-900 rounded-[22px] hover:border-neutral-800 hover:shadow-2xl transition-all duration-300"
      radius="none"
      shadow="none"
    >
      <Card.Content className="p-5 flex flex-col justify-between h-full gap-6">
        {/* Top Section: Company Info, Title and Description */}
        <div className="flex flex-col gap-4">
          {/* Company Logo & Name Header */}
          <div className="flex items-center gap-3">
            {companyLogo ? (
              <img 
                src={companyLogo} 
                alt={`${companyName} logo`} 
                className="w-10 h-10 rounded-xl object-cover bg-neutral-800 border border-neutral-800"
              />
            ) : (
              <div className="w-10 h-10 rounded-xl bg-[#1c1a1e] border border-neutral-800 flex items-center justify-center text-sm font-bold text-[#F7C2FF]">
                {companyName ? companyName.charAt(0) : "C"}
              </div>
            )}
            <span className="text-sm font-medium text-neutral-400">
              {companyName || "Anonymous Company"}
            </span>
          </div>

          {/* Title and Description */}
          <div className="flex flex-col gap-2 -mt-1">
            <h3 className="text-2xl font-semibold text-white tracking-tight">
              {title || "Frontend Developer"}
            </h3>
            <p className="text-sm text-neutral-400 font-normal leading-relaxed line-clamp-2 max-w-[90%]">
              {description}
            </p>
          </div>
        </div>

        {/* MidSection: icons and jobs details - salary, location, type */}
        <div className="flex flex-wrap gap-2.5">
          {chipsData.map((chip) => {
            const ChipIcon = chip.icon;
            return (
              <div
                key={chip.id}
                className="inline-flex items-center gap-2 bg-[#1c1a1e] px-3.5 py-1.5 rounded-full text-xs font-medium border border-neutral-900 text-white"
              >
                <ChipIcon
                  className={`${chip.id === "salary" ? "text-[11px]" : "text-sm"} text-[#F7C2FF]`}
                />
                <span>{chip.text}</span>
              </div>
            );
          })}
        </div>

        {/* Apply Button */}
        <div className="pt-2">
          <Button variant="ghost" className="rounded-lg flex items-center gap-1.5 text-sm font-medium text-white hover:text-neutral-300 transition-all group">
            <Link href={`/`}>Apply Now</Link>
            <HiArrowUpRight className="text-base transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Button>
        </div>
      </Card.Content>
    </Card>
  );
};

export default JobCard;

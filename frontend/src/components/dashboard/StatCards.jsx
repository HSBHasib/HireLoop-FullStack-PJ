import React from 'react'
import { 
  LuFileCode, 
  LuUsers, 
  LuZap, 
} from "react-icons/lu";
import { IoCheckmarkDone } from "react-icons/io5";
import { Card } from "@heroui/react";

const StatCards = () => {

  // Card Dets
  const statsData = [
    {
      id: "total-jobs",
      title: "Total Job Posts",
      value: "48",
      icon: LuFileCode,
    },
    {
      id: "total-applicants",
      title: "Total Applicants",
      value: "1,284",
      icon: LuUsers,
    },
    {
      id: "active-jobs",
      title: "Active Jobs",
      value: "18",
      icon: LuZap,
    },
    {
      id: "jobs-closed",
      title: "Jobs Closed",
      value: "32",
      icon: IoCheckmarkDone,
    },
  ];

  return (
     <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 w-full">
        {statsData.map((card) => {
          const CardIcon = card.icon;

          return (
            <Card 
              key={card.id}
              className="bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/80 rounded-2xl transition-all duration-300 hover:border-[#5850EC]/60 group relative overflow-hidden"
            >
              <Card.Content className="p-1 flex flex-col gap-5 justify-between">
                
                {/* Micro Counter Indicator Wrapper Icon Bubble Box */}
                <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center group-hover:bg-[#5850EC]/10 group-hover:border-[#5850EC]/30 transition-colors duration-300">
                  <CardIcon className="size-5 text-zinc-400 group-hover:text-[#5850EC] transition-colors duration-300" />
                </div>

                {/* Quantitative Labels Title Content Layers */}
                <div className="space-y-1.5">
                  <p className="text-xs text-zinc-500 capitalize tracking-wider group-hover:text-zinc-400 transition-colors">
                    {card.title}
                  </p>
                  <h2 className="text-2xl font-semibold tracking-tight text-white">
                    {card.value}
                  </h2>
                </div>

              </Card.Content>
            </Card>
          );
        })}
      </div>
  )
}

export default StatCards



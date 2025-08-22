import React from "react";
import { TimelineItem } from "./TimelineItem";

const events = [
   {
    title: "Partnership with Ziontech Communication, Inc.",
    description: "for Philippines market penetration",
    date: "Jun 2025",
  },
  {
    title: "Obtained Malaysia Digital Company Status",
    description: " from MDEC (Malaysian Digital Economy Corporation)",
    date: "Jun 2024",
  },
  {
    title: "Obtained Market Access Grant",
    description: "for Women Owned Venture from Digital Penang",
    date: "Apr 2024",
  },
  {
    title: "Partnership with 3drens Inc.,Taiwan",
    description: "for Taiwan market penetration",
    date: "Mar 2024",
  },
  {
    title: "Partnership with RICOH (Thailand) Limited ",
    description: "for Thai market penetration",
    date: "Nov 2023",
  },
  {
    title: "Awarded R&D Status Company",
    description: "by MIDA (Malaysian Investment Development Authority)",
    date: "Aug 2023",
  },
  {
    title: "The Global Market-Fit Programme (GMP) to Japan",
    description: "by MRANTI (Malaysian Research Accelerator for Technology and Innovation)",
    date: "Oct 2022",
  },
  {
    title: "Recognition by MPC",
    description: "Productivity Champion in the LEADER category",
    date: "Sep  2022",
  },
  {
    title: "Top 20 Startup",
    description: "in 5th Cohort Selangor Accelerator Program by SIDEC (Selangor Information Technology & Digital Economy Corporation)",
    date: "Aug  2022",
  },
  {
    title: "Ministry of Finance license",
    description: "Able to serve Public Sector and Government Linked Companies in Malaysia ",
    date: "Jan 2020",
  },
  {
    title: "Launch",
    description: "Established ASEAN market access",
    date: "Dec  2018",
  },
];

export const Timeline: React.FC = () => {
  return (
    <div className="py-16 px-4 bg-background">
      <div className="flex flex-col space-y-16 items-center">
        {events.map((event, index) => (
          <TimelineItem
            key={event.date}
            {...event}
            index={index}
            isLast={index === events.length - 1}
          />
        ))}
      </div>
    </div>
  );
};
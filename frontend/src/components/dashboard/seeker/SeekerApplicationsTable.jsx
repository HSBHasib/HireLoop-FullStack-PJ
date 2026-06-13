"use client";

import React, { useState, useMemo } from 'react';
import { Table, Chip, Button, Pagination } from "@heroui/react";
import { LuBriefcase } from "react-icons/lu";
import Link from 'next/link';

const formatAppliedDate = (dateString) => {
  if (!dateString) return "Just now";
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) {
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    if (diffHours === 0) return "Less than an hour ago";
    return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  }
  if (diffDays === 1) return "1 day ago";
  if (diffDays < 7) return `${diffDays} days ago`;
  const diffWeeks = Math.floor(diffDays / 7);
  return `${diffWeeks} week${diffWeeks > 1 ? 's' : ''} ago`;
};

const columns = [
  { id: "jobTitle", label: "Job Title", minWidth: 240, defaultWidth: "1.5fr", isRowHeader: true },
  { id: "companyName", label: "Company", minWidth: 160, defaultWidth: "1.2fr" },
  { id: "createdAt", label: "Applied", minWidth: 130, defaultWidth: "1fr" },
  { id: "status", label: "Status", minWidth: 110, defaultWidth: "0.8fr" },
  { id: "action", label: "Action", minWidth: 90 },
];

const SeekerApplicationsTable = ({ initialApplications = [] }) => {
  const applications = initialApplications.map(app => ({
    ...app,
    key: app?._id
  }));

  const [page, setPage] = useState(1);
  const itemsPerPage = 5; 
  const totalItems = applications.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const items = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    return applications.slice(start, start + itemsPerPage);
  }, [page, applications]);

  const startItem = totalItems === 0 ? 0 : (page - 1) * itemsPerPage + 1;
  const endItem = Math.min(page * itemsPerPage, totalItems);

  const statusColorMap = {
    applied: { color: "default", variant: "flat", className: "bg-zinc-800/40 border-zinc-700/50 text-zinc-300" },
    review: { color: "warning", variant: "flat", className: "bg-amber-950/20 border-amber-900/40 text-amber-400" },
    shortlisted: { color: "success", variant: "flat", className: "bg-emerald-950/20 border-emerald-900/40 text-emerald-400" },
    rejected: { color: "danger", variant: "flat", className: "bg-rose-950/20 border-rose-900/40 text-rose-400" },
    offered: { color: "primary", variant: "flat", className: "bg-blue-950/20 border-blue-900/40 text-blue-400" },
  };

  return (
    <Table.ResizableContainer>
      <Table className="bg-[#0b0b0c] border border-neutral-900 rounded-2xl overflow-hidden shadow-2xl">
        <Table.ScrollContainer>
          <Table.Content 
            aria-label="Job Applications Table with Resizable Columns" 
            className="min-w-[800px]"
            columns={columns}
          >
            <Table.Header columns={columns}>
              {(column) => (
                <Table.Column
                  key={column.id}
                  id={column.id}
                  isRowHeader={column.isRowHeader}
                  defaultWidth={column.defaultWidth}
                  minWidth={column.minWidth}
                  className={`bg-[#111113] text-zinc-400 font-semibold text-xs py-4 ${
                    column.id === 'jobTitle' ? 'pl-6' : column.id === 'action' ? 'text-right pr-6' : column.id === 'status' ? 'text-center' : ''
                  }`}
                >
                  {column.label}
                  {column.id !== "action" && <Table.ColumnResizer />}
                </Table.Column>
              )}
            </Table.Header>

            <Table.Body 
              items={items} 
              emptyContent={
                <div className="flex flex-col items-center justify-center p-16 text-zinc-500 gap-2 min-h-[250px]">
                  <LuBriefcase size={32} className="text-zinc-700" />
                  <p className="text-sm font-medium text-zinc-400">You haven't applied to any jobs yet.</p>
                </div>
              }
            >
              {(item) => (
                <Table.Row key={item.key} className="border-b border-neutral-900 hover:bg-zinc-900/20 transition-colors duration-150">
                  
                  {/* Job Title */}
                  <Table.Cell className="py-4 pl-6">
                    <div className="flex items-center gap-3 py-1">
                      <div className="w-9 h-9 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-center text-zinc-500 shadow-inner shrink-0">
                        <LuBriefcase size={16} />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-sm font-semibold text-zinc-100 truncate max-w-[220px]">
                          {item?.jobTitle || "Position Name"}
                        </span>
                        <span className="text-[11px] text-zinc-500 font-medium">
                          {item?.jobType || "Full-time"} • {item?.jobPlace || "Remote"}
                        </span>
                      </div>
                    </div>
                  </Table.Cell>

                  {/* Company Name */}
                  <Table.Cell className="py-4 text-zinc-300 text-sm font-medium">
                    {item?.companyName || "Company Name"}
                  </Table.Cell>

                  {/* Applied Date */}
                  <Table.Cell className="py-4 text-zinc-400 text-xs font-medium">
                    {formatAppliedDate(item?.createdAt?.["$date"] || item?.createdAt)}
                  </Table.Cell>

                  {/* Status Badge */}
                  <Table.Cell className="py-4 text-center">
                    <Chip
                      size="sm"
                      variant={statusColorMap[item?.status?.toLowerCase() || "applied"]?.variant || "flat"}
                      color={statusColorMap[item?.status?.toLowerCase() || "applied"]?.color || "default"}
                      className={`h-6 text-[10px] font-bold tracking-wide capitalize border rounded-full px-1 ${statusColorMap[item?.status?.toLowerCase() || "applied"]?.className || ""}`}
                    >
                      {item?.status || "applied"}
                    </Chip>
                  </Table.Cell>

                  {/* Details Button */}
                  <Table.Cell className="py-4 text-right pr-6">
                    <Button
                      as={Link}
                      href={`/dashboard/seeker/applications/${item?.key?.["$oid"] || item?.key}`}
                      variant="light"
                      size="sm"
                      className="text-zinc-500 hover:text-zinc-100 hover:bg-zinc-900 text-xs font-bold rounded-lg px-3 h-8 transition-all duration-200"
                    >
                      Details
                    </Button>
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>

        {/* Pagination */}
        {totalItems > 0 && (
          <Table.Footer className="bg-[#111113] border-t border-neutral-900 p-4 flex items-center justify-between px-6">
            <Pagination size="sm" className="w-full flex items-center justify-between text-zinc-400">
              
              <Pagination.Summary className="text-xs font-medium text-zinc-500">
                Showing <span className="text-zinc-300 font-bold">{startItem}-{endItem}</span> of <span className="text-zinc-300 font-bold">{totalItems}</span> results
              </Pagination.Summary>

              <Pagination.Content className="flex items-center gap-1 bg-zinc-900/50 p-1 rounded-lg border border-zinc-800/60">
                <Pagination.Item>
                  <Pagination.Previous
                    isDisabled={page === 1}
                    onPress={() => setPage((p) => Math.max(1, p - 1))}
                    className="text-xs text-zinc-400 hover:bg-zinc-800 rounded-md px-2 py-1 cursor-pointer disabled:opacity-40"
                  >
                    Prev
                  </Pagination.Previous>
                </Pagination.Item>

                {pages.map((p) => (
                  <Pagination.Item key={p}>
                    <Pagination.Link
                      isActive={p === page}
                      onPress={() => setPage(p)}
                      className={`min-w-7 h-7 text-sm font-bold rounded-md flex items-center justify-center cursor-pointer transition-colors ${
                        p === page 
                          ? "bg-white text-black font-black shadow-md" 
                          : "text-zinc-400 hover:bg-zinc-800"
                      }`}
                    >
                      {p}
                    </Pagination.Link>
                  </Pagination.Item>
                ))}

                <Pagination.Item>
                  <Pagination.Next
                    isDisabled={page === totalPages}
                    onPress={() => setPage((p) => Math.min(totalPages, p + 1))}
                    className="text-xs text-zinc-400 hover:bg-zinc-800 rounded-md px-2 py-1 cursor-pointer disabled:opacity-40"
                  >
                    Next
                  </Pagination.Next>
                </Pagination.Item>
              </Pagination.Content>

            </Pagination>
          </Table.Footer>
        )}
      </Table>
    </Table.ResizableContainer>
  );
};

export default SeekerApplicationsTable;


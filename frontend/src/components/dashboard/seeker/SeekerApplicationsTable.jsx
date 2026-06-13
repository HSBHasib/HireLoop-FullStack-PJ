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

const SeekerApplicationsTable = ({ initialApplications }) => {

  const applications = initialApplications.map(app => ({
    ...app,
    key: app?._id
  }));

  const [page, setPage] = useState(1);
  const itemsPerPage = 5;
  const totalItems = applications.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 1) return [1];

    pages.push(1);

    if (page > 3) {
      pages.push("ellipsis");
    }

    const start = Math.max(2, page - 1);
    const end = Math.min(totalPages - 1, page + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (page < totalPages - 2) {
      pages.push("ellipsis");
    }

    pages.push(totalPages);

    return pages;
  };

  const items = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    return applications.slice(start, end);
  }, [page, applications]);

  const startItem = totalItems === 0 ? 0 : (page - 1) * itemsPerPage + 1;
  const endItem = Math.min(page * itemsPerPage, totalItems);

  const statusColorMap = {
    applied: { color: "default", variant: "bordered", className: "border-zinc-800 text-white/50" },
    review: { color: "warning", variant: "flat", className: "bg-amber-950/20 border-amber-900/40 text-amber-400" },
    shortlisted: { color: "success", variant: "flat", className: "bg-emerald-950/20 border-emerald-900/40 text-emerald-400" },
    rejected: { color: "danger", variant: "flat", className: "bg-rose-950/20 border-rose-900/40 text-rose-400" },
    offered: { color: "primary", variant: "flat", className: "bg-blue-950/20 border-blue-900/40 text-blue-400" },
  };

  return (
    <>
      <Table removeWrapper className="bg-[#0B0B0C] border border-neutral-900 rounded-4xl overflow-hidden shadow-2xl">
        <Table.ResizableContainer>
          <Table.Content 
            aria-label="Job Applications Table with Resizable Columns" 
            className="min-w-[700px]"
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
                  className={`bg-[#0B0B0C] text-white/60 font-semibold text-[12.5px] py-4 ${
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
                <div className="flex flex-col items-center justify-center p-12 text-white/70 gap-3">
                  <LuBriefcase size={36} className="text-white animate-pulse" />
                  <p className="text-xs font-medium">You haven't applied to any jobs yet.</p>
                </div>
              }
            >
              {(item) => (
                <Table.Row key={item.key} className="border-b bg-black border-neutral-900/60 hover:bg-zinc-900/20 transition-colors duration-150">
                  <Table.Cell className="py-4 pl-6">
                    <div className="flex items-center gap-3 py-1">
                      <div className="w-10 h-10 bg-zinc-900/80 border border-zinc-800 rounded-xl flex items-center justify-center text-white/70 shadow-inner shrink-0">
                        <LuBriefcase size={18} />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-sm font-semibold text-white/90 truncate max-w-[220px]">
                          {item?.jobTitle || "Position Name"}
                        </span>
                        <span className="text-[11px] text-white/60 font-medium">
                          {item?.jobType || "Full-time"} • {item?.jobPlace || "Remote"}
                        </span>
                      </div>
                    </div>
                  </Table.Cell>

                  <Table.Cell className="py-4 text-white/90 text-sm font-medium">
                    {item?.companyName || "Company Name"}
                  </Table.Cell>

                  <Table.Cell className="py-4 text-white/60 text-xs font-medium">
                    {formatAppliedDate(item?.createdAt?.["$date"] || item?.createdAt)}
                  </Table.Cell>

                  <Table.Cell className="py-4 text-center">
                    <Chip
                      size="sm"
                      variant={statusColorMap[item?.status?.toLowerCase() || "applied"]?.variant || "bordered"}
                      color={statusColorMap[item?.status?.toLowerCase() || "applied"]?.color || "default"}
                      className={`h-6 text-[10px] font-bold tracking-wide capitalize border ${statusColorMap[item?.status?.toLowerCase() || "applied"]?.className || ""}`}
                    >
                      {item?.status || "applied"}
                    </Chip>
                  </Table.Cell>

                  <Table.Cell className="py-4 text-right pr-6">
                    <Button
                      as={Link}
                      href={`/dashboard/seeker/applications/${item?.key?.["$oid"] || item?.key}`}
                      variant="light"
                      size="sm"
                      className="text-white/50 hover:text-white hover:bg-zinc-900 text-xs font-bold rounded-lg px-3 transition-all duration-200"
                    >
                      Details
                    </Button>
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table.Content>
        </Table.ResizableContainer>
      </Table>

      {/* Pagination */}
      {totalItems > 0 && (
        <div className="w-full bg-[#0b0b0c] border border-neutral-900/80 rounded-xl p-3 flex items-center justify-between mt-3 px-6">
          <span className="text-[11px] text-white/70 font-medium">
            Showing {startItem}-{endItem} of {totalItems} results
          </span>
          
          <Pagination 
            variant="flat" 
            color="default"
            className="flex justify-end"
            classNames={{
              wrapper: "gap-1 bg-zinc-900/40 p-1 rounded-lg border border-zinc-800/50 shadow-none",
              item: "text-zinc-400 text-xs font-bold hover:bg-zinc-800 border-none min-w-7 h-7 bg-transparent rounded-md",
              cursor: "bg-white text-black font-extrabold shadow-md rounded-md"
            }}
          >
            <Pagination.Content>
              <Pagination.Item>
                <Pagination.Previous 
                  isDisabled={page === 1} 
                  onPress={() => setPage((p) => Math.max(1, p - 1))}
                  className="text-white/70 hover:text-white text-xs bg-transparent"
                >
                  <span>Previous</span>
                </Pagination.Previous>
              </Pagination.Item>

              {getPageNumbers().map((p, i) =>
                p === "ellipsis" ? (
                  <Pagination.Item key={`ellipsis-${i}`}>
                    <Pagination.Ellipsis className="text-white/60" />
                  </Pagination.Item>
                ) : (
                  <Pagination.Item key={p}>
                    <Pagination.Link 
                      isActive={p === page} 
                      onPress={() => setPage(p)}
                    >
                      {p}
                    </Pagination.Link>
                  </Pagination.Item>
                )
              )}

              {/* Next */}
              <Pagination.Item>
                <Pagination.Next 
                  isDisabled={page === totalPages} 
                  onPress={() => setPage((p) => Math.min(totalPages, p + 1))}
                  className="text-white/70 hover:text-white text-xs bg-transparent"
                >
                  <span>Next</span>
                </Pagination.Next>
              </Pagination.Item>
            </Pagination.Content>
          </Pagination>
        </div>
      )}
    </>
  );
};

export default SeekerApplicationsTable;



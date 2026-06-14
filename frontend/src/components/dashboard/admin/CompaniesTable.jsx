"use client";

import React, { useState, useMemo } from "react";
import { Table, Button, Pagination, Avatar } from "@heroui/react";
import {
  LuBuilding2,
  LuClock,
  LuTriangleAlert,
  LuCheckCircle2,
} from "react-icons/lu";
import { UpdateCompany } from "@/lib/actions/companies";
import toast from "react-hot-toast";

// Date
const formatDate = (dateString) => {
  if (!dateString) return "Oct 12, 2025";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

// Colums
const columns = [
  {
    id: "companyName",
    label: "Company Name",
    minWidth: 240,
    defaultWidth: "1.5fr",
    isRowHeader: true,
  },
  { id: "location", label: "Location", minWidth: 160, defaultWidth: "1fr" },
  { id: "industry", label: "Industry", minWidth: 140, defaultWidth: "1fr" },
  { id: "status", label: "Status", minWidth: 110, defaultWidth: "0.8fr" },
  {
    id: "dateSubmitted",
    label: "Date Submitted",
    minWidth: 130,
    defaultWidth: "1fr",
  },
  { id: "action", label: "Actions", minWidth: 160 },
];

const CompaniesTable = ({ companies = [] }) => {
  const formattedCompanies = companies.map((company) => ({
    ...company,
    key: company?._id,
  }));

  const [page, setPage] = useState(1);
  const itemsPerPage = 4;
  const totalItems = formattedCompanies.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const items = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    return formattedCompanies.slice(start, start + itemsPerPage);
  }, [page, formattedCompanies]);

  const startItem = totalItems === 0 ? 0 : (page - 1) * itemsPerPage + 1;
  const endItem = Math.min(page * itemsPerPage, totalItems);

  // Color
  const statusColorMap = {
    pending: "bg-amber-500 text-amber-400",
    approved: "bg-emerald-500 text-emerald-400",
    rejected: "bg-rose-500 text-rose-400",
  };

  const handleStatusUpdate = async (id, newStatus) => {
      const updateCompanyData = await UpdateCompany(id, {status: newStatus})

      const isApproved = newStatus === "Approved" ? `Approved ${companies?.name} Company Registation` : `Reject ${companies?.name} Company Registation` 

      if(updateCompanyData.modifiedCount) {
        toast.success(isApproved);
      }
  };

  return (
    <Table className="bg-[#0b0b0c] border border-neutral-900 rounded-2xl overflow-hidden shadow-2xl">
      <Table.ScrollContainer>
        <Table.Content
          aria-label="Companies Admin Dashboard Table"
          className="min-w-200"
        >
          <Table.Header columns={columns}>
            {(column) => (
              <Table.Column
                isRowHeader={column.isRowHeader}
                className={`bg-[#111113] text-zinc-400 font-semibold text-xs py-4 ${
                  column.id === "companyName"
                    ? "pl-6"
                    : column.id === "action"
                      ? "text-center pr-6"
                      : ""
                }`}
              >
                {column.label}
              </Table.Column>
            )}
          </Table.Header>

          <Table.Body
            items={items}
            emptyContent={
              <div className="flex flex-col items-center justify-center p-16 text-zinc-500 gap-2 min-h-[250px]">
                <LuBuilding2 size={32} className="text-zinc-700" />
                <p className="text-sm font-medium text-zinc-400">
                  No company data available
                </p>
              </div>
            }
          >
            {(item) => {
              const currentStatus = item?.status?.toLowerCase() || "pending";
              const statusStyles =
                statusColorMap[currentStatus] || statusColorMap.pending;

              return (
                <Table.Row className="border-b border-neutral-900 hover:bg-zinc-900/20 transition-colors duration-150">
                  {/* Company Name & Website */}
                  <Table.Cell className="py-4 pl-6">
                    <div className="flex items-center gap-3">
                      <Avatar
                        src={item?.logoUrl}
                        fallback={
                          <LuBuilding2 className="text-zinc-500" size={16} />
                        }
                        className="w-9 h-9 bg-zinc-900 border border-zinc-800 rounded-xl p-1 shrink-0"
                      />
                      <div className="flex flex-col min-w-0">
                        <span className="text-sm font-semibold text-zinc-100 truncate max-w-[180px]">
                          {item?.name || "N/A"}
                        </span>
                        <span className="text-[11px] text-zinc-500 truncate max-w-[180px]">
                          {item?.website || "no-link.com"}
                        </span>
                      </div>
                    </div>
                  </Table.Cell>

                  {/* Location */}
                  <Table.Cell className="py-4 text-zinc-300 text-sm font-medium">
                    {item?.location || "Unknown"}
                  </Table.Cell>

                  {/* Industry */}
                  <Table.Cell className="py-4">
                    <span className="text-xs bg-zinc-900 text-zinc-400 border border-zinc-800/60 px-2.5 py-1 rounded-full font-medium">
                      {item?.industry || "Technology"}
                    </span>
                  </Table.Cell>

                  {/* Status */}
                  <Table.Cell className="py-4">
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${statusStyles.split(" ")[0]}`}
                      />
                      <span
                        className={`text-xs font-semibold capitalize ${statusStyles.split(" ")[1]}`}
                      >
                        {item?.status || "Pending"}
                      </span>
                    </div>
                  </Table.Cell>

                  {/* Date Submitted */}
                  <Table.Cell className="py-4 text-zinc-400 text-xs font-medium">
                    {formatDate(item?.createdAt)}
                  </Table.Cell>

                  {/* Actions */}
                  <Table.Cell className="py-4 text-center pr-6">
                    <div className="flex items-center justify-center gap-2">
                      {currentStatus !== "approved" && (
                        <Button
                          size="sm"
                          onClick={() =>
                            handleStatusUpdate(item.key, "Approved")
                          }
                          className="bg-emerald-950/10 border border-emerald-900/30 text-emerald-400 hover:bg-emerald-900/30 text-xs font-bold rounded-lg h-8 px-3 transition-all duration-200"
                        >
                          Approve
                        </Button>
                      )}

                      {currentStatus !== "rejected" && (
                        <Button
                          size="sm"
                          onClick={() =>
                            handleStatusUpdate(item.key, "Rejected")
                          }
                          className="bg-rose-950/10 border border-rose-900/30 text-rose-400 hover:bg-rose-900/30 text-xs font-bold rounded-lg h-8 px-3 transition-all duration-200"
                        >
                          Reject
                        </Button>
                      )}
                    </div>
                  </Table.Cell>
                </Table.Row>
              );
            }}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>

      {totalItems > 0 && (
        <Table.Footer className="bg-[#111113] border-t border-neutral-900 p-4 flex items-center justify-between px-6">
          <Pagination
            size="sm"
            className="w-full flex items-center justify-between text-zinc-400"
          >
            <Pagination.Summary className="text-xs font-medium text-zinc-500">
              Showing{" "}
              <span className="text-zinc-300 font-bold">
                {startItem}-{endItem}
              </span>{" "}
              of <span className="text-zinc-300 font-bold">{totalItems}</span>{" "}
              results
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
                    className={`min-w-7 h-7 text-xs font-bold rounded-md flex items-center justify-center cursor-pointer transition-colors ${
                      p === page
                        ? "bg-white text-black font-extrabold shadow-md"
                        : "text-zinc-400 hover:bg-zinc-800"
                    }`}
                  >
                    {p}
                  </Pagination.Link>
                </Pagination.Item>
              ))}

              {/* নেক্সট বাটন */}
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
  );
};

export default CompaniesTable;

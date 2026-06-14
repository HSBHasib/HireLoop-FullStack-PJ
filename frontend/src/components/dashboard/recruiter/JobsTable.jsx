"use client";

import { Chip, Table, Button, Tooltip } from "@heroui/react";
import { FiEye, FiEdit2, FiTrash2 } from "react-icons/fi";

// Status Color Map
const statusColorMap = {
  active: "success",
  inactive: "danger",
  draft: "warning",
};

// Table Columns configuration
const columns = [
  { id: "title", name: "Job Title" },
  { id: "category", name: "Type / Category" },
  { id: "location", name: "Location" },
  { id: "status", name: "Status" },
  { id: "actions", name: "Actions" },
];

const JobsTable = ({ jobs = [] }) => {
  const handleView = (id) => console.log("View Job ID:", id);
  const handleEdit = (id) => console.log("Edit Job ID:", id);
  const handleDelete = (id) => console.log("Delete Job ID:", id);

  const formattedJobs = jobs.map((job) => ({
    ...job,
    id: job._id?.toString() || Math.random().toString(), 
  }));

  return (
    <Table aria-label="Jobs Management Table">
      <Table.ScrollContainer className="h-full overflow-y-auto w-full">
        <Table.Content className="min-w-150">
          <Table.Header className="sticky top-0 z-10">
            {columns.map((col) => (
              <Table.Column key={col.id} id={col.id} isRowHeader={col.id === "title"} className="text-white/70">
                {col.name}
              </Table.Column>
            ))}
          </Table.Header>
          
          <Table.Body items={formattedJobs}>
            {(job) => (
              <Table.Row key={job.id}>
                {/* Job Title */}
                <Table.Cell>
                  <div className="font-medium text-foreground">{job.title}</div>
                </Table.Cell>

                {/* Type / Category */}
                <Table.Cell>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold">{job.type}</span>
                    <span className="text-xs text-default-400">{job.category}</span>
                  </div>
                </Table.Cell>

                {/* Location */}
                <Table.Cell>
                  <span className="text-sm">{job.location}</span>
                </Table.Cell>

                {/* Status */}
                <Table.Cell>
                  <Chip 
                    color={statusColorMap[job.status?.toLowerCase()] || "default"} 
                    size="sm" 
                    variant="soft"
                    className="capitalize"
                  >
                    {job.status}
                  </Chip>
                </Table.Cell>

                {/* Actions Buttons */}
                <Table.Cell>
                  <div className="flex items-center gap-2">
                    <Tooltip content="View Details">
                      <Button 
                        isIconOnly 
                        size="sm" 
                        variant="light" 
                        onPress={() => handleView(job.id)}
                      >
                        <FiEye className="text-default-500 text-lg" />
                      </Button>
                    </Tooltip>
                    <Tooltip content="Edit Job">
                      <Button 
                        isIconOnly 
                        size="sm" 
                        variant="light" 
                        onPress={() => handleEdit(job.id)}
                      >
                        <FiEdit2 className="text-primary text-md" />
                      </Button>
                    </Tooltip>
                    <Tooltip content="Delete Job" color="danger">
                      <Button 
                        isIconOnly 
                        size="sm" 
                        variant="light" 
                        onPress={() => handleDelete(job.id)}
                      >
                        <FiTrash2 className="text-danger text-lg" />
                      </Button>
                    </Tooltip>
                  </div>
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
    </Table>
  );
};

export default JobsTable;



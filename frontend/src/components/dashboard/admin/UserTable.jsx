// "use client";

// import React, { useState, useMemo } from "react";
// import { Table, Button, Pagination, Avatar } from "@heroui/react";
// import toast from "react-hot-toast";
// import { LuBriefcase, LuUser, LuUserCog, LuUserPen } from "react-icons/lu";
// import { updateUserRole } from "@/lib/actions/users";

// // Date Formatter
// const formatDate = (dateString) => {
//   if (!dateString) return "Oct 12, 2025";
//   const date = new Date(dateString);
//   return date.toLocaleDateString("en-US", {
//     month: "short",
//     day: "numeric",
//     year: "numeric",
//   });
// };

// const columns = [
//   { id: "userName", label: "User Name", minWidth: 220, isRowHeader: true },
//   { id: "email", label: "Email Address", minWidth: 220 },
//   { id: "role", label: "Role", minWidth: 130 },
//   { id: "joinDate", label: "Join Date", minWidth: 140 },
//   { id: "status", label: "Status", minWidth: 120 },
//   { id: "action", label: "Actions", minWidth: 260 }, 
// ];

// const UserTable = ({ users = [] }) => {
 
//   const formattedUsers = users.map((user) => ({
//     ...user,
//     key: user?.id || user?._id,
//   }));

//   const [page, setPage] = useState(1);
//   const itemsPerPage = 4;
//   const totalItems = formattedUsers.length;
//   const totalPages = Math.ceil(totalItems / itemsPerPage);

//   const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

//   const items = useMemo(() => {
//     const start = (page - 1) * itemsPerPage;
//     return formattedUsers.slice(start, start + itemsPerPage);
//   }, [page, formattedUsers]);

//   const startItem = totalItems === 0 ? 0 : (page - 1) * itemsPerPage + 1;
//   const endItem = Math.min(page * itemsPerPage, totalItems);

//   // Status Styling 
//   const statusColorMap = {
//     active: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
//     suspended: "bg-rose-500/10 text-rose-400 border border-rose-500/20",
//     pending: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
//   };

//   // Handle Action
//   const handleAction = async (userId, actionType) => {
//     const updateRole = await updateUserRole(userId, actionType);
//     if(updateRole.modifiedCount) {
//         toast.success(`User state triggered for ${actionType}`);
//     }
//   };

//   return (
//     <Table className="bg-[#0b0b0c] border border-neutral-900 rounded-2xl overflow-hidden shadow-2xl">
//       <Table.ScrollContainer>
//         <Table.Content
//           aria-label="Users Admin Dashboard Table"
//           className="min-w-200"
//         >
//           <Table.Header columns={columns}>
//             {(column) => (
//               <Table.Column
//                 isRowHeader={column.isRowHeader}
//                 className={`bg-[#111113] text-zinc-400 font-semibold text-xs py-4 ${
//                   column.id === "userName"
//                     ? "pl-6"
//                     : column.id === "action"
//                       ? "text-center pr-6"
//                       : ""
//                 }`}
//               >
//                 {column.label}
//               </Table.Column>
//             )}
//           </Table.Header>

//           <Table.Body
//             items={items}
//             emptyContent={
//               <div className="flex flex-col items-center justify-center p-16 text-zinc-500 gap-2 min-h-62.5">
//                 <LuUserPen size={32} className="text-zinc-700" />
//                 <p className="text-sm font-medium text-zinc-400">
//                   No user data available
//                 </p>
//               </div>
//             }
//           >
//             {(item) => {
//               const currentStatus = item?.status?.toLowerCase() || "active";
//               const statusStyles =
//                 statusColorMap[currentStatus] || statusColorMap.active;
              
//               const currentRole = item?.role?.toLowerCase() || "seeker";
//               const isRecruiter = currentRole === "recruiter";
//               const isAdmin = currentRole === "admin";
//               const isSeeker = currentRole === "seeker";

//               return (
//                 <Table.Row className="border-b border-neutral-900 hover:bg-zinc-900/20 transition-colors duration-150">
//                   {/* User Name & Image fallback */}
//                   <Table.Cell className="py-4 pl-6">
//                     <div className="flex items-center gap-3">
//                       <Avatar>
//                         <Avatar.Image
//                           src={item?.image}
//                           alt={item?.name}
//                           className="object-cover"
//                         />
//                         <Avatar.Fallback>
//                           {item?.name?.charAt(0) || "U"}
//                         </Avatar.Fallback>
//                       </Avatar>
//                       <span className="text-sm font-semibold text-zinc-100 truncate max-w-[180px]">
//                         {item?.name || "Anonymous"}
//                       </span>
//                     </div>
//                   </Table.Cell>

//                   {/* Email Address */}
//                   <Table.Cell className="py-4 text-zinc-400 text-sm">
//                     {item?.email || "N/A"}
//                   </Table.Cell>

//                   {/* Role with Pill Badge - Jar jeta okhane halka highlight kora holo */}
//                   <Table.Cell className="py-4">
//                     <div 
//                       className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold capitalize border transition-all ${
//                         isAdmin 
//                           ? "bg-amber-500/10 text-amber-400 border-amber-500/30 shadow-[0_0_12px_rgba(245,158,11,0.1)]" 
//                           : isRecruiter 
//                             ? "bg-sky-500/10 text-sky-400 border-sky-500/30" 
//                             : "bg-zinc-800 text-zinc-300 border-zinc-700"
//                       }`}
//                     >
//                       {isAdmin ? (
//                         <LuUserCog size={12} />
//                       ) : isRecruiter ? (
//                         <LuBriefcase size={12} />
//                       ) : (
//                         <LuUser size={12} />
//                       )}
//                       {item?.role || "Seeker"}
//                     </div>
//                   </Table.Cell>

//                   {/* Join Date */}
//                   <Table.Cell className="py-4 text-zinc-400 text-xs font-medium">
//                     {formatDate(item?.createdAt)}
//                   </Table.Cell>

//                   {/* Status Badges Matching image_38bee4.png */}
//                   <Table.Cell className="py-4">
//                     <div
//                       className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full ${statusStyles}`}
//                     >
//                       <span className="w-1 h-1 rounded-full bg-current" />
//                       <span className="text-[11px] font-bold capitalize">
//                         {item?.status || "Active"}
//                       </span>
//                     </div>
//                   </Table.Cell>

//                   {/* Actions Area with propper Button shapes */}
//                   <Table.Cell className="py-4 text-center pr-6">
//                     <div className="flex items-center justify-center gap-2">
                      
//                       {/* Seeker / Recruiter Action Button (Lower-case data) */}
//                       {!isSeeker && (
//                         <Button
//                           size="sm"
//                           onClick={() => handleAction(item.key, "seeker")}
//                           className="bg-zinc-900 border border-zinc-800 text-zinc-300 hover:bg-zinc-800 text-xs font-bold rounded-lg h-8 px-2.5 transition-all duration-200"
//                         >
//                           Make Seeker
//                         </Button>
//                       )}

//                       {!isRecruiter && (
//                         <Button
//                           size="sm"
//                           onClick={() => handleAction(item.key, "recruiter")}
//                           className="bg-sky-950/10 border border-sky-900/30 text-sky-400 hover:bg-sky-900/30 text-xs font-bold rounded-lg h-8 px-2.5 transition-all duration-200"
//                         >
//                           Make Recruiter
//                         </Button>
//                       )}
                      
//                       {/* Admin Action Button (Lower-case data) */}
//                       {!isAdmin && (
//                         <Button
//                           size="sm"
//                           onClick={() => handleAction(item.key, "admin")}
//                           className="bg-amber-950/10 border border-amber-900/30 text-amber-400 hover:bg-amber-900/30 text-xs font-bold rounded-lg h-8 px-2.5 transition-all duration-200"
//                         >
//                           Make Admin
//                         </Button>
//                       )}

//                       {/* Dynamic Status Toggle Buttons */}
//                       {currentStatus === "suspended" ? (
//                         <Button
//                           size="sm"
//                           onClick={() => handleAction(item.key, "Activate")}
//                           className="bg-emerald-950/10 border border-emerald-900/30 text-emerald-400 hover:bg-emerald-900/30 text-xs font-bold rounded-lg h-8 px-2.5 transition-all duration-200"
//                         >
//                           Activate
//                         </Button>
//                       ) : (
//                         <Button
//                           size="sm"
//                           onClick={() => handleAction(item.key, "Suspend")}
//                           className="bg-rose-950/10 border border-rose-900/30 text-rose-400 hover:bg-rose-900/30 text-xs font-bold rounded-lg h-8 px-2.5 transition-all duration-200"
//                         >
//                           Suspend
//                         </Button>
//                       )}
//                     </div>
//                   </Table.Cell>
//                 </Table.Row>
//               );
//             }}
//           </Table.Body>
//         </Table.Content>
//       </Table.ScrollContainer>

//       {/* Pagination Footer */}
//       {totalItems > 0 && (
//         <Table.Footer className="bg-[#111113] border-t border-neutral-900 p-4 flex items-center justify-between px-6">
//           <Pagination
//             size="sm"
//             className="w-full flex items-center justify-between text-zinc-400"
//           >
//             <Pagination.Summary className="text-xs font-medium text-zinc-500">
//               Showing{" "}
//               <span className="text-zinc-300 font-bold">
//                 {startItem}-{endItem}
//               </span>{" "}
//               of <span className="text-zinc-300 font-bold">{totalItems}</span>{" "}
//               users
//             </Pagination.Summary>

//             <Pagination.Content className="flex items-center gap-1 bg-zinc-900/50 p-1 rounded-lg border border-zinc-800/60">
//               <Pagination.Item>
//                 <Pagination.Previous
//                   isDisabled={page === 1}
//                   onPress={() => setPage((p) => Math.max(1, p - 1))}
//                   className="text-xs text-zinc-400 hover:bg-zinc-800 rounded-md px-2 py-1 cursor-pointer disabled:opacity-40"
//                 >
//                   Prev
//                 </Pagination.Previous>
//               </Pagination.Item>

//               {pages.map((p) => (
//                 <Pagination.Item key={p}>
//                   <Pagination.Link
//                     isActive={p === page}
//                     onPress={() => setPage(p)}
//                     className={`min-w-7 h-7 text-xs font-bold rounded-md flex items-center justify-center cursor-pointer transition-colors ${
//                       p === page
//                         ? "bg-white text-black font-extrabold shadow-md"
//                         : "text-zinc-400 hover:bg-zinc-800"
//                     }`}
//                   >
//                     {p}
//                   </Pagination.Link>
//                 </Pagination.Item>
//               ))}

//               <Pagination.Item>
//                 <Pagination.Next
//                   isDisabled={page === totalPages}
//                   onPress={() => setPage((p) => Math.min(totalPages, p + 1))}
//                   className="text-xs text-zinc-400 hover:bg-zinc-800 rounded-md px-2 py-1 cursor-pointer disabled:opacity-40"
//                 >
//                   Next
//                 </Pagination.Next>
//               </Pagination.Item>
//             </Pagination.Content>
//           </Pagination>
//         </Table.Footer>
//       )}
//     </Table>
//   );
// };

// export default UserTable;



























// // "use client";

// // import React, { useState, useMemo } from "react";
// // import { Table, Button, Pagination, Avatar } from "@heroui/react";
// // import toast from "react-hot-toast";
// // import { LuBriefcase, LuUser, LuUserCog, LuUserPen } from "react-icons/lu";
// // import { updateUserRole } from "@/lib/actions/users";

// // // Date Formatter
// // const formatDate = (dateString) => {
// //   if (!dateString) return "Oct 12, 2025";
// //   const date = new Date(dateString);
// //   return date.toLocaleDateString("en-US", {
// //     month: "short",
// //     day: "numeric",
// //     year: "numeric",
// //   });
// // };

// // // Columns based on image_38bee4.png
// // const columns = [
// //   { id: "userName", label: "User Name", minWidth: 220, isRowHeader: true },
// //   { id: "email", label: "Email Address", minWidth: 220 },
// //   { id: "role", label: "Role", minWidth: 130 },
// //   { id: "joinDate", label: "Join Date", minWidth: 140 },
// //   { id: "status", label: "Status", minWidth: 120 },
// //   { id: "action", label: "Actions", minWidth: 180 },
// // ];

// // const UserTable = ({ users = [] }) => {
 
// //   const formattedUsers = users.map((user) => ({
// //     ...user,
// //     key: user?.id || user?._id,
// //   }));

// //   const [page, setPage] = useState(1);
// //   const itemsPerPage = 4;
// //   const totalItems = formattedUsers.length;
// //   const totalPages = Math.ceil(totalItems / itemsPerPage);

// //   const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

// //   const items = useMemo(() => {
// //     const start = (page - 1) * itemsPerPage;
// //     return formattedUsers.slice(start, start + itemsPerPage);
// //   }, [page, formattedUsers]);

// //   const startItem = totalItems === 0 ? 0 : (page - 1) * itemsPerPage + 1;
// //   const endItem = Math.min(page * itemsPerPage, totalItems);

// //   // Status Styling 
// //   const statusColorMap = {
// //     active: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
// //     suspended: "bg-rose-500/10 text-rose-400 border border-rose-500/20",
// //     pending: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
// //   };

// //     // Handle  
// //   const handleAction = async (userId, actionType) => {
// //     const updateRole = await updateUserRole(userId, actionType);
// //     if(updateRole.modifiedCount) {
// //         toast.success(`User state triggered for ${actionType}`);
// //       }
// //   };

// //   return (
// //     <Table className="bg-[#0b0b0c] border border-neutral-900 rounded-2xl overflow-hidden shadow-2xl">
// //       <Table.ScrollContainer>
// //         <Table.Content
// //           aria-label="Users Admin Dashboard Table"
// //           className="min-w-200"
// //         >
// //           <Table.Header columns={columns}>
// //             {(column) => (
// //               <Table.Column
// //                 isRowHeader={column.isRowHeader}
// //                 className={`bg-[#111113] text-zinc-400 font-semibold text-xs py-4 ${
// //                   column.id === "userName"
// //                     ? "pl-6"
// //                     : column.id === "action"
// //                       ? "text-center pr-6"
// //                       : ""
// //                 }`}
// //               >
// //                 {column.label}
// //               </Table.Column>
// //             )}
// //           </Table.Header>

// //           <Table.Body
// //             items={items}
// //             emptyContent={
// //               <div className="flex flex-col items-center justify-center p-16 text-zinc-500 gap-2 min-h-[250px]">
// //                 <LuUserPen size={32} className="text-zinc-700" />
// //                 <p className="text-sm font-medium text-zinc-400">
// //                   No user data available
// //                 </p>
// //               </div>
// //             }
// //           >
// //             {(item) => {
// //               const currentStatus = item?.status?.toLowerCase() || "active";
// //               const statusStyles =
// //                 statusColorMap[currentStatus] || statusColorMap.active;
// //               const isRecruiter = item?.role?.toLowerCase() === "recruiter";

// //               return (
// //                 <Table.Row className="border-b border-neutral-900 hover:bg-zinc-900/20 transition-colors duration-150">
// //                   {/* User Name & Image fallback */}
// //                   <Table.Cell className="py-4 pl-6">
// //                     <div className="flex items-center gap-3">
// //                       <Avatar>
// //                         <Avatar.Image
// //                           src={item?.image}
// //                           alt={item?.name}
// //                           className="object-cover"
// //                         />
// //                         <Avatar.Fallback>
// //                           {item?.name.charAt[0]}
// //                         </Avatar.Fallback>
// //                       </Avatar>
// //                       <span className="text-sm font-semibold text-zinc-100 truncate max-w-[180px]">
// //                         {item?.name || "Anonymous"}
// //                       </span>
// //                     </div>
// //                   </Table.Cell>

// //                   {/* Email Address */}
// //                   <Table.Cell className="py-4 text-zinc-400 text-sm">
// //                     {item?.email || "N/A"}
// //                   </Table.Cell>

// //                   {/* Role with Pill Badge */}
// //                   <Table.Cell className="py-4">
// //                     <div className="inline-flex items-center gap-1.5 bg-zinc-900/80 border border-zinc-800/80 px-2.5 py-1 rounded-full text-xs font-medium text-zinc-300 capitalize">
// //                       {isRecruiter ? (
// //                         <LuBriefcase size={12} className="text-zinc-500" />
// //                       ) : (
// //                         <LuUser size={12} className="text-zinc-500" />
// //                       )}
// //                       {item?.role || "Seeker"}
// //                     </div>
// //                   </Table.Cell>

// //                   {/* Join Date */}
// //                   <Table.Cell className="py-4 text-zinc-400 text-xs font-medium">
// //                     {formatDate(item?.createdAt)}
// //                   </Table.Cell>

// //                   {/* Status Badges Matching image_38bee4.png */}
// //                   <Table.Cell className="py-4">
// //                     <div
// //                       className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full ${statusStyles}`}
// //                     >
// //                       <span className="w-1 h-1 rounded-full bg-current" />
// //                       <span className="text-[11px] font-bold capitalize">
// //                         {item?.status || "Active"}
// //                       </span>
// //                     </div>
// //                   </Table.Cell>

// //                   {/* Actions Area */}
// //                   <Table.Cell className="py-4 text-center pr-6">
// //                     <div className="flex items-center justify-center gap-3">
// //                       {/* Role Toggle Button */}
// //                       <button
// //                         onClick={() =>
// //                           handleAction(
// //                             item.key,
// //                             isRecruiter ? "seeker" : "recruiter",
// //                           )
// //                         }
// //                         className="text-xs font-semibold text-zinc-400 hover:text-zinc-200 transition-colors"
// //                       >
// //                         {isRecruiter ? "Make Seeker" : "Make Recruiter"}
// //                       </button>

// //                       {/* Dynamic Status Toggle (Suspend / Activate) */}
// //                       {currentStatus === "suspended" ? (
// //                         <button
// //                           onClick={() => handleAction(item.key, "Activate")}
// //                           className="text-xs font-bold text-emerald-500 hover:text-emerald-400 transition-colors"
// //                         >
// //                           Activate
// //                         </button>
// //                       ) : (
// //                         <button
// //                           onClick={() => handleAction(item.key, "Suspend")}
// //                           className="text-xs font-bold text-rose-500 hover:text-rose-400 transition-colors"
// //                         >
// //                           Suspend
// //                         </button>
// //                       )}
// //                     </div>
// //                   </Table.Cell>
// //                 </Table.Row>
// //               );
// //             }}
// //           </Table.Body>
// //         </Table.Content>
// //       </Table.ScrollContainer>

// //       {/* Pagination Footer */}
// //       {totalItems > 0 && (
// //         <Table.Footer className="bg-[#111113] border-t border-neutral-900 p-4 flex items-center justify-between px-6">
// //           <Pagination
// //             size="sm"
// //             className="w-full flex items-center justify-between text-zinc-400"
// //           >
// //             <Pagination.Summary className="text-xs font-medium text-zinc-500">
// //               Showing{" "}
// //               <span className="text-zinc-300 font-bold">
// //                 {startItem}-{endItem}
// //               </span>{" "}
// //               of <span className="text-zinc-300 font-bold">{totalItems}</span>{" "}
// //               users
// //             </Pagination.Summary>

// //             <Pagination.Content className="flex items-center gap-1 bg-zinc-900/50 p-1 rounded-lg border border-zinc-800/60">
// //               <Pagination.Item>
// //                 <Pagination.Previous
// //                   isDisabled={page === 1}
// //                   onPress={() => setPage((p) => Math.max(1, p - 1))}
// //                   className="text-xs text-zinc-400 hover:bg-zinc-800 rounded-md px-2 py-1 cursor-pointer disabled:opacity-40"
// //                 >
// //                   Prev
// //                 </Pagination.Previous>
// //               </Pagination.Item>

// //               {pages.map((p) => (
// //                 <Pagination.Item key={p}>
// //                   <Pagination.Link
// //                     isActive={p === page}
// //                     onPress={() => setPage(p)}
// //                     className={`min-w-7 h-7 text-xs font-bold rounded-md flex items-center justify-center cursor-pointer transition-colors ${
// //                       p === page
// //                         ? "bg-white text-black font-extrabold shadow-md"
// //                         : "text-zinc-400 hover:bg-zinc-800"
// //                     }`}
// //                   >
// //                     {p}
// //                   </Pagination.Link>
// //                 </Pagination.Item>
// //               ))}

// //               <Pagination.Item>
// //                 <Pagination.Next
// //                   isDisabled={page === totalPages}
// //                   onPress={() => setPage((p) => Math.min(totalPages, p + 1))}
// //                   className="text-xs text-zinc-400 hover:bg-zinc-800 rounded-md px-2 py-1 cursor-pointer disabled:opacity-40"
// //                 >
// //                   Next
// //                 </Pagination.Next>
// //               </Pagination.Item>
// //             </Pagination.Content>
// //           </Pagination>
// //         </Table.Footer>
// //       )}
// //     </Table>
// //   );
// // };

// // export default UserTable;


"use client";

import React, { useState, useMemo } from "react";
import { Table, Button, Pagination, Avatar } from "@heroui/react";
import toast from "react-hot-toast";
import { LuBriefcase, LuUser, LuUserCog, LuUserPen } from "react-icons/lu";
import { updateUserRole } from "@/lib/actions/users";

// Date Formatter
const formatDate = (dateString) => {
  if (!dateString) return "Oct 12, 2025";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const columns = [
  { id: "userName", label: "User Name", minWidth: 220, isRowHeader: true },
  { id: "email", label: "Email Address", minWidth: 220 },
  { id: "role", label: "Role", minWidth: 130 },
  { id: "joinDate", label: "Join Date", minWidth: 140 },
  { id: "status", label: "Status", minWidth: 120 },
  { id: "action", label: "Actions", minWidth: 260 }, 
];

const UserTable = ({ users = [] }) => {
 
  const formattedUsers = users.map((user) => ({
    ...user,
    key: user?.id || user?._id,
  }));

  const [page, setPage] = useState(1);
  const itemsPerPage = 4;
  const totalItems = formattedUsers.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const items = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    return formattedUsers.slice(start, start + itemsPerPage);
  }, [page, formattedUsers]);

  const startItem = totalItems === 0 ? 0 : (page - 1) * itemsPerPage + 1;
  const endItem = Math.min(page * itemsPerPage, totalItems);

  // Status Styling 
  const statusColorMap = {
    active: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
    suspended: "bg-rose-500/10 text-rose-400 border border-rose-500/20",
    pending: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
  };

  // Handle Action
  const handleAction = async (userId, actionType) => {
    const updateRole = await updateUserRole(userId, actionType);
    if(updateRole.modifiedCount) {
        toast.success(`User state triggered for ${actionType}`);
    }
  };

  return (
    <Table className="bg-[#0b0b0c] border border-neutral-900 rounded-2xl overflow-hidden shadow-2xl">
      <Table.ScrollContainer>
        <Table.Content
          aria-label="Users Admin Dashboard Table"
          className="min-w-200"
        >
          <Table.Header columns={columns}>
            {(column) => (
              <Table.Column
                isRowHeader={column.isRowHeader}
                className={`bg-[#111113] text-zinc-400 font-semibold text-xs py-4 ${
                  column.id === "userName"
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
              <div className="flex flex-col items-center justify-center p-16 text-zinc-500 gap-2 min-h-62.5">
                <LuUserPen size={32} className="text-zinc-700" />
                <p className="text-sm font-medium text-zinc-400">
                  No user data available
                </p>
              </div>
            }
          >
            {(item) => {
              const currentStatus = item?.status?.toLowerCase() || "active";
              const statusStyles =
                statusColorMap[currentStatus] || statusColorMap.active;
              
              const currentRole = item?.role?.toLowerCase() || "seeker";
              const isRecruiter = currentRole === "recruiter";
              const isAdmin = currentRole === "admin";
              const isSeeker = currentRole === "seeker";

              return (
                <Table.Row className="border-b border-neutral-900 hover:bg-zinc-900/20 transition-colors duration-150">
                  {/* User Name & Image fallback */}
                  <Table.Cell className="py-4 pl-6">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <Avatar.Image
                          src={item?.image}
                          alt={item?.name}
                          className="object-cover"
                        />
                        <Avatar.Fallback>
                          {item?.name?.charAt(0) || "U"}
                        </Avatar.Fallback>
                      </Avatar>
                      <span className="text-sm font-semibold text-zinc-100 truncate max-w-[180px]">
                        {item?.name || "Anonymous"}
                      </span>
                    </div>
                  </Table.Cell>

                  {/* Email Address */}
                  <Table.Cell className="py-4 text-zinc-400 text-sm">
                    {item?.email || "N/A"}
                  </Table.Cell>

                  {/* Role with Pill Badge */}
                  <Table.Cell className="py-4">
                    <div 
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold capitalize border transition-all ${
                        isAdmin 
                          ? "bg-amber-500/10 text-amber-400 border-amber-500/30 shadow-[0_0_12px_rgba(245,158,11,0.1)]" 
                          : isRecruiter 
                            ? "bg-sky-500/10 text-sky-400 border-sky-500/30" 
                            : "bg-zinc-800 text-zinc-300 border-zinc-700"
                      }`}
                    >
                      {isAdmin ? (
                        <LuUserCog size={12} />
                      ) : isRecruiter ? (
                        <LuBriefcase size={12} />
                      ) : (
                        <LuUser size={12} />
                      )}
                      {item?.role || "Seeker"}
                    </div>
                  </Table.Cell>

                  {/* Join Date - 🎯 whitespace-nowrap যোগ করা হয়েছে যাতে সিঙ্গেল লাইনে থাকে */}
                  <Table.Cell className="py-4 text-zinc-400 text-xs font-medium whitespace-nowrap">
                    {formatDate(item?.createdAt)}
                  </Table.Cell>

                  {/* Status Badges */}
                  <Table.Cell className="py-4">
                    <div
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full ${statusStyles}`}
                    >
                      <span className="w-1 h-1 rounded-full bg-current" />
                      <span className="text-[11px] font-bold capitalize">
                        {item?.status || "Active"}
                      </span>
                    </div>
                  </Table.Cell>

                  {/* Actions Area */}
                  <Table.Cell className="py-4 text-center pr-6">
                    <div className="flex items-center justify-center gap-2">
                      
                      {!isSeeker && (
                        <Button
                          size="sm"
                          onClick={() => handleAction(item.key, "seeker")}
                          className="bg-zinc-900 border border-zinc-800 text-zinc-300 hover:bg-zinc-800 text-xs font-bold rounded-lg h-8 px-2.5 transition-all duration-200"
                        >
                          Make Seeker
                        </Button>
                      )}

                      {!isRecruiter && (
                        <Button
                          size="sm"
                          onClick={() => handleAction(item.key, "recruiter")}
                          className="bg-sky-950/10 border border-sky-900/30 text-sky-400 hover:bg-sky-900/30 text-xs font-bold rounded-lg h-8 px-2.5 transition-all duration-200"
                        >
                          Make Recruiter
                        </Button>
                      )}
                      
                      {!isAdmin && (
                        <Button
                          size="sm"
                          onClick={() => handleAction(item.key, "admin")}
                          className="bg-amber-950/10 border border-amber-900/30 text-amber-400 hover:bg-amber-900/30 text-xs font-bold rounded-lg h-8 px-2.5 transition-all duration-200"
                        >
                          Make Admin
                        </Button>
                      )}

                      {currentStatus === "suspended" ? (
                        <Button
                          size="sm"
                          onClick={() => handleAction(item.key, "Activate")}
                          className="bg-emerald-950/10 border border-emerald-900/30 text-emerald-400 hover:bg-emerald-900/30 text-xs font-bold rounded-lg h-8 px-2.5 transition-all duration-200"
                        >
                          Activate
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          onClick={() => handleAction(item.key, "Suspend")}
                          className="bg-rose-950/10 border border-rose-900/30 text-rose-400 hover:bg-rose-900/30 text-xs font-bold rounded-lg h-8 px-2.5 transition-all duration-200"
                        >
                          Suspend
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

      {/* Pagination Footer */}
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
              users
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

export default UserTable;
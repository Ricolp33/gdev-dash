"use client";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import {  Prod } from "@/constants/data";
import { Checkbox } from "@/components/ui/checkbox";
import { tr } from "date-fns/locale";

// header: ({ table }) => (
//   <Checkbox
//     checked={table.getIsAllPageRowsSelected()}
//     onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
//     aria-label="Select all"
//   />
// ),
// cell: ({ row }) => (
//   <Checkbox
//     checked={row.getIsSelected()}
//     onCheckedChange={(value) => row.toggleSelected(!!value)}
//     aria-label="Select row"
//   />
// ),

export const columns: ColumnDef<Prod>[] = [
  {
    id: "select",
    enableSorting: false,
    enableHiding: false,

    
  },
  
  // {
  //   accessorKey: "id",
  //   header: "ID",
  // },
  {
    accessorKey: "product_name",
    header: "Product name",
  },
  {
    accessorKey: "server_ip1",
    header: "Server IP",
  },
  {
    accessorKey: "server_ip2",
    header: "Devserver IP",
  },
  {
    accessorKey: "updated_time",
    header: "Last Updated",
  },
  {
    accessorKey: "created_time",
    header: "Added At",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];

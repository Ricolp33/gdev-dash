"use client";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import {  Prod } from "@/constants/data";
import { Checkbox } from "@/components/ui/checkbox";

export const columns: ColumnDef<Prod>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "product_name",
    header: "Product name",
  },
  {
    accessorKey: "serverip1",
    header: "Server IP",
  },
  {
    accessorKey: "serverip2",
    header: "Devserver IP",
  },
  {
    accessorKey: "updated_at",
    header: "Last Updated",
  },
  {
    accessorKey: "added_at",
    header: "Added At",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];

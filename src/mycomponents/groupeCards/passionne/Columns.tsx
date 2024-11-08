import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "./DataTableColumnHeader";
import { format } from "date-fns";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  name: string;
  email: string;
  motsDepasse: string;
  sexe: string;
  birthDay: string;
  phone: string;
  dateCreation: string;
  dateMiseAJour: string;
  status: string;
  image: string;
  id: string;
  nombrePartage: number;
  nombreLikes: number;
  nombreCommentaire: number;
  /* status: "pending" | "processing" | "success" | "failed";
  email: string; */
};

export const columns: ColumnDef<Payment>[] = [
  /*  {
    accessorKey: "name",
    header: () => <div className="text-left">Name</div>,
    enableHiding: true,
    id: "name",
  }, */
  {
    accessorKey: "name",
    header: () => <div className="text-left">Nom</div>,
    cell: ({ row }) => {
      return (
        <div className=" min-w-[150px] flex items-center gap-1 ">
          <img
            src={row.original.image}
            alt="AV"
            className="flex-shrink-0 self-start rounded-full w-[30px] h-[30px] object-cover "
          />

          <div className="flex flex-col flex-wrap  ">
            <p>{row.original.name.split(" ")[0]} </p>
            <p className="text-[10px] bg-[#fff700] rounded-md p-[2px] leading-[10px] ">
              nous a rejoint le{" "}
              <span>
                {format(new Date(row.original.dateCreation), "dd MMM yyyy")}
              </span>
            </p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "nombrePartage",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Partages"
        icon={<span className="icon-[prime--book] mr-1 text-xl"></span>}
      />
    ),
    cell: ({ row }) => {
      return (
        <div className=" w-full flex items-center justify-center ">
          {!!row.original.nombrePartage ? row.original.nombrePartage : "-"}
        </div>
      );
    },
  },
  {
    accessorKey: "nombreCommentaire",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Commentaires"
        icon={<span className="icon-[vaadin--comment] text-xl mr-1"></span>}
      />
    ),
    cell: ({ row }) => {
      return (
        <div className=" w-full flex items-center justify-center ">
          {!!row.original.nombreCommentaire
            ? row.original.nombreCommentaire
            : "-"}
        </div>
      );
    },
  },
  {
    accessorKey: "nombreLikes",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Likes"
        icon={<span className="icon-[si-glyph--like] mr-1 text-xl"></span>}
      />
    ),
    cell: ({ row }) => {
      return (
        <div className=" w-full flex items-center justify-center ">
          {!!row.original.nombreLikes ? row.original.nombreLikes : "-"}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.name)}
            >
              Copy nom utilisateur
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Détails utilisateur </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
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
];

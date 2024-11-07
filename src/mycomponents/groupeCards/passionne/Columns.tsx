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
  {
    accessorKey: "name",
    header: () => <div className="text-right">Nom</div>,
    cell: ({ row }) => {},
  },
  {
    accessorKey: "nombrePartage",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Partages" />
    ),
  },
  {
    accessorKey: "nombreCommentaire",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Commentaires" />
    ),
    /*  cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    }, */
  },
  {
    accessorKey: "nombreLikeslikes",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Likes" />
    ),
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

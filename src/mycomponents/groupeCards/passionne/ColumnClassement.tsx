import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { MembreData } from "seedAndGetData/seedData";
//import { DataTableColumnHeader } from "./DataTableColumnHeader";

/* export interface MembreData {
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
    nombreDeMerciBenis: number;
    nombreDactivite: number;
    nombreDeBadge: number;
  } */

export const columnsClassement: ColumnDef<MembreData>[] = [
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
    accessorKey: "id",
    header: () => <div className="text-left">Position</div>,
    cell: (info) => <span> {info.row.index + 1} </span>,
  },
  {
    accessorKey: "nombreDeMerciBenis",
    header: () => <div className="text-left">Mercis bénis</div>,
    cell: ({ row }) => {
      return (
        <div className=" w-full flex items-center justify-center ">
          {!!row.original.nombreDeMerciBenis
            ? row.original.nombreDeMerciBenis
            : "-"}
        </div>
      );
    },
  },
  {
    accessorKey: "nombreDeBadge",
    header: () => <div className="text-left">Badges</div>,
    cell: ({ row }) => {
      return (
        <div className=" w-full flex items-center justify-center ">
          {!!row.original.nombreDeBadge ? row.original.nombreDeBadge : "-"}
        </div>
      );
    },
  },
  {
    accessorKey: "nombreDactivite",
    header: () => <div className="text-left">Activité</div>,
    cell: ({ row }) => {
      return (
        <div className=" w-full flex items-center justify-center ">
          {!!row.original.nombreDactivite ? row.original.nombreDactivite : "-"}
        </div>
      );
    },
  },
];

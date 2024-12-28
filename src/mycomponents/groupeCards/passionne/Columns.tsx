import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";

import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "./DataTableColumnHeader";
import { format } from "date-fns";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import clsx from "clsx";
import { determineFileType, getFileUrlAndType } from "@/lib/utils";
import {
  getAllSenderReceiverMessage,
  GroupeDataType,
  MembreData,
  MessageData,
  postPrivateMessageByUser,
  requestToDeleteUniversalDataWithId,
} from "../../../../seedAndGetData/seedData";
import { toast } from "@/hooks/use-toast";
import { context } from "@/App";
import axios from "axios";
import { formatDateWithString } from "@/lib/formatDate";
import { auth } from "../../../../firebaseConfig";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  name: string;
  email: string;
  motsDepasse: string;
  sexe: string;
  birthDay: string;
  phone: string;
  dateOfCreation?: string;
  dateOfUpdate?: string;
  id?: string;
  communityId?: string;
  groupeId?: string[];
  status: string;
  image: string;
  nombrePartage: number;
  nombreLikes: number;
  nombreCommentaire: number;
  groupeValue: GroupeDataType;
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

  /* 

   const [_, dispatch] = useContextReducer();
  
    <div className="relative">
          <Button
            variant="ghost"
            className="h-8 w-8 p-0 focus:bg-black/30 hover:bg-black/30"
            onClick={() =>
              dispatch({ type: "openPrev", payload: row.original.name })
            }
          >
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
  
  */
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
                {format(
                  new Date(row.original.dateOfCreation as string),
                  "dd MMM yyyy"
                )}
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
      const [open, setOpen] = useState(false);
      const [openInfo, setOpenInfo] = useState(false);
      const openPrivateDiscution = () => {
        setOpen(true);
      };
      return (
        <div className="relative">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="h-8 w-8 p-0 focus:bg-black/30 hover:bg-black/30 text-black bg-white">
                <span className="icon-[tabler--dots-vertical] text-xl"></span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="relative w-[180px] bg-slate-50 shadow-2xl border-[1px] border-solid rounded-md z-50 -translate-x-[60px] translate-y-[10px]">
              <DropdownMenuItem
                className=" itemDrop hover:bg-black/30 cursor-pointer w-full py-1.5 pl-1 rounded-sm flex items-center "
                onClick={() => setOpenInfo(true)}
              >
                <p className="iconDrop">
                  <span className="icon-[entypo--info] self-center "></span>
                </p>
                <span>Membre info</span>
              </DropdownMenuItem>
              {row.original.email !== auth.currentUser?.email && (
                <DropdownMenuItem
                  className="itemDrop hover:bg-black/30 cursor-pointer w-full py-1.5 pl-1 rounded-sm flex items-center gap-1"
                  onClick={openPrivateDiscution}
                >
                  <p className="iconDrop">
                    {" "}
                    <span className="icon-[hugeicons--message-02] text-xl"></span>
                  </p>{" "}
                  <span> Discuter en privée </span>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
          {open && (
            <PrivateMessageComponent row={row.original} setOpen={setOpen} />
          )}

          {openInfo && (
            <InfoMembre membre={row.original} setOpenInfo={setOpenInfo} />
          )}
        </div>
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

export default function PrivateMessageComponent({
  row,
  setOpen,
}: {
  row: Payment;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [minimize, setMinimize] = useState(false);
  const [myFile, setMyFile] = useState<
    { file: File; src: string | ArrayBuffer | null | undefined }[]
  >([]);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const userAmin = useContext(context);
  const [myUser, setMyUser] = useState<MembreData>();
  const [sendReceiveMessage, setSendReceiveMessage] = useState<MessageData[]>();
  const [text, setText] = useState("");

  const [desableButton, setDisableButton] = useState(false);
  const [loadingFail, setLoadingFail] = useState(false);
  const [startLoading, setStartLoading] = useState(false);
  const handleMinimize = () => {
    if (minimize) {
      setMinimize(false);
    }
  };

  const handleText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setText(e.target.value);
  };

  const sendMessage = async () => {
    try {
      setDisableButton(true);
      if (!myUser) {
        toast({
          variant: "destructive",
          title: "Erreur",
          description: "Aucun utilisateur associé à cette section",
        });
        setDisableButton(false);
        return;
      }

      if (auth.currentUser) {
      }
      const objectFile =
        myFile.length > 0
          ? await getFileUrlAndType(myFile[0].file)
          : { url: "", typeFile: "" };
      if (!objectFile.url && myFile.length > 0) {
        setDisableButton(false);
        toast({
          variant: "destructive",
          title: "Erreur",
          description: "Une erreur est survenue, Vérifier votre connexion",
        });
        return;
      }
      const data: MessageData = {
        userId: myUser.id as string,
        userName: myUser.name,
        userAvatar: myUser.image,
        userEmail: myUser.email,
        text,
        photo: objectFile.typeFile === "Image" ? objectFile.url : "",
        audio: objectFile.typeFile === "Audio" ? objectFile.url : "",
        video: objectFile.typeFile === "Video" ? objectFile.url : "",
        userLikes: [],
        groupeName: row.groupeValue.titleGroupe,
        groupeId: row.groupeValue.id,
        communityId: row.communityId as string,
        typeMessage: "private",
        othersFile:
          objectFile.typeFile === "PDF Document" ||
          objectFile.typeFile === "Text Document" ||
          objectFile.typeFile === "Unknown File Type"
            ? objectFile.url
            : "",
        userReceiverId: row.id,
        userReceiverEmail: row.email,
      };

      console.log(data);

      const result = await postPrivateMessageByUser(
        data,
        row.groupeValue.id as string
      );
      if (result.success) {
        const senderReceiverMessage = await getAllSenderReceiverMessage(
          myUser.id as string,
          row.id as string
        );
        setSendReceiveMessage([...senderReceiverMessage]);
        setText("");
        setMyFile([]);
        setDisableButton(false);
      }
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description:
          "Une erreur est survenue pendant l'envoie du message, vérifier votre connexion",
      });
      setDisableButton(false);
    }
  };

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target.files;
    if (files?.length && files?.length > 0) {
      for (let file of files) {
        const reader = new FileReader();
        reader.onload = function (e) {
          const data = {
            file,
            src: e.target?.result,
          };
          setMyFile([data]);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleCloseFile = (fich: File) => {
    const result = myFile.filter((elt) => elt.file.name !== fich.name);
    setMyFile([...result]);
  };

  useEffect(() => {
    const getPrivateData = async () => {
      try {
        setStartLoading(true);
        const myUsers = await axios.post(
          "https://serverbackofficetrucdejesus.onrender.com/api/frontoffice/getmemberwithemail",
          { email: userAmin?.email }
        );

        /* 
        http://localhost:4000
        https://serverbackofficetrucdejesus.onrender.com
         */
        setMyUser({ ...(myUsers.data.data as MembreData) });

        const senderReceiverMessage = await getAllSenderReceiverMessage(
          myUsers.data.data.id as string,
          row.id as string
        );

        setSendReceiveMessage([...senderReceiverMessage]);
        setStartLoading(false);
      } catch (error) {
        setStartLoading(false);
        setLoadingFail(true);
      }
    };
    getPrivateData();
  }, []);

  return (
    <div
      className={clsx(
        "fixed   flex flex-col bg-white z-[10000000] ",
        { "right-2": minimize },
        { "bottom-2": minimize },
        { "w-[60px]": minimize },
        { "h-[60px] ": minimize },
        { "w-[340px]": !minimize },
        { "h-[450px] ": !minimize },
        { "right-7  ": !minimize },
        { "bottom-0 ": !minimize }
      )}
    >
      <div className="flex items-center justify-between p-2 shadow-2xl">
        <div className="flex items-center gap-2" onClick={handleMinimize}>
          <img
            src={row.image}
            alt=""
            className={clsx("object-cover w-[32px] h-[32px] rounded-full ", {
              "cursor-pointer": minimize,
            })}
          />
          {minimize && (
            <div className="w-[5px] h-[5px] rounded-full bg-green-700 "></div>
          )}

          <p className={clsx({ hidden: minimize })}>
            <strong> {row.name} </strong>{" "}
          </p>
        </div>

        <div className={clsx("flex items-center gap-1", { hidden: minimize })}>
          <div
            className="flex items-center justify-center w-[20px] h-[20px] rounded-full text-[#000]/60 hover:bg-[#000]/30 hover:text-blue-700 "
            onClick={() => {
              setMinimize(true);
              setLoadingFail(false);
            }}
          >
            <span className="icon-[material-symbols--remove-rounded]"></span>
          </div>
          <div
            className="flex items-center justify-center w-[20px] h-[20px] rounded-full text-[#000]/60 hover:bg-[#000]/30 hover:text-blue-700"
            onClick={() => {
              setOpen(false);
              setLoadingFail(false);
            }}
          >
            <span className="icon-[line-md--remove]"></span>
          </div>
        </div>
      </div>
      {startLoading ? (
        <div className="flex-1 flex items-center justify-center">
          <span className="icon-[line-md--loading-twotone-loop] text-2xl text-[#fff700]"></span>
        </div>
      ) : loadingFail ? (
        <div className="flex flex-1 items-center justify-center ">
          {" "}
          Un porblème est survenue. Vérifier votre connexion
        </div>
      ) : (
        <div
          className={clsx("flex-1 flex flex-col overflow-y-auto", {
            hidden: minimize,
          })}
        >
          <div className="flex flex-col w-full items-end">
            {sendReceiveMessage?.map((val) => {
              let urlName = "";
              const url = !!val.audio
                ? val.audio
                : !!val.photo
                ? val.photo
                : !!val.video
                ? val.video
                : val.othersFile;
              url.split("/").forEach((value) => {
                if (value.includes("images")) {
                  urlName = value
                    .replace("images", "")
                    .replace("%2F", "")
                    .split("?")[0];
                }
              });
              const deleteMessage = async () => {
                try {
                  setLoadingDelete(true);
                  const result = await requestToDeleteUniversalDataWithId(
                    val.id as string,
                    "MessageData"
                  );
                  if (!result.success) {
                    toast({
                      variant: "destructive",
                      title: "Erreur",
                      description:
                        "Une erreur est survenue vérifier votre connexion",
                    });

                    setLoadingDelete(false);
                    return;
                  }
                  const senderReceiverMessage =
                    await getAllSenderReceiverMessage(
                      myUser?.id as string,
                      row.id as string
                    );
                  setSendReceiveMessage([...senderReceiverMessage]);
                  setLoadingDelete(false);
                } catch (error) {
                  toast({
                    variant: "destructive",
                    title: "Erreur",
                    description:
                      "Une erreur est survenue vérifier votre connexion",
                  });
                  setLoadingDelete(false);
                }
              };

              return (
                <div className="relative parentdelete flex items-center gap-1 p-2 flex-[70px] ">
                  <div
                    className="delete w-[30px] h-[30px] flex  items-center justify-center cursor-pointer "
                    onClick={deleteMessage}
                  >
                    {loadingDelete ? (
                      <span className="icon-[line-md--loading-twotone-loop]"></span>
                    ) : (
                      <span className="icon-[wpf--delete] text-xl deleteChild  "></span>
                    )}
                  </div>
                  <div className="mt-2 flex flex-col gap-1 w-[180px] p-2 bg-[#edf7e8] ">
                    <div className="flex items-center gap-2 text-black">
                      <p> {val.text} </p>
                    </div>
                    {url && (
                      <a
                        download
                        href={url}
                        target="_blank"
                        className="w-full px-1.5 py-2.5 rounded-xl text-[#000] bg-[#edf7e8] hover:bg-[#c9f7b2] border-[1px] border-solid border-[#c1f7a5] cursor-pointer text-ellipsis overflow-clip "
                      >
                        {urlName}
                      </a>
                    )}
                  </div>
                  <div className="absolute top-0 right-1 p-1 bg-transparent flex items-center">
                    <p>
                      {" "}
                      {formatDateWithString(val.dateOfCreation as string)}{" "}
                    </p>
                    <img
                      src={val.userAvatar}
                      alt=""
                      className="w-[32px] h-[32px] object-cover rounded-full "
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div className={clsx("flex-1 flex flex-col-reverse overflow")}>
            {myFile.map((file) => (
              <div className="flex flex-col w-full gap-2 ">
                {determineFileType(file.file) === "Image" ? (
                  <div className="relative flex flex-col gap-1">
                    <img
                      src={file.src as string}
                      alt=""
                      className="w-[140px] h-[70px] object-cover rounded-md"
                    />
                    <div className="flex items-center flex-nowrap overflow-clip w-full">
                      <span className="icon-[majesticons--image]"></span>
                      <p> {file.file.name} </p>
                    </div>
                    <div
                      className="absolute flex items-center justify-center w-[20px] h-[20px] rounded-full text-white  bg-transparent top-1 left-1 "
                      onClick={() => handleCloseFile(file.file)}
                    >
                      <span className="icon-[line-md--remove]"></span>
                    </div>
                  </div>
                ) : determineFileType(file.file) === "Audio" ? (
                  <div className="relative flex flex-col gap-1 ">
                    {file.src && <audio controls src={file.src as string} />}
                    <div
                      className="absolute flex items-center justify-center w-[20px] h-[20px] rounded-full text-black  bg-black/30 cursor-pointer hover:text-red-700 top-1 left-1 "
                      onClick={() => handleCloseFile(file.file)}
                    >
                      <span className="icon-[line-md--remove]"></span>
                    </div>
                    <p className="ml-2 -translate-y-5"> {file.file.name} </p>
                  </div>
                ) : determineFileType(file.file) === "Video" ? (
                  <div className="relative flex flex-col">
                    {file.src && (
                      <video
                        controls
                        src={file.src as string}
                        className="w-[140px] h-[70px] object-cover "
                      />
                    )}
                    <p className=" -translate-y-0"> {file.file.name} </p>
                    <div
                      className="absolute flex items-center justify-center w-[20px] h-[20px] rounded-full text-black bg-white/60 cursor-pointer hover:text-red-700  top-1 left-1 "
                      onClick={() => handleCloseFile(file.file)}
                    >
                      <span className="icon-[line-md--remove]"></span>
                    </div>
                  </div>
                ) : (
                  <div className="relative flex flex-col gap-1 bg-white/30">
                    <div
                      className="absolute flex items-center justify-center w-[20px] h-[20px] rounded-full text-white bg-black/30 cursor-pointer hover:text-red-700  top-1 left-1 "
                      onClick={() => handleCloseFile(file.file)}
                    >
                      <span className="icon-[line-md--remove]"></span>
                    </div>
                    <p className=""> {file.file.name} </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {
        <div
          className={clsx("flex items-center justify-between", {
            hidden: minimize,
          })}
        >
          <div className="flex items-center justify-center p-1 cursor-pointer">
            <div className="flex items-center justify-center p-1 ">
              <label htmlFor="downloadFile" className="cursor-pointer">
                <span className="icon-[tdesign--attach] text-2xl "></span>
              </label>
              <input
                placeholder="file"
                type="file"
                id="downloadFile"
                className="hidden"
                onChange={handleFile}
                disabled={desableButton}
              />
            </div>
          </div>
          <div className="flex-1">
            <textarea
              placeholder="Saisir un message"
              className="focus:outline-none w-full p-2"
              onChange={handleText}
              value={text}
              disabled={desableButton}
            />
          </div>

          <button
            type="button"
            title="Envoyer"
            className="flex items-center justify-center p-1 "
            onClick={sendMessage}
            disabled={desableButton}
          >
            {desableButton ? (
              <span className="icon-[eos-icons--loading]"></span>
            ) : (
              <span className="icon-[mingcute--send-plane-fill] text-2xl"></span>
            )}
          </button>
        </div>
      }
    </div>
  );
}

export const InfoMembre = ({
  membre,
  setOpenInfo,
}: {
  membre: Payment;
  setOpenInfo: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className=" top-[50%] left-[50%] z-[200000000] fixed w-[90%] sm:w-[350px] max-h-[350px] flex flex-col p-2 rounded-md shadow-2xl bg-black/80 text-white">
      <div
        className="flex flex-row-reverse w-full  "
        onClick={() => setOpenInfo(false)}
      >
        <div className="flex items-center justify-center w-[30px] h-[30px] text-black bg-slate-50 hover:text-red-500 rounded-full ">
          <span className="icon-[line-md--remove] text-xl"></span>
        </div>
      </div>
      <div className="w-full flex-1 flex flex-col gap-2">
        <p> Nom : {membre.name}</p>
        <p>Email : {membre.email} </p>
        <p> Date de naissance : {membre.birthDay}</p>
        <p> Sexe : {membre.sexe} </p>
        <p>Telephone : {membre.phone} </p>
      </div>
    </div>
  );
};

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { videoTransformer } from "@/lib/videoTransformer";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import {
  CommentaireData,
  getAllCommentaireData,
  getAllMessageData,
  getMessageWithId,
  GroupeDataType,
  MembreData,
  MessageData,
  postCommentaireByUser,
  requestToDeleteUniversalDataWithId,
  updateMessagewithLike,
} from "../../../seedAndGetData/seedData";
import CommentaireComponent from "./CommentaireComponent";
import { Input } from "@/components/ui/input";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import clsx from "clsx";
import { ButtonUploadFileForComment } from "./ButtonUploadfileForComment";
import { formatDateWithString } from "@/lib/formatDate";
import { toast } from "@/hooks/use-toast";
import { auth } from "../../../firebaseConfig";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  AlertDialog,
  /*  AlertDialogAction, */ AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { UpdateMessageComponent } from "./UpdateMessageComponent";

function MessageCards({
  value,
  membreOfData,
  setMessagesData,
  groupeValue,
}: {
  value: MessageData;
  membreOfData: MembreData[];
  setMessagesData: React.Dispatch<React.SetStateAction<MessageData[]>>;
  groupeValue: GroupeDataType;
}) {
  /*  const user = {
    userAvatar: faker.image.avatar(),
    userName: faker.person.firstName(),
    userId: faker.string.uuid(),
  }; */

  const [commentairesData, setCommentairesData] = useState<CommentaireData[]>(
    []
  );
  const [openCommentaire, setOpenCommentaire] = useState(false);
  const [stateMessage, setStateMessage] = useState<MessageData>({ ...value });
  const [textCommentaire, setTextCommentaire] = useState("");
  const [imageCommentaire, setImageCommentaire] = useState("");
  const [stateDownload, setStateDownload] = useState(false);
  const [putHidden, setPutHidden] = useState(false);
  const [desableButton, setDisableButton] = useState(false);
  const [startSendLike, setStartSendLike] = useState(false);
  const [deleteAction, setDeleteAction] = useState(false);
  const [openAlertDelete, setOpenAlertDelete] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const handleHidenEmoji = () => {
    setPutHidden((prev) => !prev);
  };
  const handleEmoji = (value: EmojiClickData) => {
    if (inputRef.current) {
      const start = inputRef.current.selectionStart as number;
      const end = inputRef.current.selectionEnd as number;
      const textBeforeCursor = textCommentaire.slice(0, start);
      const textAfterCursor = textCommentaire.slice(end);
      const newText = textBeforeCursor + value.emoji + textAfterCursor;
      setTextCommentaire(newText); // Move cursor position to after the newly added emoji
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.selectionStart = start + value.emoji.length;
          inputRef.current.selectionEnd = start + value.emoji.length;
          inputRef.current.focus();
        }
      }, 0);
    }
  };

  const handleOpenCommentaire = () => {
    setOpenCommentaire((prev) => !prev);
  };

  const handleTextCommentaire = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setTextCommentaire(e.target.value);
  };

  const sendCommentaire = async () => {
    const commentData: CommentaireData = {
      text: textCommentaire,
      image: imageCommentaire,
      messageId: value.id as string,
      userId: membreOfData[0].id as string,
      userAvatar: membreOfData[0].image,
      userName: membreOfData[0].name,
      userLikes: [],
      idOfUserThatWithReply: "",
      nameOfUserThatWithReply: "",
      textOfUserThatWithReply: "",
    };
    try {
      setDisableButton(true);
      await postCommentaireByUser(commentData);
      const result = await getAllCommentaireData(value.id as string);
      if (result) {
        setCommentairesData([...result]);
        setTextCommentaire("");
        setImageCommentaire("");
        setDisableButton(false);
        return;
      }
    } catch (error) {
      setDisableButton(false);
      toast({
        variant: "destructive",
        title: "Erreur",
        description:
          "Une erreur est survenue pendant l'envoie du message, vérifier votre connexion",
      });
    }
  };
  const handleLike = async () => {
    try {
      setStartSendLike(true);
      const result = await updateMessagewithLike(
        membreOfData[0].id as string,
        value.id as string
      );
      if (result?.success) {
        const result2 = await getMessageWithId(value.id as string);

        if (result2) {
          setStateMessage({ ...result2 });
          setStartSendLike(false);
          return;
        } else {
          setStartSendLike(false);
          toast({
            variant: "destructive",
            title: "Erreur",
            description: "Une erreur est survenue ",
          });
        }
      } else {
        setStartSendLike(false);
        toast({
          variant: "destructive",
          title: "Erreur",
          description: "Une erreur est survenue pendant l'envoie du message",
        });
      }
    } catch (error) {
      setStartSendLike(false);
      toast({
        variant: "destructive",
        title: "Erreur",
        description:
          "Une erreur est survenue pendant l'envoie du message, vérifier votre connexion",
      });
    }
  };

  const deleteMessage = async () => {
    try {
      setDeleteAction(true);
      const result = await requestToDeleteUniversalDataWithId(
        value.id as string,
        "MessageData"
      );
      if (result.success) {
        toast({
          title: "Success",
          description: "Le membre a été crée avec success",
        });
        /*  const total = await requestTogetAllUniversalData<MessageData>(
          "MessageData"
        ); */
        const total = await getAllMessageData(groupeValue.titleGroupe);
        setMessagesData([...total]);
        setOpenAlertDelete(false);
      }
      setDeleteAction(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description:
          "Une erreur est survenue pendant la suppression, vérifier votre connexion",
      });
      setDeleteAction(false);
    }
  };

  useEffect(() => {
    const getComment = async () => {
      const result = await getAllCommentaireData(value.id as string);
      if (result) {
        setCommentairesData([...result]);
        return;
      }
    };
    getComment();
  }, []);

  return (
    <div className="text-sm text-gray-700 dark:text-gray-100 mt-4">
      <div className="flex justify-between items-center px-1">
        <div className="flex items-center gap-2">
          {auth.currentUser && (
            <Avatar className="w-[30px] h-[30px] ">
              <AvatarImage
                src={
                  membreOfData.find(
                    (value) => value.email === auth.currentUser?.email
                  )?.image
                }
                alt=""
              />
              <AvatarFallback>
                {membreOfData
                  .find((value) => value.email === auth.currentUser?.email)
                  ?.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
          )}
          <div className="flex flex-col  text-[#000]">
            <p>{value.userName}</p>
            <p>
              {value.userName === "Administrateur" && (
                <span className="text-[12px] p-1 bg-[#fff700] rounded-[2px] mr-1 ">
                  Administrateur
                </span>
              )}
              {formatDateWithString(value.dateOfCreation as string)}
            </p>
          </div>
        </div>

        {auth.currentUser?.email === value.userEmail && (
          <Popover>
            <PopoverTrigger asChild>
              <Button className="bg-transparent text-black hover:bg-transparent ">
                <span className="icon-[mdi--dots-vertical]"></span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-2 flex flex-col gap-1 w-[140px] shadow-xl ">
              <AlertDialog open={openAlertDelete}>
                <AlertDialogTrigger asChild className="">
                  <Button
                    variant="outline"
                    onClick={() => setOpenAlertDelete(true)}
                    className="hover:bg-[#fff]/60 "
                  >
                    Supprimer
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Êtes-vous absolument sûr ?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Cette action ne peut être annulée. Elle supprimera
                      définitivement le message.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    {deleteAction && (
                      <p>Patienter la suppression est en cour...</p>
                    )}
                    <AlertDialogCancel
                      onClick={() => setOpenAlertDelete(false)}
                    >
                      Annuler
                    </AlertDialogCancel>
                    <Button onClick={deleteMessage}>Supprimer</Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              <UpdateMessageComponent
                setMessagesData={setMessagesData}
                membreOfData={membreOfData}
                value={value}
                groupeValue={groupeValue}
              />
            </PopoverContent>
          </Popover>
        )}
      </div>

      <div className="flex flex-col mt-2">
        {value.text && <p className="text whitespace-pre-wrap">{value.text}</p>}
        {value.photo && (
          <div className="image mt-2">
            <img
              src={value.photo}
              alt=""
              className="max-h-[300px] sm:max-h-[400px] w-full "
            />
          </div>
        )}
        {value.video && (
          <div className="video relative ">
            <iframe
              id="about_mp_video_src"
              title="vimeo-player"
              src={videoTransformer(value.video)}
              className="w-full min-h-[300px] sm:min-h-[400px]"
              frameBorder="0"
              allowFullScreen
            ></iframe>
            <p className="absolute bottom-2 left-1 text-white text-[15px] px-1 py-2 bg-[#000]/40 font-bold">
              {" "}
              {/*  <a
                title="Regarder sur Youtube"
                href={videoTransformer(value.video)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1"
              >
                <p> Regarder sur</p>{" "}
                <span className="icon-[whh--youtube] text-[#fff] "></span>
                <p>YouTube</p>
              </a>{" "} */}
            </p>
          </div>
        )}
        {value.audio && (
          <div className="audio">
            <figure>
              <audio controls src={value.audio}></audio>
            </figure>
          </div>
        )}
      </div>
      <div className="flex items-center justify-start flex-wrap gap-3 w-full text-[#000] border-solid border-t-[1px] border-b-[1px] border-[#000]/30 mt-2 py-2">
        <Button
          className=" text-center p-1 bg-[#fff] text-[#000] hover:bg-[#fff]/60 disabled:bg-[#fff]/50 "
          onClick={handleLike}
          disabled={startSendLike}
        >
          <span className="icon-[si-glyph--like] text-xl  "></span>{" "}
          {!startSendLike ? (
            <>
              {" "}
              <span className="hidden sm:inline">Liker</span>
              <span>
                {stateMessage?.userLikes?.length
                  ? stateMessage?.userLikes.length
                  : 0}
              </span>
            </>
          ) : (
            <span className="icon-[eos-icons--three-dots-loading] text-xl"></span>
          )}
        </Button>
        <Button
          onClick={handleOpenCommentaire}
          className="bg-[#fff] text-[#000] hover:bg-[#fff]/60  text-center p-1"
        >
          <span className="icon-[iconamoon--comment-dots-fill]  "></span>{" "}
          <span className="hidden sm:inline">Commentaires</span> (
          {commentairesData.length})
        </Button>
        <Button className="bg-[#fff] text-[#000] hover:bg-[#fff]/60  text-center p-1">
          <span className="icon-[material-symbols--share] "></span>{" "}
          <span className="hidden sm:inline">Partager</span>
        </Button>
      </div>
      <div className="flex flex-col gap-2 mt-3 py-3 ">
        <div className="flex items-center gap-2">
          <Avatar className="w-[30px] h-[30px] flex items-center justify-center ">
            <span className="icon-[bi--person-circle] text-2xl"></span>
          </Avatar>
          <div className=" flex-1  flex items-center gap-2 flex-wrap">
            <Input
              ref={inputRef}
              type="text"
              placeholder="Ajouter un commentaire"
              className="flex-1 border-none text-[#000] px-[12px] py-[8px] focus:border-none focus:outline-none disabled:bg-[#fff]/40 "
              value={textCommentaire}
              onChange={handleTextCommentaire}
              disabled={desableButton}
            />
            <div className=" relative flex items-center justify-start gap-2">
              <div className="py-2 z-50 ">
                <span
                  className="icon-[fa6-regular--face-smile] text-xl cursor-pointer text-[#bd10e0] "
                  onClick={handleHidenEmoji}
                ></span>
              </div>
              <div
                className={clsx("absolute top-7 -right-8 p-0", {
                  hidden: !putHidden,
                })}
              >
                <EmojiPicker
                  open={putHidden && !desableButton}
                  searchDisabled={true}
                  width={300}
                  height={280}
                  className="styleEmoji"
                  onEmojiClick={(value) => handleEmoji(value)}
                />
              </div>

              <div>
                <ButtonUploadFileForComment
                  label="cards message"
                  key="button211"
                  setImageUrl={setImageCommentaire}
                  setStateDownloadProps={setStateDownload}
                  stateDownloadProps={stateDownload}
                  desableButton={desableButton}
                />
                {imageCommentaire && <img src={imageCommentaire} alt="" />}
              </div>

              <Button
                className="border-none bg-transparent hover:bg-transparent"
                onClick={sendCommentaire}
                disabled={desableButton}
              >
                {desableButton ? (
                  <span className="icon-[eos-icons--three-dots-loading] text-[#000]  text-xl"></span>
                ) : (
                  <span className="icon-[mingcute--send-plane-fill] text-[#000] text-xl "></span>
                )}
              </Button>
            </div>
          </div>
        </div>
        {openCommentaire &&
          commentairesData.map((commentaireData) => (
            <CommentaireComponent
              commentaireData={commentaireData}
              setCommentairesData={setCommentairesData}
              membreOfData={membreOfData}
            />
          ))}
      </div>
    </div>
  );
}

export default MessageCards;

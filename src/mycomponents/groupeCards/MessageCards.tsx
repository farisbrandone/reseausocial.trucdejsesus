import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { videoTransformer } from "@/lib/videoTransformer";
import { format } from "date-fns";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import {
  CommentaireData,
  getAllCommentaireData,
  getMessageWithId,
  MembreData,
  MessageData,
  postCommentaireByUser,
  updateMessagewithLike,
} from "../../../seedAndGetData/seedData";
import CommentaireComponent from "./CommentaireComponent";
import { faker } from "@faker-js/faker";
import { Input } from "@/components/ui/input";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import clsx from "clsx";
import { ButtonUploadFileForComment } from "./ButtonUploadfileForComment";

function MessageCards({
  value,
  membreOfData,
}: {
  value: MessageData;
  membreOfData: MembreData[];
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
      messageId: value.id,
      userId: membreOfData[0].id,
      userAvatar: membreOfData[0].image,
      userName: membreOfData[0].name,
      id: "",
      userLikes: [],
      date: "",
      idOfUserThatWithReply: "",
      nameOfUserThatWithReply: "",
      textOfUserThatWithReply: "",
    };
    try {
      await postCommentaireByUser(commentData);
      const result = await getAllCommentaireData(value.id);
      if (result) {
        setCommentairesData([...result]);
        return;
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleLike = async () => {
    try {
      const result = await updateMessagewithLike(membreOfData[0].id, value.id);
      const result2 = await getMessageWithId(value.id);
      if (result2) {
        setStateMessage({ ...result2 });
      }
      if (result.success) {
      }
    } catch (error) {}
  };

  useEffect(() => {
    const getComment = async () => {
      const result = await getAllCommentaireData(value.id);
      if (result) {
        setCommentairesData([...result]);
        return;
      }
    };
    getComment();
  }, []);

  return (
    <div className="text-sm text-gray-700 dark:text-gray-100 mt-4">
      <div className="flex items-center gap-2">
        <Avatar className="w-[30px] h-[30px] ">
          <AvatarImage src={membreOfData[0].image} alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex flex-col  text-[#000]">
          <p>{value.userName}</p>
          <p>
            {value.userName === "Administrateur" && (
              <span className="text-[12px] p-1 bg-[#fff700] rounded-[2px] mr-1 ">
                Administrateur
              </span>
            )}
            {format(new Date(value.date), "'publié le' dd/MM/yyyy")}
          </p>
        </div>
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
          className=" text-center p-1 bg-[#fff] text-[#000] hover:bg-[#fff]/60 "
          onClick={handleLike}
        >
          <span className="icon-[si-glyph--like] text-xl  "></span>{" "}
          <span className="hidden sm:inline">Liker</span> (
          {stateMessage?.userLikes?.length ? stateMessage?.userLikes.length : 0}
          )
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
      <div className="flex flex-col gap-2 mt-5 py-3 ">
        <div className="flex items-center gap-2">
          <Avatar className="w-[30px] h-[30px] ">
            <AvatarImage src={faker.image.avatar()} alt="@shadcn" />
            <AvatarFallback>AV</AvatarFallback>
          </Avatar>
          <div className=" flex-1  flex items-center gap-2 flex-wrap">
            <Input
              ref={inputRef}
              type="text"
              placeholder="Ajouter un commentaire"
              className="flex-1 border-none text-[#000] px-[12px] py-[8px] focus:border-none focus:outline-none "
              value={textCommentaire}
              onChange={handleTextCommentaire}
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
                  open={putHidden}
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
                />
                {imageCommentaire && <img src={imageCommentaire} alt="" />}
              </div>

              <Button
                className="border-none bg-transparent hover:bg-transparent"
                onClick={sendCommentaire}
              >
                <span className="icon-[mingcute--send-plane-fill] text-[#000] text-xl "></span>
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

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { videoTransformer } from "@/lib/videoTransformer";
import { format } from "date-fns";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import {
  CommentaireData,
  getAllCommentaireData,
  getMessageWithId,
  MessageData,
  postCommentaireByUser,
  updateMessagewithLike,
} from "seedAndGetData/seedData";
import CommentaireComponent from "./CommentaireComponent";
import { faker } from "@faker-js/faker";
import { Input } from "@/components/ui/input";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import clsx from "clsx";
import { ButtonUploadFile2 } from "./ButtonUploadImage";

function MessageCards({ value }: { value: MessageData }) {
  const user = {
    userAvatar: faker.image.avatar(),
    userName: faker.person.firstName(),
    userId: faker.string.uuid(),
  };

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
      const inputEvent = new Event("input", { bubbles: true });
      inputRef.current.value = value.emoji;
      inputRef.current.dispatchEvent(inputEvent);
    }
    /* setTextCommentaire((prev) => prev + value.emoji); */
  };

  const handleOpenCommentaire = () => {
    setOpenCommentaire(true);
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
      userId: user.userId,
      userAvatar: user.userAvatar,
      userName: user.userName,
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
      const result = await updateMessagewithLike(user.userId, value.id);
      const result2 = await getMessageWithId(value.id);
      if (result2) {
        setStateMessage({ ...result2 });
      }
      if (result.success) {
        console.log(result);
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
        <Avatar>
          <AvatarImage src={user.userAvatar} alt="@shadcn" />
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
            <img src={value.photo} alt="" />
          </div>
        )}
        {value.video && (
          <div className="video">
            <video controls width="250">
              <source src={value.video} type="video/webm" />
              <source src={videoTransformer(value.video)} type="video/mp4" />
              Download the
              <a href={value.video}>WEBM</a>
              or
              <a href={value.video}>MP4</a>
              video.
            </video>
          </div>
        )}
        {value.audio && (
          <div className="audio">
            <figure>
              <figcaption>Listen to the T-Rex:</figcaption>
              <audio controls src={value.audio}></audio>
              <a href={value.audio}> Download audio </a>
            </figure>
          </div>
        )}
      </div>
      <div className="flex items-center justify-start flex-wrap gap-3 w-full text-[#000] ">
        <Button
          className="bg-transparent hover:bg-transparent text-center p-1"
          onClick={handleLike}
        >
          <span className="icon-[si-glyph--like] mr-1 "></span> Liker (
          {stateMessage.userLikes.length})
        </Button>
        <Button
          onClick={handleOpenCommentaire}
          className="bg-transparent hover:bg-transparent text-center p-1"
        >
          <span className="icon-[iconamoon--comment-dots-fill mr-1 "></span>{" "}
          Commentaires ({commentairesData.length})
        </Button>
        <Button className="bg-transparent hover:bg-transparent text-center p-1">
          <span className="icon-[material-symbols--share] mr-1"></span> Partager
        </Button>
      </div>
      <div className="flex flex-col gap-2 ">
        <div className="flex items-center gap-2">
          <Avatar>
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
                <ButtonUploadFile2
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
                <span className="icon-[mingcute--send-plane-fill] text-[#000] "></span>
              </Button>
            </div>
          </div>
        </div>
        {openCommentaire &&
          commentairesData.map((commentaireData) => (
            <CommentaireComponent
              commentaireData={commentaireData}
              setCommentairesData={setCommentairesData}
            />
          ))}
      </div>
    </div>
  );
}

export default MessageCards;

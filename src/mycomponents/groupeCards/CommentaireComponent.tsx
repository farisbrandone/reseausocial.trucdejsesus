import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { faker } from "@faker-js/faker";
import clsx from "clsx";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import React, { ChangeEvent, useRef, useState } from "react";
import {
  CommentaireData,
  getAllCommentaireData,
  postCommentaireByUser,
  updateCommentairewithLike,
} from "seedAndGetData/seedData";
import { ButtonUploadFile2 } from "./ButtonUploadImage";

export default function CommentaireComponent({
  commentaireData,
  setCommentairesData,
}: {
  commentaireData: CommentaireData;
  setCommentairesData: React.Dispatch<React.SetStateAction<CommentaireData[]>>;
}) {
  const [openReplyPart, setOpenReplyPart] = useState(false);

  const [textCommentaire, setTextCommentaire] = useState("");
  const [imageCommentaire, setImageCommentaire] = useState("");
  const [stateDownload, setStateDownload] = useState(false);
  const [putHidden, setPutHidden] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const user = {
    userAvatar: faker.image.avatar(),
    userName: faker.person.firstName(),
    userId: faker.string.uuid(),
  };

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

  const handleTextCommentaire = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setTextCommentaire(e.target.value);
  };

  const sendCommentaire = async () => {
    const commentData: CommentaireData = {
      text: textCommentaire,
      image: imageCommentaire,
      messageId: commentaireData.messageId,
      userId: user.userId,
      userAvatar: user.userAvatar,
      userName: user.userName,
      id: "",
      userLikes: [],
      date: "",
      idOfUserThatWithReply: commentaireData.userId,
      nameOfUserThatWithReply: commentaireData.userName,
      textOfUserThatWithReply: commentaireData.text,
    };
    try {
      await postCommentaireByUser(commentData);
      const result = await getAllCommentaireData(commentaireData.messageId);
      if (result) {
        setCommentairesData([...result]);
        setOpenReplyPart(false);
        return;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleOpendReplyPart = async () => {
    setOpenReplyPart(true);
  };

  const handleLike = async () => {
    try {
      const result = await updateCommentairewithLike(
        user.userId,
        commentaireData.id
      );
      const result2 = await getAllCommentaireData(commentaireData.messageId);
      if (result2) {
        setCommentairesData([...result2]);
        setOpenReplyPart(false);
      }
      if (result.success) {
        console.log(result);
      }
    } catch (error) {}
  };

  return (
    <div className="flex gap-2">
      {commentaireData.idOfUserThatWithReply && (
        <div className="flex flex-col h-[40px] overflow-hidden bg-[#191919] text-white mx-2 mt-1 rounded-tl-sm rounded-tr-sm ">
          <div className="flex items-center">
            <span className="icon-[fa-solid--reply] text-white"></span>
            <p> {commentaireData.textOfUserThatWithReply} </p>
          </div>
        </div>
      )}
      <Avatar>
        <AvatarImage src={commentaireData.userAvatar} alt="" />
        <AvatarFallback>
          {commentaireData.userName.slice(2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-wrap gap-2">
        <div className="flex flex-col gap-1">
          <p className="font-bold"> {commentaireData.userName} </p>
          <p className="whitespace-pre-wrap">{commentaireData.text} </p>
        </div>
        <Button
          className="bg-transparent hover:bg-transparent text-center p-1"
          onClick={handleLike}
        >
          <span className="icon-[si-glyph--like] mr-1 "></span> Liker (
          {commentaireData.userLikes.length})
        </Button>
        <Button
          className="bg-transparent hover:bg-transparent text-center p-1"
          onClick={handleOpendReplyPart}
        >
          <span className="icon-[fa-solid--reply] mr-1"></span> Répondre
        </Button>
      </div>
      {openReplyPart && (
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
      )}
    </div>
  );
}

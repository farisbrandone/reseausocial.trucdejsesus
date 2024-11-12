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
  MembreData,
  postCommentaireByUser,
  updateCommentairewithLike,
} from "../../../seedAndGetData/seedData";
import { ButtonUploadFileForComment } from "./ButtonUploadfileForComment";

export default function CommentaireComponent({
  commentaireData,
  setCommentairesData,
  membreOfData,
}: {
  commentaireData: CommentaireData;
  setCommentairesData: React.Dispatch<React.SetStateAction<CommentaireData[]>>;
  membreOfData: MembreData[];
}) {
  const [openReplyPart, setOpenReplyPart] = useState(false);

  const [textCommentaire, setTextCommentaire] = useState("");
  const [imageCommentaire, setImageCommentaire] = useState("");
  const [stateDownload, setStateDownload] = useState(false);
  const [putHidden, setPutHidden] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  /*  const user = {
    userAvatar: faker.image.avatar(),
    userName: faker.person.firstName(),
    userId: faker.string.uuid(),
  };
 */
  const handleHidenEmoji = () => {
    setPutHidden((prev) => !prev);
  };
  const handleEmoji = (value: EmojiClickData) => {
    if (inputRef.current) {
      const start = inputRef.current.selectionStart as number;
      const end = inputRef.current.selectionEnd as number;
      const textBeforeCursor = textCommentaire.slice(0, start as number);
      const textAfterCursor = textCommentaire.slice(end as number);
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

  const handleTextCommentaire = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setTextCommentaire(e.target.value);
  };

  const sendCommentaire = async () => {
    const commentData: CommentaireData = {
      text: textCommentaire,
      image: imageCommentaire,
      messageId: commentaireData.messageId,
      userId: membreOfData[0].id,
      userAvatar: membreOfData[0].image,
      userName: membreOfData[0].name,
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
    console.log("bla");
    setOpenReplyPart((prev) => !prev);
  };

  const handleLike = async () => {
    try {
      const result = await updateCommentairewithLike(
        membreOfData[0].id,
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
    <div className="flex flex-col gap-4 shadow-2xl">
      <div className="flex gap-2 ">
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
        <div className="flex  justify-between gap-2 w-full">
          <div className="flex flex-col gap-1">
            <p className="font-bold"> {commentaireData.userName} </p>
            <p className="whitespace-pre-wrap">{commentaireData.text} </p>
          </div>
          <div className="flex items-center">
            <div
              title="Liker"
              className="bg-transparent hover:bg-transparent border-none flex items-center justify-center text-center p-1 pl-2 mr-2 "
              onClick={handleLike}
            >
              <span className="icon-[si-glyph--like]  text-xl text-[#000]"></span>{" "}
              <p className="text-[#000] ">
                <span className="hidden sm:inline">Liker</span> (
                {commentaireData?.userLikes?.length
                  ? commentaireData?.userLikes?.length
                  : 0}
                )
              </p>
            </div>
            <div
              title="Répondre"
              className="bg-transparent hover:bg-transparent text-center border-none p-1 flex items-center justify-center w-[30px] "
              onClick={handleOpendReplyPart}
            >
              <span className="icon-[fa-solid--reply] mr-1 text-xl text-[#000] "></span>{" "}
            </div>
          </div>
        </div>
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
              placeholder="Ajouter une réponse au commentaire"
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
                  label="button for comment"
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

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Textarea } from "@/components/ui/textarea";
import clsx from "clsx";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { ChangeEvent, useRef, useState } from "react";
import { ButtonUploadFile2 } from "./ButtonUploadImage";
import { ButtonUploadAudio } from "./ButtonUploadAudio";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { RocketIcon } from "@radix-ui/react-icons";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { SelectUserToSendMessage } from "./SelectUserToSendMessage";
import {
  getAllMessageData,
  GroupeDataType,
  MembreData,
  MessageData,
  postMessageByUser,
} from "../../../seedAndGetData/seedData";
import { toast } from "@/hooks/use-toast";
import { auth } from "../../../firebaseConfig";
import axios from "axios";

export interface MessageComponentsType {
  groupeId: string;
  groupeName: string;
  messagesData: MessageData[];
  membreOfData: MembreData[];
  setMessagesData: React.Dispatch<React.SetStateAction<MessageData[]>>;
  appearText: boolean;
  setAppearText: React.Dispatch<React.SetStateAction<boolean>>;
  appearVideo: boolean;
  setAppearVideo: React.Dispatch<React.SetStateAction<boolean>>;
  appearImage: boolean;
  setAppearImage: React.Dispatch<React.SetStateAction<boolean>>;
  appearAudio: boolean;
  setAppearAudio: React.Dispatch<React.SetStateAction<boolean>>;
  textePartage: string;
  setTextePartage: React.Dispatch<React.SetStateAction<string>>;
  groupeValue: GroupeDataType;
  handleappearText: () => void;
  handleappearImage: () => void;
  handleappearVideo: () => void;
  handleappearAudio: () => void;
}

export function MessageComponents({
  groupeValue,
  groupeName,
  groupeId,
  setMessagesData,
  appearText,
  /* setAppearText, */
  appearVideo,
  /* setAppearVideo, */
  appearImage,
  /* setAppearImage, */
  appearAudio,
  /*  setAppearAudio, */
  handleappearText,
  handleappearImage,
  handleappearVideo,
  handleappearAudio,
  textePartage,
  setTextePartage,
  membreOfData,
}: MessageComponentsType) {
  const [putHidden, setPutHidden] = useState(false);
  const [imageUrlEvent, setImageUrlEvent] = useState("");
  const [audioUrlEvent, setAudioUrlEvent] = useState("");
  const [stateDownload, setStateDownload] = useState(false);
  const [videoUrlEvent, setVideoUrlEvent] = useState("");

  const [desableButton, setDisableButton] = useState(false);
  const [openState, setOpenState] = useState(false);
  const [userSelect, setUserSelect] = useState<MembreData[]>([]);
  const [alertOpen, setAlertOpen] = useState(false);

  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleOpenState = () => {
    if (openState === true) {
      setTextePartage("");
      setImageUrlEvent("");
      setAudioUrlEvent("");
      setVideoUrlEvent("");
      setUserSelect([]);
      setOpenState(false);
      return;
    }
    setOpenState(true);
  };

  const handleTextePartage = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTextePartage(() => e.target.value);
  };

  const handleUrlVideo = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setVideoUrlEvent(() => e.target.value);
  };
  const handleHidenEmoji = () => {
    setPutHidden((prev) => !prev);
  };
  const handleEmoji = (value: EmojiClickData) => {
    if (inputRef.current) {
      const start = inputRef.current.selectionStart;
      const end = inputRef.current.selectionEnd;
      const textBeforeCursor = textePartage.slice(0, start);
      const textAfterCursor = textePartage.slice(end);
      const newText = textBeforeCursor + value.emoji + textAfterCursor;
      setTextePartage(newText); // Move cursor position to after the newly added emoji
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.selectionStart = start + value.emoji.length;
          inputRef.current.selectionEnd = start + value.emoji.length;
          inputRef.current.focus();
        }
      }, 0);
    }
  };

  const sendingMessage = async () => {
    try {
      setDisableButton(true);

      const user = membreOfData.find(
        (value) => value.email === auth.currentUser?.email
      );

      if (!user) {
        toast({
          variant: "destructive",
          title: "Erreur",
          description: "Vous n'ete pas connecter,",
        });
        return;
      }
      const data: MessageData = {
        userId: user?.id as string,
        userName: user?.name as string,
        userAvatar: user?.image as string,
        userEmail: user?.email,
        text: textePartage,
        photo: imageUrlEvent,
        audio: audioUrlEvent,
        video: videoUrlEvent,
        userLikes: [],
        groupeName: !!groupeName ? groupeName : "",
        communityId: groupeValue.communityId as string,
        typeMessage: "public",
        othersFile: "",
        userReceiverId: "",
        userReceiverEmail: "",
      };

      const result = await postMessageByUser(data, groupeId);

      if (result.success) {
        if (groupeName) {
          const messages = await getAllMessageData(groupeName);
          setMessagesData([...messages]);
          setOpenState(false);
          setTextePartage("");
          setImageUrlEvent("");
          setAudioUrlEvent("");
          setVideoUrlEvent("");
        }
      }

      const sendNotification = await axios.post(
        "https://serverbackofficetrucdejesus.onrender.com/api/firebase/send-message-notification",
        { user: userSelect, message: data }
      );
      if (false) {
        console.log(sendNotification);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description:
          "Une erreur est survenue pendant l'envoie du message, vérifier votre connexion",
      });
    } finally {
      setDisableButton(false);
      setUserSelect([]);
      setOpenState(false);
    }
  };

  return (
    <Dialog open={openState} onOpenChange={() => handleOpenState()}>
      <DialogTrigger asChild={false}>
        <div
          className="flex items-center gap-2 py-5 border-b border-b-[#35353583] "
          onClick={handleappearText}
        >
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Button
            className={clsx(
              "flex justify-start flex-1 focus:outline-none focus:rounded-full ",
              "pl-2 py-3 transition-all duration-500 bg-transparent",
              "text-black hover:bg-transparent"
            )}
          >
            {" "}
            Message{" "}
          </Button>
        </div>
        {/* part for button */}
        <div className="flex items-center gap-1 mt-2 flex-wrap ">
          <Button
            className="bg-transparent  text-[#000] hover:bg-transparent/10"
            onClick={handleappearText}
          >
            <span className="icon-[f7--photo] mr-[1px]"></span>
            Texte
          </Button>

          <Button
            className="bg-transparent  text-[#000] hover:bg-transparent/10"
            onClick={handleappearImage}
          >
            <span className="icon-[f7--photo] mr-[1px]"></span>
            Photo
          </Button>

          <Button
            className="bg-transparent text-[#000] hover:bg-transparent/10"
            onClick={handleappearAudio}
          >
            <span className="icon-[ant-design--audio-filled] mr-[1px] "></span>
            Audio
          </Button>

          <Button
            className="bg-transparent text-[#000] hover:bg-transparent/10"
            onClick={handleappearVideo}
          >
            <span className="icon-[bxs--video] mr-[1px]"></span>
            Video
          </Button>
        </div>
        {/* part for button */}
      </DialogTrigger>
      <DialogContent className="w-[80%]  sm:max-w-[525px] p-0">
        <DialogHeader className="border-b-[1px] border-b-[#0000009d] py-3 flex items-center pl-2">
          <DialogTitle className="w-full text-start text-[20px] ">
            Crée un partage
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="flex flex-col items-center gap-4 px-3">
            {/* <Label htmlFor="name" className="text-right">
              Name
            </Label> */}
            <Textarea
              placeholder="Type your message here."
              id="message"
              rows={3}
              value={textePartage}
              onChange={handleTextePartage}
              ref={inputRef}
            />
            <div className="w-full relative mr-4">
              <div className="w-full flex items-center justify-end py-2 z-50 ">
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
            </div>
          </div>

          {appearImage && (
            <div>
              <ButtonUploadFile2
                label="upload For Message"
                key="button211"
                setImageUrl={setImageUrlEvent}
                setStateDownloadProps={setStateDownload}
                stateDownloadProps={stateDownload}
              />
              {imageUrlEvent && (
                <img
                  src={imageUrlEvent}
                  alt=""
                  className="w-[80px] h-[80px] rounded-md "
                />
              )}
            </div>
          )}

          {appearAudio && (
            <div>
              <ButtonUploadAudio
                label="upload audio"
                key="button211"
                setAudioUrl={setAudioUrlEvent}
                setStateDownloadProps={setStateDownload}
                stateDownloadProps={stateDownload}
              />
              {audioUrlEvent && (
                <Alert className="border-green-600">
                  <RocketIcon className="h-4 w-4" />
                  <AlertTitle>Heads up!</AlertTitle>
                  <AlertDescription>
                    Le fichier a été télécharger avec success.
                  </AlertDescription>
                </Alert>
              )}
            </div>
          )}

          {appearVideo && (
            <div className="w-[95%] mx-auto ">
              <Label htmlFor="urlVideo">
                URL Video {/* <span className="text-[#e91e63] ">*</span> */}{" "}
              </Label>
              <div>
                <Input
                  id="urlVideo"
                  name="urlVideo"
                  value={videoUrlEvent}
                  placeholder="URL Video"
                  onChange={handleUrlVideo}
                  disabled={desableButton}
                  className="border-[1px] border-[#0000008a] border-solid "
                />
                <p className="text-[12px] text-[#000] mt-1 ">
                  URL Youtube, Vimeo, Wistia et lien video hébergée
                </p>
              </div>
            </div>
          )}

          <div className="flex items-center gap-1  ">
            {!appearText && (
              <Button
                className="bg-transparent  text-[#000] hover:bg-transparent/10"
                onClick={handleappearText}
              >
                <span className="icon-[f7--photo] mr-[1px]"></span>
                Texte
              </Button>
            )}
            {!appearImage && (
              <Button
                className="bg-transparent  text-[#000] hover:bg-transparent/10"
                onClick={handleappearImage}
              >
                <span className="icon-[f7--photo] mr-[1px]"></span>
                Photo
              </Button>
            )}
            {!appearAudio && (
              <Button
                className="bg-transparent text-[#000] hover:bg-transparent/10"
                onClick={handleappearAudio}
              >
                <span className="icon-[ant-design--audio-filled] mr-[1px] "></span>
                Audio
              </Button>
            )}
            {!appearVideo && (
              <Button
                className="bg-transparent text-[#000] hover:bg-transparent/10"
                onClick={handleappearVideo}
              >
                <span className="icon-[bxs--video] mr-[1px]"></span>
                Video
              </Button>
            )}
          </div>
          <div>
            <SelectUserToSendMessage
              userSelect={userSelect}
              setUserSelect={setUserSelect}
              alertOpen={alertOpen}
              setAlertOpen={setAlertOpen}
              membreOfData={membreOfData}
              groupeId={groupeId}
            />
            {/*  <Button className="bg-transparent  text-[#000] hover:bg-transparent/10 flex items-center gap-1 h-[100%] ">
              <span className="icon-[mdi--tag] mr-1 self-start text-4xl "></span>
              <p className="text-wrap text-start text-[14px] text ">
                Clique ici pour taguer des frères et soeurs de ton choix afin
                qu'ils recoivent une notification de ce que tu poste ✅
              </p>
            </Button> */}
          </div>
        </div>
        <DialogFooter className="mx-3 mb-3 flex flex-col gap-1">
          <Button
            type="button"
            className="w-full text-[16px] bg-[#fff700] hover:bg-[#fff7008c] text-[#000] disabled:bg-[#fff7008c] "
            disabled={
              !textePartage &&
              !imageUrlEvent &&
              !audioUrlEvent &&
              !videoUrlEvent &&
              !desableButton
            }
            onClick={() => {
              if (userSelect.length > 0) {
                sendingMessage();
              } else {
                setAlertOpen(true);
              }
            }}
          >
            Partager{" "}
            {desableButton && (
              <span className="icon-[eos-icons--three-dots-loading] text-xl"></span>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

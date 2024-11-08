import * as TabsPrimitive from "@radix-ui/react-tabs";
import { clsx } from "clsx";
import AvatarComponent from "../acceuilPage/AvatarComponent";
import { MessageComponents } from "./MessageComponents";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PassionneTable } from "./passionne/PassionneTable";
import { columns } from "./passionne/Columns";
import {
  MembreData,
  MessageData,
  requestTogetAllMembreData,
} from "../../../seedAndGetData/seedData";
import { format } from "date-fns";
import { videoTransformer } from "@/lib/videoTransformer";
import EvenementCard from "./EvenementCard";

interface Tab {
  title: string;
  value: string;
  icon: JSX.Element;
}

const tabs1: Tab[] = [
  {
    title: "Partages",
    value: "tab1",
    icon: <span className="icon-[prime--book] mr-1 text-xl"></span>,
  },
  {
    title: "Passionnés",
    value: "tab2",
    icon: (
      <span className="icon-[lsicon--user-crowd-filled] mr-1 text-xl"></span>
    ),
  },

  {
    title: "Chaines",
    value: "tab3",
    icon: <span className="icon-[whh--hdtv] mr-1 text-xl"></span>,
  },

  {
    title: "Evènnements",
    value: "tab4",
    icon: <span className="icon-[bxs--calendar] mr-1 text-xl"></span>,
  },
  {
    title: "Classement",
    value: "tab5",
    icon: <span className="icon-[fa6-solid--trophy] mr-1 text-xl"></span>,
  },
];

function GroupeCards() {
  const [appearText, setAppearText] = useState(true);
  const [appearVideo, setAppearVideo] = useState(false);
  const [appearImage, setAppearImage] = useState(false);
  const [appearAudio, setAppearAudio] = useState(false);
  const [textePartage, setTextePartage] = useState("");
  const [messagesData, setMessagesData] = useState<MessageData[]>([]);
  const [membreOfData, setMembreOfData] = useState<MembreData[]>([]);

  const handleappearText = () => {
    setAppearText(true);
    setAppearImage(false);
    setAppearVideo(false);
    setAppearAudio(false);
  };
  const handleappearImage = () => {
    setAppearText(false);
    setAppearImage(true);
    setAppearVideo(false);
    setAppearAudio(false);
  };
  const handleappearVideo = () => {
    setAppearText(false);
    setAppearImage(false);
    setAppearVideo(true);
    setAppearAudio(false);
  };

  const handleappearAudio = () => {
    setAppearText(false);
    setAppearImage(false);
    setAppearVideo(false);
    setAppearAudio(true);
  };

  useEffect(() => {
    const getMembreData = async () => {
      const result = await requestTogetAllMembreData();
      setMembreOfData([...result]);
    };
    getMembreData();
  }, []);

  return (
    <div className=" flex flex-col items-center min-[400px]:pr-2 w-full p-0 bg-white ">
      <div className="h-6 max-[980px]:h-8 w-full bg-white "></div>
      <div className="headerAcceuil sticky w-full flex items-center justify-between min-[400px]:justify-end  min-[400px]:gap-4  top-0 bg-white pt-4 max-[980px]:pt-6 z-10 ">
        <div className="flex min-[400px]:flex-1  sm:justify-end items-center">
          <input
            title="Rechercher"
            placeholder="Rechercher"
            type="text"
            className="xl:max-w-[1350px] p-1 pl-3 sm:py-[6px] rounded-l-[8px] min-[400px]:flex-1 border-[2px] border-solid border-[#747373] inputShadow  outline-none focus:outline-none transition-all duration-500"
          />
          <div className="flex items-center justify-center  w-[43px] h-[40px] bg-[#fff700] rounded-sm  cursor-pointer border-[1px] border-solid border-[#00000026]">
            <span className="icon-[websymbol--search] text-1xl"></span>
          </div>
        </div>
        <div className="clocheNotif flex items-center justify-center w-[30px] h-[30px] bg-[#fff700] rounded-sm p-1 cursor-pointer border-[1px] border-solid border-[#00000026]">
          <span className="icon-[mdi--bell] text-2xl"></span>
        </div>
        {/*  <div className="flex items-center justify-center w-[30px] h-[30px] bg-[#c7bfbf] rounded-full mr-2 cursor-pointer border-[1px] border-solid border-[#00000026] ">
          <p className="object-fill"> A</p>
          <ul className="buttonList">
            <li>
              {" "}
              <Link to={""}></Link>{" "}
            </li>
            <li>
              {" "}
              <Link to={""}></Link>{" "}
            </li>
            <li>
              {" "}
              <Link to={""}></Link>{" "}
            </li>
          </ul>
        </div> */}
        <AvatarComponent /* top="[{60}]" right={90} */ />
      </div>

      <div className="imageDePre w-full 2xl:w-[1250px]  px-2 mt-8 pl-3  ">
        <div className="image w-full h-[350px]  relative">
          <img
            src="https://communitor.smartcommunity.biz/upload/774/lib/90086_1715504538_lib.png"
            alt=""
            className="object-contain sm:object-cover w-[95%] min-[640px]:w-full h-full bg-transparent"
          />
          <div className="absolute right-0 left-0 bottom-0 top-0 image"></div>
          <div className=" textOnImage text-[20px] text-white absolute bottom-6 left-4 right-4 font-bold flex  items-center justify-between flex-wrap gap-3">
            <p className="text-[20px] sm:text-[26px]">CARTE INTERACTIVE</p>
            <button
              type="button"
              title="Quitter definitivement le groupe"
              className="flex items-center bg-[#fff700] px-2 py-2 rounded-md mr-4"
            >
              <span className="icon-[mingcute--exit-line] text-black mr-2 "></span>{" "}
              <p className="text-black text-[12px] sm:text-[14px] font-[600] ">
                Quitter definitivement le groupe
              </p>
            </button>
          </div>
        </div>
        <div className="  flex max-[980px]:flex-col max-[980px]:gap-2  w-full tex-[11px] sm:tex-[14px]">
          {/* part of tab */}
          <div className="flex flex-col w-full  ">
            <TabsPrimitive.Root defaultValue="tab1">
              <TabsPrimitive.List
                className={clsx(
                  "flex items-start w-full rounded-t-lg bg-white dark:bg-gray-800 border-b-[2px]",
                  "border-gray-300 "
                )}
              >
                {tabs1.map(({ title, value, icon }) => (
                  <TabsPrimitive.Trigger
                    key={`tab-trigger-${value}`}
                    value={value}
                    className={clsx(
                      "group",
                      "first:rounded-tl-lg last:rounded-tr-lg",
                      " first:border-r last:border-l",
                      "border-gray-300 dark:border-gray-600",
                      "radix-state-active:border-b-slate-950 radix-state-active:border-b-[3px] focus-visible:radix-state-active:border-b-transparent radix-state-inactive:bg-gray-50 dark:radix-state-active:border-b-gray-100 dark:radix-state-active:bg-gray-900 focus-visible:dark:radix-state-active:border-b-transparent dark:radix-state-inactive:bg-gray-800",
                      " px-[12px] py-[12px] box-content",
                      "focus:radix-state-active:border-b-red",
                      "focus:z-10 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
                    )}
                  >
                    <p className="flex items-center">
                      {icon}
                      <span
                        className={clsx(
                          "text-[11px] sm:text-[16px] font-bold ",
                          "text-black dark:text-gray-100"
                        )}
                      >
                        {title}
                      </span>
                    </p>
                  </TabsPrimitive.Trigger>
                ))}
              </TabsPrimitive.List>
              <TabsPrimitive.Content
                key={`tab-content-tab1`}
                value="tab1"
                className={clsx(
                  "rounded-b-lg bg-white px-6 py-4 dark:bg-gray-800 "
                )}
              >
                <div>
                  <MessageComponents
                    messagesData={messagesData}
                    setMessagesData={setMessagesData}
                    appearText={appearText}
                    setAppearText={setAppearText}
                    appearVideo={appearVideo}
                    setAppearVideo={setAppearVideo}
                    appearImage={appearImage}
                    setAppearImage={setAppearImage}
                    handleappearText={handleappearText}
                    handleappearImage={handleappearImage}
                    handleappearVideo={handleappearVideo}
                    appearAudio={appearAudio}
                    setAppearAudio={setAppearAudio}
                    handleappearAudio={handleappearAudio}
                    textePartage={textePartage}
                    setTextePartage={setTextePartage}
                  />
                </div>
                {messagesData &&
                  messagesData.map((value) => (
                    <div className="text-sm text-gray-700 dark:text-gray-100 mt-4">
                      <div className="flex items-center gap-2">
                        <Avatar>
                          <AvatarImage src={value.userAvatar} alt="" />
                          <AvatarFallback>AV</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col  text-[#000]">
                          <p>{value.userName}</p>
                          <p>
                            {value.userName === "Administrateur" && (
                              <span className="text-[12px] p-1 bg-[#fff700] rounded-[2px] mr-1 ">
                                Administrateur
                              </span>
                            )}
                            {format(
                              new Date(value.date),
                              "'publié le' dd/MM/yyyy"
                            )}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col mt-2">
                        {value.text && (
                          <p className="text whitespace-pre-wrap">
                            {value.text}
                          </p>
                        )}
                        {value.photo && (
                          <div className="image mt-2">
                            <img src={value.photo} alt="" />
                          </div>
                        )}
                        {value.video && (
                          <div className="video">
                            <video controls width="250">
                              <source src={value.video} type="video/webm" />
                              <source
                                src={videoTransformer(value.video)}
                                type="video/mp4"
                              />
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
                    </div>
                  ))}
              </TabsPrimitive.Content>
              <TabsPrimitive.Content
                key={`tab-content-tab2`}
                value="tab2"
                className={clsx(
                  "flex-shrink-1 rounded-b-lg bg-white px-6 py-4 dark:bg-gray-800 "
                )}
              >
                <div>
                  <PassionneTable columns={columns} data={membreOfData} />
                </div>
              </TabsPrimitive.Content>
              <TabsPrimitive.Content
                key={`tab-content-tab3`}
                value="tab3"
                className={clsx(
                  "flex-shrink-1 rounded-b-lg bg-white px-6 py-4 dark:bg-gray-800 "
                )}
              >
                <div></div>
              </TabsPrimitive.Content>

              <TabsPrimitive.Content
                key={`tab-content-tab4`}
                value="tab4"
                className={clsx(
                  "rounded-b-lg bg-white px-6 py-4 dark:bg-gray-800 "
                )}
              >
                <EvenementCard groupeName="Mon Groupe" />
              </TabsPrimitive.Content>

              <TabsPrimitive.Content
                key={`tab-content-tab5`}
                value="tab5"
                className={clsx(
                  "flex-shrink-1 rounded-b-lg bg-white px-6 py-4 dark:bg-gray-800 "
                )}
              >
                <div></div>
              </TabsPrimitive.Content>
            </TabsPrimitive.Root>
          </div>

          {/* part of tab */}

          <div className="relative flex min-[980px]:ml-4 min-[980px]:mr-2 max-[980px]:w-[95%]  flex-col items-start  gap-5 mt-8 lg:max-w-[500px] flex-shrink-1 ">
            <p className=" infoGroupeCards font-[400] text-[16px] ">
              Information sur le groupe
            </p>
            <p className=" mt-3 whitespace-pre-wrap">
              Indique où tu te trouves sur la carte du monde, ainsi que tes
              événements si tu souhaites que d'autres frères et soeurs puissent
              te rejoindre en live.
            </p>
            <div className="flex items-center gap-8">
              <p>
                <span className="icon-[ion--locked] "></span> Privé
              </p>
              <p className="flex items-center">
                {" "}
                <span className="icon-[lsicon--user-crowd-filled] mr-1 text-xl"></span>{" "}
                11 Passionnés
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GroupeCards;

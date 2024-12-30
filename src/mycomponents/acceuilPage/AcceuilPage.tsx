import {
  CommunityDataType,
  GroupeDataType,
  MessageData,
} from "seedAndGetData/seedData";
import { getAllCommunityMessageData } from "../../../seedAndGetData/seedData";
/* import CardGroupAcceuil from "./CardGroupAcceuil"; */
import { Fragment, useEffect, useState } from "react";
import MessageCommunityElement from "./MessageCommunityElement";
import clsx from "clsx";
import { useContextReducer } from "@/hooks/useContextReducer";
import ButtonForVerset from "./buttonForVerset/ButtonForVerset";
import { NotifComponent } from "./NotifMessage/NotifComponent";
import { MessagePriveComponent } from "./NotifMessage/MessagePriveComponent";

/* const objectCards = [
  {
    source:
      "https://communitor.smartcommunity.biz/upload/774/lib/90086_1715504538_lib.png",
    title: "CARTE INTERACTIVE",
    passionnes: 11,
    partages: 10,
    evenement: 3,
    chaine: 12,
  },
  {
    source:
      "https://communitor.smartcommunity.biz/upload/774/lib/90086_1715504538_lib.png",
    title: "Alliance et Célibat",
    passionnes: 11,
    partages: 10,
    evenement: 3,
    chaine: 12,
  },
  {
    source:
      "https://communitor.smartcommunity.biz/upload/774/lib/90086_1715504538_lib.png",
    title: "Dévellopement des dons recus",
    passionnes: 11,
    partages: 10,
    evenement: 3,
    chaine: 12,
  },
  {
    source:
      "https://communitor.smartcommunity.biz/upload/774/lib/90086_1715504538_lib.png",
    title: "Enseignement et Dévoilement",
    passionnes: 11,
    partages: 10,
    evenement: 3,
    chaine: 12,
  },
  {
    source:
      "https://communitor.smartcommunity.biz/upload/774/lib/90086_1715504538_lib.png",
    title: "Louanges et Adoration",
    passionnes: 11,
    partages: 10,
    evenement: 3,
    chaine: 12,
  },
  {
    source:
      "https://communitor.smartcommunity.biz/upload/774/lib/90086_1715504538_lib.png",
    title: "Parole du jour et Proverbe",
    passionnes: 11,
    partages: 10,
    evenement: 3,
    chaine: 12,
  },
  {
    source:
      "https://communitor.smartcommunity.biz/upload/774/lib/90086_1715504538_lib.png",
    title: "Soutient Et Entraide",
    passionnes: 11,
    partages: 10,
    evenement: 3,
    chaine: 12,
  },
]; */

function AcceuilPage({
  /*  groupeData, */
  value,
}: {
  groupeData: GroupeDataType[];
  value: CommunityDataType;
}) {
  const [messageCoommunity, setMessageCommunity] = useState<MessageData[]>();
  const [loadingFail, setLoadingFail] = useState(false);
  const [state, dispatch] = useContextReducer();
  useEffect(() => {
    const getAllMessageWithCommunityId = async () => {
      try {
        const result = await getAllCommunityMessageData(value.id as string);
        setMessageCommunity(result);
      } catch (error) {
        setLoadingFail(true);
      }
    };

    getAllMessageWithCommunityId();
  }, []);
  if (loadingFail) {
    return (
      <div className="w-full text-center pt-4">
        Une erreur est survenue pendant le chargement ou problème de connexion
      </div>
    );
  }

  return (
    <div
      className={clsx("flex flex-col items-center px-1 sm:pr-2 w-full p-0 ")}
    >
      <div className="h-2 sm:h-7 w-full bg-white"></div>

      <div className="headerAcceuil sticky w-full flex items-center justify-between gap-4 top-0 z-40 h-[50px] sm:h-[80px]  bg-white ">
        <div
          className={clsx(
            "self-center flex items-center justify-center lg:overflow-hidden cursor-pointer",
            {
              " overflow-hidden": state?.stateSideBar,
            }
          )}
          onClick={() => {
            dispatch({ type: "open", payload: "" });
          }}
        >
          <span className="icon-[ci--hamburger] text-3xl lg:hidden"></span>
        </div>
        <div className="flex items-center gap-2">
          <NotifComponent /* message={messageCoommunity} */ />
          <MessagePriveComponent /* message={messageCoommunity} */ />
          <div
            title="Notification"
            className="clocheNotif flex items-center justify-center w-[30px] h-[30px] bg-[#fff700] rounded-sm p-1 cursor-pointer border-[1px] border-solid border-[#00000026]"
          >
            <span className="icon-[mdi--bell] text-2xl"></span>
          </div>
          <div
            title="Message privé"
            className="clocheNotif flex items-center justify-center w-[30px] h-[30px] bg-[#fff700] rounded-sm p-1 cursor-pointer border-[1px] border-solid border-[#00000026]"
          >
            <span className="icon-[mdi--message-text]"></span>
          </div>
          {/*  <AvatarComponent communityId={value.id as string} /> */}
        </div>
      </div>

      <div className="imageDePre w-full 2xl:w-[1250px]  px-2 mt-10 pl-3 -z-[10] ">
        <div className=" w-full">
          {value.banniereUrl && value.banniereUrl.includes(".mp4") ? (
            <video
              loop
              autoPlay={true}
              muted={true}
              className="object-cover w-full"
            >
              <source src={value.banniereUrl} type="video/mp4" />
              Votre navigateur ne supporte pas la balise vidéo.
            </video>
          ) : (
            <img
              src={value.banniereUrl}
              alt=""
              className="object-cover w-full h-full"
            />
          )}

          {/*  <img
            src="https://communitor.smartcommunity.biz/upload/774/lib/74539_1725898047_lib.jpeg"
            alt=""
            className="object-cover w-full h-full bg-transparent"
          /> */}
          {/*  <div className="absolute right-0 left-0 bottom-0 top-0 image"></div> */}
        </div>
      </div>
      <div className="textOnImage w-full flex items-center justify-between flex-row text-[20px] font-extrabold  text-white px-2 -translate-y-[210%] ">
        <strong className="opacity-0">{value.title}</strong>
        <ButtonForVerset />
      </div>
      <p className="text-[20px] -translate-y-[40%] w-full 2xl:w-[1250px]  text-start px-2 -z-10 ">
        {value.description}
      </p>

      <div className="flex flex-col lg:flex-row lg:gap-6 w-full 2xl:w-[1250px]  mt-4 px-2">
        {/*  <div className="body1 flex lg:flex-1 lg:ml-2 flex-col items-start gap-4 pl-3">
          <p className="textBody1 text-[18px]">JÉSUS te passionne ?</p>
          <p className="">Faisons connaissance ! 💛</p>
          <p className=" flex items-center">
            <span className="icon-[lsicon--user-crowd-filled] mr-2 text-2xl"></span>
            {groupeData[0]?.nombreDePassionnner} Passionnés
          </p>
          <div></div>
        </div> */}
        {/*  <div className="flex items-center gap-1 w-full lg:border-r-[#000] lg:border-solid lg:border-[2px] ">
          <div className="body2 hidden  lg:flex flex-col gap-4  self-start ">
            {groupeData.map((objectCard) => (
              <CardGroupAcceuil objectCard={objectCard} />
            ))}
          </div>
        </div> */}
        <div className="flex flex-col w-full ">
          <h1 className="font-bold text-[20px] ">Partages récents </h1>
          <div className="flex flex-col gap-1 mt-5 w-full ">
            {messageCoommunity
              ?.filter((value) => value.typeMessage === "public")
              ?.map((message, index) => (
                <Fragment key={index}>
                  <MessageCommunityElement message={message} />
                </Fragment>
              ))}
          </div>
        </div>
      </div>
      {state?.stateSideBar && (
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/30 z-50"></div>
      )}
    </div>
  );
}

export default AcceuilPage;

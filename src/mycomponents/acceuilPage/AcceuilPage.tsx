import { GroupeDataType } from "seedAndGetData/seedData";
import AvatarComponent from "./AvatarComponent";
import CardGroupAcceuil from "./CardGroupAcceuil";

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

function AcceuilPage({ groupeData }: { groupeData: GroupeDataType[] }) {
  return (
    <div className="flex flex-col items-center px-1 sm:pr-2 w-full p-0 ">
      <div className="h-8 sm:h-7 w-full bg-white"></div>
      <div className="headerAcceuil sticky w-full flex items-center justify-end gap-4 top-0 z-40 h-[50px] sm:h-[80px]  bg-white ">
        <div className="clocheNotif flex items-center justify-center w-[30px] h-[30px] bg-[#fff700] rounded-sm p-1 cursor-pointer border-[1px] border-solid border-[#00000026]">
          <span className="icon-[mdi--bell] text-2xl"></span>
        </div>
        {/*  <div className="flex items-center justify-center w-[30px] h-[30px] bg-[#c7bfbf] rounded-full mr-2 cursor-pointer border-[1px] border-solid border-[#00000026] ">
          <p className="object-fill"> A</p>
        </div> */}
        <AvatarComponent />
      </div>

      <div className="imageDePre w-full 2xl:w-[1250px]  px-2 mt-10 pl-3 -z-[10] ">
        <div className="image w-full h-[180px]  relative">
          <img
            src="https://communitor.smartcommunity.biz/upload/774/lib/74539_1725898047_lib.jpeg"
            alt=""
            className="object-cover w-full h-full bg-transparent"
          />
          <div className="absolute right-0 left-0 bottom-0 top-0 image"></div>
          <p className="textOnImage text-[20px] text-white absolute bottom-2 left-2 font-extrabold ">
            <strong>Réseau 100% JÉSUS</strong>
          </p>
        </div>

        <p className="text-[20px] mt-4 mb-6 ">
          Groupes de partages Un Truc de JÉSUS ! 1er Réseau 100% JÉSUS
        </p>
      </div>

      <div className="flex flex-col lg:flex-row-reverse lg:gap-6 w-full 2xl:w-[1250px]  mt-4">
        <div className="body1 flex lg:flex-1 lg:ml-2 flex-col items-start gap-4 pl-3">
          <p className="textBody1 text-[18px]">JÉSUS te passionne ?</p>
          <p className="">Faisons connaissance ! 💛</p>
          <p className=" flex items-center">
            <span className="icon-[lsicon--user-crowd-filled] mr-2 text-2xl"></span>
            {groupeData[0].nombreDePassionnner} Passionnés
          </p>
          <div></div>
        </div>
        <div className="body2 flex flex-col gap-4">
          {groupeData.map((objectCard) => (
            <CardGroupAcceuil objectCard={objectCard} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default AcceuilPage;
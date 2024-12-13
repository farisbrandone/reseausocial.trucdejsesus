import { GroupeDataType } from "seedAndGetData/seedData";

export interface ObjectCardType {
  source: string;
  title: string;
  passionnes: number;
  partages: number;
  evenement: number;
  chaine: number;
}

function CardGroupAcceuil({ objectCard }: { objectCard: GroupeDataType }) {
  return (
    <div className="flex flex-col sm:flex-row self-start">
      <img
        src={objectCard.banniereUrlGroupe}
        alt=""
        className="object-cover overflow-hidden  sm:w-[200px] h-[200px] mr-3"
      />

      <div className="flex flex-col flex-1 gap-10 ">
        <div className="relative flex items-center justify-between pt-4 pb-8 ">
          <p>{objectCard.titleGroupe}</p>
          <button title="click" type="button">
            <span className="icon-[tabler--dots-vertical]"></span>
          </button>
          <div className="absolute w-full h-[1px] border-[1px] border-solid border-[#464545d5] bottom-0 "></div>
        </div>
        <div className="flex flex-wrap gap-3 justify-between items-center">
          <p className="sm:mr-2 lg:mr-8  xl:mr-12">
            <span>{objectCard.nombreDePassionnner} </span> Passionnés{" "}
          </p>
          <p className="sm:mr-2 lg:mr-4  xl:mr-12">
            <span>{objectCard.nombreDePartages}</span> Partages
          </p>
          <p>
            <span> {objectCard.nombreDevenements} </span>
            Evènements
          </p>
        </div>
      </div>
    </div>
  );
}

export default CardGroupAcceuil;

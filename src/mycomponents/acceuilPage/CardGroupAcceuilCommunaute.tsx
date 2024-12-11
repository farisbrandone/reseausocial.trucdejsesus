import { CommunityDataType } from "seedAndGetData/seedData";

export interface ObjectCardType {
  source: string;
  title: string;
  passionnes: number;
  partages: number;
  evenement: number;
  chaine: number;
}

function CardGroupAcceuilCommunaute({
  objectCard,
}: {
  objectCard: CommunityDataType;
}) {
  return (
    <div className="flex flex-col sm:flex-row">
      <img
        src={objectCard.banniereUrl}
        alt=""
        className="object-cover overflow-hidden  sm:w-[200px] h-[200px] mr-3"
      />

      <div className="flex flex-col flex-1 gap-10 ">
        <div className="relative flex items-center justify-between pt-4 pb-8 ">
          <p>{objectCard.title}</p>
          <button title="click" type="button">
            <span className="icon-[tabler--dots-vertical]"></span>
          </button>
          <div className="absolute w-full h-[1px] border-[1px] border-solid border-[#464545d5] bottom-0 "></div>
        </div>
      </div>
    </div>
  );
}

export default CardGroupAcceuilCommunaute;

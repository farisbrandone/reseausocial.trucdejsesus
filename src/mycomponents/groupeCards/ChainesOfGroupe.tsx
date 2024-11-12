import { Fragment, useEffect, useState } from "react";
import {
  ChannelPageDataType,
  requestTogetAllChannelDataOfGroupe,
  RessourcesDataType,
} from "../../../seedAndGetData/seedData";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";

function ChainesOfGroupe({ groupeId }: { groupeId: string }) {
  const [channelData, setChannelData] = useState<ChannelPageDataType[]>();
  const [openDetailsChannel, setOpenDetailsChannel] = useState(true);

  const openRessourcesChannel = () => {
    setOpenDetailsChannel((prev) => !prev);
  };

  useEffect(() => {
    const getChannelDataOfGroupe = async () => {
      const result = await requestTogetAllChannelDataOfGroupe(groupeId);
      setChannelData([...result]);
    };
    getChannelDataOfGroupe();
  }, []);

  if (!channelData) {
    return (
      <div className="flex items-center justify-center">
        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {channelData.map((value) => (
        <Fragment key={value.id}>
          {openDetailsChannel ? (
            <div className="flex  gap-2 hover:shadow-2xl">
              <img
                src={value.imageChannel}
                alt={value.nomChannel}
                className="lg:max-w-[200px] lg:max-h-[200px] object-cover rounded-md cursor-pointer "
                onClick={() => openRessourcesChannel()}
              />
              <div className="flex flex-col gap-2 mt-2">
                <div className="flex items-center justify-between border-b-[1px] border-b-[#5a5a5aef] pb-1">
                  <p
                    className="text-[16px] font-bold cursor-pointer "
                    onClick={() => openRessourcesChannel()}
                  >
                    {" "}
                    {value.nomChannel}{" "}
                  </p>
                  <p className="text-[12px] text-[#5a5a5aef] flex items-center justify-center ">
                    <span className="icon-[material-symbols--library-books-rounded]  text-xl mr-1"></span>{" "}
                    Resources
                  </p>
                </div>
                <p> {value.descriptionChannel} </p>
              </div>
            </div>
          ) : (
            <RessourcesChannelsDetailCards
              ressources={value.channelRessources}
              openRessourcesChannel={openRessourcesChannel}
            />
          )}
        </Fragment>
      ))}
    </div>
  );
}

export default ChainesOfGroupe;

export function RessourcesChannelsDetailCards({
  ressources,
  openRessourcesChannel,
}: {
  ressources: RessourcesDataType[];
  openRessourcesChannel: () => void;
}) {
  return (
    <div>
      <div
        className="w-full flex items-center gap-2 text-start hover:underline pl-2 cursor-pointer mb-2"
        onClick={openRessourcesChannel}
      >
        <span className="icon-[arcticons--back-market] font-bold text-[#000] text-xl "></span>{" "}
        <p className="">Retour</p>
      </div>
      {ressources.map((ressource) => (
        <Fragment key={ressource.id}>
          <div className="flex flex-wrap items-center gap-2 hover:shadow-xl">
            <div>
              <img
                src={ressource.imageRessource}
                alt={ressource.titleRessource}
              />
              <p className="text-[12px] ">
                {" "}
                {format(new Date(ressource.date), "dd MMM yyy 'à' hh:mm")}{" "}
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-[16px] font-bold ">
                {ressource.titleRessource}{" "}
              </p>
              <p className="text-[14px] "> {ressource.descriptionRessource} </p>
              <a
                href={ressource.urlRessources}
                className="bg-[#fff700] text-[#000] font-bold p-2 hover:bg-[#fff700]/70 text-[16px] rounded-md "
              >
                {ressource.textButtonRessource}
              </a>
            </div>
          </div>
        </Fragment>
      ))}
    </div>
  );
}

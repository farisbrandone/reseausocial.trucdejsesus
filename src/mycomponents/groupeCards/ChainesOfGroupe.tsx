import { useEffect, useState } from "react";
import {
  ChannelPageDataType,
  requestTogetAllChannelDataOfGroupe,
} from "../../../seedAndGetData/seedData";
import { Skeleton } from "@/components/ui/skeleton";

function ChainesOfGroupe({ groupeId }: { groupeId: string }) {
  const [channelData, setChannelData] = useState<ChannelPageDataType[]>();

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
        <div className="flex items-center gap-2 hover:shadow-2xl">
          <img
            src={value.imageChannel}
            alt={value.nomChannel}
            className="lg:max-w-[200px] lg:max-h-[200px] object-cover rounded-md cursor-pointer "
            onClick={}
          />
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between border-b-[1px] border-b-[#5a5a5aef] pb-1">
              <p className="text-[16px] font-bold " onClick={}>
                {" "}
                {value.nomChannel}{" "}
              </p>
              <p className="text-[12px] text-[#5a5a5aef] ">
                <span className="icon-[material-symbols--library-books-rounded]  text-xl"></span>{" "}
                Resources
              </p>
            </div>
            <p> {value.descriptionChannel} </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ChainesOfGroupe;

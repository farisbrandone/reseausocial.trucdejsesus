import { Skeleton } from "@/components/ui/skeleton";
import { Fragment, useEffect, useState } from "react";
import {
  EventDataType,
  requestTogetAllEventDataofGroupe,
} from "../../../seedAndGetData/seedData";
import { format } from "date-fns";

function EvenementCard({ groupeName }: { groupeName: string }) {
  const [eventState, setEventState] = useState<EventDataType[]>();
  const [stateView, setStateView] = useState(false);

  const handleStateView = () => {
    setStateView((prev) => !prev);
  };
  useEffect(() => {
    const getEventData = async () => {
      const result = await requestTogetAllEventDataofGroupe(groupeName);
      setEventState([...result]);
    };
    getEventData();
  }, []);

  if (!eventState) {
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
      {eventState &&
        eventState?.map((event) => (
          <Fragment key={event.id}>
            {!stateView ? (
              <div className="flex gap-3 flex-wrap shadow-2xl ">
                <img
                  src={event.imageUrlEvent}
                  alt={event.titleEvent}
                  className="max-w-[260px]  max-h-[160px] object-cover cursor-pointer rounded-md mb-2"
                  onClick={handleStateView}
                />

                <div className="flex justify-between flex-1">
                  <p
                    className="text-[16px] font-bold cursor-pointer "
                    onClick={handleStateView}
                  >
                    {" "}
                    {event.titleEvent}{" "}
                  </p>
                  <p className="text-[12px] text-[#555555d0] ">
                    <span className="icon-[pepicons-pop--pinpoint-filled]"></span>{" "}
                    {event.typeEvent}{" "}
                  </p>
                </div>
              </div>
            ) : (
              <EvenementDetailCards
                event={event}
                handleStateView={handleStateView}
              />
            )}
          </Fragment>
        ))}
    </div>
  );
}

export default EvenementCard;

export function EvenementDetailCards({
  event,
  handleStateView,
}: {
  event: EventDataType;
  handleStateView: () => void;
}) {
  return (
    <div>
      <div
        className="w-full flex items-center gap-2 text-start pl-2 cursor-pointer"
        onClick={handleStateView}
      >
        <span className="icon-[arcticons--back-market] font-bold text-[#000] text-xl "></span>{" "}
        <p>Retour</p>
      </div>
      <div className="flex justify-between px-2 mt-2">
        <p className="text-[18px] font-bold  "> Carte Interactive </p>
        <p className="text-[12px] text-[#555555d0] ">
          <span className="icon-[pepicons-pop--pinpoint-filled]"></span>{" "}
          {event.typeEvent}{" "}
        </p>
      </div>
      <div className="flex flex-col items-start gap-2">
        <div>
          <img src={event.imageUrlEvent} alt={event.titleEvent} />
          <p className="text-[12px] ">
            {" "}
            {format(
              new Date(event.dateOfCreation as string),
              "dd MMM yyy 'à' hh:mm"
            )}{" "}
          </p>
        </div>
        <a
          href={event.urlOfEvent}
          className="bg-[#fff700] text-[#000] font-bold p-2 hover:bg-[#fff700]/70 text-[16px] rounded-md "
        >
          Accès Carte Interactive
        </a>
      </div>
    </div>
  );
}

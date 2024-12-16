import * as React from "react";
/* import { MinusIcon, PlusIcon } from "@radix-ui/react-icons"; */

import { ButtonSideBar } from "./ButtonSidebar";
import { CommunityDataType, GroupeDataType } from "seedAndGetData/seedData";
import { useContextReducer } from "@/hooks/useContextReducer";
import clsx from "clsx";

interface SidebarForMobileType {
  groupeState: GroupeDataType[] | undefined;
  val: CommunityDataType;
}

export function SidebarForMobile({ groupeState, val }: SidebarForMobileType) {
  const [state, dispatch] = useContextReducer();
  console.log(state);
  return (
    <div
      className={clsx(
        "fixed h-screen top-0 left-0  overflow-hidden transition-all  duration-500 z-[20000] ",
        {
          "w-screen": state?.stateSideBar === true,
        },
        {
          "w-0": state?.stateSideBar === false,
        }
      )}
    >
      <div
        className={clsx(
          "relative h-full bg-white flex flex-col gap-2 items-center  mt-0 ml-0 w-12 overflow-hidden transition-all  duration-500 z-50 ",
          { "w-[260px] ": state?.stateSideBar === true },
          { "w-[260px] ": state?.stateSideBar === false }
        )}
      >
        <a
          href="/"
          className="header flex flex-col gap-3 items-center mt-4 px-2 pb-1"
        >
          <img
            src={val.logoUrl}
            alt=""
            className="object-cover w-[40px] h-[40px]"
          />

          <p className=" flex overflow-clip text-nowrap w-[200px] text-ellipsis">
            <span className="icon-[lsicon--user-crowd-filled] self-center text-2xl mr-2"></span>
            Réseau 100% JÉSUS
          </p>
        </a>
        <div className="corpsSidebar flex flex-col   border-t-2 border-t-[#242424]/30 border-solid w-full">
          <p className="title my-3 pl-2">Groupes</p>
          <div className="partNavigation flex flex-col pl-3 gap-2 items-start">
            {groupeState?.map((value) => (
              <React.Fragment key={value.id}>
                <ButtonSideBar value={value} val={val} />
              </React.Fragment>
            ))}

            {/*  <ButtonSideBar text="CARTE INTERACTIVE" />
              <ButtonSideBar text="Alliance et Célibat" /> */}
          </div>
        </div>
      </div>
      <div
        className="absolute left-[240px] top-[40px] text-red-700 w-[30px] h-[30px] rounded-full bg-white flex items-center justify-center z-50 cursor-pointer"
        onClick={() => dispatch({ type: "close" })}
      >
        <span className="icon-[fa-solid--less-than]"></span>
      </div>
    </div>
  );
}

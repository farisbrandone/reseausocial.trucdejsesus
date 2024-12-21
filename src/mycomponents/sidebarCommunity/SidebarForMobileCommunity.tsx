import * as React from "react";
/* import { MinusIcon, PlusIcon } from "@radix-ui/react-icons"; */

import { CommunityDataType } from "seedAndGetData/seedData";
import { ButtonSideBarCommunity } from "./ButtonSideBarCommunity";
import { useContextReducer } from "@/hooks/useContextReducer";
import clsx from "clsx";

interface SidebarForMobileType {
  communityState: CommunityDataType[] | undefined;
}

export function SidebarForMobileCommunity({
  communityState,
}: SidebarForMobileType) {
  const [state, dispatch] = useContextReducer();

  return (
    <div
      className={clsx(
        " fixed h-screen flex flex-col gap-2 items-center min-[980px]:ml-4 left-0 top-0 w-[100px] overflow-hidden transition-all duration-1000",
        { "w-[180px] ": state?.stateSideBar }
      )}
    >
      <div
        className="absolute left-[180px] top-[80px] "
        onClick={() => dispatch({ type: "close", payload: "" })}
      >
        <span className="icon-[fa-solid--less-than]"></span>
      </div>
      <a
        href="/"
        className="header flex flex-col gap-8 items-center mt-6 px-2 pb-1"
      >
        <img
          src="https://trucdejesus.appowls.io/assets/apps/user_1837/app_3120/draft/icon/app_logo.png"
          alt="Logo"
          width="40"
          height="40"
          className=""
        />

        <p className=" flex items-center">
          <span className="icon-[lsicon--user-crowd-filled] min-[980px]:mr-2 text-2xl"></span>
          Réseau 100% JÉSUS
        </p>
      </a>
      <div className="corpsSidebar flex flex-col items-center min-[980px]:pl-3 border-t-2 border-t-[#242424] border-solid">
        <p className="title my-3">Groupes</p>
        <div className="partNavigation flex flex-col gap-2 items-start">
          {communityState?.map((value) => (
            <React.Fragment key={value.id}>
              <ButtonSideBarCommunity value={value} />
            </React.Fragment>
          ))}

          {/*  <ButtonSideBar text="CARTE INTERACTIVE" />
              <ButtonSideBar text="Alliance et Célibat" /> */}
        </div>
      </div>
    </div>
  );
}

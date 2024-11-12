import * as React from "react";
/* import { MinusIcon, PlusIcon } from "@radix-ui/react-icons"; */

import { Button } from "@/components/ui/button";
import {
  Drawer,
  /* DrawerClose, */
  DrawerContent,
  /*  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle, */
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ButtonSideBar } from "./ButtonSidebar";
import { GroupeDataType } from "seedAndGetData/seedData";

interface SidebarForMobileType {
  groupeState: GroupeDataType[] | undefined;
}

export function SidebarForMobile({ groupeState }: SidebarForMobileType) {
  /*  const [goal, setGoal] = React.useState(350);

  function onClick(adjustment: number) {
    setGoal(Math.max(200, Math.min(400, goal + adjustment)));
  } */

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          className=" fixed flex items-center min-[980px]:hidden top-1 left-1"
        >
          <span className="icon-[pajamas--hamburger] text-2xl bg-[#000] text-[#fff]"></span>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="flex flex-col items-center min-[980px]:hidden px-3">
        <div className="flex flex-col gap-2 items-center min-[980px]:ml-4  top-0 lg:hidden">
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
              {groupeState?.map((value) => (
                <React.Fragment key={value.id}>
                  <ButtonSideBar value={value} />
                </React.Fragment>
              ))}

              {/*  <ButtonSideBar text="CARTE INTERACTIVE" />
              <ButtonSideBar text="Alliance et Célibat" /> */}
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

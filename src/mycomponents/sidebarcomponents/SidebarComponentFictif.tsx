import { GroupeDataType } from "seedAndGetData/seedData";
import { ButtonSideBar } from "./ButtonSidebar";
import { Fragment } from "react/jsx-runtime";

interface SidebarComponentType {
  groupeState: GroupeDataType[] | undefined;
}

function SidebarComponentFictif({ groupeState }: SidebarComponentType) {
  return (
    <div className="fixed hidden min-[1030px]:flex flex-col gap-2 items-center ml-4 sm:ml-8 top-0  ">
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
          <span className="icon-[lsicon--user-crowd-filled] mr-2 text-2xl"></span>
          Réseau 100% JÉSUS
        </p>
      </a>
      <div className="corpsSidebar flex flex-col items-center pl-3 border-t-2 border-t-[#242424] border-solid">
        <p className="title my-3">Groupes</p>
        <div className="partNavigation flex flex-col gap-2 items-start">
          {groupeState?.map((value) => (
            <Fragment key={value.id}>
              <ButtonSideBar value={value} />
            </Fragment>
          ))}
          {/*  <ButtonSideBar text="CARTE INTERACTIVE" />
          <ButtonSideBar text="Alliance et Célibat" /> */}
        </div>
      </div>
    </div>
  );
}

export default SidebarComponentFictif;

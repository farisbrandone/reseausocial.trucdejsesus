import { CommunityDataType } from "../../../seedAndGetData/seedData";

import { Fragment } from "react/jsx-runtime";
import { ButtonSideBarCommunity } from "./ButtonSideBarCommunity";

interface SidebarComponentFictifCommunityType {
  communityData: CommunityDataType[] | undefined;
}

function SidebarComponentFictifCommunity({
  communityData,
}: SidebarComponentFictifCommunityType) {
  return (
    <div className="fixed hidden min-[1030px]:flex flex-col gap-2 items-center ml-3 sm:ml-3 top-0 w-[200px]  ">
      <a
        href="/"
        className="header flex flex-col gap-3 items-center mt-6 px-2 pb-1"
      >
        <img
          src="https://trucdejesus.appowls.io/assets/apps/user_1837/app_3120/draft/icon/app_logo.png"
          alt="Logo"
          width="40"
          height="40"
          className=""
        />

        <p className=" flex items-center">Un Truc de Jesus!</p>
      </a>
      <div className="corpsSidebar flex flex-col   border-t-2 border-t-[#242424] border-solid">
        <p className="title my-3">Communauté</p>
        <div className="partNavigation flex flex-col gap-2 items-start">
          {communityData?.map((value) => (
            <Fragment key={value.id}>
              <ButtonSideBarCommunity value={value} />
            </Fragment>
          ))}
          {/*  <ButtonSideBar text="CARTE INTERACTIVE" />
          <ButtonSideBar text="Alliance et Célibat" /> */}
        </div>
      </div>
    </div>
  );
}

export default SidebarComponentFictifCommunity;

/* import { ButtonSideBar } from "./ButtonSidebar"; */

function SidebarComponentCommunity() {
  return (
    <div className="opacity-0 hidden min-[1030px]:flex flex-col gap-2 items-center ml-3 sm:ml-3 w-[200px]">
      <a
        href="/"
        className="header flex flex-col gap-8 items-center mt-4 px-2 pb-1"
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
          Un Truc de Jesus!
        </p>
      </a>
      <div className="corpsSidebar flex flex-col items-center pl-3 border-t-2 border-t-[#242424] border-solid">
        <p className="title my-3">Communauté</p>
        <div className="partNavigation flex flex-col gap-2 items-start">
          {/*  <ButtonSideBar text="CARTE INTERACTIVE" />
            <ButtonSideBar text="Alliance et Célibat" /> */}
        </div>
      </div>
    </div>
  );
}

export default SidebarComponentCommunity;

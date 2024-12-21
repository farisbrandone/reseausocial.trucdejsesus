import { CommunityDataType, GroupeDataType } from "seedAndGetData/seedData";
import { ButtonSideBar } from "./ButtonSidebar";
import { Fragment } from "react/jsx-runtime";

interface SidebarComponentType {
  groupeState: GroupeDataType[] | undefined;
  val: CommunityDataType;
}

function SidebarComponentFictif({ groupeState, val }: SidebarComponentType) {
  return (
    <div className="fixed hidden min-[1030px]:flex flex-col gap-2 items-center ml-3 sm:ml-3 top-0 w-[220px]  xl:max-w-[260px] ">
      <a
        href={`/community/${val.id}`}
        className="header flex flex-col gap-4 items-center mt-6 px-1  pb-1"
      >
        {val.logoUrl && val.logoUrl.includes(".mp4") ? (
          <video autoPlay={true} muted={true}>
            <source src={val.logoUrl} type="video/mp4" />
            Votre navigateur ne supporte pas la balise vidéo.
          </video>
        ) : (
          <img
            src={val.logoUrl}
            alt=""
            className="object-cover w-[40px] h-[40px]"
          />
        )}

        <p className=" flex items-center">{val.title}</p>
      </a>
      <div className="corpsSidebar flex flex-col border-t-2 border-t-[#242424] border-solid w-full">
        <p className="title my-3">Groupes</p>
        <div className="partNavigation flex flex-col gap-2 items-start">
          {groupeState?.map((value) => (
            <Fragment key={value.id}>
              <ButtonSideBar value={value} val={val} />
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

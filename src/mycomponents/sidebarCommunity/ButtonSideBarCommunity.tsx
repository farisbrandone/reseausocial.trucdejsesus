import { NavLink } from "react-router-dom";
import { CommunityDataType } from "../../../seedAndGetData/seedData";

function ButtonSideBarCommunity({ value }: { value: CommunityDataType }) {
  const myClass = "flex  gap-3  rounded-lg";
  return (
    <NavLink
      to={`/community/${value.title}`}
      className={({ isActive, isPending }) =>
        isActive
          ? "active  bg-[#FFF700] " + myClass
          : isPending
          ? "pending  bg-[#ffffffd8] " + myClass
          : myClass
      }
    >
      <div className="flex items-center justify-center w-[25px] h-[25px] p-2 rounded-full text-white bg-[#000] ">
        {value.title.charAt(0).toUpperCase()}
      </div>
      <div> {value.title} </div>
      {/* <div>{text === "/" ? "ACCEUIL" : text}</div> */}
    </NavLink>
  );
}

export { ButtonSideBarCommunity };

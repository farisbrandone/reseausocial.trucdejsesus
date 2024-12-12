import { NavLink } from "react-router-dom";
import { CommunityDataType, GroupeDataType } from "seedAndGetData/seedData";

function ButtonSideBar({
  value,
  val,
}: {
  value: GroupeDataType;
  val: CommunityDataType;
}) {
  const myClass = "flex  gap-3  rounded-lg";
  return (
    <NavLink
      to={`/community/${val.id}/${value.id}`}
      className={({ isActive, isPending }) =>
        isActive
          ? "active  bg-[#FFF700] p-2 " + myClass
          : isPending
          ? "pending  bg-[#ffffffd8] p-2" + myClass
          : myClass
      }
    >
      <div className="flex items-center justify-center w-[25px] h-[25px] p-2 rounded-full text-white bg-[#000] ">
        {value.titleGroupe.charAt(0).toUpperCase()}
      </div>
      <div> {value.titleGroupe} </div>
      {/* <div>{text === "/" ? "ACCEUIL" : text}</div> */}
    </NavLink>
  );
}

export { ButtonSideBar };

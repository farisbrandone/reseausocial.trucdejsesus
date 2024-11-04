import { NavLink } from "react-router-dom";

function ButtonSideBar({ text }: { text: string }) {
  const myClass = "flex items-center gap-3 p-2 rounded-lg";
  return (
    <NavLink
      to={text}
      className={({ isActive, isPending }) =>
        isActive
          ? "active  bg-[#FFF700] " + myClass
          : isPending
          ? "pending  bg-[#ffffffd8] " + myClass
          : myClass
      }
    >
      <div className="flex items-center justify-center w-[25px] h-[25px] p-2 rounded-full text-white bg-[#000] ">
        {text.charAt(0).toUpperCase()}
      </div>
      <div>{text === "/" ? "ACCEUIL" : text}</div>
    </NavLink>
  );
}

export { ButtonSideBar };

import clsx from "clsx";
import { MouseEvent, useEffect, useRef, useState } from "react";

/* interface AvatarComponentType {
  top: string;
  right: string;
} */

function AvatarComponent() {
  const [putHidden, setPutHidden] = useState(true);

  const elementRef = useRef<HTMLDivElement>(null);

  const handleVisible = (event: MouseEvent<HTMLDivElement>) => {
    const clickedElement = event.target as HTMLElement;

    console.log(clickedElement.className);
    if (clickedElement.className.includes("mybutton")) {
      return;
    }
    setPutHidden((prev) => !prev);
  };

  const handleClickOutside = (event: any) => {
    if (
      elementRef.current &&
      !elementRef.current?.contains(event.target as Node)
    ) {
      setPutHidden(true);
    }
  };

  useEffect(() => {
    const handleDocumentClick = (event: any) => {
      handleClickOutside(event);
    };

    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);
  /* top-[70px] right-[10px] */
  const buttonClass = clsx(
    `mybutton absolute text-[14px] flex flex-col items-center gap-4  bg-[#fff]/90 top-[40px] right-[0px] text-white w-[180px] px-0 py-3 rounded-xl shadow-2xl border-[1px] border-solid`,
    { " hidden ": putHidden }
  );

  return (
    <div
      onClick={handleVisible}
      ref={elementRef}
      className="relative flex items-center justify-center w-[30px] h-[30px] bg-[#c7bfbf] rounded-full mr-2 cursor-pointer border-[1px] border-solid border-[#00000026]  "
    >
      {/*  <div
        ref={elementRef}
        className="cursor-pointer relative p-0 w-[60px] h-[60px] rounded-full  flex items-center justify-center "
        onClick={handleVisible}
      > */}
      <p className=""> A</p>

      {/*  </div> */}
      <ul className={buttonClass} onClick={() => setPutHidden(false)}>
        <li className="mybutton hover:text-black  text-[#000]  text-center hover:bg-black/20 py-1 transition-all duration-500 w-[90%] rounded-md  ">
          {" "}
          Action1
        </li>
        <li className="mybutton hover:text-black  text-[#000]  text-center hover:bg-black/20 py-1 transition-all duration-500 w-[90%] rounded-md ">
          {" "}
          Action2
        </li>
        <li className="mybutton hover:text-black  text-[#000]  text-center hover:bg-black/20 py-1 transition-all duration-500 w-[90%] rounded-md">
          {" "}
          Action3
        </li>
      </ul>
    </div>
  );
}

export default AvatarComponent;

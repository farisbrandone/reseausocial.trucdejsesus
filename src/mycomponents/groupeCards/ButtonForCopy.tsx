import React, { useEffect, useRef } from "react";

function ButtonForCopy({
  setCopied,
  title,
  icon,
  position,
  handleClick,
  otherClasses,
}: {
  setCopied: React.Dispatch<React.SetStateAction<boolean>>;
  name?: string;
  title: string;
  icon: React.ReactNode;
  position: string;
  handleClick?: () => void;
  handleClick2?: () => void;
  otherClasses?: string;
}) {
  const elementRef = useRef<HTMLButtonElement>(null);

  const handleClickOutside = (event: any) => {
    if (
      elementRef.current &&
      !elementRef.current?.contains(event.target as Node)
    ) {
      setCopied(false);
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

  return (
    <button
      ref={elementRef}
      className="flex-shrink-0  p-2 focus:outline-none bg-[#fff700] flex items-center justify-center "
      onClick={handleClick}
    >
      {/* <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" /> */}
      <span
        className={`inline-flex h-full w-full cursor-pointer items-center justify-center   px-7 text-sm font-medium text-[#000] backdrop-blur-3xl gap-2 ${otherClasses}`}
      >
        {position === "left" && icon}
        {title}
        {position === "right" && icon}
      </span>
    </button>
  );
}

export default ButtonForCopy;

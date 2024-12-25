import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import clsx from "clsx";

const ButtonForVerset = () => {
  const [verset, setVerset] = useState(false);

  const openVerset = () => {
    if (verset) {
      setVerset(false);
      return;
    }
    setVerset(true);
  };

  useEffect(() => {
    // Create a script element
    const script = document.createElement("script");
    script.src = "https://dailyverses.net/get/verse.js?language=sg21"; // Replace with your script URL
    script.async = true;

    // Append the script to the body
    document.body.appendChild(script);

    // Clean up the script when the component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <div
        className={clsx(
          "fixed  top-0 left-0 right-0 bottom-0  flex items-center justify-end  p-4 z-[20000] ",
          { hidden: !verset }
        )}
      >
        <div className="relative p-3 bg-white text-black max-w-[350px]  sm:max-w-[550px] rounded-md z-[20000] ">
          <div
            id="dailyVersesWrapper"
            className={clsx(
              " max-w-[300px] p-2 sm:max-w-[500px]  rounded-md text-[16px] mt-[20px] font-normal from-neutral-400 italic"
            )}
          ></div>

          <div
            className="absolute top-2 right-2 text-[18px] w-[30px] h-[30px] rounded-sm bg-[#fff700] text-black flex items-center justify-center cursor-pointer"
            onClick={openVerset}
          >
            X
          </div>
        </div>
      </div>

      <Button
        variant="outline"
        className="bg-[#fff700] text-black  hover:bg-[#fff700]/80 sm:text-[16px]  "
        onClick={openVerset}
      >
        Verset du jour
      </Button>
    </>
  );
};

export default ButtonForVerset;

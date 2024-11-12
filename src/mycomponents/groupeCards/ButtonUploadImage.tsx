import React, { ChangeEvent, useState } from "react";
import { storage } from "../../../firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useToast } from "@/hooks/use-toast";

type typesetStateBollean = React.Dispatch<React.SetStateAction<boolean>>;
type typesetStatestring = React.Dispatch<React.SetStateAction<string>>;

interface statePropsButtonse {
  label: string;
  key: string;
  setImageUrl: typesetStatestring;
  setStateDownloadProps: typesetStateBollean;
  stateDownloadProps: boolean;
}

function ButtonUploadFile2({
  label,
  key,
  setImageUrl,
  setStateDownloadProps,
  stateDownloadProps,
}: statePropsButtonse) {
  /* const [file, setFile] = useState(null);
    const [url, setUrl] = useState(""); */
  const [progress2, setProgress2] = useState(0);
  /*  const [errorDownload, setErrorDownload] = useState("");
    const [successDownload, setSuccessDownload] = useState(""); */
  /* const handleFileChange = (e) => {
      setFile(e.target.files[0]);
    }; */
  const { toast } = useToast();
  const handleFileChange2 = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    console.log("bunga");
    console.log(e.target.name);
    if (!e?.target.files) return;
    const file = e.target.files[0];
    console.log("bunga");
    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        setStateDownloadProps(() => {
          return true;
        });
        console.log("sonko");
        const progression = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress2(progression);
      },
      (error) => {
        /*  setErrorDownload("une erreur est survenue pendant le chargement"); */
        setStateDownloadProps(false);
        toast({
          variant: "destructive",
          title: "Erreur",
          description:
            "une erreur est survenue pendant le chargement " + error.message,
        });
        console.error(error);
      },
      () => {
        // Get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageUrl(downloadURL);
          setStateDownloadProps(false);
          /*  setSuccessDownload("le telechargement s'est fait avec success"); */
          toast({
            title: "Success",
            description: "le telechargement s'est fait avec success",
          });
        });
      }
    );
  };
  return (
    <div
      key={key}
      title="Charger des fichiers localement et obtenez des urls"
      className="flex items-center justify-center mx-auto w-[90%]  "
    >
      <label
        htmlFor={label}
        className="flex flex-col items-center justify-center w-full p-1 border-2 border-[#bd10e0] border-dashed rounded-lg cursor-pointer bg-gray-50  dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 h-[180px] "
      >
        {stateDownloadProps ? (
          <div className="flex items-center">
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />{" "}
            <span> {progress2} </span>
          </div>
        ) : (
          <div className="flex  items-center gap-1 p-0">
            <svg
              className="w-8 h-8  text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="text-[16px] flex flex-col text-gray-500 dark:text-gray-400">
              <span className="font-semibold">
                {" "}
                Télécharger ou glisser-déposer une image{" "}
              </span>{" "}
              <span className="text-[16px] text-gray-500 dark:text-gray-400">
                {" "}
                (SVG, PNG, JPEG, JPG)
              </span>
            </p>
          </div>
        )}

        <input
          name="file2"
          id={label}
          type="file"
          className="hidden"
          onChange={handleFileChange2}
          disabled={stateDownloadProps}
        />
      </label>
    </div>
  );
}

export { ButtonUploadFile2 };

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
  desableButton: boolean;
}

function ButtonUploadFileForComment({
  label,
  key,
  setImageUrl,
  setStateDownloadProps,
  stateDownloadProps,
  desableButton,
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

    if (!e?.target.files) return;
    const file = e.target.files[0];

    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        setStateDownloadProps(() => {
          return true;
        });

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
      className="flex items-center justify-center mx-auto w-[30px] h-[30px] "
    >
      <label
        htmlFor={label}
        className="flex flex-col items-center justify-center w-full p-1 border-1 border-[#000] border-solid rounded-lg cursor-pointer bg-gray-50  dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 h-[30px] "
      >
        {stateDownloadProps ? (
          <div className="flex items-center">
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />{" "}
            <span> {progress2} </span>
          </div>
        ) : (
          <div className="flex  items-center gap-1 p-0">
            <span className="icon-[majesticons--image] text-xl "></span>
            {/* <p className="text-[16px] flex flex-col text-gray-500 dark:text-gray-400">
              <span className="font-semibold">
                {" "}
                Télécharger ou glisser-déposer une image{" "}
              </span>{" "}
              <span className="text-[16px] text-gray-500 dark:text-gray-400">
                {" "}
                (SVG, PNG, JPEG, JPG)
              </span>
            </p> */}
          </div>
        )}

        <input
          name="file2"
          id={label}
          type="file"
          className="hidden"
          onChange={handleFileChange2}
          disabled={stateDownloadProps || desableButton}
        />
      </label>
    </div>
  );
}

export { ButtonUploadFileForComment };

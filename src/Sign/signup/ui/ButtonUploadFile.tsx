import React, { ChangeEvent, useState } from "react";
import { storage } from "../../../../firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useToast } from "@/hooks/use-toast";

type typesetStateBollean = React.Dispatch<React.SetStateAction<boolean>>;
type typesetStatestring = React.Dispatch<React.SetStateAction<string>>;

interface statePropsButtons {
  name: string;
  valueForHtml: string;
  key: string;
  setImageUrl: typesetStatestring;
  setStateDownloadProps: typesetStateBollean;
  stateDownloadProps: boolean;
}

function ButtonUploadFile({
  name,
  valueForHtml,
  key,
  setImageUrl,
  setStateDownloadProps,
  stateDownloadProps,
}: statePropsButtons) {
  const [progress, setProgress] = useState(0);

  const { toast } = useToast();
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
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
        console.log("ntamnyam");
        const progression = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progression);
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
      className="flex items-center w-[88px]"
    >
      <label
        htmlFor={valueForHtml}
        className="flex flex-col items-center justify-center w-full p-1 bg-[#191919] text-white rounded-r-sm cursor-pointer h-[36px] "
      >
        {stateDownloadProps ? (
          <div className="flex items-center">
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />{" "}
            <span> {progress} </span>
          </div>
        ) : (
          <div className="flex  items-center gap-1 p-0">
            <p className="text-white text-[12px] font-bold ">UPLOAD</p>
          </div>
        )}

        <input
          name={name}
          id={valueForHtml}
          type="file"
          className="hidden"
          onChange={handleFileChange}
          disabled={stateDownloadProps}
        />
      </label>
    </div>
  );
}

export default ButtonUploadFile;

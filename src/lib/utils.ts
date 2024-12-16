import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import countryPhoneCode from "../../countryPhoneCodes.json";
import { CustomLabels } from "react-flags-select/build/types";

import { storage } from "../../firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function deliverCountryPhoneCode() {
  const code = countryPhoneCode.map((value) => value.iso);
  let data: CustomLabels = {};
  countryPhoneCode.forEach((value) => {
    data = { ...data, ...{ [`${value.iso}`]: value.country } };
  });

  return { code, countryCode: data };
}

export function getCountryAndFlagWitnCode(code: string) {
  let phone = "";
  let countrystring = "";
  for (let value of countryPhoneCode) {
    if (value.iso === code) {
      phone = value.code;
      countrystring = value.country;
      break;
    }
  }
  return { phone, countrystring };
}

export function determineFileType(file: File) {
  if (file instanceof File) {
    const fileType = file.type;
    if (fileType.startsWith("image/")) {
      return "Image";
    } else if (fileType.startsWith("video/")) {
      return "Video";
    } else if (fileType.startsWith("audio/")) {
      return "Audio";
    } else if (fileType === "application/pdf") {
      return "PDF Document";
    } else if (fileType.startsWith("text/")) {
      return "Text Document";
    } else {
      return "Unknown File Type";
    }
  } else {
    throw new Error("Input is not a valid File object.");
  }
}

export const getFileUrlAndType = async (file: File) => {
  let result = "";

  console.log("bunga");
  const storageRef = ref(storage, `images/${file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      console.log("sonko");
      const progression = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      console.log(progression);
    },
    (error) => {
      /*  setErrorDownload("une erreur est survenue pendant le chargement"); */

      console.error(error);
      throw error;
    },
    () => {
      // Get the download URL
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        result = downloadURL;
      });
    }
  );
  const typeFile = determineFileType(file);
  return { url: result, typeFile };
};

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import countryPhoneCode from "../../countryPhoneCodes.json";
import { CustomLabels } from "react-flags-select/build/types";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../firebaseConfig";

import "firebase/auth";
import "firebase/storage";

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

export function gitIsoWithCountryCodePhone(code: string) {
  let iso = "";
  let countrystring = "";
  for (let value of countryPhoneCode) {
    if (value.code === code) {
      iso = value.iso;
      countrystring = value.country;
      break;
    }
  }
  return { iso, countrystring };
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

export function verifyPassword(password: string) {
  // Define the conditions
  const lengthCondition = password.length >= 8;
  const uppercaseCondition = /[A-Z]/.test(password);
  const lowercaseCondition = /[a-z]/.test(password);
  const digitCondition = /\d/.test(password);
  const specialCharCondition = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  // Check all conditions
  let message = "Password must contain:";
  if (!lengthCondition) message += "\n- At least 8 characters";
  if (!uppercaseCondition) message += "\n- An uppercase letter";
  if (!lowercaseCondition) message += "\n- A lowercase letter";
  if (!digitCondition) message += "\n- A digit";
  if (!specialCharCondition) message += "\n- A special character";

  if (
    lengthCondition &&
    uppercaseCondition &&
    lowercaseCondition &&
    digitCondition &&
    specialCharCondition
  ) {
    return { message: "Password is strong!", success: true, color: "green" };
  } else {
    return { message: message, success: false, color: "green" };
  }
}

export const getFileUrlAndType = async (file: File) => {
  try {
    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    /*  const response = await axios.post(
      "http://localhost:4000/api/frontoffice/geturlfile"
    );
    const token = response.data.token;
    console.log({ token }); */
    /*  const authForStorage = getAuth(appForStorage);
    const userCredential = await signInWithCustomToken(authForStorage, token);
    console.log(userCredential.user); */
    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
    const typeFile = determineFileType(file);
    return { url: downloadURL, typeFile };
  } catch (error) {
    console.error(error);
    throw error;
  }

  /* uploadTask.on(
    "state_changed",
    (snapshot) => {
      console.log("sonko");
      const progression = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      console.log(progression);
    },
    (error) => {
      console.error(error);
      throw error;
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        result = downloadURL;
      });
    }
  );

  const typeFile = determineFileType(file);
  return { url: result, typeFile }; */
};

/* 
  http://localhost:4000
  https://serverbackofficetrucdejesus.onrender.com
*/

/* 

 let result = "";

  try {
    if (file) {
      console.log(file);
      const formData = new FormData();
      formData.append("file", file);
      console.log({ body: formData });
      const response = await fetch(
        "http://localhost:4000/api/frontoffice/geturlfile",
        {
          method: "POST",
          body: formData,
        }
      );
      const results = await response.json();
      console.log(results.data.data);
      result = results.data.data as string;
      const typeFile = determineFileType(file);
      return { url: result, typeFile };
    }
  } catch (error) {
    throw new Error("Error uploading file:");
  }

*/

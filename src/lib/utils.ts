import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import countryPhoneCode from "../../countryPhoneCodes.json";
import { CustomLabels } from "react-flags-select/build/types";

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

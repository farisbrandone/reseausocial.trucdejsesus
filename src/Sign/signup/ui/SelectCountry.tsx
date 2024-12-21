import { useMemo } from "react";
import ReactFlagsSelect from "react-flags-select";
import { deliverCountryPhoneCode } from "@/lib/utils";

interface SelectCountryProps {
  setCountry: React.Dispatch<React.SetStateAction<string>>;
  setClassOfCountry: React.Dispatch<React.SetStateAction<boolean>>;
  country: string;
  classOfCountry: boolean;
}

const SelectCountry = ({
  setCountry,
  setClassOfCountry,
  country,
  classOfCountry,
}: SelectCountryProps) => {
  //const [selected, setSelected] = useState<string>("");
  const value = 2;
  const result = useMemo(() => deliverCountryPhoneCode(), [value]);

  const classValue = classOfCountry ? "selectCountry" : "selectCountry2";
  return (
    <ReactFlagsSelect
      selected={country}
      onSelect={(code) => {
        setCountry(code);
        setClassOfCountry(false);
      }}
      countries={result.code}
      customLabels={result.countryCode}
      placeholder="Selectionner un pays"
      searchable
      className={classValue}
    />
  );
};

export default SelectCountry;

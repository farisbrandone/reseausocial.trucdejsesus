import clsx from "clsx";
import { ChangeEvent, useMemo, useState } from "react";
import SelectCountry from "./ui/SelectCountry";
import {
  deliverCountryPhoneCode,
  getCountryAndFlagWitnCode,
} from "@/lib/utils";
import ButtonUploadFile from "./ui/ButtonUploadFile";
import { toast } from "@/hooks/use-toast";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
import { verifyFormatDate } from "@/lib/formatDate";

/* interface MemberWaitingDataType {
  name: string;
  email: string;
  motsDepasse: string;
  sexe: string;
  birthDay: string;
  phone: string;
  status: string;
  image: string;
  communityId?: string;
  groupeId?: string;
  dateOfCreation?: string;
  dateOfUpdate?: string;
  id?: string;
  nombrePartage: number;
  nombreLikes: number;
  nombreCommentaire: number;
  nombreDeMerciBenis: number;
  nombreDactivite: number;
  nombreDeBadge: number;
} */

interface axiosType {
  success: string;
  error: string;
  alreadyExist: boolean;
}

function Signup() {
  const { communityId, groupeId } = useParams();
  const [name, setName] = useState("");
  const [classOfName, setClassOfName] = useState(false);

  const [email, setEmail] = useState("");
  const [classOfEmail, setClassOfEmail] = useState(false);

  const [birthDay, setBirthDay] = useState("");
  const [classOfBirthDay, setClassOfBirthDay] = useState(false);
  const [qualityDate, setQualityDate] = useState(false);

  const [country, setCountry] = useState("FR");
  const [classOfCountry, setClassOfCountry] = useState(false);

  const [codeCountry, setCodeCountry] = useState(country);
  const [phone, setPhone] = useState(
    "+" + getCountryAndFlagWitnCode(country).phone + "-"
  );
  const [classOfPhone, setClassOfPhone] = useState(false);

  const [sexe, setSexe] = useState("");

  const [motsDepasse, setMotsDepasse] = useState("");
  const [classOfMotsDepasse, setClassOfMotsDepasse] = useState(false);
  const [motsDepasseConfirm, setMotsDepasseConfirm] = useState("");
  const [classOfMotsDepasseConfirm, setClassOfMotsDepasseConfirm] =
    useState(false);
  const [image, setImage] = useState("");
  const [stateDownload, setStateDownload] = useState(false);
  const [startSending, setStartSending] = useState(false);
  const [messageSending, setMessageSending] = useState("");
  const value = 2;
  const result = useMemo(() => deliverCountryPhoneCode(), [value]);

  const handleName = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setName(e.target.value);
    setClassOfName(false);
  };

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setEmail(e.target.value);
    setClassOfEmail(false);
  };

  const handleCodeCountry = (e: ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    setCodeCountry(e.target.value);
    setPhone((prev) => {
      const val = prev.split("-");
      const c = "+" + getCountryAndFlagWitnCode(e.target.value).phone + "-";
      if (val.length > 1) {
        return c + val[1];
      }
      return c;
    });
  };

  const handlePhone = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setPhone((prev) => {
      const ev = e.target.value;
      if (ev.length >= 4) {
        return ev;
      } else {
        return prev;
      }
    });
    setClassOfPhone(false);
  };

  const handleSexe = (e: ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    setSexe(e.target.value);
  };

  const handleBirthDay = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setBirthDay(e.target.value);
    setClassOfBirthDay(false);
    setQualityDate(false);
  };

  const handleMotsDepasse = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setMotsDepasse(e.target.value);
    setClassOfMotsDepasse(false);
  };

  const handleMotsDepasseConfirm = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setMotsDepasseConfirm(e.target.value);
    setClassOfMotsDepasseConfirm(false);
  };

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setImage(() => e.target.value);
  };

  const addMembre = async () => {
    setStartSending(() => true);
    if (!verifyFormatDate(birthDay)) {
      setQualityDate(true);
      setClassOfBirthDay(true);
    }
    if (
      !name ||
      !motsDepasse ||
      !motsDepasseConfirm ||
      motsDepasse !== motsDepasseConfirm ||
      !email ||
      !birthDay ||
      !sexe ||
      !phone
    ) {
      if (!name) {
        setClassOfName(true);
      }
      if (!motsDepasse) {
        setClassOfMotsDepasse(true);
      }
      if (!motsDepasseConfirm || motsDepasse !== motsDepasseConfirm) {
        setClassOfMotsDepasseConfirm(true);
      }
      if (!email) {
        setClassOfEmail(true);
      }
      if (!birthDay) {
        setClassOfBirthDay(true);
      }

      if (!phone) {
        setClassOfPhone(true);
      }
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Tous les champs requis n'ont pas été remplis",
      });
      setStartSending(() => false);
      return;
    }
    const myDate = new Date().toUTCString();
    try {
      var data = {
        name: name,
        email: email,
        motsDepasse: motsDepasse,
        image: image,
        sexe: sexe,
        birthDay: birthDay,
        phone,
        status: "desactivate",
        groupeId: groupeId,
        communityId: communityId,
        nombrePartage: 0,
        nombreLikes: 0,
        nombreCommentaire: 0,
        nombreDeMerciBenis: 0,
        nombreDactivite: 0,
        nombreDeBadge: 0,
        dateOfCreation: myDate,
        dateOfUpdate: myDate,
      };
      console.log(data);
      const { success, error, alreadyExist } = await axios.post<
        axiosType,
        axiosType
      >(
        "https://serverbackofficetrucdejesus.onrender.com/api/frontoffice/signup",
        data
      );
      console.log(error);
      if (alreadyExist) {
        setMessageSending(success);
        return;
      }

      if (!alreadyExist && success) {
        toast({
          title: "Success",
          description: "Le membre a été crée avec success",
        });
        setMessageSending(
          "Un email vous a été envoyé à votre adresse, vérifier si possible dans les spams"
        );

        return;
      } else {
        toast({
          variant: "destructive",
          title: "Erreur",
          description: "Une erreur est survenue cotée serveur",
        });
        setStartSending(() => false);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue pendant la creation de ce membre",
      });
      setStartSending(() => false);
      console.error("");
    }
  };

  return (
    <div className="sm:h-screen sm:w-screen flex flex-col items-center justify-center pt13 text-[14px] text-[#000]  ">
      <div className="bg-white shadow-xl px-3 sm:px-4 lg:px-8 pb-3 rounded-md border-[1px] border-solid border-[#F8E71C] ">
        <div className="flex flex-col gap-4 mt-3">
          <div className="flex flex-col gap-1">
            <img
              src=" https://www.trucdejesus.com/5322770/65d5f2e5b5b87_LOGOJAUNEUNTRUCDEJESUSTRANSPARENT.png"
              alt=""
              className="w-[50px] h-[50px] object-cover "
            />
            <p className="-mt-3">Un Truc de Jesus</p>
          </div>
          <div className="flex flex-col gap-1">
            <h1 className="text-[20px] font-bold ">S'inscrire</h1>
            <p className="text-[#0000009a] ">
              Entrez vos coordonnées ci-dessous pour créer votre compte et
              démarrer.
            </p>
            {!!messageSending && (
              <p className="text-green-700 text-[16px] "> {messageSending}</p>
            )}
          </div>
        </div>
        <div className="flex flex-col w-full  gap-4 sm:grid sm:grid-cols-2 sm:gap-x-20 mt-3">
          <div className=" flex flex-col gap-4">
            <div className=" flex flex-col gap-1">
              <label htmlFor="fullName">Nom et prenom</label>
              <input
                type="text"
                id="fullName"
                placeholder="Entrer..."
                value={name}
                onChange={handleName}
                className={clsx("inputStyle3", {
                  "border-red-700 focus:border-red-700": classOfName,
                })}
              />
            </div>
            <div className=" flex flex-col gap-1">
              <label htmlFor="dateOfBirth">Date de naissance</label>
              <input
                type="text"
                id="dateOfBirth"
                placeholder="JJ/MM/AA"
                value={birthDay}
                onChange={handleBirthDay}
                className={clsx("inputStyle3", {
                  "border-red-700 focus:border-red-700": classOfBirthDay,
                })}
              />
              {qualityDate && (
                <p className="text-red-700 ">Format de date non valide</p>
              )}
            </div>
            <div className=" flex flex-col gap-1">
              <label htmlFor="nationnalite">Nationnalité</label>
              <SelectCountry
                country={country}
                setCountry={setCountry}
                classOfCountry={classOfCountry}
                setClassOfCountry={setClassOfCountry}
              />
            </div>
            <div className=" flex flex-col gap-1">
              <label htmlFor="password">Mots de passe</label>
              <input
                type="password"
                id="password"
                placeholder="Entrer.."
                value={motsDepasse}
                onChange={handleMotsDepasse}
                className={clsx("inputStyle3", {
                  "border-red-700 focus:border-red-700": classOfMotsDepasse,
                })}
              />
            </div>
          </div>
          <div className="flex flex-col gap-4  ">
            <div className=" flex flex-col gap-1">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                placeholder="Entrer..."
                value={email}
                onChange={handleEmail}
                className={clsx("inputStyle3", {
                  "border-red-700 focus:border-red-700": classOfEmail,
                })}
              />
            </div>
            <div className=" flex flex-col gap-1">
              <label htmlFor="phone">Telephone</label>
              <div className="flex items-center">
                <select
                  name="codeCountry"
                  id="odeCountry"
                  value={codeCountry}
                  onChange={handleCodeCountry}
                  className="inputStyle3 w-[50px] min-h-[35px] rounded-r-none "
                >
                  {result.code.map((val, index) => (
                    <option value={val} key={index}>
                      {getCountryAndFlagWitnCode(val).countrystring}
                    </option>
                  ))}
                </select>

                <input
                  type="text"
                  id="phone"
                  value={phone}
                  onChange={handlePhone}
                  className={clsx("inputStyle3 rounded-l-none", {
                    "border-red-700 focus:border-red-700": classOfPhone,
                  })}
                />
              </div>
            </div>
            <div className=" flex flex-col gap-1 h-[74px] ">
              <label htmlFor="nationnalite">Sexe</label>
              <select
                name="sexe"
                id="sexe"
                value={sexe}
                onChange={handleSexe}
                className="inputStyle3 "
              >
                <option value="Male">Male</option>
                <option value="Femmelle">Femmele</option>
              </select>
            </div>
            <div className=" flex flex-col gap-1">
              <label htmlFor="passwordConfirm">Confirme le mots de passe</label>
              <input
                type="passwordConfirm"
                id="passwordConfirm"
                placeholder="Entrer.."
                value={motsDepasseConfirm}
                onChange={handleMotsDepasseConfirm}
                className={clsx("inputStyle3", {
                  "border-red-700 focus:border-red-700":
                    classOfMotsDepasseConfirm,
                })}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-1 mt-8">
          <label htmlFor="image">Insérer une image de profil</label>
          <div className="flex items-center" key="button21">
            <input
              key="button11"
              id="image"
              name="image"
              value={image}
              placeholder="Entrer une image représentant le logo du membre"
              onChange={handleImage}
              disabled={stateDownload || startSending}
              className="inputStyle2"
            />
            <ButtonUploadFile
              name="file1"
              valueForHtml="drop-zone-1"
              key="button111"
              setImageUrl={setImage}
              setStateDownloadProps={setStateDownload}
              stateDownloadProps={stateDownload}
            />
          </div>
        </div>
        <div className="w-full flex justify-center items-center gap-1">
          <button
            className="text-[16px] mx-auto w-[85%] sm:px-40 py-3 font-bold text-center bg-[#F8E71C] hover:bg-[#F8E71C]/80 disabled:bg-[#F8E71C]/60 text-[#000] my-8  rounded-md "
            onClick={addMembre}
            disabled={startSending}
          >
            Confirmer{" "}
            {startSending && (
              <span className="icon-[eos-icons--three-dots-loading] text-xl"></span>
            )}{" "}
          </button>
          <div className="flex items-center gap-1">
            <p>Vous etes dejà inscrit:</p>
            <NavLink
              to={`/login/${communityId}/${groupeId}`}
              className="text-[#BD10E0] "
            >
              Se connecter
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;

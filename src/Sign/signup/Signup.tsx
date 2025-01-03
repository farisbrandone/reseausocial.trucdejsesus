import clsx from "clsx";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import SelectCountry from "./ui/SelectCountry";
import {
  deliverCountryPhoneCode,
  getCountryAndFlagWitnCode,
  verifyPassword,
} from "@/lib/utils";

import { toast } from "@/hooks/use-toast";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
import { verifyFormatDate } from "@/lib/formatDate";
import {
  CommunityDataType,
  requestToGetAllUniversalDataWithId,
} from "../../../seedAndGetData/seedData";

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

function Signup() {
  const { communityId, groupeId } = useParams();
  const [name, setName] = useState("");
  const [classOfName, setClassOfName] = useState(false);

  const [prenom, setPrenom] = useState("");
  const [classOfPrenom, setClassOfPrenom] = useState(false);

  const [email, setEmail] = useState("");
  const [classOfEmail, setClassOfEmail] = useState(false);

  const [birthDay, setBirthDay] = useState("");
  const [classOfBirthDay, setClassOfBirthDay] = useState(false);
  const [qualityDate, setQualityDate] = useState(false);

  const [country, setCountry] = useState("FR");
  const [classOfCountry, setClassOfCountry] = useState(false);

  const [codeCountry, setCodeCountry] = useState("FR");
  const [phone, setPhone] = useState(
    "+" + getCountryAndFlagWitnCode(country).phone + "-"
  );
  const [classOfPhone, setClassOfPhone] = useState(false);

  const [sexe, setSexe] = useState("Male");

  const [motsDepasse, setMotsDepasse] = useState("");
  const [classOfMotsDepasse, setClassOfMotsDepasse] = useState(false);
  const [motsDepasseConfirm, setMotsDepasseConfirm] = useState("");
  const [classOfMotsDepasseConfirm, setClassOfMotsDepasseConfirm] =
    useState(false);
  const [valid, setValid] = useState("");
  const [startSending, setStartSending] = useState(false);
  const [messagePassword, setMessagePassword] = useState("");
  const [messageSending, setMessageSending] = useState("");
  const value = 2;
  const result = useMemo(() => deliverCountryPhoneCode(), [value]);
  const [communaute, setCommunaute] = useState<CommunityDataType>();
  const [loading, setLoading] = useState(false);
  const [loadingFail, setLoadingFail] = useState(false);
  const handleName = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setName(e.target.value);
    setClassOfName(false);
  };

  const handlePrenom = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setPrenom(e.target.value);
    setClassOfPrenom(false);
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
    if (!verifyPassword(e.target.value).success) {
      setClassOfMotsDepasse(true);
      setMessagePassword(verifyPassword(e.target.value).message);
      return;
    }
    setValid("Mots de passe valide");
    setClassOfMotsDepasse(false);
    setMessagePassword("");
  };

  const handleMotsDepasseConfirm = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setMotsDepasseConfirm(e.target.value);
    setClassOfMotsDepasseConfirm(false);
  };

  const addMembre = async () => {
    if (!verifyFormatDate(birthDay)) {
      setQualityDate(true);
      setClassOfBirthDay(true);
      return;
    }
    if (
      !prenom ||
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
      if (!prenom) {
        setClassOfPrenom(true);
      }
      if (!motsDepasse || !verifyPassword(motsDepasse).success) {
        setClassOfMotsDepasse(true);
        setMessagePassword(verifyPassword(motsDepasse).message);
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
      if (!verifyPassword(motsDepasse).success) {
        toast({
          variant: "destructive",
          title: "Erreur",
          description: verifyPassword(motsDepasse).message,
        });
      }
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Tous les champs ne sont pas remplis",
      });

      return;
    }
    const myDate = new Date().toUTCString();
    try {
      setStartSending(() => true);
      var data = {
        name: name + " " + prenom,
        email: email,
        motsDepasse: motsDepasse,
        image: "",
        sexe: sexe,
        birthDay: birthDay,
        phone,
        status: "activate",
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

      const mydata = await axios.post(
        "https://adminnode-adzkyuspnq-uc.a.run.app/api/frontoffice/signup",
        data
      );
      /**
       * https://adminnode-adzkyuspnq-uc.a.run.app/
       * https://serverbackofficetrucdejesus.onrender.com
       */
      if (mydata.data.alreadyExist) {
        setMessageSending(mydata.data.success);
        return;
      }

      if (!mydata.data.alreadyExist && mydata.data.success) {
        toast({
          title: "Success",
          description: mydata.data.success,
        });
        setMessageSending(
          "Un email vous a été envoyé à votre adresse, vérifier si possible dans les spams"
        );
        setStartSending(() => false);
        return;
      } else {
        toast({
          variant: "destructive",
          title: "Erreur",
          description: mydata.data.success,
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
    }
  };

  useEffect(() => {
    const getMembreData = async () => {
      try {
        setLoading(true);

        const communaute =
          await requestToGetAllUniversalDataWithId<CommunityDataType>(
            communityId as string,
            "CommunityData"
          );

        setCommunaute({ ...communaute });

        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoadingFail(true);
      }
    };
    getMembreData();
  }, []);

  if (loading && !loadingFail)
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  if (loadingFail) {
    return (
      <div className="w-screen h-screen flex flex-col gap-1 items-center justify-center ">
        <p>
          Une erreur est survenue pendant le chargement ou problème de connexion
        </p>
        <p>Vérifier votre connexion</p>
      </div>
    );
  }

  return (
    <div className="sm:h-screen sm:w-screen flex flex-col items-center justify-center pt13 text-[14px] text-[#000]  ">
      <div className="bg-white shadow-xl px-3 sm:px-4 lg:px-8 pb-3 rounded-md border-[1px] border-solid border-[#F8E71C] ">
        <div className="flex flex-col gap-4 mt-3">
          <a
            href={`/community/${communaute?.id}`}
            className="header flex flex-col gap-4 items-center mt-6 px-1  pb-1"
          >
            {communaute?.logoUrl && communaute?.logoUrl.includes(".mp4") ? (
              <video autoPlay={true} muted={true}>
                <source src={communaute?.logoUrl} type="video/mp4" />
                Votre navigateur ne supporte pas la balise vidéo.
              </video>
            ) : (
              <img
                src={communaute?.logoUrl}
                alt=""
                className="object-cover w-[40px] h-[40px]"
              />
            )}

            <p className=" flex items-center">{communaute?.title}</p>
          </a>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1  justify-center">
              <span className="icon-[ion--person-circle-sharp] text-xl"></span>
              <p className="text-[#0000009a] text-[20px] ">
                Informations personnelles
              </p>
            </div>
            {!!messageSending && (
              <p className="text-green-700 text-[16px] "> {messageSending}</p>
            )}
          </div>
        </div>
        <div className="flex flex-col w-full  gap-4 sm:grid sm:grid-cols-2 sm:gap-x-20 mt-3">
          <div className=" flex flex-col gap-4">
            <div className=" flex flex-col gap-1">
              <label htmlFor="fullName">Nom</label>
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
              {messagePassword ? (
                <p className="text-red-700 text-[12px] w-[240px] text-wrap  whitespace-pre">
                  {" "}
                  {messagePassword}{" "}
                </p>
              ) : (
                <p className="text-green-700 text-[12px] w-[240px] text-wrap whitespace-pre">
                  {valid}
                </p>
              )}
            </div>

            <div className=" flex flex-col gap-1 h-[74px] ">
              <label htmlFor="nationnalite">Genre</label>
              <select
                name="sexe"
                id="sexe"
                value={sexe}
                onChange={handleSexe}
                className="inputStyle3 "
              >
                <option value="Homme">Homme</option>
                <option value="Femme">Femme</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col gap-4  ">
            <div className=" flex flex-col gap-1">
              <label htmlFor="fullName1">Prénom</label>
              <input
                type="text"
                id="fullName1"
                placeholder="Entrer..."
                value={prenom}
                onChange={handlePrenom}
                className={clsx("inputStyle3", {
                  "border-red-700 focus:border-red-700": classOfPrenom,
                })}
              />
            </div>
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

            <div className=" flex flex-col gap-1">
              <label htmlFor="passwordConfirm">
                Confirmer le mots de passe
              </label>
              <input
                type="password"
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
        {/*  <div className="flex flex-col gap-1 mt-8">
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
        </div> */}
        <div className="w-full flex  flex-col justify-center items-center gap-1">
          <button
            className="text-[16px] mx-auto w-[85%] sm:px-40 py-3 font-bold text-center bg-[#F8E71C] hover:bg-[#F8E71C]/80 disabled:bg-[#F8E71C]/60 text-[#000] my-8  rounded-md flax items-center gap-1 "
            onClick={addMembre}
            disabled={startSending}
          >
            <span>S'inscrire </span>
            {startSending && (
              <span className="icon-[eos-icons--three-dots-loading] text-3xl"></span>
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

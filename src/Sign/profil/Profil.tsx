import clsx from "clsx";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import {
  deliverCountryPhoneCode,
  getCountryAndFlagWitnCode,
  gitIsoWithCountryCodePhone,
} from "@/lib/utils";

import { toast } from "@/hooks/use-toast";
import { useParams } from "react-router-dom";
import axios from "axios";
import { verifyFormatDate } from "@/lib/formatDate";
import { auth } from "../../../firebaseConfig";
import {
  CommunityDataType,
  GroupeDataType,
  requestTogetAllMembreData,
  requestToGetAllUniversalDataWithId,
} from "../../../seedAndGetData/seedData";
import ButtonUploadFile from "../signup/ui/ButtonUploadFile";
import { signInWithEmailAndPassword } from "firebase/auth";
import { createUser } from "../login/createUser";
import AvatarComponent from "@/mycomponents/acceuilPage/AvatarComponent";

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

function Profil() {
  const { communityId, groupeId } = useParams();

  const [idUser, setIdUser] = useState("");
  const [name, setName] = useState("");
  const [classOfName, setClassOfName] = useState(false);

  const [prenom, setPrenom] = useState("");
  const [classOfPrenom, setClassOfPrenom] = useState(false);
  const [motsDepasse, setMotsDePasse] = useState("");
  const [email, setEmail] = useState("");
  const [classOfEmail, setClassOfEmail] = useState(false);

  const [birthDay, setBirthDay] = useState("");
  const [classOfBirthDay, setClassOfBirthDay] = useState(false);
  const [qualityDate, setQualityDate] = useState(false);

  const [codeCountry, setCodeCountry] = useState("FR");
  const [phone, setPhone] = useState(
    "+" + getCountryAndFlagWitnCode("FR").phone + "-"
  );
  const [classOfPhone, setClassOfPhone] = useState(false);

  const [sexe, setSexe] = useState("Male");

  const [image, setImage] = useState("");
  const [stateDownload, setStateDownload] = useState(false);
  const [startSending, setStartSending] = useState(false);

  const [communaute, setCommunaute] = useState<CommunityDataType>();
  const [groupe, setGroupe] = useState<GroupeDataType>();

  const [loading, setLoading] = useState(false);
  const [loadingFail, setLoadingFail] = useState(false);

  const value = 2;
  const result = useMemo(() => deliverCountryPhoneCode(), [value]);

  const currentUser = auth.currentUser;

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

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setImage(() => e.target.value);
  };

  const addMembre = async () => {
    if (!verifyFormatDate(birthDay)) {
      setQualityDate(true);
      setClassOfBirthDay(true);
      return;
    }
    if (!prenom || !name || !email || !birthDay || !sexe || !phone) {
      if (!name) {
        setClassOfName(true);
      }
      if (!prenom) {
        setClassOfPrenom(true);
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

      return;
    }
    const myDate = new Date().toUTCString();
    try {
      setStartSending(() => true);
      var data = {
        name: name + " " + prenom,
        email: email,
        image: image,
        sexe: sexe,
        birthDay: birthDay,
        phone,
        status: "activate",
        nombrePartage: 0,
        nombreLikes: 0,
        nombreCommentaire: 0,
        nombreDeMerciBenis: 0,
        nombreDactivite: 0,
        nombreDeBadge: 0,
        dateOfUpdate: myDate,
      };

      const myDataBody = { data, id: idUser, uid: currentUser?.uid };
      const mydata = await axios.post(
        "https://serverbackofficetrucdejesus.onrender.com/api/frontoffice/updateuser",
        myDataBody
      );
      /* https://serverbackofficetrucdejesus.onrender.com */
      if (!mydata.data.update) {
        toast({
          variant: "destructive",
          title: "Erreur",
          description: "Une erreur est survenue",
        });
        setStartSending(() => false);
        return;
      }

      if (mydata.data.update) {
        toast({
          title: "Success",
          description: mydata.data.message,
        });
        const dd = await createUser(email, motsDepasse, auth);
        const tt = await signInWithEmailAndPassword(auth, email, motsDepasse);
        localStorage.setItem("user", JSON.stringify(data));
        console.log(dd, tt);
        setStartSending(() => false);
        //window.location.replace(`/login/${communityId}/${groupeId}`);
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
        description: "Une erreur est survenue",
      });
      setStartSending(() => false);
    }
  };

  useEffect(() => {
    const getMembreData = async () => {
      try {
        setLoading(true);

        const result = (await requestTogetAllMembreData()).filter(
          (value) =>
            value.email === currentUser?.email &&
            value.communityId === communityId
        )[0];

        const communaute =
          await requestToGetAllUniversalDataWithId<CommunityDataType>(
            communityId as string,
            "CommunityData"
          );
        const groupeData =
          await requestToGetAllUniversalDataWithId<GroupeDataType>(
            groupeId as string,
            "GroupeData"
          );

        setCommunaute({ ...communaute });
        setGroupe({ ...groupeData });
        setBirthDay(result.birthDay);
        setCodeCountry(
          gitIsoWithCountryCodePhone(result.phone.split("-")[0]).iso
        );
        setEmail(result.email);
        setName(result.name.split(" ")[0]);
        setPhone(result.phone);
        setPrenom(result.name.split(" ")[1]);
        setSexe(result.sexe);
        setIdUser(result.id as string);
        setMotsDePasse(result.motsDepasse);
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
    <div className="relative min-h-screen sm:h-screen sm:w-screen flex flex-col items-center sm:justify-center pt13 text-[14px] text-[#000]  ">
      <div className="sticky sm:absolute flex items-center justify-between w-full top-0 px-5 z-40 bg-white">
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

        {groupe && (
          <AvatarComponent
            communityId={groupe.communityId as string}
            groupeId={groupe.id as string}
          />
        )}
      </div>
      <div className="bg-white shadow-xl px-3 sm:px-4 lg:px-8 pb-3 rounded-md border-[1px] border-solid border-[#F8E71C] mt-4 sm:mt-0">
        <div className="flex flex-col gap-4 mt-3">
          <div className="flex items-center gap-1  justify-center">
            <span className="icon-[ion--person-circle-sharp] text-xl"></span>
            <p className="text-[#0000009a] text-[20px] ">
              Informations personnelles
            </p>
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
              <label htmlFor="fullName">Prénom</label>
              <input
                type="text"
                id="fullName"
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
        <div className="w-full flex items-center gap-2">
          <button
            className="text-[16px]  px-2.5  py-2.5 font-bold text-center bg-[#F8E71C] hover:bg-[#F8E71C]/80 disabled:bg-[#F8E71C]/60 text-[#000] my-8  rounded-md flex items-center gap-1 "
            onClick={addMembre}
            disabled={startSending}
          >
            <span>Mettre à jour </span>
            {startSending && (
              <span className="icon-[eos-icons--three-dots-loading] text-3xl"></span>
            )}{" "}
          </button>

          <button
            title="retour"
            onClick={() => window.history.back()}
            className="bg-[#fff700] text-[#000] px-2.5 py-2.5 rounded-sm hover:bg-[#fff700]/70 text-[16px] flex items-center "
          >
            {" "}
            <span className="icon-[material-symbols--arrow-circle-left]"></span>{" "}
            <span>Retour</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profil;

import clsx from "clsx";
import { ChangeEvent, useRef, useState } from "react";
import { toast } from "@/hooks/use-toast";
import { useParams } from "react-router-dom";
import axios from "axios";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebaseConfig";
//import ButtonUploadFile from "../signup/ui/ButtonUploadFile";
import { createUser } from "./createUser";
function Login() {
  const { communityId, groupeId } = useParams();

  const [email, setEmail] = useState("");
  const [classOfEmail, setClassOfEmail] = useState(false);
  // const [exist, setExist] = useState(false);
  const [motsDepasse, setMotsDepasse] = useState("");
  const [classOfMotsDepasse, setClassOfMotsDepasse] = useState(false);
  const existValuealue = useRef(false);
  const [startSending, setStartSending] = useState(false);
  const [messageSending, setMessageSending] = useState("");

  //const [image, setImage] = useState("");
  //const [stateDownload, setStateDownload] = useState(false);

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setEmail(e.target.value);
    setClassOfEmail(false);
  };

  const handleMotsDepasse = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setMotsDepasse(e.target.value);
    setClassOfMotsDepasse(false);
  };

  /* const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setImage(() => e.target.value);
  }; */

  const loginMembre = async () => {
    if (!email || !motsDepasse) {
      if (!motsDepasse) {
        setClassOfMotsDepasse(true);
      }

      if (!email) {
        setClassOfEmail(true);
      }

      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Tous les champs requis n'ont pas été remplis",
      });
      setStartSending(() => false);
      return;
    }

    try {
      setStartSending(() => true);
      const body = { email, password: motsDepasse, image: "" };
      const data = await axios.post(
        "https://serverbackofficetrucdejesus.onrender.com/api/frontoffice/login",
        body
      );
      console.log(data);

      if (data.data.status === "membre en attente") {
        setMessageSending(
          "Vous n'est pas encore inscrit comme membre, votre demande est en cour de validation"
        );
        return;
      }

      if (data.data.status === "membre ni inscrit ni en attente") {
        setMessageSending("Vous n'est pas encore inscrit sur le site");
        return;
      }

      if (data.data.status === "membre deja inscrit") {
        localStorage.setItem("user", JSON.stringify(data.data.data));
        toast({
          title: "Success",
          description: "Le membre a été crée avec success",
        });
        const dd = await createUser(email, motsDepasse, auth);

        console.log(dd);
        /* createUserWithEmailAndPassword(auth, email, motsDepasse)
          .then((u) => {
            console.log(u);
          })
          .catch((error) => {
            console.log(error.code);
            switch (error.code) {
              case "auth/email-already-in-use":
                existValuealue.current = true;
                console.log(error.code);
                return;
              case "auth/invalid-email":
                throw error;

              case "auth/operation-not-allowed":
                throw error;

              case "auth/weak-password":
                throw error;

              default:
                throw error;
            }
          }); */

        //await createUserWithEmailAndPassword(auth, email, motsDepasse);

        const tt = await signInWithEmailAndPassword(auth, email, motsDepasse);
        console.log(tt);
        /* ************************* */
        setMessageSending("Authentification reussie");
        setStartSending(false);
        console.log(auth.currentUser);
        window.location.replace(`/community/${communityId}/${groupeId}`);
      }
      return;
    } catch (error) {
      console.log(existValuealue.current);
      if (existValuealue.current) {
        console.log("damso");
      }

      console.log(error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue",
      });
      setStartSending(() => false);
      console.error("");
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center pt13 text-[14px] text-[#000]  ">
      <div className="bg-white shadow-xl px-3 sm:px-4 lg:px-8 pb-3 rounded-md border-[1px] border-solid border-[#F8E71C] ">
        <div className="flex flex-col gap-4 mt-3">
          <div className="flex flex-col gap-1">
            <img
              src=" https://www.trucdejesus.com/5322770/65d5f2e5b5b87_LOGOJAUNEUNTRUCDEJESUSTRANSPARENT.png"
              alt=""
              className="w-[50px] h-[50px] object-cover "
            />
            <p className="-mt-3">Un Truc de JÉSUS!</p>
          </div>
          <div className="flex flex-col gap-1">
            <h1 className="text-[20px] font-bold ">Se connecter</h1>
            <p className="text-[#0000009a] ">
              Entrez vos coordonnées ci-dessous pour vous connecter et démarrer.
            </p>
            {!!messageSending && (
              <p className="text-green-700 text-[16px] "> {messageSending}</p>
            )}
          </div>
        </div>
        <div className="flex flex-col w-full  gap-4 sm:grid sm:grid-cols-2 sm:gap-x-20 mt-3">
          <div className=" flex flex-col gap-4">
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
          </div>
        </div>
        {/*  <div className="flex flex-col gap-1 mt-8">
          <label htmlFor="image">
            Insérer une image de profil si c'est pas encore fait (optionnel)
          </label>
          <div className="flex items-center" key="button21">
            <input
              key="button11"
              id="image"
              name="image"
              value={image}
              placeholder="Insérer une image de profil"
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
        <div className="w-full flex flex-col justify-center items-center gap-1">
          <button
            className="text-[16px] mx-auto w-[85%] sm:px-40 py-3 font-bold text-center bg-[#F8E71C] hover:bg-[#F8E71C]/80 disabled:bg-[#F8E71C]/60 text-[#000] my-8  rounded-md flex gap-1 items-center"
            onClick={loginMembre}
            disabled={startSending}
          >
            <span>Confirmer</span>{" "}
            {startSending && (
              <span className="icon-[eos-icons--three-dots-loading] text-2xl"></span>
            )}{" "}
          </button>
          {/*  <div className="flex items-center gap-1">
            <p>Vous etes dejà inscrit:</p>
            <NavLink
              to={`/login/${communityId}/${groupeId}`}
              className="text-[#BD10E0] "
            >
              Se connecter
            </NavLink>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Login;

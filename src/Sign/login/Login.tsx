import clsx from "clsx";
import { ChangeEvent, useState } from "react";
import { toast } from "@/hooks/use-toast";
import { useParams } from "react-router-dom";
import axios from "axios";
function Login() {
  const { communityId, groupeId } = useParams();

  const [email, setEmail] = useState("");
  const [classOfEmail, setClassOfEmail] = useState(false);

  const [motsDepasse, setMotsDepasse] = useState("");
  const [classOfMotsDepasse, setClassOfMotsDepasse] = useState(false);

  const [startSending, setStartSending] = useState(false);
  const [messageSending, setMessageSending] = useState("");

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

  const loginMembre = async () => {
    setStartSending(() => true);

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
      const body = { email, password: motsDepasse };
      const data = await axios.post(
        "https://serverbackofficetrucdejesus.onrender.com/api/frontoffice/login",
        body
      );

      if (data.data.email === email) {
        localStorage.setItem("user", JSON.stringify(data.data));
        toast({
          title: "Success",
          description: "Le membre a été crée avec success",
        });
        setMessageSending("Authentification reussie");
        window.location.replace(`/community/${communityId}/${groupeId}`);
      }
      return;
    } catch (error) {
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
            <p className="-mt-3">Un Truc de Jesus</p>
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

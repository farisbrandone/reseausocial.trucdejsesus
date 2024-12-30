import { User } from "firebase/auth";
import { auth } from "../../../firebaseConfig";
import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { swDev } from "@/swDev";
/* import {
  MembreData,
  requestTogetAllUniversalData,
} from "../../../seedAndGetData/seedData"; */

export default function LoginMother({
  communityId,
  groupeId,
  children,
}: {
  communityId?: string;
  groupeId?: string;
  children: ReactNode;
}) {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  /*  const [loginError, setLoginError] = useState(false); */
  console.log({ communityId, groupeId });
  console.log(auth.currentUser);

  /* useEffect(() => {
    if (!auth.currentUser) {
      navigate(`/signup/${communityId}/${groupeId}`);
    }
  }, []); */

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        navigate(`/signup/${communityId}/${groupeId}`);
        return;
      }

      /*   try {
        const member = (
          await requestTogetAllUniversalData<MembreData>("MemberData")
        ).find((value) => value.email === user.email);
        if (!member?.groupeId?.includes(groupeId as string)) {
          navigate(`/signup/${communityId}/${groupeId}`);
          return;
        }
      } catch (error) {
        setLoginError(true);
        return;
      } */
      const serverWorker = async () => {
        try {
          await swDev(window);
        } catch (error) {
          console.log(error);
        }
      };

      serverWorker();
      setUser(user);
    });
    return () => unsubscribe();
  }, []);
  /* if (loginError) {
    return (
      <div className="w-screen h-screen flex flex-col gap-1 items-center justify-center ">
        <p>
          Une erreur est survenue pendant le chargement ou problème de connexion
        </p>
        <p>Vérifier votre connexion</p>
      </div>
    );
  } */
  return <>{user && children}</>;
}

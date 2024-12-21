import { User } from "firebase/auth";
import { auth } from "../../../firebaseConfig";
import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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

  console.log({ communityId, groupeId });
  console.log(auth.currentUser);

  /* useEffect(() => {
    if (!auth.currentUser) {
      navigate(`/signup/${communityId}/${groupeId}`);
    }
  }, []); */

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate(`/signup/${communityId}/${groupeId}`);
        return;
      }
      setUser(user);
    });
    return () => unsubscribe();
  }, []);
  /* if (!user){

  } */
  return <>{user && children}</>;
}

import { context } from "@/App";
import { ReactNode, useContext, useEffect } from "react";
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
  const data = useContext(context);
  console.log({ communityId, groupeId });

  useEffect(() => {
    if (!data) {
      navigate(`/signup/${communityId}/${groupeId}`);
    }
  }, []);

  return <>{data && children}</>;
}

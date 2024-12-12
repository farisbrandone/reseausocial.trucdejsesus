import { context } from "@/App";
import { ReactNode, useContext } from "react";

export default function LoginMother({
  communityId,
  groupeId,
  children,
}: {
  communityId?: string;
  groupeId?: string;
  children: ReactNode;
}) {
  const data = useContext(context);
  console.log({ communityId, groupeId });
  if (!data) {
    window.location.replace(`/signup/${communityId}/${groupeId}`);
  }

  return <>{data && children}</>;
}

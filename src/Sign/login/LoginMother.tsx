import { context } from "@/App";
import { ReactNode, useContext } from "react";

export default function LoginMother({ children }: { children: ReactNode }) {
  const data = useContext(context);
  console.log(data);
  if (!data) {
    window.location.replace("/login");
  }

  return <>{data && children}</>;
}

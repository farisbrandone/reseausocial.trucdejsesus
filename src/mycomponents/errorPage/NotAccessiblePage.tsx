import { ReactNode } from "react";

function NotAccessiblePage({ children }: { children: ReactNode }) {
  if (false) {
    return children;
  }
  return (
    <div className=" h-screen w-screen flex flex-col items-center justify-center text-[18px] font-bold">
      <p>Aucune page associer à cette url.</p>
      <p>Utiliser l'url associée à votre communauté</p>
    </div>
  );
}

export default NotAccessiblePage;

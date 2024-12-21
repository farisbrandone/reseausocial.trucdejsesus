import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { MembreData } from "seedAndGetData/seedData";

/* const items = [
  {
    id: "recents",
    label: "Recents",
  },
  {
    id: "home",
    label: "Home",
  },
  {
    id: "applications",
    label: "Applications",
  },
  {
    id: "desktop",
    label: "Desktop",
  },
  {
    id: "downloads",
    label: "Downloads",
  },
  {
    id: "documents",
    label: "Documents",
  },
] as const; */

export interface UserSelectType {
  id: string;
  label: string;
}
interface SelectUserToSendMessageProps {
  setUserSelect: React.Dispatch<React.SetStateAction<MembreData[]>>;
  userSelect: MembreData[];
  setAlertOpen: React.Dispatch<React.SetStateAction<boolean>>;
  alertOpen: boolean;
  membreOfData: MembreData[];
  groupeId: string;
}

export function SelectUserToSendMessage({
  setUserSelect,
  userSelect,
  alertOpen,
  setAlertOpen,
  membreOfData,
  groupeId,
}: SelectUserToSendMessageProps) {
  /*  const [userSelect, setUserSelect] = useState<UserSelectType[]>([]); */
  const [cliquerAll, setCliquerAll] = useState(false);

  const memberSelect = membreOfData.filter((value) =>
    value.groupeId?.includes(groupeId)
  );
  const selectAll = () => {
    if (cliquerAll) {
      setUserSelect([]);
      setCliquerAll(false);
      return;
    }
    memberSelect.forEach((value) => {
      setUserSelect((prev) => [...prev, { ...value }]);
    });
    setCliquerAll(true);
  };

  return (
    <AlertDialog
      open={alertOpen}
      onOpenChange={() => {
        setAlertOpen((prev) => !prev);
      }}
    >
      <AlertDialogTrigger asChild>
        <Button className="bg-transparent  text-[#000] hover:bg-transparent/10  items-center gap-1 h-[100%] hidden ">
          <span className="icon-[mdi--tag] mr-1 self-start text-4xl "></span>
          <p className="text-wrap text-start text-[14px] text ">
            Clique ici pour taguer des frères et soeurs de ton choix afin qu'ils
            recoivent une notification de ce que tu poste ✅
          </p>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-h-[300px] overflow-y-auto">
        <AlertDialogHeader>
          <AlertDialogTitle className="border-b-[1px] border-b-[#000] p-1 pt-0 text-[12px] ">
            CLIQUEZ ICI POUR TAGUER DES FRÈRES ET SOEURS DE TON CHOIX AFIN
            QU'ILS RECOIVENT UNE NOTIFICATION DE CE QUE TU POSTE
          </AlertDialogTitle>
          <AlertDialogDescription className="">
            <div className="flex items-center justify-end mr-2 mb-2">
              <Checkbox id="allSelect" onCheckedChange={() => selectAll()} />
              <label htmlFor="allSelect" className="ml-1 font-bold">
                Tout selectionner
              </label>
            </div>
            <div className="grid grid-cols-2 p-2 gap-8">
              {memberSelect.map((item) => (
                <div
                  className="flex items-center space-x-2 place-items-center"
                  key={item.id}
                >
                  <Checkbox
                    id="terms"
                    checked={!!userSelect?.find((elt) => elt.id === item.id)}
                    onCheckedChange={(checked) => {
                      return checked && !cliquerAll
                        ? setUserSelect((prev) => [...prev, { ...item }])
                        : !cliquerAll
                        ? setUserSelect((prev) => {
                            return prev.filter((value) => value.id !== item.id);
                          })
                        : checked;
                    }}
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {item.name}
                  </label>
                </div>
              ))}
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          {/* <AlertDialogCancel>Cancel</AlertDialogCancel> */}
          <AlertDialogAction
            className="bg-[#fff700] text-[#000] rounded-md px-4 py-3 hover:bg-[#fff700]/60 "
            onClick={() => setCliquerAll(false)}
          >
            OK
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

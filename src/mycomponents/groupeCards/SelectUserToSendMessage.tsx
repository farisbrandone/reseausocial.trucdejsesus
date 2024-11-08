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

const items = [
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
] as const;

interface UserSelectType {
  id: string;
  label: string;
}

export function SelectUserToSendMessage() {
  const [userSelect, setUserSelect] = useState<UserSelectType[]>([]);
  console.log({ userSelect });
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="bg-transparent  text-[#000] hover:bg-transparent/10 flex items-center gap-1 h-[100%] ">
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
          <AlertDialogDescription className="grid grid-cols-2 p-2 gap-8">
            {items.map((item) => (
              <div
                className="flex items-center space-x-2 place-items-center"
                key={item.id}
              >
                <Checkbox
                  id="terms"
                  checked={!!userSelect?.find((elt) => elt.id === item.id)}
                  onCheckedChange={(checked) => {
                    return checked
                      ? setUserSelect((prev) => [...prev, { ...item }])
                      : setUserSelect((prev) => {
                          return prev.filter((value) => value.id !== item.id);
                        });
                  }}
                />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {item.label}
                </label>
              </div>
            ))}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          {/* <AlertDialogCancel>Cancel</AlertDialogCancel> */}
          <AlertDialogAction className="bg-[#fff700] text-[#000] rounded-md px-4 py-3 hover:bg-[#fff700]/60 ">
            OK
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

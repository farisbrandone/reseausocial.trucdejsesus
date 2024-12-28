import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { auth } from "../../../../firebaseConfig";
import { useEffect, useState } from "react";
import {
  NotificationMessageDataType,
  requestToDeleteUniversalDataWithId,
  requestTogetAllUniversalData,
} from "seedAndGetData/seedData";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

export function NotifComponent() {
  const currentUser = auth.currentUser;
  const [message, setMessage] = useState<NotificationMessageDataType[]>([]);
  const navigate = useNavigate();

  const deleteMessage = async (value: NotificationMessageDataType) => {
    try {
      const result = await requestToDeleteUniversalDataWithId(
        value.id as string,
        "NotificationMessageData"
      );
      if (result.success) {
        navigate(`/community/00wOWSI8yjxruMrzbXk3/${value.message.groupeId}`);
        return;
      }
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue, vérifier votre connexion",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue, vérifier votre connexion",
      });
    }
  };

  useEffect(() => {
    const playSound = () => {
      const audio = new Audio("/musicnotification.wav");

      audio.play();
    };

    const getNotificationMessage = async () => {
      try {
        const result = (
          await requestTogetAllUniversalData<NotificationMessageDataType>(
            "NotificationMessageData"
          )
        ).filter(
          (value) =>
            !!value.user.find((us) => us.email === currentUser?.email) &&
            value.message.typeMessage === "public"
        );

        if (result.length > 0) {
          setMessage([...result]);
          playSound();
        }
      } catch (error) {}
    };

    navigator.serviceWorker.addEventListener("message", async (e) => {
      console.log({ onMessage: e });
      try {
        const result = (
          await requestTogetAllUniversalData<NotificationMessageDataType>(
            "NotificationMessageData"
          )
        ).filter(
          (value) =>
            !!value.user.find((us) => us.email === currentUser?.email) &&
            value.message.typeMessage === "public"
        );
        if (result.length > 0) {
          setMessage([...result]);
          playSound();
        }
      } catch (error) {}

      //setNotification((prev) => [...prev,e.data.notification]);
    });
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") {
        navigator.clearAppBadge();
      }
    });
    getNotificationMessage();
    return () => {
      document.removeEventListener("visibilitychange", () => {
        console.log("gg");
        //setNotification((prev) => [...prev,e.data.notification]);
      });
      navigator.serviceWorker.removeEventListener("message", (e) => {
        console.log({ onMessage: e.data.notification });
        //setNotification((prev) => [...prev,e.data.notification]);
      });
    };
  }, []);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="bg-transparent hover:bg-transparent w-[30px] h-[30px] "
        >
          {" "}
          <div
            title="Notification"
            className="clocheNotif flex items-center justify-center w-[30px] h-[30px] bg-[#fff700] rounded-sm p-1 cursor-pointer border-[1px] border-solid border-[#00000026]"
          >
            <span className="icon-[mdi--bell] text-2xl"></span>
          </div>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Notification</SheetTitle>
        </SheetHeader>
        <div className=" w-full p-2 flex flex-col items-start gap-2">
          {message.map((value) => (
            <div
              className="flex gap-2 w-full overflow-clip cursor-pointer"
              onClick={() => deleteMessage(value)}
            >
              <div className="flex items-center justify-center w-[40px] h-[40px] rounded-full ">
                <Avatar className="w-[35px] h-[35px] ">
                  <AvatarImage
                    src={value?.message.userAvatar}
                    alt={"@shadcn"}
                  />
                  <AvatarFallback>
                    {value.message.userName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="flex-1 flex-col text-[12px] ">
                <p className="text-wrap max-h-[50px] overflow-clip ">
                  <span>
                    <strong>{value.message.userName.split(" ")[0]}</strong>
                  </span>{" "}
                  -<span> {value.message.text} </span>
                </p>
                <p>
                  {format(
                    new Date(value.message.dateOfUpdate as string),
                    "d MMM yyyy 'à' hh:mm:ss"
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}

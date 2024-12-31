import { auth } from "../../../../firebaseConfig";
import { useState, useEffect } from "react";
import {
  NotificationMessageDataType,
  requestToDeleteUniversalDataWithId,
  requestTogetAllUniversalData,
} from "../../../../seedAndGetData/seedData";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

/*interface typeNotification {
  id: string;
  title: string;
  body: string;
}*/

interface loadingType {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
}

export function HeaderDashboard({ loading, setLoading }: loadingType) {
  /*  const [notification, setNotification] = useState<any[]>([]); */
  //const [loading, setLoading] = useState(true);
  const [errorLoad, setErrorLoad] = useState("");
  /*const querySnapshot = await getDocs(collection(db, "Notifications"));
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data()}`);
  });*/

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

  /*  const deleteNotification = async (docu: any) => {
    console.log({ docu });
    const docRef = doc(db, "DeviceForReseauSocialData", docu.id);
    try {
      const result = await deleteDoc(docRef);
      console.log(result);

      const querySnapshot = await getDocs(
        collection(db, "DeviceForReseauSocialData")
      );
      const arrayNotification: any[] = [];
      querySnapshot.forEach((doc) => {
        arrayNotification.push({
          id: doc.id,
          title: doc.data().title,
          body: doc.data().body,
          actionUrl: doc.data().actionUrl,
        });
      });
      setNotification([...arrayNotification]);
      const unreadNotification = querySnapshot.docs.length;
      console.log({ unreadNotification });

      if (navigator.setAppBadge) {
        console.log({ navigator });
        if (unreadNotification === 0) {
          navigator.clearAppBadge();
        } else if (unreadNotification) {
          navigator.setAppBadge(unreadNotification);
        }
      }
      window.location.replace(docu.actionUrl);
    } catch (error) {
      console.error(error);
    }
  }; */
  /*  useEffect(() => {
    (async () => {
      try {
        const querySnapshot = await getDocs(
          collection(db, "DeviceForReseauSocialData")
        );
       
        if (querySnapshot && querySnapshot.docs.length !== 0) {
          const arrayNotification: any[] = [];
          querySnapshot.forEach((doc) => {
            arrayNotification.push({
              id: doc.id,
              title: doc.data().title,
              body: doc.data().body,
              actionUrl: doc.data().actionUrl,
            });
          });
          const unreadNotification = querySnapshot.docs.length;
          console.log(unreadNotification);
          setNotification(() => [...arrayNotification]);
        }
        setLoading(false);
      } catch (error) {
        setErrorLoad("Une erreur est survenu: vérifier votre connexion");
      } finally {
        setLoading(false);
      }
    })();
  }, [loading]); */
  /*  useEffect(() => {
    navigator.serviceWorker.addEventListener("message", (e) => {
      console.log({ onMessage: e.data.notification });
      //setNotification((prev) => [...prev,e.data.notification]);
    });
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") {
        navigator.clearAppBadge();
      }
    });
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
 */

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
          (value) => !!value.user.find((us) => us.email === currentUser?.email)
        );

        if (result.length > 0) {
          setMessage([...result]);
          playSound();
        }
        setLoading(false);
      } catch (error) {
        setErrorLoad("Une erreur est survenu: vérifier votre connexion");
      } finally {
        setLoading(false);
      }
    };

    navigator.serviceWorker.addEventListener("message", async (e) => {
      console.log({ onMessage: e });
      try {
        const result = (
          await requestTogetAllUniversalData<NotificationMessageDataType>(
            "NotificationMessageData"
          )
        ).filter(
          (value) => !!value.user.find((us) => us.email === currentUser?.email)
        );
        if (result.length > 0) {
          setMessage([...result]);
          playSound();
        }
        setLoading(false);
      } catch (error) {
        setErrorLoad("Une erreur est survenu: vérifier votre connexion");
      } finally {
        setLoading(false);
      }

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
        //setNotification((prev) => [...prev,e.data.notification]);
      });
      navigator.serviceWorker.removeEventListener("message", (e) => {
        console.log({ onMessage: e.data.notification });
        //setNotification((prev) => [...prev,e.data.notification]);
      });
    };
  }, [loading]);

  if (loading) {
    console.log(errorLoad);
  }

  return (
    <div className="w-full py-3 px-5 flex items-center box-content  bg-white fixed top-0 shadow-lg z-[6000]">
      <img
        src="https://trucdejesus.appowls.io/assets/apps/user_1837/app_3120/draft/icon/app_logo.png"
        alt="Logo"
        width={40}
        height={40}
        className="mx-auto"
      />
      <div className="dropdown mr-3  ">
        <div
          tabIndex={0}
          role="button"
          className="btn rounded-[6px] min-h-[33px] duration-500 min-h-2rem m-1 bg-[#e6f7ff] text-[#bd10e0]"
          title="Notification"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="currentColor"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-user"
          >
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content -right-3 menu bg-white text-gray-800 rounded-box z-[1] w-52 max-h-[200px] p-2 mr-4 shadow overflow-y-auto flex flex-col items-start gap-2"
        >
          {message.length !== 0 ? (
            message.map((doc, index) => {
              return (
                <li
                  key={index}
                  onClick={() => deleteMessage(doc)}
                  className="cursor-pointer"
                >
                  <div
                    className="flex gap-2 w-full overflow-clip cursor-pointer"
                    onClick={() => deleteMessage(doc)}
                  >
                    <div className="flex items-center justify-center w-[40px] h-[40px] rounded-full ">
                      <Avatar className="w-[35px] h-[35px] ">
                        <AvatarImage
                          src={doc?.message.userAvatar}
                          alt={"@shadcn"}
                        />
                        <AvatarFallback>
                          {doc.message.userName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="flex-1 flex-col text-[12px] ">
                      <p className="text-wrap max-h-[50px] overflow-clip ">
                        <span>
                          <strong>{doc.message.userName.split(" ")[0]}</strong>
                        </span>{" "}
                        -<span> {doc.message.text} </span>
                      </p>
                      <p>
                        {format(
                          new Date(doc.message.dateOfUpdate as string),
                          "d MMM yyyy 'à' hh:mm:ss"
                        )}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })
          ) : (
            <li>Aucune notification</li>
          )}
        </ul>
      </div>
      {message.length !== 0 && (
        <div className="absolute top-[14px] w-[15px] h-[15px] bg-[#bd10e0] text-[#ffea00] right-8 rounded-[20px] flex items-center justify-center ">
          <span className="text-[10px] font-extrabold ">{message.length}</span>
        </div>
      )}
    </div>
  );
}

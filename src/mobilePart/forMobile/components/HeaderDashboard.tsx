import { initializeApp } from "firebase/app";
import { deleteDoc, doc, getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";

const firebaseConfig = {
  apiKey: "AIzaSyBqHomX-GSUzQOf9j6g3G4HNGTlQPtySdk",
  authDomain: "un-truc-de-jesus-carte.firebaseapp.com",
  projectId: "un-truc-de-jesus-carte",
  storageBucket: "un-truc-de-jesus-carte.appspot.com",
  messagingSenderId: "255170124059",
  appId: "1:255170124059:web:9b7818ec3f7e5b127b9bbe",
  measurementId: "G-E7R22DLZ61",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

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
  const [notification, setNotification] = useState<any[]>([]);
  //const [loading, setLoading] = useState(true);
  const [errorLoad, setErrorLoad] = useState("");
  /*const querySnapshot = await getDocs(collection(db, "Notifications"));
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data()}`);
  });*/

  const deleteNotification = async (docu: any) => {
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
  };
  useEffect(() => {
    (async () => {
      try {
        const querySnapshot = await getDocs(
          collection(db, "DeviceForReseauSocialData")
        );
        /*  querySnapshot.forEach((doc) => {
          console.log(`${doc.id} => ${doc.data().title}`);
        }); */
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
  }, [loading]);
  useEffect(() => {
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
          className="dropdown-content -right-3 menu bg-white text-gray-800 rounded-box z-[1] w-52 max-h-[200px] p-2 mr-4 shadow overflow-y-auto"
        >
          {notification.length !== 0 ? (
            notification.map((doc, index) => {
              return (
                <li
                  key={index}
                  onClick={() => deleteNotification(doc)}
                  className="cursor-pointer"
                >
                  <p className="text-black font-semibold">{doc.title}</p>
                </li>
              );
            })
          ) : (
            <li>Aucune notification</li>
          )}
        </ul>
      </div>
      {notification.length !== 0 && (
        <div className="absolute top-[14px] w-[15px] h-[15px] bg-[#bd10e0] text-[#ffea00] right-8 rounded-[20px] flex items-center justify-center ">
          <span className="text-[10px] font-extrabold ">
            {notification.length}
          </span>
        </div>
      )}
    </div>
  );
}

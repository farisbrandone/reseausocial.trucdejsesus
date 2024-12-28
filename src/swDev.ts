/* import {} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";

import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-analytics.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

import {
  collection,
  query,
  doc,
  addDoc,
  setDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  where,
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

import {
  getMessaging,
  onMessage,
  isSupported,
  getToken,
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-messaging.js";
import { isSupported as isSwSupported } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-messaging-sw.js";

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js"; */

import { addDoc, collection, getDocs, getFirestore } from "firebase/firestore";
import { app1, auth } from "../firebaseConfig";

import {
  getMessaging,
  isSupported,
  getToken,
  Messaging,
  GetTokenOptions,
} from "firebase/messaging";
import {
  MembreData,
  requestTogetAllUniversalData,
} from "seedAndGetData/seedData";
import { User } from "firebase/auth";

/* import { initializeApp } from "firebase/app";
import { collection, addDoc, getFirestore } from "firebase/firestore";
import { getMessaging, isSupported, getToken } from "firebase/messaging";
import { isSupported as isSwSupported } from "firebase/messaging/sw";  */
/* const firebaseConfig = {
  apiKey: "AIzaSyBqHomX-GSUzQOf9j6g3G4HNGTlQPtySdk",
  authDomain: "un-truc-de-jesus-carte.firebaseapp.com",
  projectId: "un-truc-de-jesus-carte",
  storageBucket: "un-truc-de-jesus-carte.appspot.com",
  messagingSenderId: "255170124059",
  appId: "1:255170124059:web:9b7818ec3f7e5b127b9bbe",
  measurementId: "G-E7R22DLZ61",
}; */

/* const app = initializeApp(firebaseConfig); */
const db = getFirestore(app1);
/* const citiesRef = collection(db, "Notifications"); */
const currentUser = auth.currentUser as User;
let memberData: MembreData | undefined;
(async function swDev(window) {
  if (!isSupported()) {
    return;
    /*  } else if (!isSwSupported()) {
    return; */
  } else if (window.Notification.permission === "denied") {
    return;
  } else {
    const messaging = getMessaging();

    const registerServiceWorker = async () => {
      try {
        const swOptions = {
          type: "classic",
          scope: "/",
        };

        const sw = await window.navigator.serviceWorker.register(
          `/sw.js`,
          swOptions as RegistrationOptions
        );

        return sw
          .update()
          .then((registration) => {
            return registration;
          })
          .catch((error) =>
            console.error("Can not update service worker", error)
          );
      } catch (error) {
        console.error("Can not register service worker", error);
      }
    };

    const getMemberData = async () => {
      try {
        const data = (
          await requestTogetAllUniversalData<MembreData>("MemberData")
        ).find((value) => value.email === currentUser.email);
        if (data) {
          return data;
        } else {
          throw new Error("Vous n'ete pas inscrit en tant que utilisateur");
        }
      } catch (error) {
        console.error(
          "Erreur survenue au niveau du service worker, problème de connexion",
          error
        );
      }
    };

    const requestPermission = async (messaging: Messaging) => {
      try {
        const permission = await window.Notification.requestPermission();
        memberData = await getMemberData();
        if (permission === "granted") {
          const serviceWorkerRegistration = await registerServiceWorker();

          return getToken(messaging, {
            serviceWorkerRegistration,
            vapidKey:
              "BMsFehnpoVY7WSEW9Rjffbh8zMFKR_HC7sgGkjM0nE0tKMobiIyMo3t3e4JqRbPxIQeAYqpn-b7mYdhdRSmM1TM",
          } as GetTokenOptions)
            .then(async (token) => {
              window.localStorage.setItem("fcm_token", token);
              const querySnapshot = await getDocs(
                collection(db, "DeviceForReseauSocialData")
              );
              const arrayNotification: string[] = [];
              querySnapshot.forEach((doc) => {
                arrayNotification.push(doc.data().deviceNumber);
              });

              if (!arrayNotification.includes(token) && memberData) {
                const res = await addDoc(
                  collection(db, "DeviceForReseauSocialData"),
                  {
                    deviceNumber: token,
                    user: memberData,
                    dateOfCreation: new Date().toUTCString(),
                    dateOfUpdate: new Date().toUTCString(),
                  }
                );
                if (false) {
                  console.log(res);
                }
              }
            })
            .catch((error: any) => {
              console.error("Unable to get FCM Token", error);
            });
        } else {
          console.error("Unable to grant permission", permission);
        }
      } catch (error) {
        console.error("Unable to request permission", error);
      }
    };
    const checkIfTokenIsNotGeneratedBefore = () => {
      const a = !window.localStorage.getItem("fcm_token");
      console.log(a);
      return true;
    };

    if (checkIfTokenIsNotGeneratedBefore()) {
      await requestPermission(messaging);
    }

    /*  navigator.serviceWorker.addEventListener("message", (e) => {
      console.log("newMessage");
      console.log(e);
      window.location.reload();
    }); */
  }
})(window);

/*window.onload = async function () {
  await swDev(window);
};*/

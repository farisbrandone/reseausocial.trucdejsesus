importScripts(
  "https://www.gstatic.com/firebasejs/10.13.1/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.13.1/firebase-messaging-compat.js"
);

importScripts(
  "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore-compat.js"
);

(function (self) {
  let messaging;
  const firebaseConfig = {
    apiKey: "AIzaSyBqHomX-GSUzQOf9j6g3G4HNGTlQPtySdk",
    authDomain: "un-truc-de-jesus-carte.firebaseapp.com",
    projectId: "un-truc-de-jesus-carte",
    storageBucket: "un-truc-de-jesus-carte.appspot.com",
    messagingSenderId: "255170124059",
    appId: "1:255170124059:web:9b7818ec3f7e5b127b9bbe",
    measurementId: "G-E7R22DLZ61",
  };

  firebase.initializeApp(firebaseConfig);
  messaging = firebase.messaging();
  const db = firebase.firestore();
  const citiesRef = db.collection("DeviceForReseauSocialData");
  const PREFIX = "key_cache";

  self.addEventListener("install", (event) => {
    self.skipWaiting();
    /**n'attent pas que les autres process
         * soit stopé, stop l'est toi meme
      
         */
    /** pour que le nouveau worker remplace
     * l'ancien tout de suite */
    /**considérer l'installation terminer que lorsque cidessous est terminer */
    event.waitUntil(
      (async () => {
        /**mise en cache de la page offline */
        const cache = await caches.open(PREFIX);
        /**met en cache la reponse de la requetes /offline */
        //const q = citiesRef.query();
        const querySnapshot = await citiesRef.get();

        const unreadNotification = querySnapshot.docs.length;

        if (navigator.setAppBadge) {
          if (unreadNotification === 0 || !unreadNotification) {
            navigator.clearAppBadge();
          } else {
            navigator.setAppBadge(unreadNotification);
          }
        }
      })()
    );
  });

  self.addEventListener("activate", (event) => {
    /**lorsque tu t'active tu doit automatiquement
     * prendre le controle de la page
     */

    clients.claim();

    /**vider les autres caches avant moi */
    event.waitUntil(
      (async () => {
        /**récupération des clé associer au cache */
        const keys = await caches.keys();
        await Promise.all(
          keys.map((key) => {
            if (!key.includes(PREFIX)) {
              return caches.delete(key);
            }
          })
        );
      })()
    );
  });

  self.addEventListener("push", async function (event) {
    //event.preventDefault();

    const message = event.data.json();

    const {
      data: { title, body },
    } = message;
    const titleIcon = title.split("$-*").filter((value) => value !== "");
    const bodyAction = body.split("$-*").filter((value) => value !== "");

    //console.log({ newversion: { title, body, actionUrl, icon } });

    if (bodyAction.length < 2 && titleIcon.length < 2) {
      const trueTitle = titleIcon[0];
      const trueBody = bodyAction[0];

      const notificationOptions = {
        body: trueBody,
        badge:
          "https://trucdejesus.appowls.io/assets/apps/user_1837/app_3120/draft/icon/app_logo.png", // Chemin vers votre icône de badge
        sound: "/musicnotification.wav",
      };

      event.preventDefault();

      const promiseChain = new Promise((resolve) => {
        self.registration
          .showNotification(trueTitle, notificationOptions)
          .then(() => resolve("ddd"));
      });
      event.waitUntil(
        (async () => {
          try {
            //const total = await citiesRef.add({ title, body, icon, actionUrl })
            //console.log({ total });
            const [showNotif, querySnapshot] = await Promise.all([
              promiseChain,
              citiesRef.get(),
            ]);
            //const querySnapshot = await citiesRef.get();
            //console.log({ showNotif });
            //console.log({ querySnapshot });
            const unreadNotification = querySnapshot.docs.length;

            if (navigator.setAppBadge) {
              if (unreadNotification === 0 || unreadNotification) {
                navigator.clearAppBadge();
              } else {
                navigator.setAppBadge(unreadNotification);
              }
            }
          } catch (error) {
            console.log({ error0: error });
          }
        })()
      );
    } else if (bodyAction.length === 2 && titleIcon.length === 2) {
      const notificationOptions = {
        body: bodyAction[0],
        icon: titleIcon[1],
        badge:
          "https://trucdejesus.appowls.io/assets/apps/user_1837/app_3120/draft/icon/app_logo.png", // Chemin vers votre icône de badge
        sound: "/musicnotification.wav",
        actions: [
          {
            action: "Cliquez ici",
            title: "Cliquez ici",
          },
        ],
        data: {
          actionUrl: bodyAction[1],
        },
      };

      const promiseChain = new Promise((resolve) => {
        self.registration
          .showNotification(titleIcon[0], notificationOptions)
          .then(() => resolve("dede"));
      });
      event.waitUntil(
        (async () => {
          try {
            //const total = await citiesRef.add({ title, body, icon, actionUrl })
            //console.log({ total });
            const [showNotif, querySnapshot] = await Promise.all([
              promiseChain,
              citiesRef.get(),
            ]);
            //const querySnapshot = await citiesRef.get();
            //console.log({ showNotif });
            //console.log({ querySnapshot });
            const unreadNotification = querySnapshot.docs.length;

            if (navigator.setAppBadge) {
              if (unreadNotification === 0 || unreadNotification) {
                navigator.clearAppBadge();
              } else {
                navigator.setAppBadge(unreadNotification);
              }
            }
          } catch (error) {
            console.log({ error1: error });
          }
        })()
      );
    } else if (bodyAction.length < 2 && titleIcon.length === 2) {
      const notificationOptions = {
        body: bodyAction[0],
        icon: titleIcon[1],
        badge:
          "https://trucdejesus.appowls.io/assets/apps/user_1837/app_3120/draft/icon/app_logo.png", // Chemin vers votre icône de badge
        sound: "/musicnotification.wav",
      };

      const promiseChain = new Promise((resolve) => {
        self.registration
          .showNotification(titleIcon[0], notificationOptions)
          .then(() => resolve("zzzz"));
      });
      event.waitUntil(
        (async () => {
          try {
            //const total = await citiesRef.add({ title, body, icon, actionUrl })
            //console.log({ total });
            const [showNotif, querySnapshot] = await Promise.all([
              promiseChain,
              citiesRef.get(),
            ]);
            //const querySnapshot = await citiesRef.get();
            // console.log({ showNotif });
            //console.log({ querySnapshot });
            const unreadNotification = querySnapshot.docs.length;

            if (navigator.setAppBadge) {
              if (unreadNotification === 0 || unreadNotification) {
                navigator.clearAppBadge();
              } else {
                navigator.setAppBadge(unreadNotification);
              }
            }
          } catch (error) {
            console.log({ error2: error });
          }
        })()
      );
    } else if (bodyAction.length === 2 && titleIcon.length < 2) {
      const notificationOptions = {
        body: bodyAction[0],
        badge:
          "https://trucdejesus.appowls.io/assets/apps/user_1837/app_3120/draft/icon/app_logo.png", // Chemin vers votre icône de badge
        sound: "/musicnotification.wav",
        actions: [
          {
            action: "Cliquez ici",
            title: "Cliquez ici",
          },
        ],
        data: {
          actionUrl: bodyAction[1],
        },
      };

      const promiseChain = new Promise((resolve) => {
        self.registration
          .showNotification(titleIcon[0], notificationOptions)
          .then(() => resolve("aaaa"));
      });
      event.waitUntil(
        (async () => {
          try {
            //const total = await citiesRef.add({ title, body, icon, actionUrl })
            //console.log({ total });
            const [showNotif, querySnapshot] = await Promise.all([
              promiseChain,
              citiesRef.get(),
            ]);
            //const querySnapshot = await citiesRef.get();
            //console.log({ showNotif });
            //console.log({ querySnapshot });
            const unreadNotification = querySnapshot.docs.length;

            if (navigator.setAppBadge) {
              if (unreadNotification === 0 || unreadNotification) {
                navigator.clearAppBadge();
              } else {
                navigator.setAppBadge(unreadNotification);
              }
            }
          } catch (error) {
            console.log({ error3: error });
          }
        })()
      );
    }
  });

  self.addEventListener("notificationclick", (event) => {
    const { notification } = event;
    const {
      data: { actionUrl },
    } = notification;

    event.notification.close();

    event.waitUntil(
      clients
        .matchAll({ type: "window", includeUncontrolled: true })
        .then((clientsArr) => {
          const hadWindowToFocus = clientsArr.some((windowClient) => {
            if (windowClient.url === actionUrl) {
              windowClient.focus();
              return true;
            }
          });
          if (!hadWindowToFocus && actionUrl) {
            return clients.openWindow(actionUrl);
          }
        })
    );
  });
})(self);

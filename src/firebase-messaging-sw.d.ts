declare const self: ServiceWorkerGlobalScope;

interface FirebasePayload {
  notification: {
    title: string;
    body: string;
  };
}

// Extend the ServiceWorkerGlobalScope to include Firebase Messaging methods
interface ServiceWorkerGlobalScope {
  firebase: typeof import("firebase/app");
  importScripts(...urls: string[]): void;
}

// Extend the Firebase Messaging instance to include the onBackgroundMessage method
declare namespace firebase.messaging {
  interface Messaging {
    onBackgroundMessage(callback: (payload: FirebasePayload) => void): void;
  }
}

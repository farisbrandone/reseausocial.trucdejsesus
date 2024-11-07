import {
  collection,
  getDocs,
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  updateDoc,
  getCountFromServer,
  orderBy,
  query,
  limit,
  QueryDocumentSnapshot,
  DocumentData,
  startAfter,
  endBefore,
  startAt,
  increment,
  /* where, */
} from "firebase/firestore";
import { db } from "../firebaseConfig";

/* export interface MembreData {
  name: string;
  email: string;
  motsDepasse: string;
  sexe: string;
  birthDay: string;
  phone: string;
  dateCreation: string;
  dateMiseAJour: string;
  status: string;
  image: string;
  id: string;
} */

export interface MembreData {
  name: string;
  email: string;
  motsDepasse: string;
  sexe: string;
  birthDay: string;
  phone: string;
  dateCreation: string;
  dateMiseAJour: string;
  status: string;
  image: string;
  id: string;
  nombrePartage: number;
  nombreLikes: number;
  nombreCommentaire: number;
}

export interface MessageData {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  text: string;
  photo: string;
  audio: string;
  video: string;
  userLikes: string[];
  date: string;
  groupeName: string;
}

export interface CommentaireData {
  id: string;
  text: string;
  image: string;
  messageId: string;
  userLikes: string[];
  date: string;
  userId: string;
  userName: string;
  userAvatar: string;
  idOfUserThatWithReply: string;
  nameOfUserThatWithReply: string;
  textOfUserThatWithReply: string;
}

export interface ReponseData {
  id: string;
  text: string;
  image: string;
  commentaireId: string;
  date: string;
  userId: string;
  userName: string;
}

export const postMessageByUser = async ({
  userId,
  userName,
  text,
  photo,
  audio,
  video,
  groupeName,
}: MessageData) => {
  try {
    const messageRef = collection(db, "MessageData");
    const membreDataRef = doc(db, "MembreData", userId);
    const date = Date.now().toString();
    const promise1 = setDoc(doc(messageRef), {
      userId,
      userName,
      text,
      photo,
      audio,
      video,
      date,
      groupeName,
    });
    const promise2 = updateDoc(membreDataRef, {
      nombrePartage: increment(1),
    });
    const [value1, value2] = await Promise.all([promise1, promise2]);
    console.log(value1, value2);
    return { message: "Le message a été créer avec success", success: true };
  } catch (error) {
    throw new Error("Une erreur est survenue pendant la création du message");
  }
};

export const postCommentaireByUser = async ({
  text,
  image,
  messageId,
  userId,
  userName,
}: CommentaireData) => {
  const commentaireRef = collection(db, "CommentaireData");
  const membreDataRef = doc(db, "MembreData", userId);
  const date = Date.now().toString();
  try {
    const promise1 = setDoc(doc(commentaireRef), {
      text,
      image,
      messageId,
      userId,
      userName,
      date,
    });

    const promise2 = updateDoc(membreDataRef, {
      nombreCommentaire: increment(1),
    });
    const [value1, value2] = await Promise.all([promise1, promise2]);
    console.log(value1, value2);

    return {
      message: "Le commentaire a été créer avec success",
      success: true,
    };
  } catch (error) {
    throw new Error(
      "Une erreur est survenue pendant la création du commentaire"
    );
  }
};

export const postResponseByUser = async ({
  text,
  image,
  commentaireId,
  userId,
  userName,
}: ReponseData) => {
  const reponseRef = collection(db, "ReponseData");
  const date = Date.now().toString();

  try {
    await setDoc(doc(reponseRef), {
      text,
      image,
      commentaireId,
      userId,
      userName,
      date,
    });
    return { message: "La réponse a été créer avec success", success: true };
  } catch (error) {
    throw new Error(
      "Une erreur est survenue pendant la création de la réponse"
    );
  }
};

export const updateMessagewithLike = async (
  userId: string,
  messageId: string
) => {
  let userLikes: string[] = [];
  try {
    const messageRef = collection(db, "MessageData");
    const querySnapshot = await getDocs(messageRef);

    if (querySnapshot.docs.length !== 0) {
      querySnapshot.forEach((doc) => {
        /*  const id = doc.id; */
        userLikes = [...doc.data().userLikes];
      });
    }
    const result = userLikes?.includes(userId);
    if (!result) {
      userLikes.push(userId);
      const promise1 = updateDoc(doc(messageRef, messageId), {
        userLikes,
      });
      const membreDataRef = doc(db, "MembreData", userId);
      const promise2 = updateDoc(membreDataRef, {
        nombreLikes: increment(1),
      });
      const [value1, value2] = await Promise.all([promise1, promise2]);
      console.log(value1, value2);

      return {
        message: "Les likes ont été mise à jour avec success",
        success: true,
      };
    }
    return {
      message: "vous avez deja liker",
      success: true,
    };
  } catch (error) {
    console.log({ error: error });
    throw new Error("Une erreur est survenue pendant la mise à jour des likes");
  }
};

export const updateCommentairewithLike = async (
  userId: string,
  commentaireId: string
) => {
  let userLikes: string[] = [];
  try {
    const commentaireRef = collection(db, "CommentaireData");
    const querySnapshot = await getDocs(commentaireRef);

    if (querySnapshot.docs.length !== 0) {
      querySnapshot.forEach((doc) => {
        userLikes = [...doc.data().userLikes];
      });
    }
    const result = userLikes?.includes(userId);
    if (!result) {
      userLikes.push(userId);
      const promise1 = updateDoc(doc(commentaireRef, commentaireId), {
        userLikes,
      });

      const membreDataRef = doc(db, "MembreData", userId);
      const promise2 = updateDoc(membreDataRef, {
        nombreLikes: increment(1),
      });
      const [value1, value2] = await Promise.all([promise1, promise2]);
      console.log(value1, value2);

      return {
        message: "Les likes ont été mise à jour avec success",
        success: true,
      };
    }
    return {
      message: "vous avez deja liker",
      success: true,
    };
  } catch (error) {
    console.log({ error: error });
    throw new Error("Une erreur est survenue pendant la mise à jour des likes");
  }
};

export const getAllMessageData = async (groupeName: string) => {
  let messagesData: MessageData[] = [];
  try {
    const messageRef = collection(db, "MessageData");
    const querySnapshot = await getDocs(messageRef);

    if (querySnapshot.docs.length !== 0) {
      querySnapshot.forEach((doc) => {
        const id = doc.id;
        const {
          userId,
          userName,
          userAvatar,
          text,
          photo,
          audio,
          video,
          userLikes,
          date,
          groupeName,
        } = doc.data();
        messagesData.push({
          id,
          userId,
          userName,
          userAvatar,
          text,
          photo,
          audio,
          video,
          userLikes,
          date,
          groupeName,
        });
      });
    }
    return messagesData.filter((value) => value.groupeName === groupeName);
  } catch (error) {
    console.log({ error: error });
    throw new Error(
      "Une erreur est survenue pendant la récupération des messages"
    );
  }
};

export const getAllCommentaireData = async (messageId: string) => {
  let commentairesData: CommentaireData[] = [];
  try {
    const commentaireRef = collection(db, "CommentaireData");
    const querySnapshot = await getDocs(commentaireRef);

    if (querySnapshot.docs.length !== 0) {
      querySnapshot.forEach((doc) => {
        const id = doc.id;
        const {
          text,
          image,
          messageId,
          userLikes,
          date,
          userId,
          userName,
          userAvatar,
          idOfUserThatWithReply,
          nameOfUserThatWithReply,
          textOfUserThatWithReply,
        } = doc.data();
        commentairesData.push({
          id,
          text,
          image,
          messageId,
          userLikes,
          date,
          userId,
          userName,
          userAvatar,
          idOfUserThatWithReply,
          nameOfUserThatWithReply,
          textOfUserThatWithReply,
        });
      });

      return commentairesData.filter((value) => value.messageId === messageId);
    }
  } catch (error) {
    console.log({ error: error });
    throw new Error(
      "Une erreur est survenue pendant la récupération des commentaires"
    );
  }
};

export const getAllResponseData = async () => {
  let reponsesData: ReponseData[] = [];

  try {
    const reponseRef = collection(db, "ReponseData");
    const querySnapshot = await getDocs(reponseRef);

    if (querySnapshot.docs.length !== 0) {
      querySnapshot.forEach((doc) => {
        const id = doc.id;
        const { text, image, commentaireId, date, userId, userName } =
          doc.data();
        reponsesData.push({
          id,
          text,
          image,
          commentaireId,
          date,
          userId,
          userName,
        });
      });

      return reponsesData;
    }
  } catch (error) {
    console.log({ error: error });
    throw new Error(
      "Une erreur est survenue pendant la récupération des réponses"
    );
  }
};

export const getMessageWithId = async (messageId: string) => {
  try {
    const docRef = doc(db, "MessageData", messageId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const {
        id,
        userId,
        userName,
        userAvatar,
        text,
        photo,
        audio,
        video,
        userLikes,
        date,
        groupeName,
      } = docSnap.data();
      return {
        id,
        userId,
        userName,
        userAvatar,
        text,
        photo,
        audio,
        video,
        userLikes,
        date,
        groupeName,
      };
    } else {
      throw new Error("Le message n'existe pas");
    }
  } catch (error) {
    throw new Error(
      "Une erreur est survenue pendant la récupération des données"
    );
  }
};

export async function requestTogetAllMembreData(): Promise<MembreData[]> {
  let membreData: MembreData[] = [];
  try {
    const querySnapshot = await getDocs(collection(db, "MembreData"));
    console.log({ length: querySnapshot.docs.length });
    if (querySnapshot.docs.length !== 0) {
      querySnapshot.forEach((doc) => {
        const id = doc.id;
        const {
          name,
          email,
          motsDepasse,
          image,
          sexe,
          birthDay,
          phone,
          status,
          dateCreation,
          dateMiseAJour,
          nombrePartage,
          nombreLikes,
          nombreCommentaire,
        } = doc.data();
        membreData.push({
          id,
          name,
          email,
          motsDepasse,
          image,
          sexe,
          birthDay,
          phone,
          status,
          dateCreation,
          dateMiseAJour,
          nombrePartage,
          nombreLikes,
          nombreCommentaire,
        });
      });

      return membreData;
    }

    return [];
  } catch (error) {
    console.log({ error: error });
    throw new Error(
      "Une erreur est survenue pendant la récupération des données"
    );
  }
}

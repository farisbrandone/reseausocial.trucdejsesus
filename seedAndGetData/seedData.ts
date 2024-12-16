import {
  collection,
  getDocs,
  doc,
  getDoc,
  setDoc,
  /* deleteDoc, */
  updateDoc,
  /* getCountFromServer,
  orderBy,
  query,
  limit,
  QueryDocumentSnapshot,
  DocumentData,
  startAfter,
  endBefore,
  startAt, */
  increment,
  deleteDoc,
  /* where, */
} from "firebase/firestore";
import { db } from "../firebaseConfig";

export interface CommunityDataType {
  title: string;
  description: string;
  logoUrl: string;
  banniereUrl: string;
  communityUrl: string;
  faviconUrl: string;
  timeZone: string;
  status: string;
  dateOfCreation?: string;
  dateOfUpdate?: string;
  id?: string;
}

export interface MembreData {
  name: string;
  email: string;
  motsDepasse: string;
  sexe: string;
  birthDay: string;
  phone: string;
  status: string;
  image: string;
  dateOfCreation?: string;
  dateOfUpdate?: string;
  id?: string;
  communityId?: string;
  groupeId?: string[];
  nombrePartage: number;
  nombreLikes: number;
  nombreCommentaire: number;
  nombreDeMerciBenis: number;
  nombreDactivite: number;
  nombreDeBadge: number;
}

export interface MessageData {
  dateOfCreation?: string;
  dateOfUpdate?: string;
  id?: string;
  userReceiverId?: string;
  userId: string;
  userName: string;
  userAvatar: string;
  text: string;
  photo: string;
  audio: string;
  video: string;
  othersFile: string;
  userLikes: string[];
  groupeName: string;
  groupeId?: string;
  communityId: string;
  typeMessage: string;
}

export interface CommentaireData {
  dateOfCreation?: string;
  dateOfUpdate?: string;
  id?: string;
  text: string;
  image: string;
  messageId: string;
  userLikes: string[];
  userId: string;
  userName: string;
  userAvatar: string;
  idOfUserThatWithReply: string;
  nameOfUserThatWithReply: string;
  textOfUserThatWithReply: string;
}

export interface ReponseData {
  dateOfCreation?: string;
  dateOfUpdate?: string;
  id?: string;
  text: string;
  image: string;
  commentaireId: string;
  userId: string;
  userName: string;
}
export interface stateGroupeEvent {
  groupeId: string;
  titleGroupe: string;
  checked: boolean;
}

export interface EventDataType {
  titleEvent: string;
  descriptionEvent: string;
  imageUrlEvent: string;
  typeAccess: string;
  status: string;
  dateOfEvent: string;
  typeEvent: string;
  urlOfEvent: string;
  textCTAEvent: string;
  locationOfEvent: string;
  groupeForEventSelect: stateGroupeEvent[];
  dateOfCreation?: string;
  dateOfUpdate?: string;
  id?: string;
}

export interface ChannelPageDataType {
  nomChannel: string;
  descriptionChannel: string;
  typeChannel: string;
  typeAccessChannel: string;
  imageChannel: string;
  amountChannel: string;
  groupeIdChannel: string;
  statusChannel: string;
  channelRessources: RessourcesDataType[];
  dateOfCreation?: string;
  dateOfUpdate?: string;
  id?: string;
}

export interface RessourcesDataType {
  titleRessource: string;
  communityId?: string;
  descriptionRessource?: string;
  imageRessource?: string;
  textButtonRessource?: string;
  typeRessources: string;
  urlRessources?: string;
  urlExterne?: string;
  urlVideo?: string;
  urlAudio?: string;
  instruction?: string;
  status: string;
  dateOfCreation?: string;
  dateOfUpdate?: string;
  id?: string;
}

export interface GroupeDataType {
  titleGroupe: string;
  descriptionGroupe: string;
  typeAccess: string;
  communityId?: string;
  memberId?: string[];
  dateOfCreation?: string;
  dateOfUpdate?: string;
  id?: string;
  banniereUrlGroupe: string;
  logoUrlGroupe: string;
  status: string;
  nombreDePartages: number;
  nombreDevenements: number;
  nombreDeChaines: number;
  nombreDePassionnner: number;
}

export interface MemberWaitingDataType {
  name: string;
  email: string;
  motsDepasse: string;
  sexe: string;
  birthDay: string;
  phone: string;
  status: string;
  image: string;
  communityId?: string;
  groupeId?: string;
  dateOfCreation?: string;
  dateOfUpdate?: string;
  id?: string;
  nombrePartage: number;
  nombreLikes: number;
  nombreCommentaire: number;
  nombreDeMerciBenis: number;
  nombreDactivite: number;
  nombreDeBadge: number;
}

export async function requestTogetAllUniversalData<T>(
  databaseName: string
): Promise<T[]> {
  let data: T[] = [];
  try {
    const querySnapshot = await getDocs(collection(db, databaseName));
    if (querySnapshot.empty) {
      console.log("qqq");
      throw new Error("Une erreur est survenue cotée serveur");
    }

    if (querySnapshot.docs.length !== 0) {
      querySnapshot.forEach((doc) => {
        const id = doc.id;

        const partialdata = doc.data();
        data.push({
          id,
          ...partialdata,
        } as T);
      });

      return data;
    }

    return [];
  } catch (error) {
    console.log("qqq");
    throw new Error(
      "Une erreur est survenue pendant la récupération des données"
    );
  }
}

export const postMessageByUser = async (
  {
    userId,
    userName,
    text,
    photo,
    audio,
    video,
    groupeName,
    userLikes,
    userAvatar,
    communityId,
    typeMessage,
    othersFile,
  }: MessageData,
  groupeId: string
) => {
  try {
    console.log({ userId, groupeId });
    const messageRef = collection(db, "MessageData");
    const membreDataRef = doc(db, "MemberData", userId);
    const groupeDataRef = doc(db, "GroupeData", groupeId);
    const dateOfCreation = new Date().toUTCString();
    const dateOfUpdate = new Date().toUTCString();
    const promise1 = setDoc(doc(messageRef), {
      userId,
      userName,
      userAvatar,
      text,
      photo,
      audio,
      video,
      dateOfCreation,
      dateOfUpdate,
      groupeName,
      userLikes,
      communityId,
      typeMessage,
      othersFile,
    });
    const promise2 = updateDoc(membreDataRef, {
      nombrePartage: increment(1),
      nombreDeMerciBenis: increment(3),
      nombreDactivite: increment(1),
    });
    const promise3 = updateDoc(groupeDataRef, {
      nombreDePartages: increment(1),
    });
    const [value1, value2, value3] = await Promise.all([
      promise1,
      promise2,
      promise3,
    ]);
    console.log(value1, value2, value3);
    return { message: "Le message a été créer avec success", success: true };
  } catch (error) {
    console.log({ error });
    throw new Error("Une erreur est survenue pendant la création du message");
  }
};

export const postCommentaireByUser = async ({
  text,
  image,
  messageId,
  userId,
  userName,
  userAvatar,
  userLikes,
  idOfUserThatWithReply,
  nameOfUserThatWithReply,
  textOfUserThatWithReply,
}: CommentaireData) => {
  const commentaireRef = collection(db, "CommentaireData");
  const membreDataRef = doc(db, "MemberData", userId);
  const date = new Date().toUTCString();
  try {
    const promise1 = setDoc(doc(commentaireRef), {
      text,
      image,
      messageId,
      userId,
      userName,
      userAvatar,
      userLikes,
      idOfUserThatWithReply,
      nameOfUserThatWithReply,
      textOfUserThatWithReply,
      date,
    });

    const promise2 = updateDoc(membreDataRef, {
      nombreCommentaire: increment(1),
      nombreDeMerciBenis: increment(2),
      nombreDactivite: increment(1),
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
  const date = new Date().toUTCString();

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

        if (
          doc.data()?.userLikes &&
          doc.data()?.userLikes?.length !== 0 &&
          doc.data().id === messageId
        ) {
          console.log("papou");
          userLikes = [...doc.data().userLikes];
        }
      });
    }
    console.log(userLikes);

    console.log("dedans por celui ci");
    const result = userLikes?.includes(userId);
    if (!result) {
      userLikes.push(userId);
      const promise1 = updateDoc(doc(messageRef, messageId), {
        userLikes,
      });
      const membreDataRef = doc(db, "MemberData", userId);
      const promise2 = updateDoc(membreDataRef, {
        nombreLikes: increment(1),
        nombreDeMerciBenis: increment(1),
        nombreDactivite: increment(1),
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
        if (
          doc.data()?.userLikes &&
          doc.data()?.userLikes?.length !== 0 &&
          doc.data().id === commentaireId
        ) {
          userLikes = [...doc.data().userLikes];
        }
      });
      const result = userLikes?.includes(userId);
      if (!result) {
        userLikes.push(userId);
        const promise1 = updateDoc(doc(commentaireRef, commentaireId), {
          userLikes,
        });

        const membreDataRef = doc(db, "MemberData", userId);
        const promise2 = updateDoc(membreDataRef, {
          nombreLikes: increment(1),
          nombreDeMerciBenis: increment(1),
          nombreDactivite: increment(1),
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
    }
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
          dateOfCreation,
          dateOfUpdate,
          groupeName,
          communityId,
          typeMessage,
          othersFile,
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
          dateOfCreation,
          dateOfUpdate,
          groupeName,
          communityId,
          typeMessage,
          othersFile,
        });
      });
    }
    return messagesData
      .filter((value) => value.groupeName === groupeName)
      .sort((value, value1) => {
        const diff =
          new Date(value.dateOfUpdate as string).getTime() -
          new Date(value1.dateOfUpdate as string).getTime();
        if (diff < 0) {
          return 1;
        } else {
          return -1;
        }
      });
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
          dateOfCreation,
          dateOfUpdate,
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
          dateOfCreation,
          dateOfUpdate,
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
        const {
          text,
          image,
          commentaireId,
          dateOfCreation,
          dateOfUpdate,
          userId,
          userName,
        } = doc.data();
        reponsesData.push({
          id,
          text,
          image,
          commentaireId,
          dateOfCreation,
          dateOfUpdate,
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
        communityId,
        typeMessage,
        othersFile,
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
        communityId,
        typeMessage,
        othersFile,
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
    const querySnapshot = await getDocs(collection(db, "MemberData"));
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
          dateOfCreation,
          dateOfUpdate,
          nombrePartage,
          nombreLikes,
          nombreCommentaire,
          nombreDeMerciBenis,
          nombreDactivite,
          nombreDeBadge,
          communityId,
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
          dateOfCreation,
          dateOfUpdate,
          nombrePartage,
          nombreLikes,
          nombreCommentaire,
          nombreDeMerciBenis,
          nombreDactivite,
          nombreDeBadge,
          communityId,
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

export async function requestTogetAllEventDataofGroupe(
  titleGroupe: string
): Promise<EventDataType[]> {
  let groupeData: EventDataType[] = [];
  try {
    const querySnapshot = await getDocs(collection(db, "EventData"));
    console.log({ length: querySnapshot.docs.length });
    if (querySnapshot.docs.length !== 0) {
      querySnapshot.forEach((doc) => {
        const id = doc.id;
        const {
          titleEvent,
          descriptionEvent,
          imageUrlEvent,
          typeAccess,
          status,
          dateOfEvent,
          typeEvent,
          urlOfEvent,
          textCTAEvent,
          locationOfEvent,
          groupeForEventSelect,
          dateOfCreation,
          dateOfUpdate,
        } = doc.data();
        groupeData.push({
          id,
          titleEvent,
          descriptionEvent,
          imageUrlEvent,
          typeAccess,
          status,
          dateOfEvent,
          typeEvent,
          urlOfEvent,
          textCTAEvent,
          locationOfEvent,
          groupeForEventSelect,
          dateOfCreation,
          dateOfUpdate,
        });
      });
      console.log({ drdr_drdr: groupeData[0].id });
      const result = groupeData.filter((value) => {
        for (let elt of value.groupeForEventSelect) {
          if (elt.titleGroupe === titleGroupe) {
            return true;
          }
        }
        return false;
      });
      return result;
    }

    return [];
  } catch (error) {
    console.log({ error: error });
    throw new Error(
      "Une erreur est survenue pendant la récupération des données"
    );
  }
}

export async function requestTogetAllChannelDataOfGroupe(
  groupeId: string
): Promise<ChannelPageDataType[]> {
  let channelData: ChannelPageDataType[] = [];

  try {
    const querySnapshot = await getDocs(collection(db, "ChannelData"));

    if (querySnapshot.docs.length !== 0) {
      querySnapshot.forEach((doc) => {
        const id = doc.id;
        const {
          nomChannel,
          descriptionChannel,
          typeChannel,
          imageChannel,
          groupeIdChannel,
          dateOfCreation,
          dateOfUpdate,
          statusChannel,
          typeAccessChannel,
          amountChannel,
          channelRessources,
        } = doc.data();
        channelData.push({
          id,
          nomChannel,
          descriptionChannel,
          typeChannel,
          imageChannel,
          groupeIdChannel,
          dateOfCreation,
          dateOfUpdate,
          statusChannel,
          typeAccessChannel,
          amountChannel,
          channelRessources,
        });
      });

      return channelData.filter((value) => value.groupeIdChannel === groupeId);
    }

    return [];
  } catch (error) {
    console.log({ error: error });
    throw new Error(
      "Une erreur est survenue pendant la récupération des données"
    );
  }
}

export const getAllCommunityMessageData = async (communityId: string) => {
  let messagesData: MessageData[] = [];
  try {
    const messageRef = collection(db, "MessageData");
    const querySnapshot = await getDocs(messageRef);
    console.log("nindja");
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
          dateOfCreation,
          dateOfUpdate,
          groupeName,
          communityId,
          typeMessage,
          othersFile,
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
          dateOfCreation,
          dateOfUpdate,
          groupeName,
          communityId,
          typeMessage,
          othersFile,
        });
      });
    }
    console.log({ messagesData });
    const ca = messagesData
      .filter((value) => value.communityId === communityId)
      .sort((value, value1) => {
        const diff =
          new Date(value.dateOfUpdate as string).getTime() -
          new Date(value1.dateOfUpdate as string).getTime();
        if (diff < 0) {
          return 1;
        } else {
          return -1;
        }
      });
    console.log(ca);
    return ca;
  } catch (error) {
    console.log({ error: error });
    throw new Error(
      "Une erreur est survenue pendant la récupération des messages"
    );
  }
};

export async function requestToGetAllUniversalDataWithId<T>(
  parameterId: string,
  databaseName: string
): Promise<T> {
  try {
    const docRef = doc(db, databaseName, parameterId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const result = { ...docSnap.data() };
      return result as T;
    } else {
      throw new Error("Le document n'existe pas");
    }
  } catch (error) {
    throw new Error(
      "Une erreur est survenue pendant la récupération des données"
    );
  }
}

export const getAllSenderReceiverMessage = async (
  senderId: string,
  receiverId: string
) => {
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
          dateOfCreation,
          dateOfUpdate,
          groupeName,
          communityId,
          typeMessage,
          othersFile,
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
          dateOfCreation,
          dateOfUpdate,
          groupeName,
          communityId,
          typeMessage,
          othersFile,
        });
      });
    }
    console.log("papounet");
    return messagesData
      .filter(
        (value) =>
          value.userId === senderId && value.userReceiverId === receiverId
      )
      .sort((value, value1) => {
        const diff =
          new Date(value.dateOfUpdate as string).getTime() -
          new Date(value1.dateOfUpdate as string).getTime();
        if (diff < 0) {
          return 1;
        } else {
          return -1;
        }
      });
  } catch (error) {
    console.log({ error: error });
    throw new Error(
      "Une erreur est survenue pendant la récupération des messages"
    );
  }
};

export async function requestToDeleteUniversalDataWithId(
  dataId: string,
  databaseName: string
) {
  const docRef = doc(db, databaseName, dataId);
  try {
    await deleteDoc(docRef);
    return {
      message: "le document à été supprimer avec success",
      success: true,
    };
  } catch (error) {
    return {
      message: "Un problème est survenu pendant la suppression",
      success: false,
    };
  }
}

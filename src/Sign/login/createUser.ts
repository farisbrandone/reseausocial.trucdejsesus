import { Auth, createUserWithEmailAndPassword } from "firebase/auth";

export const createUser = async (
  email: string,
  motsDepasse: string,
  auth: Auth
) => {
  try {
    const result = await createUserWithEmailAndPassword(
      auth,
      email,
      motsDepasse
    );
    /*  .then((u) => {
            console.log(u);
          })
          .catch((error) => {
            console.log(error.code);
            switch (error.code) {
              case "auth/email-already-in-use":
                
                console.log(error.code);
                return;
              case "auth/invalid-email":
                throw error;

              case "auth/operation-not-allowed":
                throw error;

              case "auth/weak-password":
                throw error;

              default:
                throw error;
            }
          });  */

    return {
      result,
      alreadyExist: false,
    };
  } catch (error) {
    return {
      result: null,
      alreadyExist: true,
    };
  }
};

import { auth } from "../config/firebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";

export const signUpAction = (creds) => {
  return (dispatch) => {
    createUserWithEmailAndPassword(auth, creds.email, creds.password)
      .then((userCredential) => {
        return updateProfile(userCredential.user, { displayName: creds.username });
      })
      .then(() => {
        dispatch({
          type: "SIGN_UP",
          res: auth.currentUser,
        });
      })
      .catch((err) => {
        dispatch({ type: "SIGN_UP_ERROR", err });
      });
  };
};

export const logInAction = (creds) => {
  return (dispatch) => {
    signInWithEmailAndPassword(auth, creds.email, creds.password)
      .then((userCredential) => {
        dispatch({ type: "LOG_IN", res: userCredential });
      })
      .catch((err) => {
        dispatch({ type: "LOG_IN_ERROR", err });
      });
  };
};

export const logOutAction = () => {
  return { type: "LOG_OUT" };
};

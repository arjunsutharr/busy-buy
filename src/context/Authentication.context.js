import { createContext, useContext, useReducer } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { toast } from "react-toastify";
import { auth } from "../firebaseInit";

const authContext = createContext();

const useAuthValues = () => {
  const values = useContext(authContext);
  return values;
};

function reducer(state, action) {
  const { data } = action;
  switch (action.type) {
    case "UPDATE_EMAIL":
      return {
        ...state,
        FormData: { ...state.FormData, email: data },
      };
    case "UPDATE_PASSWORD":
      return {
        ...state,
        FormData: { ...state.FormData, password: data },
      };
    case "SET_LOGGED_IN":
      return {
        ...state,
        isLoggedIn: data,
      };
    case "USER":
      return {
        ...state,
        user: data,
      };

    default:
      return state;
  }
}

function AuthContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, {
    FormData: { name: "", email: "", password: "" },
    user: null,
    isLoggedIn: false,
  });

  const { FormData } = state;

  const signup = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        FormData.email,
        FormData.password
      );

      const newUser = userCredential.user;

      dispatch({
        type: "UPDATE_EMAIL",
        data: "",
      });

      dispatch({
        type: "UPDATE_PASSWORD",
        data: "",
      });

      dispatch({
        type: "USER",
        data: newUser,
      });

      dispatch({
        type: "SET_LOGGED_IN",
        data: true,
      });

      return true;
    } catch (error) {
      toast.error(error.message);
    }
  };

  const signIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        FormData.email,
        FormData.password
      );

      const user = userCredential.user;

      dispatch({
        type: "UPDATE_EMAIL",
        data: "",
      });

      dispatch({
        type: "UPDATE_PASSWORD",
        data: "",
      });

      dispatch({
        type: "USER",
        data: user,
      });

      dispatch({
        type: "SET_LOGGED_IN",
        data: true,
      });

      toast.success("Sign-in successful.");

      return true;
    } catch (error) {
      toast.error(error.message);
    }
  };

  const signOutUser = async () => {
    try {
      await signOut(auth);

      dispatch({
        type: "USER",
        data: null,
      });

      dispatch({
        type: "SET_LOGGED_IN",
        data: false,
      });

      toast.success("Sign-out successful.");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <authContext.Provider
      value={{ ...state, signIn, signup, signOutUser, dispatch }}
    >
      {children}
    </authContext.Provider>
  );
}

export { authContext, useAuthValues };
export default AuthContextProvider;

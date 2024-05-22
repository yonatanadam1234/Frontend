import React, { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  auth,
  createUserWithEmailAndPassword,
  facebookAuthProvider,
  githubAuthProvider,
  googleAuthProvider,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  twitterAuthProvider,
  updateProfile,
} from "./firebase";
import { useInfoViewActionsContext } from "../../../context/AppContextProvider/InfoViewContextProvider";
import jwtAxios, { setAuthToken } from "../jwt-auth";

const FirebaseContext = createContext();
const FirebaseActionsContext = createContext();

export const useFirebase = () => useContext(FirebaseContext);

export const useFirebaseActions = () => useContext(FirebaseActionsContext);

const FirebaseAuthProvider = ({ children }) => {
  const { fetchStart, fetchSuccess, fetchError, showMessage } = useInfoViewActionsContext();
  const [firebaseData, setFirebaseData] = useState({
    user: null,
    isLoading: true,
    isAuthenticated: false,
  });
  const [authData, setJWTAuthData] = useState({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    fetchStart();
    const getAuthUser = onAuthStateChanged(
      auth,
      (user) => {
        setFirebaseData({
          user: user,
          isAuthenticated: Boolean(user),
          isLoading: false,
        });
        fetchSuccess();
      },
      () => {
        fetchSuccess();
        setFirebaseData({
          user: null,
          isLoading: false,
          isAuthenticated: false,
        });
      },
      () => {
        fetchSuccess();
        setFirebaseData({
          user: null,
          isLoading: false,
          isAuthenticated: false,
        });
      },
    );

    return () => {
      getAuthUser();
    };
  }, []);

  const getProvider = (providerName) => {
    switch (providerName) {
      case "google": {
        return googleAuthProvider;
      }
      case "facebook": {
        return facebookAuthProvider;
      }
      case "twitter": {
        return twitterAuthProvider;
      }
      case "github": {
        return githubAuthProvider;
      }
      default:
        return googleAuthProvider;
    }
  };

  const logInWithPopup = async (providerName) => {
    fetchStart();
    try {
      const { user } = await signInWithPopup(auth, getProvider(providerName));
      setFirebaseData({
        user,
        isAuthenticated: true,
        isLoading: false,
      });
      fetchSuccess();
    } catch (error) {
      setFirebaseData({
        ...firebaseData,
        isAuthenticated: false,
        isLoading: false,
      });
      fetchError(error.message);
    }
  };

  const logInWithEmailAndPassword = async ({ email, password }) => {
    fetchStart();
    try {
      // const { user } = await signInWithEmailAndPassword(auth, email, password);
      const { data } = await jwtAxios.post('login', { email, password });

      setFirebaseData({
        user: data.user,
        isAuthenticated: true,
        isLoading: false
      });
      fetchSuccess();
    } catch (error) {
      setFirebaseData({
        ...firebaseData,
        isAuthenticated: false,
        isLoading: false,
      });
      fetchError(error.response.data.message);
    }
  };

  const verifyUser = async ({
    email,
    otp,
  }) => {
    fetchStart();
    try {
      const { data } = await jwtAxios.post('/otp/verify', { email, otp });
      setFirebaseData({
        user: data.user,
        isAuthenticated: true,
        isLoading: false
      });
      fetchSuccess();
    } catch (error) {
      setFirebaseData({
        ...firebaseData,
        isAuthenticated: false,
        isLoading: false,
      });
      fetchError(error.response.data.message);
    }
  };

  const logout = async () => {
    localStorage.removeItem('email')
    localStorage.removeItem('password')
    setFirebaseData({ ...firebaseData, isLoading: true });
    try {
      await signOut(auth);
      setFirebaseData({
        user: null,
        isLoading: false,
        isAuthenticated: false,
      });
      console.log("logout");
    } catch (error) {
      console.log("error", error);
      setFirebaseData({
        user: null,
        isLoading: false,
        isAuthenticated: false,
      });
    }
  };

  return (
    <FirebaseContext.Provider
      value={{
        ...firebaseData,
      }}
    >
      <FirebaseActionsContext.Provider
        value={{
          logInWithEmailAndPassword,
          verifyUser,
          logInWithPopup,
          logout,
        }}
      >
        {children}
      </FirebaseActionsContext.Provider>
    </FirebaseContext.Provider>
  );
};
export default FirebaseAuthProvider;

FirebaseAuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
  fetchStart: PropTypes.func,
  fetchSuccess: PropTypes.func,
  fetchError: PropTypes.func,
};




// import React, {
//   createContext,
//   useContext,
//   useEffect,
//   useState,
//   useMemo,
// } from "react";
// import PropTypes from "prop-types";
// import {
//   auth,
//   onAuthStateChanged,
//   signInWithPopup,
//   signOut,
//   googleAuthProvider,
//   facebookAuthProvider,
//   twitterAuthProvider,
//   githubAuthProvider,
// } from "./firebase";
// import { useInfoViewActionsContext } from "../../../context/AppContextProvider/InfoViewContextProvider";
// import jwtAxios from "../jwt-auth";
// import { getUserFromFirebase } from "../../../helpers/AuthHelper";
// import { useNavigate } from "react-router-dom";

// const FirebaseContext = createContext();
// const FirebaseActionsContext = createContext();

// export const useFirebase = () => useContext(FirebaseContext);

// export const useFirebaseActions = () => useContext(FirebaseActionsContext);

// const FirebaseAuthProvider = ({ children }) => {
//   const { fetchStart, fetchSuccess, fetchError } = useInfoViewActionsContext();
//   const [firebaseData, setFirebaseData] = useState({
//     user: null,
//     isLoading: true,
//     isAuthenticated: false,
//   });
//   const navigate = useNavigate();

//   // Using useMemo to store user data in localStorage and retrieve it
//   const storedUser = useMemo(() => {
//     const userId = localStorage.getItem("userId");
//     const userName = localStorage.getItem("userName");
//     const userEmail = localStorage.getItem("userEmail");
//     if (userId && userName && userEmail) {
//       return { id: userId, name: userName, email: userEmail };
//     }
//     return null;
//   }, []);

//   // Sync local storage user data with state
//   useEffect(() => {
//     if (storedUser) {
//       setFirebaseData({
//         user: storedUser,
//         isAuthenticated: true,
//         isLoading: false,
//       });
//     }
//   }, [storedUser]);

//   // Redirect to last visited page if user is authenticated
//   useEffect(() => {
//     if (!firebaseData.isLoading && firebaseData.isAuthenticated) {
//       const lastPath = localStorage.getItem("lastPath");
//       if (lastPath) {
//         navigate(lastPath);
//         localStorage.removeItem("lastPath");
//       }
//     }
//   }, [firebaseData.isLoading, firebaseData.isAuthenticated, navigate]);

//   useEffect(() => {
//     fetchStart();
//     const getAuthUser = onAuthStateChanged(
//       auth,
//       (user) => {
//         const userData = getUserFromFirebase(user);
//         if (userData) {
//           localStorage.setItem("userId", userData.id);
//           localStorage.setItem("userName", userData.displayName);
//           localStorage.setItem("userEmail", userData.email);
//         }
//         setFirebaseData({
//           user: userData,
//           isAuthenticated: Boolean(user),
//           isLoading: false,
//         });
//         fetchSuccess();
//       },
//       () => {
//         fetchSuccess();
//         setFirebaseData({
//           user: null,
//           isLoading: false,
//           isAuthenticated: false,
//         });
//       },
//       () => {
//         fetchSuccess();
//         setFirebaseData({
//           user: null,
//           isLoading: false,
//           isAuthenticated: false,
//         });
//       }
//     );

//     return () => {
//       getAuthUser();
//     };
//   }, [fetchStart, fetchSuccess]);

//   const getProvider = (providerName) => {
//     switch (providerName) {
//       case "google":
//         return googleAuthProvider;
//       case "facebook":
//         return facebookAuthProvider;
//       case "twitter":
//         return twitterAuthProvider;
//       case "github":
//         return githubAuthProvider;
//       default:
//         return googleAuthProvider;
//     }
//   };

//   const logInWithPopup = async (providerName) => {
//     fetchStart();
//     try {
//       const { user } = await signInWithPopup(auth, getProvider(providerName));
//       const userData = getUserFromFirebase(user);
//       if (userData) {
//         localStorage.setItem("userId", userData.id);
//         localStorage.setItem("userName", userData.displayName);
//         localStorage.setItem("userEmail", userData.email);
//         localStorage.setItem("lastPath", window.location.pathname);
//       }
//       setFirebaseData({
//         user: userData,
//         isAuthenticated: true,
//         isLoading: false,
//       });
//       fetchSuccess();
//     } catch (error) {
//       setFirebaseData({
//         ...firebaseData,
//         isAuthenticated: false,
//         isLoading: false,
//       });
//       fetchError(error.message);
//     }
//   };

//   const logInWithEmailAndPassword = async ({ email, password }) => {
//     fetchStart();
//     try {
//       const { data } = await jwtAxios.post("login", { email, password });
//       const userData = getUserFromFirebase(data.user);
//       if (userData) {
//         localStorage.setItem("userId", userData.id);
//         localStorage.setItem("userName", userData.displayName);
//         localStorage.setItem("userEmail", userData.email);
//         localStorage.setItem("lastPath", window.location.pathname);
//       }
//       setFirebaseData({
//         user: data.user,
//         isAuthenticated: true,
//         isLoading: false,
//       });
//       fetchSuccess();
//     } catch (error) {
//       setFirebaseData({
//         ...firebaseData,
//         isAuthenticated: false,
//         isLoading: false,
//       });
//       fetchError(error.response.data.message);
//     }
//   };

//   const verifyUser = async ({ email, otp }) => {
//     fetchStart();
//     try {
//       const { data } = await jwtAxios.post("/otp/verify", { email, otp });
//       const userData = getUserFromFirebase(data.user);
//       if (userData) {
//         localStorage.setItem("userId", userData.id);
//         localStorage.setItem("userName", userData.displayName);
//         localStorage.setItem("userEmail", userData.email);
//         localStorage.setItem("lastPath", window.location.pathname);
//       }
//       setFirebaseData({
//         user: data.user,
//         isAuthenticated: true,
//         isLoading: false,
//       });
//       fetchSuccess();
//     } catch (error) {
//       setFirebaseData({
//         ...firebaseData,
//         isAuthenticated: false,
//         isLoading: false,
//       });
//       fetchError(error.response.data.message);
//     }
//   };

//   const logout = async () => {
//     localStorage.removeItem("userId");
//     localStorage.removeItem("userName");
//     localStorage.removeItem("userEmail");
//     localStorage.removeItem("lastPath");
//     setFirebaseData({ ...firebaseData, isLoading: true });
//     try {
//       await signOut(auth);
//       setFirebaseData({
//         user: null,
//         isLoading: false,
//         isAuthenticated: false,
//       });
//       console.log("logout");
//     } catch (error) {
//       console.log("error", error);
//       setFirebaseData({
//         user: null,
//         isLoading: false,
//         isAuthenticated: false,
//       });
//     }
//   };

//   return (
//     <FirebaseContext.Provider
//       value={{
//         ...firebaseData,
//         storedUser,
//       }}
//     >
//       <FirebaseActionsContext.Provider
//         value={{
//           logInWithEmailAndPassword,
//           verifyUser,
//           logInWithPopup,
//           logout,
//         }}
//       >
//         {children}
//       </FirebaseActionsContext.Provider>
//     </FirebaseContext.Provider>
//   );
// };

// export default FirebaseAuthProvider;

// FirebaseAuthProvider.propTypes = {
//   children: PropTypes.node.isRequired,
// };

import { createContext, useState, useEffect, useContext } from "react";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { ref, set, get } from "firebase/database";
import { database } from "./firebase";

const AuthContext = createContext({

  user: null,
  role: null,
  loading: true,
  roleLoading: true,
  loginWithEmail: () => {},
  registerWithEmail: () => {},
  loginWithGoogle: () => {},
  logout: () => {},
  saveRole: () => {},
  openAccountMenu: false,
  setOpenAccountMenu: () => {},

});

export function AuthProvider({ children }) {
  const auth = getAuth();
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [roleLoading, setRoleLoading] = useState(true);
  const [openAccountMenu, setOpenAccountMenu] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);

      if (firebaseUser) {
        const roleRef = ref(database, `users/${firebaseUser.uid}/role`);
        const snapshot = await get(roleRef);
        if (snapshot.exists()) {
          setRole(snapshot.val());
        } else {
          setRole(null);
        }
      } else {
        setRole(null);
      }

      setLoading(false);
      setRoleLoading(false);
    });

    return unsubscribe;
  }, [auth]);

  const loginWithEmail = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const registerWithEmail = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  const loginWithGoogle = () =>
    signInWithPopup(auth, new GoogleAuthProvider());

  const logout = async () => {
    setRole(null);
    await signOut(auth);
  };

  const saveRole = async (selectedRole) => {
    if (!user) return;
    const roleRef = ref(database, `users/${user.uid}/role`);
    await set(roleRef, selectedRole);
    setRole(selectedRole);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        loading,
        roleLoading,
        loginWithEmail,
        registerWithEmail,
        loginWithGoogle,
        logout,
        saveRole,
        openAccountMenu,
        setOpenAccountMenu
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
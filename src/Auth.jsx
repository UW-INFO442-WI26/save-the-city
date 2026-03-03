import { createContext, useState, useEffect, useContext } from "react";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const auth = getAuth();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [viewMode, setViewMode] = useState('user');

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            setUser(firebaseUser);
            setLoading(false);
        });
        return unsubscribe;
    }, [auth]);

    const loginWithEmail = (email, password) => signInWithEmailAndPassword(auth, email, password);
    const registerWithEmail = (email, password) => createUserWithEmailAndPassword(auth, email, password);
    const loginWithGoogle = () => signInWithPopup(auth, new GoogleAuthProvider());
    const logout = () => signOut(auth);
    const toggleView = () => setViewMode((prev) => (prev === 'user' ? 'host' : 'user'));

    return (
        <AuthContext.Provider value={{ user, loading, viewMode, loginWithEmail, registerWithEmail, loginWithGoogle, logout, toggleView }}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
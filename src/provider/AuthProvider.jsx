import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { app } from "../firebase/firebase.config";
import axios from "axios";



export const AuthContext = createContext()
const auth = getAuth(app)



const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    // user login all systems
    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password);
    }
    const signIn = (email,password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password);
    }
    const logOut = () => {
        setLoading(true)
        return signOut(auth)
    }
    const profileUpdate =(name,photo) => {
        setLoading(true)
        return updateProfile(auth.currentUser,{
            displayName: name,
            photoURL: photo
        })
    }


    // observer
    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth,currentUser =>{
            const userEmail = currentUser?.email || user?.email
            const loggedUser = { email: userEmail }
            setUser(currentUser)
            setLoading(false)
            console.log("the observer is:",currentUser);
            if(currentUser){
                axios.post('http://localhost:5000/jwt',loggedUser,{withCredentials: true})
                .then(res => {
                    console.log("the token is:",res.data);
                })
            }
            else{
                axios.post('http://localhost:5000/logout',loggedUser,{withCredentials: true})
                .then(res => {
                    console.log("logout", res.data);
                })
            }
        })
        return () => {
            return unSubscribe()
        }
    },[user])

    const authInfo = {
        user,
        loading,
        createUser,
        profileUpdate,
        signIn,
        logOut,
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
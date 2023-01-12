import React, { useContext, useState, useEffect } from "react"
import { auth } from "../firebase"
import { getAuth, updateProfile } from "firebase/auth";
import { getDatabase, ref, set } from 'firebase/database';

const AuthContext = React.createContext()
const db = getDatabase();

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    function signup(username, email, password) {
        auth.createUserWithEmailAndPassword(email, password)
        .then(() => {
            const user = getAuth().currentUser
            updateProfile(user, { displayName: username })
            //
            const data = {};
            data['id'] = user.uid;
            data['username'] = username;
            data['email'] = email;
            data['level'] = "user"      // 'editor', 'admin'
            set(ref(db, `/data/user/${user.uid}`), data)
        }).catch(function(error) {
            alert(error)
        });
    }
    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    }
    function logout() {
        return auth.signOut()
    }
    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email)
    }
    function updateEmail(email) {
        return currentUser.updateEmail(email)
    }
    function updatePassword(password) {
        return currentUser.updatePassword(password)
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
        setCurrentUser(user)
        setLoading(false)
    })
        return unsubscribe
    }, [])

    const value = {
        currentUser,
        login,
        signup,
        logout,
        resetPassword,
        updateEmail,
        updatePassword
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

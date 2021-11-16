import { initializeApp } from "firebase/app";
import firebaseConfig from "./FirebaseConfig";
import { onAuthStateChanged, GoogleAuthProvider, getAuth, signInWithPopup, signOut, createUserWithEmailAndPassword } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";



const FirebaseInit = () => {
    const app = initializeApp(firebaseConfig);
    const GoogleProvider = new GoogleAuthProvider();
    const auth = getAuth();
    const [loggedInUser, setLoggedInUser] = useState({});
    const [Error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [Redirect, setRedirect] = useState(false);
    const [user, setUser] = useContext(UserContext);
    useEffect(() => {
        onAuthStateChanged(auth, (User) => {
            setIsLoading(true);
            if (User) {
                setUser(User);
                fetch(`http://localhost:5000/user/${user.email}`)
                    .then(res => res.json())
                    .then(res => {
                        const email = User?.email;
                        const role  = res[0]?.role;
                        const name = User?.displayName;
                        const newUser = {email,role,name}
                        setUser(newUser);
                    });
                    console.log(user);
            } else {
                setUser({})
                setLoggedInUser({})
            }
            setIsLoading(false);
        });

    }, [])



    //Google Sign In
    const GoogleSignIn = () => {
        setIsLoading(true);
        signInWithPopup(auth, GoogleProvider)
            .then((result) => {
                setLoggedInUser(result.user);
                fetch(`http://localhost:5000/user/${result.user.email}`)
                    .then(res => res.json())
                    .then(res => {
                        setUser(res.json());
                        user.role = res.role
                    });
            }).catch((error) => {
                setError(error.message);
            });

        setIsLoading(false);
    }

    //Email Registration
    const EmailRegistration = (email,password) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setLoggedInUser (userCredential.user)
                fetch(`http://localhost:5000/user/${userCredential.user.email}`)
                    .then(res => res.json())
                    .then(res => {
                        setUser(res.json());
                        user.role = res.role
                    });
            })
            .catch((error) => {
                setError (error.message);
            });
    }




    //LogOut
    const LogOut = () => {
        signOut(auth).then(() => {
            setLoggedInUser({});
            setUser({})
        }).catch((error) => {
            // An error happened.
        });
    }

    return {
        GoogleSignIn,
        signInWithPopup
        , loggedInUser,
        setLoggedInUser,
        LogOut,
        isLoading,
        setRedirect,
        auth,
        GoogleProvider    
    }
}


export default FirebaseInit
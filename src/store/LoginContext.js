import React, { useContext, createContext, useState, useEffect } from 'react';
import { withRouter} from 'react-router-dom';
import { auth,db, facebookProvider } from '../helpers/auth'
import { Link, useHistory } from 'react-router-dom';
// import firebase from 'firebase/app'


export const LoginContext = createContext();



export function useAuth() {
    return useContext(LoginContext)
}



export function UserProvider({children}) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)
    let history = useHistory();




    function submitsignInWithFacebook()
    {
        return auth.signInWithPopup(facebookProvider).then((result,error)=>{
            if(error)
            {
                alert('Error', error);
            }
            else {
                alert(result)
            }
        });
    }

// No idea if we need this
    // useEffect(() => {
    //     const unsubscribe = auth.onAuthStateChanged(user => {
    //         setCurrentUser(user)
    //         setLoading(false)
    //     })

    //     return unsubscribe
    // }, [])



    const value = {
        submitsignInWithFacebook
    }


    return (
            <LoginContext.Provider value={value}>
                {!loading && children}
            </LoginContext.Provider>
    )
}
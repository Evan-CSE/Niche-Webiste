import { createUserWithEmailAndPassword } from '@firebase/auth';
import React, { useContext, useRef } from 'react'
import { Redirect, useHistory, useLocation } from 'react-router';
import { UserContext } from '../../App';
import FirebaseInit from '../Firebase/FirebaseInit'
import Footer from '../Footer/Footer'
import MenuBar from '../MenuBar/MenuBar'

export default function Register() {
    const {auth} = FirebaseInit();
    const [user,setUser] = useContext(UserContext);
    const UserEmail = useRef();
    const UserPassword = useRef();
    const UserName = useRef();
    const history = useHistory();
    const location = useLocation();
    const EmailRegistration = (e) => {
        const email = UserEmail.current.value;
        const pass = UserPassword.current.value;
        const name =UserName.current.value;
        console.log(email,pass)
        createUserWithEmailAndPassword(auth, email,pass)
            .then((userCredential) => {
                console.log(userCredential)
                setUser( userCredential.user);
                const newUser = {email,name};
                newUser.role='user';
                fetch('http://localhost:5000/addUser',{
                    method:'POST',
                    headers:{
                        'content-type': 'application/json'
                    },
                    body:JSON.stringify(newUser)
                })
                .then(res=>res.json())
                .then(data=>{console.log(data)
                    setUser(newUser);
                });
                history.push('/dashboard');
            })
            .catch((error) => {
                console.log(error)
            });
            e.preventDefault();

    }
    if(user?.email){
        return <Redirect
        to={{
            pathname: "/dashboard",
            state: { from: location }
        }}
        />
    }
    return (
        <>
            <MenuBar></MenuBar>
            <span className='text-blue-400 text-5xl mx-8'>
                Registration Form
            </span>
            <div class="w-100 mt-4">
                <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div class="mb-4">
                        <label class="block text-gray-700 text-3xl font-bold mb-2 " for="username">
                            User Name
                        </label>
                        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-3xl" id="userName" type="text" placeholder="Username" ref={UserName}/>
                    </div>
                    <div class="mb-4">
                        <label class="block text-gray-700 text-3xl font-bold mb-2 " for="username">
                            Email
                        </label>
                        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-3xl" id="Email" type="email" placeholder="Email" ref={UserEmail}/>
                    </div>
                    <div class="mb-6">
                        <label class="block text-gray-700 text-3xl font-bold mb-2" for="password">
                            Password
                        </label>
                        <input class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline text-3xl" id="password" type="password" placeholder="******************" ref={UserPassword}/>
                        <p class="text-red-500 text-2xl italic">Please choose a password.</p>
                    </div>
                    <div class="flex items-center justify-between">
                        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-3xl" type="button" onClick={EmailRegistration}>
                            Registration
                        </button>

                    </div>
                </form>
            </div>
            <Footer></Footer>
        </>
    )
}

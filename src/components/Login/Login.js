import { signInWithEmailAndPassword } from '@firebase/auth';
import React, { useContext, useRef } from 'react'
import { Redirect, useHistory, useLocation } from 'react-router';
import FirebaseInit from '../Firebase/FirebaseInit';
import Footer from '../Footer/Footer'
import MenuBar from '../MenuBar/MenuBar'
import { UserContext } from '../../App';

export default function Login() {
    const { signInWithPopup, auth, GoogleProvider } = FirebaseInit();
    const userEmail = useRef();
    const userPass = useRef();
    const location = useLocation();
    const history = useHistory();
    const redirect_url = location.state?.from || '/dashboard';
    const [user, setUser] = useContext(UserContext);
    const HandleLogin = async () => {
        const email = userEmail.current.value;
        const pass = userPass.current.value;
        console.log(email, pass);
        signInWithEmailAndPassword(auth, email, pass)
            .then((userCredential) => {
                console.log(userCredential);
                const email = userCredential.user.email;
                const name = userCredential.user.name;
                let role;
                fetch(`http://localhost:5000/user/${email}`)
                    .then(res => res.json())
                    .then(res => {
                        role = res[0]?.role;
                        console.log(role);
                        const newUser = { email, name, role };
                        setUser(newUser);
                        history.push(redirect_url);
                    });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });
    }
    const GoogleLogin = () => {
        signInWithPopup(auth, GoogleProvider)
            .then(result => {
                const email = result.user.email;
                const name = result.user.displayName;
                const newUser = { email, name };
                console.log(newUser);

                //he may have previously created account


                fetch(`http://localhost:5000/user/${email}`)
                    .then(res => res.json())
                    .then(res => {
                        if (res[0]?.role !== undefined) {
                            newUser.role = res[0].role;
                            setUser(newUser);
                            console.log(newUser);
                            console.log(user);
                            history.push(redirect_url);
                        } else {
                            newUser.role = 'user';
                            console.log(newUser);
                            fetch('http://localhost:5000/addUser', {
                                method: 'POST',
                                headers: {
                                    'content-type': 'application/json'
                                },
                                body: JSON.stringify(newUser)
                            })
                                .then(res => res.json())
                                .then(data => { console.log(data); setUser(newUser) });
                            setUser(newUser);
                            history.push(redirect_url);
                        }
                        
                    });

            })
    }
    console.log(user);
    if (user?.email) {
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
                Login Panel
            </span>
            <div class="w-100 mt-4">
                <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div class="mb-4">
                        <label class="block text-gray-700 text-3xl font-bold mb-2 " for="username">
                            Email
                        </label>
                        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-3xl" id="Email" type="email" placeholder="Username" ref={userEmail} />
                    </div>
                    <div class="mb-6">
                        <label class="block text-gray-700 text-3xl font-bold mb-2" for="password">
                            Password
                        </label>
                        <input class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline text-3xl" id="password" type="password" placeholder="******************" ref={userPass} />
                        <p class="text-red-500 text-2xl italic">Please choose a password.</p>
                    </div>
                    <div class="flex items-center justify-between">
                        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-3xl" type="button" onClick={HandleLogin}>
                            Login
                        </button>

                    </div>
                </form>
                <button onClick={GoogleLogin} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-3xl'>Google Sign in</button>
            </div>
            <Footer></Footer>
        </>
    )
}

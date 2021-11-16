import React, { useContext, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { UserContext } from '../../App';
import logo from '../../images/clock.png'
import FirebaseInit from '../Firebase/FirebaseInit';


export default function MenuBar() {
    const [breadCumb, setBreadCumb] = useState(false);
    const { LogOut } = FirebaseInit();
    const [user, setUser] = useContext(UserContext);
    return (
        <>
            <nav
                class="
          flex flex-wrap
          items-center
          justify-between
          w-full
          py-4
          md:py-0
          px-4
          text-lg text-gray-900
          bg-green-300
        "
            >
                <div>
                    <NavLink to='/'>
                        <img src={logo} alt="Website Logo" className='h-12' />
                    </NavLink>
                    <svg className="h-6 w-6 cursor-pointer md:hidden block">
                    </svg>
                </div>
                <svg
                    xmlns="<http://www.w3.org/2000/svg>"
                    id="menu-button"
                    class="h-6 w-6 cursor-pointer md:hidden block"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    onClick={() => setBreadCumb(!breadCumb)}>
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4 6h16M4 12h16M4 18h16"
                    />
                </svg>
                {
                    breadCumb ? <div class="hidden w-full md:flex md:items-center md:w-auto " id="menu">
                        <ul
                            className="
              text-3xl text-gray-700
              pt-4
              md:flex
              md:justify-between
              md:pt-0"
                        >
                            <li>
                                <NavLink className="md:p-4 py-2 block hover:text-black-900" to='/'
                                >Home</NavLink
                                >
                            </li>
                            <li>
                                <NavLink className="md:p-4 py-2 block hover:text-black-900" to='/products'
                                >Products</NavLink
                                >
                            </li>
                            {
                                !user?.email ? <>
                                    <li>
                                        <NavLink className="md:p-4 py-2 block hover:text-black-900" to='/login'
                                        >Login</NavLink
                                        >
                                    </li>
                                    <li>
                                        <NavLink
                                            className="md:p-4 py-2 block hover:text-black-900 text-white-500"
                                            to='/register'
                                        >Sign Up</NavLink>
                                    </li></> : <>
                                    <li>
                                        <NavLink className="md:p-4 py-2 block hover:text-white-900" to='/dashboard'
                                        >Profile</NavLink
                                        >
                                    </li>
                                    <li>
                                        {user.role === 'user' ?
                                            <NavLink
                                                className="md:p-4 py-2 block hover:text-black-900 text-white-500"
                                                to='/MyOrder'
                                            >MyOrder</NavLink> :
                                            <NavLink className="md:p-4 py-2 block hover:text-black-900 text-white-500"
                                                to='/manageOrders'>Manage Orders</NavLink>
                                        }
                                    </li>
                                </>}
                            {user?.email ?<button className='bg-blue-500 hover:bg-blue-700 rounded  text-white' onClick={LogOut}>Log Out</button> : ''}
                            {(user.role!=='admin')?<NavLink
                                className="md:p-4 py-2 block hover:text-black-900 text-purple-500"
                                to='/pay'
                            >Pay</NavLink>:
                            <>
                            <NavLink
                                className="md:p-4 py-2 block hover:text-black-900 text-purple-500"
                                to='/manageProducts'
                            >Manage Products</NavLink></>
                            
                            }
                            
                            :
                        </ul>
                    </div> :
                        <div class=" w-full md:flex md:items-center md:w-auto " id="menu">
                            <ul
                                className="
              text-3xl text-gray-700
              pt-4
              md:flex
              md:justify-between
              md:pt-0"
                            >
                                <li>
                                    <NavLink className="md:p-4 py-2 block hover:text-black-900" to='/'
                                    >Home</NavLink
                                    >
                                </li>
                                <li>
                                    <NavLink className="md:p-4 py-2 block hover:text-black-900" to='/products'
                                    >Products</NavLink
                                    >
                                </li>
                                {
                                    !user?.email ? <>
                                        <li>
                                            <NavLink className="md:p-4 py-2 block hover:text-black-900" to='/login'
                                            >Login</NavLink>
                                        </li>
                                        <li>
                                            <NavLink
                                                className="md:p-4 py-2 block hover:text-black-900 text-white-500"
                                                to='/register'
                                            >Sign Up</NavLink>
                                        </li></> : <>
                                        <li>
                                            <NavLink className="md:p-4 py-2 block hover:text-white-900" to='/dashboard'
                                            >Profile</NavLink
                                            >
                                        </li>
                                        <li>
                                            {user.role === 'user' ?
                                                <NavLink
                                                    className="md:p-4 py-2 block hover:text-black-900 text-white-500"
                                                    to='/MyOrder'
                                                >MyOrder</NavLink> :
                                                <NavLink className="md:p-4 py-2 block hover:text-black-900 text-white-500"
                                                    to='/manageOrders'>Manage Orders</NavLink>
                                            }
                                        </li>
                                    </>}
                                {user?.email ? <button className='bg-blue-500 hover:bg-blue-700 rounded text-black-900 p-1 m-2' onClick={LogOut}>Log Out</button> : ''}
                                {(user.role!=='admin')?<NavLink
                                className="md:p-4 py-2 block hover:text-black-900 text-purple-500"
                                to='/pay'
                            >Pay</NavLink>:
                            <>
                            <NavLink
                                className="md:p-4 py-2 block hover:text-black-900 text-purple-500"
                                to='/manageProducts'
                            >Manage Products</NavLink></>
                            }
                            </ul>
                        </div>
                }
            </nav>
            
        </>
    )
}

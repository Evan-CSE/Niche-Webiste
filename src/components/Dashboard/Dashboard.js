import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../App';
import AdminMenu from '../AdminMenu/AdminMenu';
import Footer from '../Footer/Footer'
import MenuBar from '../MenuBar/MenuBar'

export default function Dashboard() {
    const [user, setUser] = useContext(UserContext);

    console.log(user.role);
    useEffect(() => {
        setUser(user);
    }, [user])
    return (
        <div>
            <MenuBar></MenuBar>
            {user?.role==='admin'?
                <AdminMenu></AdminMenu>
                :<></>}
            <h1 className='text-5xl text-blue-500 text-center'>
               {user?.role} Dashboard Page
            </h1>
            <div className="card border w-96 hover:shadow-none relative flex flex-col mx-auto shadow-lg m-5">
                
                <div className="profile w-full flex m-3 ml-4 text-white">
                    <img className="w-28 h-28 p-1 bg-white rounded-full" alt="" />
                    <div className="title mt-11 ml-3 font-bold flex flex-col">
                        <div className="text-3xl text-blue-900">Name: {user?.name}</div>
                        <div className="add font-semibold text-3xl text-blue-900">Email: {user?.email}</div>
                        <div className="text-3xl text-blue-900">Role: {user?.role}</div>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    )
}

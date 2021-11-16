import React, { useContext, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { Redirect } from 'react-router'
import { UserContext } from '../../App'

export default function AdminMenu() {
    const [user,setUser] =useContext(UserContext)
    
    useEffect(()=>{
        setUser(user)
        console.log(user)
    },[user])
    
    if(user?.role==="user"){
        return <Redirect to='/dashboard'/>
    }


    

    return (
        <>
        <div className='mt-3 bg-yellow-300 text-3xl text-center'>
            
            <NavLink to='/manageUser' className='text-red-700 hover:text-blue-400 p-2'>
                Manage User Authorization
            </NavLink>
            
            
        </div>
        </>
    )
}

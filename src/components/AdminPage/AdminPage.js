import React, { useContext, useEffect } from 'react'
import { Redirect } from 'react-router'
import { UserContext } from '../../App'
import AdminMenu from '../AdminMenu/AdminMenu'
import Footer from '../Footer/Footer'
import MenuBar from '../MenuBar/MenuBar'

export default function AdminPage() {
    const [user,setUser] = useContext(UserContext);

    useEffect(()=>{
        setUser(user);
    },[user])
    console.log(user)
    if(user?.role==='user'){
        return <Redirect to='/dashboard'/>
    }
    return (
        <div>
            <MenuBar></MenuBar>
            <AdminMenu></AdminMenu>
            <Footer></Footer>
        </div>
    )
}

import React, { useContext, useEffect, useState } from 'react'
import { Redirect } from 'react-router';
import { UserContext } from '../../App';
import Footer from '../Footer/Footer'
import MenuBar from '../MenuBar/MenuBar'
import ShowUser from '../ShowUser/ShowUser';

export default function ManageUser() {
    const [userList, setUserList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [user] = useContext(UserContext);
    useEffect(() => {
        fetch('http://localhost:5000/users')
            .then(data => data.json())
            .then(data => { setUserList(data); setLoading(false) });
    }, [])

    if(user.role==='user'){
        return <Redirect to='/dashboard'/>
    }

    return (
        <div>
            <MenuBar></MenuBar>
            {
                loading ? <div
                className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500 "
            ></div> :
                    <table className='text-green-700 p-2'>
                        {userList.map(singleUser => <ShowUser
                            singleUser={singleUser}
                            key={singleUser._id}
                        ></ShowUser>)}
                    </table>
            }
            <Footer></Footer>
        </div>
    )
}

import React, { useContext, useState } from 'react'
import { UserContext } from '../../App';

export default function ShowOrders(props) {
    const { userInfo } = props;
    const [status, setStatus] = useState(userInfo.status);
    const [user] = useContext(UserContext);
    const changeStatus = (e) => {
        setStatus(e.target.value);
    }


    const cancelPlan = (tid) => {
        const choice = window.confirm('Do you really want to cancel order?');
        if (choice) {
            fetch(`http://localhost:5000/deleteOrder/${userInfo._id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.deleteCount > 0) {
                        alert('Deletion Successfull');
                    }
                })
        }
    }



    const approvePlan = (data) => {
        const url = `http://localhost:5000/updateStatus/${data._id}`;
        console.log(data._id)
        const newStatus = { ...data };
        newStatus['status'] = 'approved';
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newStatus)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    alert('Update Successful');
                    data.status = 'approved';
                }
            })
    }



    return (
        <tr className=' text-3xl text-blue-600'>
            <td className='p-2'>
                {userInfo.email}
            </td>
            <td className='p-2'>
                {userInfo.transactionId}
            </td>
            <td className='p-2'>
                {userInfo.pid}
            </td>
            <td className='p-2'>
                {status}
            </td>
            <td>
                <button onClick={() => cancelPlan(userInfo._id)} className='bg-red-600 text-white p-2 border'>
                    Cancel
                </button>
                {status !== 'approved' && user.role === 'admin' ? <button className='bg-green-600 text-white p-2 border' onClick={() => approvePlan(userInfo)}>
                    Approve
                </button> : ''
                }
            </td>
        </tr>
    )
}

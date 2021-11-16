import React, { useState } from 'react'

export default function showMyOrder(props) {
    const { userInfo } = props;



    const cancelPlan = (tid) => {
        const choice = window.confirm('Do you really want to cancel order?');
        if (choice) {
            fetch(`http://localhost:5000/deleteOrder/${userInfo._id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if(data.deleteCount>0){
                        alert('Deletion Successfull');
                    }
                })
        }
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
            <td>
                <button onClick={() => cancelPlan(userInfo._id)} className='bg-red-600 text-white p-2 border'>
                    Cancel
                </button>
            </td>
        </tr>
    )
}

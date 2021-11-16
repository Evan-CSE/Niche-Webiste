import React from 'react'

export default function ShowUser(props) {
    const { singleUser } = props;
    const approvePlan = (data) => {
        const url = `http://localhost:5000/updateUser/${data._id}`;
        console.log(data._id)
        const newStatus = { ...data };
        newStatus['role'] = 'admin';
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
                    data.role = 'admin';
                }
            })
    }

    const MakeUser = (data) => {

        const url = `http://localhost:5000/updateUser/${data._id}`;
        console.log(data._id)
        const newStatus = { ...data };
        newStatus['role'] = 'user';
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
                    data.role = 'user';
                }
            })
    }

    return (
        <div>
            <tr className=' text-3xl text-blue-600'>
                <td className='p-2'>
                    {singleUser.email}
                </td>
                <td className='p-2'>
                    {singleUser.name}
                </td>
                <td className='p-2'>
                    {singleUser.role}
                </td>
                <td>

                    {singleUser.role === 'user' ? <button className='bg-green-600 text-white p-2 border' onClick={() => approvePlan(singleUser)}>
                        Make Admin
                    </button> : ''}
                    {singleUser.role === 'admin' ? <button className='bg-red-600 text-white p-2 border' onClick={() => MakeUser(singleUser)}>
                        Remove Admin
                    </button> : ''}

                </td>
            </tr>
        </div>
    )
}

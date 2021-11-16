import React from 'react'

export default function ReviewBox(props) {
    const { name, userComment, userRating } = props.obj;
    return (
        <div className='shadow-lg border border-blue-400 m-3 p-3 w-100'>
            <h3 className='text-3xl'>
                Name: {name}
            </h3>
            <h3 className='text-3xl'>
                Comment: {userComment}
            </h3>
            <h3 className='text-3xl'>
                <i class="fas fa-star text-yellow-400"> <span className='text-red-400'>{userRating}</span></i>
            </h3>
        </div>
    )
}

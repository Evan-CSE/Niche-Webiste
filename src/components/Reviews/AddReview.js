import React, { useContext, useRef } from 'react'
import { Redirect } from 'react-router';
import { UserContext } from '../../App'
import Footer from '../Footer/Footer';
import MenuBar from '../MenuBar/MenuBar';

export default function AddReview() {
    const [user] = useContext(UserContext);
    const comment = useRef();
    const rating = useRef();
    if (user.role === 'admin') {
        return <Redirect to='/dashboard' />
    }

    const handleForm = (e) => {
        e.preventDefault();
        const {email} = user;
        const {name} = user;
        const userComment = comment.current.value;
        const userRating = rating.current.value;
        const newComment = { email, name, userComment, userRating };
        console.log(newComment);
        fetch('http://localhost:5000/addReview', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newComment)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    alert("Thanks for your feedback");
                }
            })
        
    }

    return (
        <div>
            <MenuBar></MenuBar>
            <h1 className='text-5xl text-center text-red-500'>
                Enter your review
            </h1>
            <div className='flex justify-center'>
                <form className='border shadow-lg m-3 p-3' style={{ width: '50%' }}>
                    <textarea placeholder="Type your review" className='border-b border-blue-400 text-3xl' ref={comment}></textarea> <br />
                    <input type="number" max='5' min='0' placeholder='Rating' className='border-b border-blue-400 p-3 text-3xl' ref={rating}/>  <br />
                    <input type="submit" className='border bg-yellow-400 p-3 text-3xl mt-2' onClick={handleForm} />
                </form>
            </div>
            <Footer></Footer>
        </div>
    )
}

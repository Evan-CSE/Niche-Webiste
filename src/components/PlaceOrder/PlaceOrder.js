import React, { useContext, useState, useRef, useEffect } from 'react'
import { useParams } from 'react-router'
import { NavLink } from 'react-router-dom';
import { UserContext } from '../../App';
import Footer from '../Footer/Footer';
import MenuBar from '../MenuBar/MenuBar';

export default function PlaceOrder() {
    const id = useParams('id')['id'];
    const [user] = useContext(UserContext);
    const [name, setName] = useState(user.name);
    const address = useRef();
    const tid = useRef();
    const { email } = user;
    const [productDetails, setProductDetails] = useState([]);
    const [loading, setLoading] = useState(true);
    const handleForm = (e) => {
        alert('Please wait for our admins approval');
        e.preventDefault();
    }


    const changeName = (e) => {
        setName(e.target.value);
        const pid = id;
        const transactionId = tid.current.value;
        const userAddress = address.current.value;
        const { email } = user;
        const newObj = { name, email, pid, transactionId, userAddress };
        console.log(newObj);
    }


    const formSubmit = (e) => {
        const pid = id;
        const transactionId = tid.current.value;
        const userAddress = address.current.value;
        const { email } = user;
        const newObj = { name, email, pid, transactionId, userAddress };
        newObj.status = 'pending';
        console.log(newObj);
        fetch('http://localhost:5000/addOrders', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newObj)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId !== undefined) alert('Insertion Successful.Wait for admin approval');
                else {
                    alert("Something went wrong. Please try again.")
                }
                e.target.reset();
            });
        e.preventDefault();
    }



    useEffect(() => {
        console.log('inside')
        fetch(`http://localhost:5000/product/${id}`)
            .then(res => res.json())
            .then(data => {
                setProductDetails(data);
                setLoading(false);
                console.log('ok')
                console.log(data)
            })
    }, [])

    return (
        <>
            <MenuBar></MenuBar>
            <div className='flex justify-evenly'>
                <div className='shadow-lg'>
                    {/* details of the product */}
                    {
                        loading ? <h1 className='text-5xl'>Loading</h1> :
                            <>
                                {

                                    productDetails.map(data => <div className="max-w-sm rounded overflow-hidden shadow-lg m-2">
                                        <img className="w-full" style={{ height: '300px' }} src={data.img} alt="Product" />
                                        <div className="px-6 py-4">
                                            <div className="font-bold text-4xl mb-2">{data.name}</div>
                                            <p className="text-gray-700 text-3xl">
                                                {data.description}
                                            </p>
                                        </div>
                                        <div className="px-6 pt-4 pb-2">
                                            <span className='text-gray-700 text-3xl'>Price:{data.price}tk</span> </div>
                                        <div className="px-6 pt-4 pb-2">

                                        </div>
                                    </div>
                                    )
                                }
                            </>
                    }
                </div>
                <div className='flex justify-center m-2'>
                    <form onSubmit={formSubmit} className='shadow-lg p-4' >
                        <div className='flex-col align-items'>
                            <h1 className='text-3xl'> Name: </h1>
                            <div>
                                <input type="text" value={name} className='border-b border-blue-500 m-2 shadow-lg text-3xl' onChange={changeName} />
                            </div>
                        </div>
                        <div className='flex-col align-items'>
                            <h1 className='text-3xl'> Email: </h1>
                            <div>
                                <input type="email" value={email} className='border-b border-blue-500 m-2 shadow-lg text-3xl' />
                            </div>
                        </div>
                        <div className='flex-col align-items'>
                            <h1 className='text-3xl'> Product Id: </h1>
                            <div>
                                <input type="text" value={id} className='border-b border-blue-500 m-2 shadow-lg text-3xl' />
                            </div>
                        </div>
                        <div className='flex-col align-items'>
                            <h1 className='text-3xl'> Address of the Recipient: </h1>
                            <div>
                                <textarea type="text" className='border p-2 border-blue-500 m-2 shadow-lg text-3xl' placeholder='Address' ref={address}>
                                </textarea>
                            </div>
                        </div>
                        <div className='flex-col align-items'>
                            <h1 className='text-3xl'> Transaction Id: </h1>
                            <div>
                                <input type="text" className='border-b border-blue-500 m-2 shadow-lg text-3xl' placeholder='Transaction Id' ref={tid} />
                            </div>
                        </div>
                        <input type='submit' value='Confirm' className='border bg-yellow-300 p-2 border-blue-500 m-2 shadow-lg text-3xl' />
                    </form>
                </div>
            </div>
            <Footer></Footer>
        </>
    )
}

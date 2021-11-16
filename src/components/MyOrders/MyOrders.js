import React, { useContext, useEffect, useState } from 'react'
import { Redirect } from 'react-router';
import { UserContext } from '../../App'
import Footer from '../Footer/Footer'
import MenuBar from '../MenuBar/MenuBar'
import ShowOrders from '../ShowOrders/ShowOrders';

export default function MyOrders() {
    const [user] = useContext(UserContext);
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:5000/myOrder/${user.email}`)
            .then(res => res.json())
            .then(data => setProducts(data));
        setIsLoading(false);
        console.log(products)
    }, [])




    console.log(user.role);
    if (user.role === 'admin') {
        <Redirect to='/dashboard' />
    }
    return (
        <div>
            <MenuBar></MenuBar>
            <h1 className='text-5xl text-center text-red-600'>
                {
                    (user.role === undefined) ?
                        <div
                            className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500 "
                        ></div>
                        :
                        (user.role === 'admin') ?
                            <Redirect to='/dashboard' />
                            : <div>
                                <h1 className='text-center text-5xl'> Here is your Order Summary
                                </h1>
                                {
                                    products.map(data =>
                                        <ShowOrders key={data._id}
                                        userInfo={data}>
                                        </ShowOrders>
                                    )
                                }
                            </div>

                }
            </h1>
            <Footer></Footer>
        </div>
    )
}

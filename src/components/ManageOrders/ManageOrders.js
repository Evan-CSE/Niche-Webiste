import React, { useContext, useEffect, useState } from 'react'
import { Redirect } from 'react-router'
import { UserContext } from '../../App'
import AdminMenu from '../AdminMenu/AdminMenu'
import Footer from '../Footer/Footer'
import MenuBar from '../MenuBar/MenuBar'
import ShowOrders from '../ShowOrders/ShowOrders'

export default function ManageOrders() {
    const [user, setUser] = useContext(UserContext);
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:5000/orders')
            .then(res => res.json())
            .then(data => setProducts(data));
        setIsLoading(false);
        console.log(products)
    }, [])




    

    return (
        <div>
            <MenuBar></MenuBar>
            {
                user.role === undefined ? <div
                    className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500 "
                ></div> :
                    user.role === 'admin' ? <><AdminMenu></AdminMenu>
                        <h1 className='text-center text-5xl text-red-500'>
                            All available orders
                        </h1></> :
                        <Redirect to='/dashboard' />
            }


            {isLoading ? <div
                className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500 "
            ></div>
                : <>
                    <table className='text-green-700 p-2'>
                        <tr>
                            <th className='text-5xl '>
                                User Email
                            </th>
                            <th className='text-5xl'>
                                Transaction Id
                            </th>
                            <th className='text-5xl'>
                                Product Id
                            </th>
                            <th className='text-5xl'>
                                Status
                            </th>
                        </tr>
                        {
                            products.map((data, id) => <ShowOrders
                                key={id}
                                userInfo={data}
                            ></ShowOrders>)}
                    </table></>
            }

            <Footer></Footer>
        </div>
    )
}

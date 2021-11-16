import React, { useEffect, useState } from 'react'
import Cards from '../Cards/Cards';
import Footer from '../Footer/Footer'
import MenuBar from '../MenuBar/MenuBar'

export default function Products() {
    const [products, setProducts] = useState([]);
    const [isLoading,setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        fetch('http://localhost:5000/products')
            .then(res => res.json())
            .then(data => { setProducts(data); setIsLoading(false) });
    }, [])


    return (
        <>
            <MenuBar></MenuBar>
            <div className="text-7xl text-blue-700 text-center hover:text-green-900">
                Our latest Products
            </div>
            <div className='grid grid-cols-3 gap-4'>
                {
                    isLoading ? <div class="flex justify-center items-center">
                        <div
                            className="
  animate-spin
  rounded-full
  h-32
  w-32
  border-t-2 border-b-2 border-purple-500
"
                        ></div>
                    </div> :
                        products.map((item) =>
                            <Cards
                                key={item._id}
                                product={item}
                            ></Cards>
                        )
                }
            </div>
            <Footer></Footer>
        </>
    )
}

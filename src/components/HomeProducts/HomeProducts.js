import React, { useEffect, useState } from 'react'
import Cards from '../Cards/Cards';

export default function HomeProducts() {
    const [productList, setProductList] = useState([])
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:5000/products')
            .then(res => res.json())
            .then(data => { setProductList(data); setIsLoading(false) });
    }, [])


    return (
        <div>
            <div className="text-7xl text-blue-700 text-center hover:text-green-900">
                Our latest Products
            </div>
            <div className='grid grid-cols-1 md:grid-cols-3 border shadow-lg'>
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
                        productList.slice(0, 6).map((product) =>
                            <Cards
                                key={product._id}
                                product={product}
                            ></Cards>
                        )
                }
            </div>
        </div>
    )
}

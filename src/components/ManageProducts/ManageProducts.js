import React, { useContext, useEffect, useRef, useState } from 'react'
import { Redirect } from 'react-router';
import { UserContext } from '../../App';
import AdminMenu from '../AdminMenu/AdminMenu'
import Cards from '../Cards/Cards';
import Footer from '../Footer/Footer'
import MenuBar from '../MenuBar/MenuBar'


export default function ManageProducts() {
    const productName = useRef();
    const productPrice = useRef();
    const productDescription = useRef();
    const productImage = useRef();
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [update,setUpdate ] = useState(false);
    const [user, setUser] = useContext(UserContext);
    useEffect(() => {
        console.log('line 16')
        setIsLoading(true);
        fetch('http://localhost:5000/products')
            .then(res => res.json())
            .then(data => {
                console.log('inside');
                setProducts(data);
                setIsLoading(false)
            }
            );
    }, [update])

    if(user.role==='user')
    {
        return <Redirect exact to='/dashboard'/>
    }
    console.log(products[0]);
    const handleForm = (e) => {
        setUpdate(true);
        const [name, description, price, img] = [productName.current.value, productDescription.current.value, productPrice.current.value, productImage.current.value];
        console.log(name, description, img, price);
        const newProduct = { name, description, img, price };
        fetch('http://localhost:5000/addProduct', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newProduct)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    alert("Product Successfully Inserted to database");
                    e.target.reset();
                    setUpdate(false);
                }
            })
        e.preventDefault();
    }
    return (
        <div>
            <MenuBar></MenuBar>
            <AdminMenu></AdminMenu>
            <div className='mt-4 flex flex-col justify-around md:flex-row'>
                <div className>
                    <h1 className='text-5xl text-red-600 text-center'>
                        All Products
                    </h1>
                    {isLoading ? <div class="flex justify-center items-center">
                        <div
                            className="
      animate-spin
      rounded-full
      h-32
      w-32
      border-t-2 border-b-2 border-purple-500
    "
                        ></div>
                    </div>
                        : <div className='grid grid-cols-1 md:grid-cols-3 border shadow-lg'>
                            {
                                products.map(item =>
                                    <Cards
                                        key={item._id}
                                        product={item}
                                    ></Cards>
                                )
                            }
                        </div>}

                </div>
                <form className='shadow-2xl border p-3' onSubmit={handleForm}>
                    <h1 className='text-5xl text-red-600 text-center'>
                        Add New Product
                    </h1>
                    <input type="text" ref={productName} placeholder='Product Name' className='border-b border-blue-400 text-4xl m-2' /> <br />
                    <input type="number" ref={productPrice} placeholder='Product Price' className='border-b border-blue-400 text-4xl m-2' /> <br />
                    <input type="text" placeholder='Product Image Url' ref={productImage} className='border-b border-blue-400 text-4xl m-2' /> <br />
                    <textarea ref={productDescription} cols="30" rows="10" placeholder='Product Details' className='border border-blue-400 text-4xl m-2'></textarea> <br />
                    <input type="submit" value="Add Product" className='border rounded-lg p-2 text-3xl bg-green-400' />
                </form>
            </div>

            <Footer></Footer>
        </div>
    )
}

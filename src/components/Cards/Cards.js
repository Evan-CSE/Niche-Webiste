import React from 'react'
import { NavLink } from 'react-router-dom';

export default function Cards(props) {
    console.log(props)
    const {name, description, img, price,_id} = props.product;
    console.log(name,description)
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg m-2">
            <img className="w-full" style={{height:'300px'}} src={img} alt="Product"/>
            <div className ="px-6 py-4">
            <div className ="font-bold text-4xl mb-2">{name}</div>
            <p className ="text-gray-700 text-3xl">
                {description}
            </p>
            </div>
            <div className ="px-6 pt-4 pb-2">
            <span className='text-gray-700 text-3xl'>Price:{price}tk</span> </div>
            <div className ="px-6 pt-4 pb-2">
            <button className ="inline-block bg-gray-200 rounded-full px-3 py-1 text-3xl font-semibold text-gray-700 mr-2 mb-2">
               <NavLink exact to={`/placeOrder/${_id}`}> Buy Now </NavLink>
            </button>
            </div>
        </div>
    )
}

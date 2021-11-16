import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export default function Footer() {
    return (
        <footer class="footer bg-gray-200 relative pt-1 border-b-2 border-blue-700 mt-4">
            <div class="container mx-auto px-6">

                <div class="sm:flex sm:mt-8">
                    <div class="mt-8 sm:mt-0 sm:w-full sm:px-8 flex flex-col md:flex-row justify-between">
                        <div class="flex flex-col">
                            <span class="font-bold text-gray-700 uppercase mb-2 text-4xl">Contact Us</span>
                            <i class="fas fa-phone-square-alt text-3xl"></i>
                            <span className='text-3xl '>
                                +8801821484988
                            </span>
                            <span class="my-2 text-3xl"><i class="fas fa-map-marker-alt"></i>5th Floor,Azmi Tower, Dhanmondi 32,Dhaka</span>
                            </div>
                        <div class="flex flex-col">
                            <span class="font-bold text-gray-700 uppercase mt-4 md:mt-0 mb-2 text-4xl">Our Policy</span>
                            <span class="my-2"><a href="#" class="text-blue-700 text-md hover:text-blue-500">Terms & Condition</a></span>
                            <span class="my-2"><a href="#" class="text-blue-700  text-md hover:text-blue-500">Liscence</a></span>
                            <span class="my-2"><a href="#" class="text-blue-700 text-md hover:text-blue-500">Agreement</a></span>
                        </div>
                        <div class="flex flex-col">
                            <span class="font-bold text-gray-700 uppercase mt-4 md:mt-0 mb-2 text-4xl">Subscribe to our newsletter</span>
                            <input type="email" /> 
                            <button class="bg-green-500 mt-2">Subscribe</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container mx-auto px-6">
                <div class="mt-16 border-t-2 border-gray-300 flex flex-col items-center">
                    <div class="sm:w-2/3 text-center py-6">
                        <p class="text-sm text-blue-700 font-bold mb-2 text-3xl">
                        Copyright © 2021  evanshareef@gmail.com
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

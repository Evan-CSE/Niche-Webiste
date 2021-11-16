import React, { useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'



// import Swiper core and required modules
import SwiperCore, {
    Navigation
} from 'swiper';
import { NavLink } from 'react-router-dom';

SwiperCore.use([Navigation]);

export default function Carousel() {
    return (
        <>
            <Swiper navigation={true} className="mySwiper">
                <SwiperSlide><img src="https://m.media-amazon.com/images/I/71-z8M-AjtS._AC_UL1500_.jpg" alt="Men's Watch" className='mx-auto' width='50%' style={{height:'800px'}} />
                </SwiperSlide>
                <SwiperSlide><img src="https://images.unsplash.com/photo-1615368144592-44708889c926?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bWVuJTIwd2F0Y2h8ZW58MHx8MHx8&ixlib=rb-1.2.1" alt="Men's Watch" width='100%' style={{height:'800px'}} />
                </SwiperSlide>
                <SwiperSlide><img src="
                https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8cKUUDfZPuRHezfA6REz-pijA13qBub_Lmg&usqp=CAU" alt="Men's Watch" width='50%' className='mx-auto' style={{height:'800px'}} />
                </SwiperSlide>
            </Swiper>
            <NavLink to='/products'>
                <div className=" hover:text-green-900 text-5xl text-red-600 text-right">Explore more</div>
            </NavLink>
        </>
    )
}

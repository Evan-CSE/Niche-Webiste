import React from 'react'
import Carousel from '../Carousel/Carousel'
import Events from '../Events/Events'
import Footer from '../Footer/Footer'
import HomeProducts from '../HomeProducts/HomeProducts'
import MenuBar from '../MenuBar/MenuBar'
import Reviews from '../Reviews/Reviews'


export default function Home() {
    return (
        <div>
            <MenuBar></MenuBar>
            <Carousel></Carousel>
            <HomeProducts></HomeProducts>
            <Events></Events>
            <Reviews></Reviews>
            <Footer></Footer>
        </div>
    )
}

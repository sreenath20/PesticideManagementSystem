import React from 'react'

import Testimonials from '../components/misc/Testimonials'
import Pricing from '../components/misc/Pricing'
import Header from '../components/misc/Header'
import MenuBar from '../components/navigations/MenuBar'
import Footer from '../components/navigations/Footer'
import './Home.css'
import star from '../images/star.gif'

const Home = () => {
    return (
        <React.Fragment>
            <MenuBar />
            <Header />
            <marquee style={{ color: 'red', fontSize: '1em' }} vspace = "20"><img src={star} width="20px" height="20px"/>For initial consultation get 40% discount in consultation fee!!!</marquee>
            <Pricing />
            <Testimonials />
            <Footer />
        </React.Fragment>
    )
}

export default Home;
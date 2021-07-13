import React, { useRef, useEffect } from 'react';
import { useLocation, Switch } from 'react-router-dom';
import Footer from './Footer/Footer';
import Home from './HomePage/Home';
import Navbar from './Navbar';
import './index.css';

// import './assets/scss/style.scss';

// Views

function LandingPage() {
    return (
        <>
            <Navbar />
            <Home />
            <Footer />
        </>
    );
}

export default LandingPage;

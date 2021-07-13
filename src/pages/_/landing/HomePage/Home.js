import React from 'react';
import HeroSection from '../HeroSection';
import HeroSectionTwo from '../HeroSectionTwo';

import { homeObjOne, homeObjTwo } from './Data';

function Home() {
    return (
        <>
            <HeroSection {...homeObjOne} />
            <HeroSectionTwo {...homeObjTwo} />
        </>
    );
}

export default Home;

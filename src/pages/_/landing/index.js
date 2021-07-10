import React, { useRef, useEffect } from 'react';
import { useLocation, Switch } from 'react-router-dom';
import ScrollReveal from './utils/ScrollReveal';
import LayoutDefault from './layouts/LayoutDefault';

// Views
import Home from './views/Home';

function LandingPage() {
    const childRef = useRef();

    useEffect(() => {
        document.body.classList.add('is-loaded');
        document.body.classList.add('has-animations');
        childRef.current.init();
    }, []);
    return (
        // <div />
        <ScrollReveal ref={childRef}>
            {/* <Switch>
                <AppRoute exact path="/landing" component={Home} layout={LayoutDefault} />
            </Switch> */}
            <LayoutDefault>
                <Home />
            </LayoutDefault>
        </ScrollReveal>
    );
}

export default LandingPage;

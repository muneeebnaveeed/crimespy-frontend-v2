import React, { useRef, useEffect } from 'react';
import { useLocation, Switch } from 'react-router-dom';
import ReactGA from 'react-ga';
import AppRoute from './utils/AppRoute';
import ScrollReveal from './utils/ScrollReveal';
import LayoutDefault from './layouts/LayoutDefault';

// Views
import Home from './views/Home';

ReactGA.initialize(process.env.REACT_APP_GA_CODE);

const trackPage = (page) => {
    ReactGA.set({ page });
    ReactGA.pageview(page);
};

function LandingPage() {
    const childRef = useRef();
    const location = useLocation();

    useEffect(() => {
        const page = location.pathname;
        document.body.classList.add('is-loaded');
        childRef.current.init();
        trackPage(page);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]);
    return (
        // <div />
        <ScrollReveal ref={childRef}>
            <Switch>
                <AppRoute exact path="/landing" component={Home} layout={LayoutDefault} />
            </Switch>
        </ScrollReveal>
    );
}

export default LandingPage;

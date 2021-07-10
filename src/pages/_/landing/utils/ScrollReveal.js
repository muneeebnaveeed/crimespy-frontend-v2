/* eslint-disable react/display-name */
import React, { useState, useEffect, useImperativeHandle } from 'react';

import { throttle } from 'lodash';

const ScrollReveal = React.forwardRef((props, ref) => {
    const [viewportHeight, setViewportheight] = useState(window.innerHeight);
    const [revealEl, setRevealel] = useState([]);

    const checkComplete = () => revealEl.length <= document.querySelectorAll('[class*=reveal-].is-revealed').length;

    const elementIsVisible = (el, offset) => el.getBoundingClientRect().top <= viewportHeight - offset;

    const revealElements = () => {
        if (checkComplete()) return;
        for (let i = 0; i < revealEl.length; i++) {
            const el = revealEl[i];
            const revealDelay = el.getAttribute('data-reveal-delay');
            const revealOffset = el.getAttribute('data-reveal-offset') ? el.getAttribute('data-reveal-offset') : '200';
            const listenedEl = el.getAttribute('data-reveal-container')
                ? el.closest(el.getAttribute('data-reveal-container'))
                : el;
            if (elementIsVisible(listenedEl, revealOffset) && !el.classList.contains('is-revealed')) {
                if (revealDelay && revealDelay !== 0) {
                    setTimeout(function () {
                        el.classList.add('is-revealed');
                    }, revealDelay);
                } else {
                    el.classList.add('is-revealed');
                }
            }
        }
    };

    useImperativeHandle(ref, () => ({
        init() {
            setRevealel(document.querySelectorAll('[class*=reveal-]'));
        },
    }));

    const handleScroll = throttle(() => {
        // eslint-disable-next-line no-use-before-define
        handleListeners();
        revealElements();
    }, 30);

    const handleResize = throttle(() => {
        setViewportheight(window.innerHeight);
    }, 30);

    useEffect(() => {
        if (typeof revealEl !== 'undefined' && revealEl.length > 0) {
            if (!checkComplete()) {
                window.addEventListener('scroll', handleScroll);
                window.addEventListener('resize', handleResize);
            }
            revealElements();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [revealEl]);

    const handleListeners = () => {
        if (!checkComplete()) return;
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleResize);
    };

    useEffect(() => {
        handleListeners();
        revealElements();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [viewportHeight]);

    return <>{props.children}</>;
});

export default ScrollReveal;

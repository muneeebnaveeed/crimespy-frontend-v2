import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './Button';
import './HeroSectionTwo.css';

function HeroSectionTwo({
    lightBg,
    topLine,
    lightText,
    lightTextDesc,
    headline,
    description,
    buttonLabel,
    imgO,
    alt,
    imgStart,
}) {
    return (
        <>
            <div className={lightBg ? 'home__hero-section' : 'home__hero-section darkBg'}>
                <div className="container">
                    <div
                        className="row home__hero-row"
                        style={{
                            display: 'flex',
                            flexDirection: imgStart === 'start' ? 'row-reverse' : 'row',
                        }}
                    >
                        <div className="col1">
                            <div className="home__hero-text-wrapper">
                                <h1 className={lightText ? 'heading' : 'heading dark'}>{headline}</h1>
                                <p className={lightTextDesc ? 'home__hero-subtitle' : 'home__hero-subtitle dark'}>
                                    {description}
                                </p>
                                <Link to="/about">
                                    {/* <Button buttonSize="btn--wide" buttonColor="blue">
                                        {buttonLabel}
                                    </Button> */}
                                    <button
                                        className="stl"
                                        style={{
                                            padding: '12px 115px',
                                            fontSize: '20px',
                                            border: 'none',
                                            color: '#fff',
                                            backgroundColor: '#276afb',
                                        }}
                                    >
                                        {buttonLabel}
                                    </button>
                                </Link>
                            </div>
                        </div>
                        <div className="col1">
                            <div className="home__hero-img-wrapper">
                                <img src={imgO} alt={alt} className="home__hero-img" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default HeroSectionTwo;

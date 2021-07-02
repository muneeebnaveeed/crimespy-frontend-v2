import React from 'react';
import Button from './Button';

function Error({ onClick = null, ...props }) {
    return (
        <div
            className="position-absolute d-flex flex-column justify-content-center align-items-center"
            style={{
                backgroundColor: 'rgba(255,255,255,0.4)',
                width: '100%',
                height: '100%',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%,-50%)',
            }}
        >
            <p className="m-0">Unable to fetch {props.for}</p>
            <Button color="primary" size="sm" className="px-4" onClick={onClick}>
                Retry
            </Button>
        </div>
    );
}

export default Error;

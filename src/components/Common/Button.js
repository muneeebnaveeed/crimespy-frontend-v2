import React, { forwardRef } from 'react';
import { Button as ReactstrapButton, Spinner } from 'reactstrap';
// import classnames from 'classnames';

const Button = forwardRef(({ children, className = '', w = 'auto', h = '38.1px', loading, ...rest }, ref) => (
    <ReactstrapButton
        innerRef={ref}
        style={{ width: w, height: h }}
        className={`position-relative ${className}`}
        {...rest}
    >
        {loading ? (
            <Spinner
                // className={classnames('position-absolute button-style', {
                //     visible: loading,
                //     invisible: !loading,
                // })}
                size="sm"
            />
        ) : (
            <span
            // className={classnames({
            //     invisible: loading,
            //     visible: !loading,
            // })}
            >
                {children}
            </span>
        )}
    </ReactstrapButton>
));

export default Button;

import React from "react";
import { Spinner as ReactstrapSpinner } from "reactstrap";

function Spinner() {
    return (
        <div
            className="position-absolute d-flex justify-content-center align-items-center"
            style={{
                backgroundColor: "rgba(255,255,255,0.4)",
                width: "100%",
                height: "100%",
                left: "50%",
                top: "50%",
                transform: "translate(-50%,-50%)",
            }}
        >
            <ReactstrapSpinner size="sm" color="primary" />
        </div>
    );
}

export default Spinner;

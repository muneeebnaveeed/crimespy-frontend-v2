import React, { useCallback } from "react";

function Action({ active, ...props }) {
    return (
        <div role="button" className="post__action-button mr-1" style={active ? { color: "#5664d2" } : {}}>
            {props.children}
        </div>
    );
}

function Actions(props) {
    return (
        <div className="d-flex px-3">
            <div className="d-flex mr-4">
                <Action active>
                    <i class="fa fa-arrow-up" />
                </Action>
                <p>21</p>
            </div>
            <div className="d-flex">
                <Action>
                    <i class="fa fa-arrow-down" />
                </Action>
                <p>1</p>
            </div>
        </div>
    );
}

export default Actions;

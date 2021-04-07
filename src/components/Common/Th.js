import React from "react";

function Th({ className = "", ...props }) {
  return (
    <th className={`vertical-align-middle ${className}`} {...props}>
      {props.children}
    </th>
  );
}

export default Th;

import React from "react";

import ReactSelect from "react-select";

const colourOptions = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

const customStyles = {
  control: (provided) => ({
    ...provided,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderColor: "#ced4da",
    boxShadow: 0,
    "&:hover": {
      borderColor: "#ced4da",
    },
  }),
};

export default function Select({ className = "", noOptionsMessage, ...props }) {
  return (
    <ReactSelect
      className={`flex-1 ${className}`}
      classNamePrefix="select"
      isClearable={false}
      isRtl={false}
      isSearchable
      styles={customStyles}
      noOptionsMessage={() => noOptionsMessage}
      {...props}
      //   defaultValue={colourOptions[0]}
      //   isDisabled={isDisabled}
      //   isLoading={isLoading}
      // name="color"
      // options={colourOptions}
      // placeholder="Select Category"
    />
  );
}

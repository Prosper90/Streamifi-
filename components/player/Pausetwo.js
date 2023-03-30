import React from "react";

export default function Play(props) {
  const { handleClick } = props;
  
  return (
    <div className="cursor-pointer" onClick={() => handleClick()} >
        <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-6 h-6"
        >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 5.25v13.5m-7.5-13.5v13.5"
        />
        </svg>
    </div>   
  );
}

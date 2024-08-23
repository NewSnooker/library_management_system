import React from "react";

export default function Heading({ title ,className }) {
  return (
      <h2 className={`text-xl text-center sm:text-left font-semibold mb-3 sm:mb-0 ${className}`} >{title}</h2>
  );
}
  
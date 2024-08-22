import React from "react";
import { Button } from "../ui/button";

export default function SubmitButton({ buttonTitle, className }) {
  return (
    <div className={`sm:col-span-1 ${className}`}>
      <Button type="submit" className={` ${className} `}>
        <span> {buttonTitle}</span>
      </Button>
    </div>
  );
}

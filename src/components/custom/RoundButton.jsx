import React from "react";
import { twMerge } from "tailwind-merge";

function RoundButton({ children, className, disabled, ...props }) {
  return (
    <div className="flex items-center justify-center">
      <button
        className={twMerge(
          "text-white font-bold w-10 h-10 rounded-full flex items-center justify-center",
          className
        )}
        {...props}
        disabled={disabled}
      >
        {children}
      </button>
    </div>
  );
}

export default RoundButton;

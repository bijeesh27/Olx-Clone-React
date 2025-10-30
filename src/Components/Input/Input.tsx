import React from "react";
import type { ChangeEvent } from "react";

interface InputProps {
  setInput: (value: string) => void;
  placeholder: string;
}

const Input: React.FC<InputProps> = ({ setInput, placeholder }) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  return (
    <div className="pt-2 w-full relative">
      <input
        onChange={handleChange}
        type="text"
        id="title"
        className="w-full border-2 border-black rounded-md p-3 pt-4 pb-2 focus:outline-none peer"
        required
      />
      <label
        htmlFor="title"
        className="absolute pl-1 pr-1 left-2.5 top-0 bg-white text-sm peer-focus:top-0 peer-focus:text-sm transition-all duration-200 peer-placeholder-shown:text-base peer-placeholder-shown:top-5"
      >
        {placeholder}
      </label>
    </div>
  );
};

export default Input;

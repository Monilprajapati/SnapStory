import React from "react";

interface ButtonProps {
  text: string;
  onClick: () => void;
}

const Button = ({ text, onClick }: ButtonProps) => {
  return (
    <button className="hidden md:flex text-base font-plusSans bg-black py-2 lg:py-3 px-6 rounded-full font-medium text-white transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp">
      {text}
    </button>
  );
};

export default Button;

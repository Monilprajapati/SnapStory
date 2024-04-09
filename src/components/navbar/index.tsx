"use client";

import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose, IoSearch } from "react-icons/io5";
import Link from "next/link";
import Button from "@/components/Button";
import { pagesRoute } from "@/utils/index";
import { MdEditNote } from "react-icons/md";
import { useState } from "react";

const Navbar = () => {
  const [mobileView, setMobileView] = useState(false);
  const [search, setSearch] = useState(false);

  return (
    <div className="flex relative h-[70px] lg:h-[80px] bg-gray-200 my-4 mx-3 lg:mx-20 lg:my-6 px-4 md:px-6 lg:px-10 rounded-lg border-2 border-slate-500 items-center justify-between">
      <Link
        href="/"
        className="logo font-lato text-2xl md:text-3xl lg:text-4xl group hover:font-extrabold cursor-pointer"
      >
        <span className="font-extrabold group-hover:font-normal">Snap</span>
        Story
      </Link>

      <div className="flex items-center justify-between gap-10 xl:gap-14 font-plusSans pt-1">
        {pagesRoute.map(({ path, label }, index) => (
          <Link
            key={index}
            href={path}
            className="hidden lg:flex lg:text-lg xl:text-xl cursor-pointer hover:font-semibold hover:border-b-2 hover:border-gray-400 pb-1"
          >
            {label}
          </Link>
        ))}
      </div>

      <div className="rightSection flex gap-7 items-center h-full">
        <div className="searchButton cursor-pointer" onClick={() => setSearch(!search)}>
          <IoSearch className="text-2xl lg:text-3xl" />
        </div>

        <div className="flex items-center gap-3 lg:gap-5">
          <Link
            href="/create"
            className="bg-white text-black p-3 py-2 rounded-md font-plusSans"
          >
            <span className="flex items-center gap-1">
              <MdEditNote className="text-2xl lg:text-3xl" />
              <span>Write</span>
            </span>
          </Link>
          <Button text="Sign Up" onClick={() => console.log("Sign Up")} />
        </div>
        <button
          className="hamBurger h-full lg:text-3xl lg:hidden"
          onClick={() => setMobileView(!mobileView)}
        >
          {mobileView ? (
            <IoClose className="text-3xl" />
          ) : (
            <RxHamburgerMenu className="text-2xl" />
          )}
        </button>
      </div>

      {mobileView && (
        <div className="flex flex-col gap-4 absolute bottom-[-185px] left-0 py-5 pb-6 px-3 w-full rounded-b-md bg-gray-200 pt-6 border-t-2 border-gray-300 transition-all ease-out duration-75">
          {pagesRoute.map(({ path, label }, index) => (
            <Link
              key={index}
              href={path}
              className="text-lg font-plusSans hover:font-extrabold cursor-pointer border-b-2 border-gray-400 pb-2 px-1"
            >
              {label}
            </Link>
          ))}
        </div>
      )}

      {search && (
        <div className="absolute bottom-[-30px] left-0 p-2 w-full rounded-b-md bg-gray-200 border-t-2 border-gray-300 transition-all ease-out duration-75">
          <input type="text" className="w-full h-10" />
        </div>
      )}
    </div>
  );
};

export default Navbar;

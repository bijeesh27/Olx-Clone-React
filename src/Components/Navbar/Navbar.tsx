import "./Navbar.css";
import logo from "../../assets/symbol.png";
import search from "../../assets/search1.svg";
import arrow from "../../assets/arrow-down.svg";
import searchWt from "../../assets/search.svg";
import addBtn from "../../assets/addButton.png";
import React, { useState, useRef, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, signOut } from "../Firebase/Firebase";

interface NavbarProps {
  toggleModal: () => void;
  toggleModalSell: () => void;
  handleMyAd: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleModal, toggleModalSell, handleMyAd }) => {
  const [user] = useAuthState(auth);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout error:", error);
    }
    setShowDropdown(false);
  };

  return (
    <div>
      <nav className="fixed z-50 w-full overflow-visible p-2 pl-3 pr-3 shadow-md bg-slate-100 border-b-4 border-solid border-b-white">
        <img src={logo} alt="" className="w-12" />
        <div className="relative location-search ml-5">
          <img src={search} alt="" className="absolute top-4 left-2 w-5" />
          <input
            placeholder="Search city, area, or locality..."
            className="w-[50px] sm:w-[150px] md:w-[250px] lg:w-[270px] p-3 pl-8 pr-8 border-black border-solid border-2 rounded-md placeholder:text-ellipsis focus:outline-none focus:border-teal-300"
            type="text"
          />
          <img src={arrow} alt="" className="absolute top-4 right-3 w-5 cursor-pointer" />
        </div>
        <div className="ml-5 mr-2 relative w-full main-search">
          <input
            placeholder="Find Cars, Mobile Phones, and More..."
            className="w-full p-3 border-black border-solid border-2 rounded-md placeholder:text-ellipsis focus:outline-none focus:border-teal-300"
            type="text"
          />
          <div
            style={{ backgroundColor: "#002f34" }}
            className="flex justify-center items-center absolute top-0 right-0 h-full rounded-e-md w-12"
          >
            <img
              className="w-5 filter invert"
              src={searchWt}
              alt="Search Icon"
            />
          </div>
        </div>
        <div className="mx-1 sm:ml-5 sm:mr-5 relative lang">
          <p className="font-bold mr-3">English</p>
        </div>
        {!user ? (
          <p
            className="font-bold underline ml-5 cursor-pointer"
            style={{ color: "#002f34" }}
            onClick={toggleModal}
          >
            Login
          </p>
        ) : (
          <div className="relative">
            <p
              style={{ color: "#002f34" }}
              className="font-bold ml-5 cursor-pointer"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              {user.displayName?.split(" ")[0]}
            </p>
            {showDropdown && (
              <div
                ref={dropdownRef}
                className="absolute top-full left-0 bg-white border rounded shadow-md mt-1 min-w-max z-60"
              >
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm border-t"
                >
                  Logout
                </button>
                <button
                  onClick={handleMyAd}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm border-t"
                >
                  My Ad page
                </button>
              </div>
            )}
          </div>
        )}
        <img
          src={addBtn}
          onClick={user ? toggleModalSell : toggleModal}
          className="w-24 mx-1 sm:ml-5 sm:mr-5 shadow-xl rounded-full cursor-pointer"
          alt=""
        />
      </nav>
      <div className="w-full relative z-0 flex shadow-md p-2 pt-20 pl-10 pr-10 sm:pl-44 md:pr-44 sub-lists">
        <ul className="list-none flex items-center justify-between w-full">
          <li className="flex shrink-0">
            <p className="font-semibold uppercase all-cats">All categories</p>
            <img className="w-4 ml-2" src={arrow} alt="" />
          </li>
          <li>Cars</li>
          <li>Motorcycles</li>
          <li>Mobile Phones</li>
          <li>For sale : Houses & Apartments</li>
          <li>Scooter</li>
          <li>Commercial & Other Vehicles</li>
          <li>For rent : Houses & Apartments</li>
        </ul>
      </div>
    </div>
  );
};
export default Navbar;

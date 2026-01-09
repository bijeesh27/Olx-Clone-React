import React from "react";
import { Link } from "react-router-dom";
import Favorite from "../../assets/favorite.svg";

export interface Item {
  id: string | number;
  imageUrl?: string;
  title: string;
  price: number;
  category: string;
  description?: string;
  userName?: string;
  createdAt?: string;
  userId?: string;
}

interface CardProps {
  items: Item[];
  isMyAdsPage?: boolean;
  onEdit?: (item: Item) => void;
  onDelete?: (item: Item) => void;
}

const Card: React.FC<CardProps> = ({ items, isMyAdsPage = false, onEdit, onDelete }) => {
  return (
    <div className="p-10 px-5 sm:px-15 md:px-30 lg:px-40 min-h-screen">
      <h1 style={{ color: "#002f34" }} className="text-2xl">
        Fresh recommendations
      </h1>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pt-5">
        {items.map((item) => (
          <div
            key={item.id}
            style={{ borderWidth: "1px", borderColor: "lightgray" }}
            className="relative w-full h-72 rounded-md border-solid bg-gray-50 overflow-hidden cursor-pointer"
          >
            <Link
              to={"/details"}
              state={{ item }}
              style={{ borderWidth: "1px", borderColor: "lightgrey" }}
            >
              <div className="w-full flex justify-center p-2 overflow-hidden">
                <img
                  className="h-36 object-contain"
                  src={item.imageUrl || "https://via.placeholder.com/150"}
                  alt={item.title}
                />
              </div>
              <div className="details p-1 pl-4 pr-4">
                <h1 style={{ color: "#002f34" }} className="font-bold text-xl">
                  ₹ {item.price}
                </h1>
                <p className="text-sm pt-2">{item.category}</p>
                <p className="pt-2">{item.title}</p>
              </div>
            </Link>
            <div className="absolute flex justify-center items-center p-2 bg-white rounded-full top-3 right-3 cursor-pointer">
              <img className="w-5" src={Favorite} alt="" />
            </div>
            {isMyAdsPage && (
              <div className="absolute bottom-3 right-3 flex gap-2">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    onEdit && onEdit(item);
                  }}
                  className="bg-yellow-400 rounded px-3 py-1 text-xs font-bold hover:bg-yellow-500 transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    onDelete && onDelete(item);
                  }}
                  className="bg-red-500 text-white rounded px-3 py-1 text-xs font-bold hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;

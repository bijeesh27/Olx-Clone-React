import { collection, getDocs } from "firebase/firestore";
import React, { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { fireStore } from "../Firebase/Firebase";

interface Product {
  id: string;
  imageUrl?: string;
  title: string;
  price: number;
  category: string;
  description?: string;
  userName?: string;
  createdAt?: string;
  userId?: string;
}

interface ItemsContextType {
  items: Product[] | null;
  setItems: React.Dispatch<React.SetStateAction<Product[] | null>>;
}

const Context = createContext<ItemsContextType | null>(null);

export const ItemsContext = (): ItemsContextType | null => useContext(Context);

interface ItemsContextProviderProps {
  children: ReactNode;
}

export const ItemsContextProvider: React.FC<ItemsContextProviderProps> = ({
  children,
}) => {
  const [items, setItems] = useState<Product[] | null>(null);

  useEffect(() => {
    const fetchItemsFromFireStore = async () => {
      try {
        const productsCollection = collection(fireStore, "products");
        const productSnapshot = await getDocs(productsCollection);
        const productsList = productSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Product[];
        setItems(productsList);
      } catch (error) {
        console.log(error, "error fetching products");
      }
    };
    fetchItemsFromFireStore();
  }, []);

  return (
    <Context.Provider value={{ items, setItems }}>{children}</Context.Provider>
  );
};

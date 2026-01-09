import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import Login from "../Modal/Login";
import Sell from "../Modal/Sell";
import Card from "../Card/Card";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  auth,
  fetchFromFirestore,
  fetchMyAds,
  fireStore,
} from "../Firebase/Firebase";
import { doc, deleteDoc } from "firebase/firestore";
import { useSearchParams } from "react-router-dom";

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

const Home: React.FC = () => {
  const [user] = useAuthState(auth);
  const [showLogin, setShowLogin] = useState(false);
  const [showSell, setShowSell] = useState(false);
  const [products, setProducts] = useState<Item[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Item[]>([]);
  const [myAds, setMyAds] = useState<Item[]>([]);
  const [showMyAds, setShowMyAds] = useState(false);
  const [editItem, setEditItem] = useState<Item | null>(null);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchFromFirestore();
      setProducts(data);
      setFilteredProducts(data);
    };
    loadProducts();
  }, []);

  useEffect(() => {
    const query = searchParams.get("search")?.toLowerCase() || "";
    if (query) {
        const filtered = products.filter(
            (item) =>
            item.title.toLowerCase().includes(query) ||
            item.category.toLowerCase().includes(query)
        );
        setFilteredProducts(filtered);
    } else {
        setFilteredProducts(products);
    }
  }, [searchParams, products]);

  const handleMyAd = async () => {
    if (!user) return;
    setShowMyAds(true);
    const myProducts = await fetchMyAds(user.uid);
    setMyAds(myProducts);
  };

  const handleEdit = (item: Item) => {
    setEditItem(item);
    setShowSell(true);
  };

  const handleDelete = async (item: Item) => {
    await deleteDoc(doc(fireStore, "products", item.id + ""));
    if (user) {
      const myProducts = await fetchMyAds(user.uid);
      setMyAds(myProducts);
    }
  };

  const handleCloseModals = () => {
    setShowLogin(false);
    setShowSell(false);
    setEditItem(null);
  };

  return (
    <div>
      <Navbar
        toggleModal={() => setShowLogin(true)}
        toggleModalSell={() => setShowSell(true)}
        handleMyAd={handleMyAd}
      />
      <Login toggleModal={handleCloseModals} status={showLogin} />
      <Sell
        toggleModalSell={handleCloseModals}
        status={showSell}
        setItems={setProducts}
        editItem={editItem}
      />
      {showMyAds ? (
        <Card
          items={myAds}
          isMyAdsPage={true}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ) : (
        <Card items={filteredProducts} />
      )}
    </div>
  );
};

export default Home;

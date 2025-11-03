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
  const [myAds, setMyAds] = useState<Item[]>([]);
  const [showMyAds, setShowMyAds] = useState(false);
  const [editItem, setEditItem] = useState<Item | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchFromFirestore();
      setProducts(data);
    };
    loadProducts();
  }, []);

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
        <Card items={products} />
      )}
    </div>
  );
};

export default Home;

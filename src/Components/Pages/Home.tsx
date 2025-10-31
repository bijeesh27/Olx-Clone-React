import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import Login from "../Modal/Login";
import Sell from "../Modal/Sell";
import Card from "../Card/Card";
import type { Product } from "../Firebase/Firebase"; 
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, fetchFromFirestore, fetchMyAds } from "../Firebase/Firebase";

const Home: React.FC = () => {
  const [user] = useAuthState(auth);
  const [showLogin, setShowLogin] = useState(false);
  const [showSell, setShowSell] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [myAds, setMyAds] = useState<Product[]>([]);
  const [showMyAds, setShowMyAds] = useState(false);

  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchFromFirestore();
      setProducts(data);
    };
    loadProducts();
  }, []);

  const handleMyAd = async () => {
    if (!user) return;
    const myProducts = await fetchMyAds(user.uid);
    setMyAds(myProducts);
    setShowMyAds(true);
  };

  const handleCloseModals = () => {
    setShowLogin(false);
    setShowSell(false);
  };

  return (
    <div>
      <Navbar
        toggleModal={() => setShowLogin(true)}
        toggleModalSell={() => setShowSell(true)}
        handleMyAd={handleMyAd}
      />
      <Login toggleModal={handleCloseModals} status={showLogin} />
      <Sell toggleModalSell={handleCloseModals} status={showSell} setItems={setProducts} />
      {showMyAds ? <Card items={myAds} /> : <Card items={products} />}
    </div>
  );
};
export default Home;

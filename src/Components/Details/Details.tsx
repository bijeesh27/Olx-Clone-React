import Navbar from "../Navbar/Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ItemsContext } from "../Context/Item";
import Login from "../Modal/Login";
import Sell from "../Modal/Sell";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, fireStore } from "../Firebase/Firebase";
import { deleteDoc, doc } from "firebase/firestore";

const Details = () => {
  const location = useLocation();
  const { item } = location.state || {};
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  const [openModal, setModal] = useState(false);
  const [openModalSell, setModalSell] = useState(false);
  const itemsCtx = ItemsContext();
  const currentItem = itemsCtx?.items?.find((i) => i.id === item?.id) || item;

  const toggleModal = () => setModal(!openModal);
  const toggleModalSell = () => setModalSell(!openModalSell);

  const handleEdit = () => {
    setModalSell(true);
  };

  const handleDelete = async () => {
    if (true) {
        try {
            await deleteDoc(doc(fireStore, "products", item.id + ""));
            navigate("/");
        } catch (error) {
            console.error("Error deleting document: ", error);
            alert("Error deleting item");
        }
    }
  };

  return (
    <div>
      <Navbar toggleModalSell={toggleModalSell} toggleModal={toggleModal} />
      <Login toggleModal={toggleModal} status={openModal} />

      <div className="p-4 pl-10 pt-20">
        <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-[#002f34] font-bold hover:underline"
        >
             <span>&larr;</span> Back
        </button>
      </div>

      <div className="grid gap-0 sm:gap-5 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 p-10 px-5 sm:px-15 md:px-30 lg:px-40 pt-5">
        <div className="border-2 w-full rounded-lg flex justify-center overflow-hidden h-96">
          <img
            className="object-contain w-full h-full"
            src={currentItem?.imageUrl}
            alt={currentItem?.title}
          />
        </div>
        <div className="flex flex-col relative w-full">
          <p className="p-1 pl-0 text-2xl font-bold">₹ {currentItem?.price}</p>
          <p className="p-1 pl-0 text-base">{currentItem?.category}</p>
          <p className="p-1 pl-0 text-xl font-bold">{currentItem?.title}</p>
          <p className="p-1 pl-0 sm:pb-0 wrap-break-word text-ellipsis overflow-hidden w-full">
            {currentItem?.description}
          </p>
          <div className="w-full relative sm:relative md:absolute bottom-0 flex justify-between items-end">
            <div className="flex flex-col w-full">
              <p className="p-1 pl-0 font-bold">Seller: {currentItem?.userName}</p>
              
              {user && user.uid === currentItem?.userId ? (
                  <div className="flex gap-4 mt-2">
                       <button 
                            onClick={handleEdit}
                            className="border-2 border-[#002f34] text-[#002f34] px-4 py-2 rounded font-bold hover:bg-[#002f34] hover:text-white transition-colors"
                       >
                            Edit
                       </button>
                       <button 
                            onClick={handleDelete}
                            className="border-2 border-red-500 text-red-500 px-4 py-2 rounded font-bold hover:bg-red-500 hover:text-white transition-colors"
                       >
                            Delete
                       </button>
                  </div>
              ) : (
                <button className="border-2 border-blue-500 text-blue-500 px-4 py-2 rounded mt-2 self-start font-bold hover:bg-blue-500 hover:text-white transition-colors">
                    Chat with seller
                </button>
              )}
            </div>
            <p className="p-1 pl-0 text-sm whitespace-nowrap">{currentItem?.createdAt}</p>
          </div>
        </div>
      </div>

      <Sell
        setItems={itemsCtx?.setItems || (() => {})}
        toggleModalSell={toggleModalSell}
        status={openModalSell}
        editItem={currentItem}
      />
    </div>
  );
};

export default Details;
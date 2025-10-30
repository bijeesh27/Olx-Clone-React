import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signOut } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { collection, getDocs, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD1qc9tbzdxB-t-dABvisgzkebWL7VM1XY",
  authDomain: "olx-clone-99ac3.firebaseapp.com",
  projectId: "olx-clone-99ac3",
  storageBucket: "olx-clone-99ac3.firebasestorage.app",
  messagingSenderId: "654641273439",
  appId: "1:654641273439:web:fa435b489254ff8d5119ea",
  measurementId: "G-J2FQ83BGTG",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const storage = getStorage(app);
const fireStore = getFirestore(app);

export interface Product {
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

const fetchFromFirestore = async (): Promise<Product[]> => {
  try {
    const productsCollection = collection(fireStore, "products");
    const productSnapshot = await getDocs(productsCollection);
    const productList: Product[] = productSnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as Product)
    );
    console.log("Fetched products from Firestore:", productList);
    return productList;
  } catch (error) {
    console.error("Error fetching products from Firestore:", error);
    return [];
  }
};

export { auth, provider, storage, fireStore, fetchFromFirestore, signOut };

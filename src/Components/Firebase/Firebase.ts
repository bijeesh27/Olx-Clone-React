import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signOut } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { collection, getDocs, getFirestore, query, where } from "firebase/firestore";

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

// Fetch all products
export const fetchFromFirestore = async (): Promise<Product[]> => {
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
    return productList;
  } catch (error) {
    console.error("Error fetching products from Firestore:", error);
    return [];
  }
};

// Fetch only products uploaded by current user
export const fetchMyAds = async (userId: string): Promise<Product[]> => {
  try {
    const productsCollection = collection(fireStore, "products");
    const q = query(productsCollection, where("userId", "==", userId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
  } catch (error) {
    console.error("Error fetching user's products:", error);
    return [];
  }
};

export { auth, provider, storage, fireStore, signOut };

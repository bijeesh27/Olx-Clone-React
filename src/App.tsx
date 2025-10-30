import { Route, Routes } from "react-router-dom";
import Home from "./Components/Pages/Home";
import Details from "./Components/Details/Details";
import { AuthProvider } from "./Components/Context/Auth";
import { ItemsContextProvider } from "./Components/Context/Item";

const App = () => {
  return (
    <AuthProvider>
      <ItemsContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/details" element={<Details />} />
        </Routes>
      </ItemsContextProvider>
    </AuthProvider>
  );
};

export default App;

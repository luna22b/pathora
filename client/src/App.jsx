import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import BrowsePlants from "./pages/BrowsePlants";
import IdentifyPlant from "./pages/IdentifyPlant";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import "./App.css";
import "@fontsource/inter";
import "@fontsource/inter/400.css";
import "@fontsource/inter/400-italic.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/browseplants" element={<BrowsePlants />} />
        <Route path="/identify" element={<IdentifyPlant />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

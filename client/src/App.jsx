import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import PlantJournal from './pages/PlantJournal';
import IdentifyPlant from './pages/IdentifyPlant';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Register from './pages/Register';
import PlantGallery from './pages/PlantGallery';
import './App.css';
import '@fontsource/inter';
import '@fontsource/inter/400.css';
import '@fontsource/inter/400-italic.css';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/plantjournal" element={<PlantJournal />} />
        <Route path="/identify" element={<IdentifyPlant />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/gallery" element={<PlantGallery />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

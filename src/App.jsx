import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
 import LoginPage from './Pages/LoginPage'
import MainPage from "./Pages/MainPage";
import ProductPage from "./Pages/ProductPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Link to={'/login'}>ورود</Link>} />
        <Route path="/home" element={<MainPage/>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/products/:id" element={<ProductPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

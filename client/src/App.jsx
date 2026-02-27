import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import AddProduct from './pages/AddProduct.jsx';
import Navbar from './components/Navbar.jsx';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/add" element={<AddProduct />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

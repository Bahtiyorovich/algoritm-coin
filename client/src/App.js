import { useState, useEffect } from 'react';
import { HomePage, Login, Register } from "./components";
import { Routes, Route, Navigate } from 'react-router-dom';
import { getItem } from './helpers/cookie-storage';

const App = () => {
  const [user, setUser] = useState(null); 

  useEffect(() => {
    const token = getItem('token');
    if (token) {
      // Token bor, shuning uchun homePage-ni ko'rsatamiz
      setUser({ loggedIn: true });
    }
  }, []);

  return (
    <div className="flex items-center justify-center h-screen">
      <Routes>
        <Route path="/" element={user?.loggedIn ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register setUser={setUser} />} />
      </Routes>
    </div>
  );
}

export default App;

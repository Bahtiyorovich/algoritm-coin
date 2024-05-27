import {  Routes, Route, Navigate } from 'react-router-dom';
import { HomePage, Login, Register } from './components';

const App = () => {
  return (
      <div className="flex items-center justify-center h-screen">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<Navigate to={`/`} />}/>
        </Routes>
      </div>
  );
};

export default App;

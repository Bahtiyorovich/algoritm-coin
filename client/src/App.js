import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useUserContext } from './contexts/userContext';
import { Register, Login, Main} from './components';
import { useSelector } from 'react-redux';

const App = () => {
  const { user } = useSelector(state => state.auth);

  return (
    <div className="flex items-center justify-center h-screen w-full">
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/user/:id" element={user ? <Main /> : <Navigate to="/login" />}>
              <Route path='/user/:id/*' element={<Main/>}/>
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;

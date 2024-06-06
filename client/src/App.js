import React, { Suspense, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Register, Login, Main} from './components';
import { getCookie } from './helpers/cookieStorage';
import { useDispatch } from 'react-redux';
import { getUser } from './feature/action/authAction';

const App = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {
    const token = getCookie('token')
    if(token){
      dispatch(getUser())
      navigate('/')
    }
    else { navigate('/login') }
  },[dispatch]); // navigate va token dependency arrayga qo'shildi

  return (
    <div className="flex items-center justify-center h-screen w-full">
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Main />}>
            <Route path="/*" element={<Main/>} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;

import React, { Suspense, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Register, Login, Main} from './components';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from './feature/action/authAction';


const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const { loading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      dispatch(getUser());
    }
  }, [dispatch, user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex items-center justify-center h-screen w-full">
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Main/>}>
            <Route path='/*' element={<Main/>}/>
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;

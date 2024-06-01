import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IconButton } from "@material-tailwind/react";
import { IoPower } from "react-icons/io5";
import { useTheme } from '../../../contexts/darkModeContext';
import { styles } from '../../../constants/styles';
import { LogoDark } from '../../../assets';
import MenuList from './menuList';
import { logoutUser } from '../../../feature/action/authAction';

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { darkMode } = useTheme();
  const user  = useSelector(state => state.user.user);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/login');
  };

  return (
    <div className={`col-span-1 row-span-9 shadow-${darkMode ? 'sm bg-slate-800 border-r border-slate-500 text-slate-200' : 'xl bg-white text-slate-600'}`}>
      <div className={`${styles.flexCenter} h-[100px] w-full`}>
        <img src={LogoDark} alt="Logo" className="object-contain h-[60px]" />
      </div>

      {/* MENU */}
      <MenuList />

      <div className="px-4">
        <div className="flex items-center justify-center gap-4 bg-indigo-700 rounded-md py-2">
          <h2 className="w-10 h-10 rounded-full p-2 bg-slate-300 text-slate-800 font-bold">
            {(user?.username || "").slice(0, 2).toUpperCase()}
          </h2>
          <p className="text-white text-[12px]">{user?.email || ""}</p>
          <IconButton onClick={handleLogout} className="text-white text-xl bg-indigo-400">
            <IoPower />
          </IconButton>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;

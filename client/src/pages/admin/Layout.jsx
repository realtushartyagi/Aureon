import React from 'react';
import { assets } from '../../assets/assets';
import { Outlet,useNavigate } from 'react-router-dom';
import Sidebar from '../../components/admin/Sidebar';
import { useAppContext } from '../../context/AppContext';

const Layout = () => {

  const { axios, setToken } = useAppContext()
  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem('token');
    axios.defaults.headers.common['Authorization'] = null;
    setToken(null)

    navigate('/')
  }

  return (
    <>
    <div className='flex items-center justify-between py-2 h-[70px] px-6 sm:px-12 border-b border-[var(--color-border)] bg-[var(--color-surface)]'>
      <h1 
        onClick={()=> navigate('/')} 
        className='font-editorial text-2xl font-bold cursor-pointer text-[var(--color-text-main)] tracking-tight'
      >
        Aureon.
      </h1>
      <button onClick={logout} className='text-sm font-medium px-6 py-2 bg-[var(--color-text-main)] text-white rounded-sm cursor-pointer hover:bg-[var(--color-primary)] transition-colors'>Logout</button>
    </div>
    <div className='flex h-[calc(100vh-70px)]'>
        <Sidebar/>
        <Outlet />
    </div>
    </>
  );
}

export default Layout;

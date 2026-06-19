import React from 'react'
import { useNavigate } from "react-router-dom";
import { useAppContext } from '../context/AppContext.jsx';

function Navbar() {
  
  const { token, theme, toggleTheme } = useAppContext()
  const navigate = useNavigate()

  return (
    <nav className='sticky top-0 z-50 bg-[var(--color-background)]/80 backdrop-blur-md border-b border-[var(--color-border)] transition-colors duration-300'>
      <div className='flex justify-between items-center py-4 px-6 sm:px-12 xl:px-24 max-w-7xl mx-auto'>
        
        {/* Left Side: Logo & Theme Toggle */}
        <div className='flex items-center gap-6'>
          <h1 
            onClick={()=>navigate('/')} 
            className='font-editorial text-2xl sm:text-3xl font-bold cursor-pointer text-[var(--color-text-main)] tracking-tight hover:text-[var(--color-primary)] transition-colors duration-300'
          >
            Aureon.
          </h1>
          
          <button 
            onClick={toggleTheme}
            className='relative flex items-center justify-center w-10 h-10 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-main)] shadow-[var(--shadow-editorial-sm)] hover:shadow-[var(--shadow-editorial-md)] hover:-translate-y-0.5 transition-all duration-300 focus:outline-none'
            aria-label="Toggle Dark Mode"
          >
            {theme === 'light' ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
              </svg>
            )}
          </button>
        </div>

        {/* Right Side */}
        <button 
          onClick={()=>navigate('/admin')} 
          className='flex items-center gap-2 rounded-full text-sm font-medium cursor-pointer bg-[var(--color-text-main)] text-[var(--color-background)] px-6 py-2 sm:px-8 sm:py-2.5 shadow-[var(--shadow-editorial-sm)] hover:shadow-[var(--shadow-editorial-md)] hover:-translate-y-0.5 transition-all duration-300' 
        >
          {token ? 'Dashboard' : 'Sign in'}
        </button>
      </div>
    </nav>
  )
}

export default Navbar;

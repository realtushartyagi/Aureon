import React from 'react';
import { NavLink } from 'react-router-dom';
import { assets } from '../../assets/assets';
const Sidebar = () => {
  return (
    <div className='flex flex-col border-r border-[var(--color-border)] min-h-full pt-8 bg-[var(--color-surface)]'>

      <NavLink end={true} to='/admin' className={({isActive}) => `flex items-center gap-4 py-4 px-6 md:px-8 md:min-w-64 cursor-pointer transition-colors ${isActive ? "bg-[var(--color-background)] border-r-2 border-[var(--color-text-main)] text-[var(--color-text-main)] font-medium" : "text-[var(--color-text-muted)] hover:bg-[var(--color-background)] hover:text-[var(--color-text-main)]"}`} >
        <img src={assets.home_icon} alt="" className={`min-w-4 w-5 ${isActive ? 'opacity-100' : 'opacity-60'}`} />
        <p className='hidden md:inline-block text-sm tracking-wide'>Dashboard</p>
      </NavLink>

      <NavLink  to='/admin/addBlog' className={({isActive}) => `flex items-center gap-4 py-4 px-6 md:px-8 md:min-w-64 cursor-pointer transition-colors ${isActive ? "bg-[var(--color-background)] border-r-2 border-[var(--color-text-main)] text-[var(--color-text-main)] font-medium" : "text-[var(--color-text-muted)] hover:bg-[var(--color-background)] hover:text-[var(--color-text-main)]"}`} >
        <img src={assets.add_icon} alt="" className={`min-w-4 w-5 ${isActive ? 'opacity-100' : 'opacity-60'}`} />
        <p className='hidden md:inline-block text-sm tracking-wide'>Add Article</p>
      </NavLink>

      <NavLink  to='/admin/listBlog' className={({isActive}) => `flex items-center gap-4 py-4 px-6 md:px-8 md:min-w-64 cursor-pointer transition-colors ${isActive ? "bg-[var(--color-background)] border-r-2 border-[var(--color-text-main)] text-[var(--color-text-main)] font-medium" : "text-[var(--color-text-muted)] hover:bg-[var(--color-background)] hover:text-[var(--color-text-main)]"}`} >
        <img src={assets.list_icon} alt="" className={`min-w-4 w-5 ${isActive ? 'opacity-100' : 'opacity-60'}`} />
        <p className='hidden md:inline-block text-sm tracking-wide'>All Articles</p>
      </NavLink>

      <NavLink  to='/admin/comments' className={({isActive}) => `flex items-center gap-4 py-4 px-6 md:px-8 md:min-w-64 cursor-pointer transition-colors ${isActive ? "bg-[var(--color-background)] border-r-2 border-[var(--color-text-main)] text-[var(--color-text-main)] font-medium" : "text-[var(--color-text-muted)] hover:bg-[var(--color-background)] hover:text-[var(--color-text-main)]"}`} >
        <img src={assets.comment_icon} alt="" className={`min-w-4 w-5 ${isActive ? 'opacity-100' : 'opacity-60'}`} />
        <p className='hidden md:inline-block text-sm tracking-wide'>Comments</p>
      </NavLink>

    </div>
  );
}

export default Sidebar;

import { blogCategories } from '../assets/assets';
import React, { useState } from "react";
import { motion } from "motion/react"
import BlogCard from './BlogCard';
import { useAppContext } from '../context/AppContext';

function BlogList() {
    const [menu, setMenu] = useState("All")
    const {blogs, input} = useAppContext()

    const filteredBlogs = ()=> {
      if(input === ''){
        return blogs
      }
      return blogs.filter((blog) => blog.title.toLowerCase().includes(input.toLowerCase()) || blog.category.toLowerCase().includes(input.toLowerCase()))
    }

  return (
    <div className='max-w-7xl mx-auto px-6 sm:px-12 xl:px-24 mb-24'>
      <div className='flex justify-center sm:justify-start gap-6 sm:gap-10 mt-12 mb-10 overflow-x-auto no-scrollbar border-b border-[var(--color-border)]'>
        {blogCategories.map((item)=> (
            <div key={item} className='relative pb-4'> 
              <button 
                onClick={()=> setMenu(item)} 
                className={`cursor-pointer text-sm font-medium tracking-wide whitespace-nowrap transition-colors duration-300 ${menu === item ? 'text-[var(--color-text-main)]' : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-main)]'}`}
              >
                  {item}
                  {menu === item && (
                     <motion.div 
                       layoutId='activeCategory'
                       transition={{type: 'tween', duration: 0.3}}
                       className='absolute left-0 right-0 -bottom-[1px] h-[2px] bg-[var(--color-text-main)]'
                     ></motion.div> 
                  )}
              </button>
            </div>
        ))}
      </div>
      
      {filteredBlogs().length === 0 ? (
        <div className="text-center py-20">
          <p className="text-[var(--color-text-muted)] font-editorial text-2xl italic">No articles found matching your criteria.</p>
        </div>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12'>
          {filteredBlogs().filter((blog)=> menu === "All" ? true : blog.category === menu).map((blog)=> <BlogCard key={blog._id} blog={blog}/>)}
        </div>
      )}
    </div>
  );
}

export default BlogList;

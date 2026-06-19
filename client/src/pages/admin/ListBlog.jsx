import React, { useEffect, useState, useContext } from 'react';
import { blog_data } from '../../assets/assets';
import BlogTableItem from '../../components/admin/BlogTableItem';
import toast from 'react-hot-toast';
import { useAppContext } from "../../context/AppContext"; 
import axios from 'axios';

const ListBlog = () => {

  const [blogs, setBlogs] = useState([]);
  const {axios} = useAppContext()

  const fetchBlogs = async ()=> {
    try {
      console.log("run");
      
      const { data } = await axios.get("http://localhost:3000/api/blog/all");
      console.log("Fetched blogs:", data);
      
      if(data.success){
        setBlogs(data.blogs)
      }else{
        toast.error("Failed to fetch blogs")
      }
    } catch (error) {
      toast.error("Something went wrong")
      console.log(error);
      
    }
  }

  useEffect(()=> {
    fetchBlogs()
  },[])

  return (
    <div className='flex-1 p-6 md:p-12 bg-[var(--color-background)] overflow-y-auto'>
      <h2 className="font-editorial text-3xl font-bold text-[var(--color-text-main)] mb-8 tracking-tight">All Articles</h2>

      <div className='w-full overflow-x-auto border border-[var(--color-border)] rounded-sm bg-[var(--color-surface)] shadow-[var(--shadow-editorial-sm)]'>
        <table className='w-full text-sm text-left whitespace-nowrap'>
          <thead className='text-xs uppercase tracking-widest text-[var(--color-text-muted)] border-b border-[var(--color-border)] bg-[var(--color-background)]'>
            <tr>
              <th scope='col' className='px-6 py-5 font-semibold'>#</th>
              <th scope='col' className='px-6 py-5 font-semibold'>Title</th>
              <th scope='col' className='px-6 py-5 font-semibold hidden sm:table-cell'>Date</th>
              <th scope='col' className='px-6 py-5 font-semibold hidden sm:table-cell'>Status</th>
              <th scope='col' className='px-6 py-5 font-semibold'>Actions</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-[var(--color-border)]'>
            {blogs.map((blog, index)=> {
              return <BlogTableItem key={blog._id} blog={blog} fetchBlogs={fetchBlogs} index={index + 1}/>
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListBlog;

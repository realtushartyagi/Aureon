import React from 'react';
import { assets } from '../../assets/assets';
import { useAppContext } from '../../context/AppContext';
import  toast  from "react-hot-toast";

const BlogTableItem = ({blog, fetchBlogs, index}) => {

    const {title, createdAt} = blog;
    const BlogDate = new Date(createdAt)

    const {axios} = useAppContext();
    const deletedBlog = async ()=> {
      const confirm = window.confirm("Are you sure you want to delete this blog?")
      if(!confirm) return;
      try{
        const { data } = await axios.delete(`/api/blog/delete/${blog._id}`);
        console.log(data);
        
        if(data.success){
          toast.success(data.message)
          await fetchBlogs()
        }else{
          toast.error(data.message)
        }
      } catch(error) {
        toast.error(error.message)
      }
    }

    const togglePublish = async ()=> {
      try {
        const {data} = await axios.post('/api/blog/toggle-publish', {id: blog._id})
        if(data.success){
            toast.success(data.message)
            await fetchBlogs()
          }else{
            toast.error(data.message)
          }
      } catch (error) {
        toast.error(error.message)
      }
    }

  return (
    <tr className='hover:bg-[var(--color-background)] transition-colors'>
        <th className='px-6 py-5 font-normal text-[var(--color-text-muted)]'>{index}</th>
        <td className='px-6 py-5 font-medium text-[var(--color-text-main)] truncate max-w-xs'>{title}</td>
        <td className='px-6 py-5 hidden sm:table-cell text-[var(--color-text-muted)]'>{BlogDate.toDateString()}</td>
        <td className='px-6 py-5 hidden sm:table-cell'>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-widest ${blog.isPublished ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800" }`}
            >{blog.isPublished ? 'Published' : 'Draft'}</span>
        </td>

        <td className='px-6 py-5'>
          <div className="flex items-center gap-4 text-xs font-medium uppercase tracking-widest">
            <button onClick={togglePublish} className='text-[var(--color-primary)] hover:text-[var(--color-text-main)] transition-colors cursor-pointer'>{blog.isPublished ? 'Unpublish' : 'Publish'}</button>
            <button onClick={deletedBlog} className='text-red-600 hover:text-red-800 transition-colors cursor-pointer'>Delete</button>
          </div>
        </td>
    </tr>
  );
}

export default BlogTableItem;

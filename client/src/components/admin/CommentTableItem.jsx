import React from 'react';
import { assets } from '../../assets/assets';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const CommentTableItem = ({comment, fetchComments}) => {

const {blog, createdAt, _id} = comment;
const BlogData = new Date(createdAt);

const {axios} = useAppContext()

const approveComment = async() => {
    try {
        const {data} = await axios.post('/api/admin/approve-comment', {id: _id})
        if(data.success) {
            toast.success(data.message)
            fetchComments()
        }else{
            toast.error(data.message)
        }
    } catch (error) {
        toast.error(error.message)
    }
}

const deleteComment = async() => {
    try {
    const confirm = window.confirm('Are you sure you want to delete this comment?')
    if(!confirm) return;   
        const {data} = await axios.post('/api/admin/approve-comment', {id: _id})
        if(data.success) {
            toast.success(data.message)
            fetchComments()
        }else{
            toast.error(data.message)
        }
    } catch (error) {
        toast.error(error.message)
    }
}

  return (
    <tr className='hover:bg-[var(--color-background)] transition-colors'>
        <td className='px-6 py-5 whitespace-normal min-w-[300px]'>
            <div className='mb-2 text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)]'>
              {blog.title}
            </div>
            <div className='mb-1'>
              <span className='font-medium text-[var(--color-text-main)] text-sm'>{comment.name}</span>
            </div>
            <p className='text-sm text-[var(--color-text-muted)] leading-relaxed italic'>"{comment.content}"</p>
        </td>
        <td className='px-6 py-5 hidden sm:table-cell text-[var(--color-text-muted)] text-sm'>
            {BlogData.toLocaleDateString()}
        </td>
        <td className='px-6 py-5'>
            <div className='flex items-center gap-4 text-xs font-medium uppercase tracking-widest'>
                {!comment.isApproved ? 
                <button onClick={approveComment} className='text-[var(--color-primary)] hover:text-[var(--color-text-main)] transition-colors cursor-pointer'>Approve</button> : <span className='text-green-700 bg-green-100 px-2 py-0.5 rounded-full'>Approved</span> }
                <button onClick={deleteComment} className='text-red-600 hover:text-red-800 transition-colors cursor-pointer'>Delete</button>
            </div>
        </td>
    </tr>
  );
}

export default CommentTableItem;

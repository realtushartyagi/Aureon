import React, { useEffect, useState } from 'react';
import CommentTableItem from '../../components/admin/CommentTableItem';
import { comments_data } from '../../assets/assets';
import { useAppContext } from '../../context/AppContext';

const Comments = () => {

  const [comments, setComments] = useState([])
  const [filter, setFilter] = useState('Not Approved')

  const {axios} = useAppContext();

  const fetchComments =  async  ()=> {
    try {
      const {data} = await axios.get('/api/admin/comments')
      data.success ? setComments(data.comments) : toast.error(data.message)
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(()=> {
    fetchComments()
  }, [])

  return (
    <div className='flex-1 p-6 md:p-12 bg-[var(--color-background)] overflow-y-auto'>
      <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center max-w-4xl mb-8 gap-4'>
        <h2 className="font-editorial text-3xl font-bold text-[var(--color-text-main)] tracking-tight">Comments</h2>
        <div className='flex gap-3 bg-[var(--color-surface)] p-1 border border-[var(--color-border)] rounded-sm'>
          <button onClick={()=> setFilter('Approved')} className={`px-4 py-1.5 text-xs font-semibold uppercase tracking-widest cursor-pointer transition-colors ${filter === 'Approved' ? 'bg-[var(--color-text-main)] text-white' : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-main)]'}`} >Approved</button>

          <button onClick={()=> setFilter('Not Approved')} className={`px-4 py-1.5 text-xs font-semibold uppercase tracking-widest cursor-pointer transition-colors ${filter === 'Not Approved' ? 'bg-[var(--color-text-main)] text-white' : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-main)]'}`} >Not Approved</button>
        </div>
      </div>
      <div className='w-full overflow-x-auto border border-[var(--color-border)] rounded-sm bg-[var(--color-surface)] shadow-[var(--shadow-editorial-sm)] max-w-4xl'>
        <table className='w-full text-sm text-left'>
          <thead className='text-xs uppercase tracking-widest text-[var(--color-text-muted)] border-b border-[var(--color-border)] bg-[var(--color-background)]'>
            <tr>
              <th scope='col' className='px-6 py-5 font-semibold whitespace-nowrap'>Article & Comment</th>
              <th scope='col' className='px-6 py-5 font-semibold hidden sm:table-cell whitespace-nowrap'>Date</th>
              <th scope='col' className='px-6 py-5 font-semibold whitespace-nowrap'>Action</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-[var(--color-border)]'>
            {comments.filter((comment) => {
              if(filter === "Approved") return comment.isApproved === true;
              return comment.isApproved === false;
            }).map((comment, index)=> <CommentTableItem key={comment._id} comment={comment} index= {index + 1 } fetchComments={fetchComments}/> )}
          </tbody>
        </table>
      </div>      
    </div>
  );
}

export default Comments;

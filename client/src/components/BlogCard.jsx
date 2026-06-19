import React from 'react';
import { useNavigate } from 'react-router-dom';
import Moment from 'moment';

const BlogCard = ({blog}) => {

const {title, description, category, image, _id, createdAt} = blog;
const navigate = useNavigate()

  return (
    <div 
      onClick={()=> navigate(`/blog/${_id}`)} 
      className='group w-full bg-[var(--color-surface)] border border-[var(--color-border)] rounded-sm overflow-hidden hover:shadow-[var(--shadow-editorial-md)] transition-all duration-300 cursor-pointer flex flex-col h-full'
    >
      <div className='overflow-hidden aspect-[4/3]'>
        <img 
          src={image} 
          alt="" 
          className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out' 
        />
      </div>
      <div className='p-6 flex flex-col flex-1'>
        <div className='flex items-center gap-3 mb-4'>
          <span className='px-2.5 py-0.5 border border-[var(--color-border)] text-[var(--color-text-muted)] text-[10px] font-semibold uppercase tracking-widest bg-[var(--color-background)]'>
            {category}
          </span>
          <span className='text-xs text-[var(--color-text-muted)]'>
            {Moment(createdAt).format('MMM D, YYYY')}
          </span>
        </div>
        <h3 className='font-editorial text-xl leading-snug font-bold text-[var(--color-text-main)] mb-3 group-hover:text-[var(--color-primary)] transition-colors duration-200 line-clamp-2'>
          {title}
        </h3>
        <div 
          className='text-sm text-[var(--color-text-muted)] line-clamp-3 leading-relaxed mb-4 flex-1' 
          dangerouslySetInnerHTML={{"__html": description}}
        />
        <div className='mt-auto pt-4 border-t border-[var(--color-border)]'>
          <span className='text-xs font-medium text-[var(--color-primary)] flex items-center gap-1 group-hover:gap-2 transition-all'>
            Read Article <span aria-hidden="true">&rarr;</span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default BlogCard;

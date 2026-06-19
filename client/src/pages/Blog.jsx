import React, { useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import Navbar from '../components/Navbar';
import { useParams } from 'react-router-dom';
import Moment from 'moment';
import Footer from '../components/Footer';
import Loader from '../components/Loader';
import { useAppContext } from '../context/AppContext';
import { Toaster, toast } from 'react-hot-toast';


const Blog = () => {

  const {id} = useParams()
  const {axios} = useAppContext()

  const [data, setData] = useState(null)
  const [comments, setComments] = useState([])
  const [name, setName] = useState('')
  const [content, setContent] = useState('')

  const fetchBlogData = async ()=> {
    try {
      const {data} = await axios.get(`/api/blog/${id}`)
      data.success ? setData(data.blog) : toast.error(data.message)
    } catch (error) {
      toast.error(error.message)
    }
  }

  const fetchComments = async () => {
    try {
      const {data} = await axios.post('/api/blog/comments', {blogId: id})
      if (data.success) {
        setComments(data.comments)
      } else{
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const addComment = async (e) => {
    e.preventDefault();
    try {
      const {data} = await axios.post('/api/blog/add-comment', {blog: id, name, content});
      if (data.success){
        toast.success(data.message)
        setName('')
        setContent('')
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  } 

  useEffect(()=> {
    fetchBlogData()
    fetchComments()
  }, [])

  return data ? (
    <div className='min-h-screen flex flex-col bg-[var(--color-background)]'>
      <Navbar/>

      <main className='flex-1 pb-24'>
        {/* Article Header */}
        <header className='px-6 pt-20 pb-12 sm:pt-32 sm:pb-16 max-w-4xl mx-auto text-center'>
          <p className='text-xs font-semibold uppercase tracking-widest text-[var(--color-primary)] mb-6'>
            {data.category}
          </p>
          <h1 className='font-editorial text-4xl sm:text-6xl font-bold leading-[1.15] text-[var(--color-text-main)] mb-8 tracking-tight'>
            {data.title}
          </h1>
          <div className='flex items-center justify-center gap-4 text-sm text-[var(--color-text-muted)]'>
            <span className='font-medium text-[var(--color-text-main)]'>Michael Brown</span>
            <span>&bull;</span>
            <span>{Moment(data.createdAt).format('MMMM Do, YYYY')}</span>
          </div>
        </header>

        {/* Hero Image */}
        <div className='max-w-5xl mx-auto px-6 mb-16'>
          <div className='aspect-video overflow-hidden border border-[var(--color-border)] rounded-sm'>
            <img src={data.image} alt={data.title} className='w-full h-full object-cover' />
          </div>
        </div>

        {/* Article Content */}
        <article className='px-6'>
          <div className='rich-text max-w-[680px] mx-auto' dangerouslySetInnerHTML={{__html: data.description}}></div>
        </article>

        {/* Share Section */}
        <div className='max-w-[680px] mx-auto px-6 mt-16 pt-8 border-t border-[var(--color-border)]'>
          <p className='text-xs uppercase tracking-widest font-semibold text-[var(--color-text-muted)] mb-4'>Share this essay</p>
          <div className='flex gap-4'>
            <button className='w-10 h-10 rounded-full border border-[var(--color-border)] flex items-center justify-center hover:border-[var(--color-text-main)] transition-colors'>
              <img src={assets.facebook_icon} className='w-4 opacity-70' alt="Facebook" />
            </button>
            <button className='w-10 h-10 rounded-full border border-[var(--color-border)] flex items-center justify-center hover:border-[var(--color-text-main)] transition-colors'>
              <img src={assets.twitter_icon} className='w-4 opacity-70' alt="Twitter" />
            </button>
          </div>
        </div>

        {/* Comments Section */}
        <section className='max-w-[680px] mx-auto px-6 mt-20'>
          <h3 className='font-editorial text-2xl font-bold text-[var(--color-text-main)] mb-8 border-b border-[var(--color-border)] pb-4'>
            Responses ({comments.length})
          </h3>
          
          {/* Add Comment Form */}
          <div className='mb-12 bg-[var(--color-surface)] p-6 sm:p-8 border border-[var(--color-border)] rounded-sm'>
            <h4 className='text-sm font-semibold uppercase tracking-widest text-[var(--color-text-main)] mb-6'>Leave a response</h4>
            <form onSubmit={addComment} className='flex flex-col gap-5'>
              <div>
                <input 
                  onChange={(e) => setName(e.target.value)} 
                  value={name} 
                  type="text" 
                  placeholder='Your Name' 
                  required 
                  className='w-full px-4 py-3 bg-[var(--color-background)] border border-[var(--color-border)] outline-none focus:border-[var(--color-text-main)] transition-colors rounded-sm text-[var(--color-text-main)] text-sm' 
                />
              </div>
              <div>
                <textarea 
                  onChange={(e) => setContent(e.target.value)} 
                  value={content} 
                  placeholder='Share your thoughts...' 
                  className='w-full px-4 py-3 bg-[var(--color-background)] border border-[var(--color-border)] outline-none focus:border-[var(--color-text-main)] transition-colors rounded-sm text-[var(--color-text-main)] text-sm h-32 resize-y' 
                  required
                ></textarea>
              </div>
              <div className='flex justify-end mt-2'>
                <button 
                  type='submit' 
                  className='bg-[var(--color-text-main)] text-white px-8 py-2.5 rounded-full text-sm font-medium tracking-wide hover:bg-[var(--color-primary)] transition-colors shadow-[var(--shadow-editorial-sm)]'
                >
                  Publish
                </button>
              </div>
            </form>
          </div>

          {/* Comment List */}
          <div className='flex flex-col gap-8'>
            {comments.map((item, index) =>(
              <div key={index} className='pb-8 border-b border-[var(--color-border)] last:border-0'>
                <div className='flex items-center gap-3 mb-3'>
                  <div className='w-8 h-8 rounded-full bg-[var(--color-border)] flex items-center justify-center overflow-hidden'>
                    <img src={assets.user_icon} alt="" className='w-4 opacity-50' />
                  </div>
                  <div>
                    <p className='font-medium text-sm text-[var(--color-text-main)]'>{item.name}</p>
                    <p className='text-xs text-[var(--color-text-muted)]'>{Moment(item.createdAt).fromNow()}</p>
                  </div>
                </div>
                <p className='text-sm leading-relaxed text-[var(--color-text-main)]'>{item.content}</p>
              </div>
            ))}
          </div>
        </section>

      </main>
      <Footer/>
    </div>
  ) : <Loader/>
}

export default Blog;

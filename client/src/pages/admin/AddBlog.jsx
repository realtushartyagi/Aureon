import React, { useEffect } from 'react';
import { assets, blogCategories } from '../../assets/assets';
import { useRef,useState } from 'react';
import Quill from 'quill';
import { useAppContext } from "../../context/AppContext";
import toast from 'react-hot-toast';
import {parse} from 'marked'


const AddBlog = () => {

  const {axios} = useAppContext()
  const [isAdding, setIsAdding] = useState(false)
  const [loading, setLoading] = useState(false)

  const editorRef = useRef(null)
  const quillRef = useRef(null)

  const [image, setImage] = useState(false);
  const [title, setTitle] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const [category, setCategory] = useState('Startup');
  const [isPublished, setIsPublished] = useState(false);

  const generateContent = async () => {
    if(!title) return toast.error('Please enter a title')
      try {
        setLoading(true);
        const {data} = await axios.post('/api/blog/generate', {prompt: title})
        console.log(data);
      
        if(data.content){
          quillRef.current.root.innerHTML = parse(data.content);   
        }else{
          toast.error(data.message);
        }

      } catch (error) {
        toast.error(error.response?.data?.message || 'Something went wrong')
        console.log(error);
        
      }finally{
        setLoading(false)

      }
  }

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      setIsAdding(true)

      const blog = {
        title, subTitle, 
        description: quillRef.current.root.innerHTML,
        category, isPublished
      }

      const formData = new FormData();
      formData.append('blog', JSON.stringify(blog))
      formData.append('image', image)

      const {data} = await axios.post('/api/blog/add', formData);

      if(data.success){
        toast.success(data.message);
        setImage(null)
        setTitle('')
        quillRef.current.root.innerHTML = ''
        setCategory('Startup')
        }else{
          toast.error(data.message)
        }
    } catch (error) {
      toast.error(error.message)
    }finally{
      setIsAdding(false)
    }
  }

  useEffect(()=>{
    //Initiate Quill only once
    if(!quillRef.current && editorRef.current){
      quillRef.current = new Quill(editorRef.current, {theme: 'snow'})
    }
  })


  return (
    <div className='flex-1 p-6 md:p-12 bg-[var(--color-background)] overflow-y-auto'>
      <h2 className="font-editorial text-3xl font-bold text-[var(--color-text-main)] mb-8 tracking-tight">Draft New Article</h2>
      
      <form 
        onSubmit={onSubmitHandler}
        className='max-w-4xl bg-[var(--color-surface)] border border-[var(--color-border)] p-6 sm:p-10 rounded-sm shadow-[var(--shadow-editorial-sm)]'>

        <div className="mb-8">
          <p className='text-xs font-semibold uppercase tracking-widest text-[var(--color-text-main)] mb-3'>Cover Image</p>
          <label htmlFor="image" className="block cursor-pointer w-max group">
            <img src={!image ? assets.upload_area : URL.createObjectURL(image)} alt="" className='h-24 sm:h-32 object-cover rounded-sm border border-dashed border-[var(--color-border)] group-hover:border-[var(--color-text-main)] transition-colors' />
            <input onChange={(e)=> setImage(e.target.files[0])} type="file" id='image' hidden required />
          </label>
        </div>

        <div className="mb-6">
          <label className='text-xs font-semibold uppercase tracking-widest text-[var(--color-text-main)] mb-2 block'>Article Title</label>
          <input type="text" placeholder='Enter a compelling title...' required  className='w-full p-4 border border-[var(--color-border)] bg-[var(--color-background)] outline-none rounded-sm text-[var(--color-text-main)] focus:border-[var(--color-text-main)] transition-colors font-editorial text-xl' onChange={e=> setTitle (e.target.value)} value={title}/>
        </div>

        <div className="mb-6">
          <label className='text-xs font-semibold uppercase tracking-widest text-[var(--color-text-main)] mb-2 block'>Subtitle / Excerpt</label>
          <input type="text" placeholder='A brief summary of your piece...' required  className='w-full p-3 border border-[var(--color-border)] bg-[var(--color-background)] outline-none rounded-sm text-[var(--color-text-main)] focus:border-[var(--color-text-main)] transition-colors text-sm' onChange={e=> setSubTitle (e.target.value)} value={subTitle}/>
        </div>

        <div className="mb-8 relative">
          <div className="flex justify-between items-center mb-2">
            <label className='text-xs font-semibold uppercase tracking-widest text-[var(--color-text-main)] block'>Body Content</label>
            <button disabled={loading} type='button' onClick={generateContent} className='text-xs font-medium text-[var(--color-primary)] hover:text-[var(--color-text-main)] transition-colors cursor-pointer flex items-center gap-1'>
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]"></span> Generate Draft with AI
            </button>
          </div>
          <div className='h-96 relative border border-[var(--color-border)] rounded-sm overflow-hidden bg-white group focus-within:border-[var(--color-text-main)] transition-colors'>
            <div ref={editorRef} className='h-full border-0'></div>
            {loading && ( <div className='absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center z-10'>
              <div className='w-8 h-8 rounded-full border-2 border-[var(--color-text-muted)] border-t-[var(--color-text-main)] animate-spin'></div>
            </div>)}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pt-6 border-t border-[var(--color-border)]">
          <div>
            <label className='text-xs font-semibold uppercase tracking-widest text-[var(--color-text-main)] mb-2 block'>Category</label>
            <select onChange={e => setCategory(e.target.value)} name="category" className='w-48 px-4 py-2.5 border border-[var(--color-border)] bg-[var(--color-background)] outline-none rounded-sm text-[var(--color-text-main)] text-sm cursor-pointer'>
              <option value="">Select category</option>
              {blogCategories.map((item, index)=>{
                return  <option key={index} value={item}>{item}</option>
              } )}
            </select>
          </div>
          
          <div className='flex items-center gap-6'>
            <label className='flex items-center gap-2 cursor-pointer'>
              <input type="checkbox" checked={isPublished} className='w-4 h-4 cursor-pointer accent-[var(--color-text-main)]' onChange={e => setIsPublished(e.target.checked)} />
              <span className="text-sm font-medium text-[var(--color-text-main)]">Publish immediately</span>
            </label>
            <button disabled={isAdding} type='submit' className='px-8 py-3 bg-[var(--color-text-main)] text-white font-medium tracking-wide text-sm rounded-sm cursor-pointer hover:bg-[var(--color-primary)] transition-all shadow-[var(--shadow-editorial-sm)]'>
              {isAdding ? 'Saving...' : 'Save Article'}
            </button>
          </div>
        </div>

      </form>
    </div>
  );
}

export default AddBlog;

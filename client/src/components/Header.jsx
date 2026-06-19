import React from 'react';
import { assets } from '../assets/assets';
import { useAppContext } from '../context/AppContext';
import { useRef } from 'react';
// Import framer-motion for animations
import { motion } from 'framer-motion';

function Header() {
  const { setInput, input } = useAppContext();
  const inputRef = useRef();

  const onsubmitHandler = async (e) => {
    e.preventDefault();
    if (inputRef.current.value.trim() !== '') {
      setInput(inputRef.current.value);
    }
  };

  const onClear = () => {
    setInput('');
    if (inputRef.current) inputRef.current.value = '';
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }, // Apple-style easing
    },
  };

  return (
    <div className='w-full relative px-6 sm:px-12 xl:px-24 pt-20 sm:pt-32 pb-16 sm:pb-24 border-b border-[var(--color-border)]'>
      <motion.div
        className='max-w-4xl mx-auto'
        variants={containerVariants}
        initial='hidden'
        animate='visible'
      >
        <motion.div variants={itemVariants} className="mb-6 flex">
          <span className='inline-flex items-center gap-2 px-3 py-1 border border-[var(--color-border)] rounded-full text-xs font-medium text-[var(--color-text-muted)] tracking-wide uppercase bg-[var(--color-surface)]'>
            <span>Introducing Aureon</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]"></span>
          </span>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className='font-editorial text-5xl sm:text-7xl lg:text-8xl font-bold leading-[1.1] text-[var(--color-text-main)] tracking-tight mb-8'
        >
          Curated thoughts<br/>
          <span className='italic font-light text-[var(--color-text-muted)]'>for the modern mind.</span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className='max-w-2xl text-lg sm:text-xl text-[var(--color-text-muted)] leading-relaxed mb-12 font-light'
        >
          A sanctuary for uninterrupted reading and deliberate writing. Discover essays, stories, and ideas crafted with care and designed to endure.
        </motion.p>

        <motion.div variants={itemVariants} className="max-w-xl">
          <form
            onSubmit={onsubmitHandler}
            className='flex items-center border border-[var(--color-border)] bg-[var(--color-surface)] rounded-sm focus-within:border-[var(--color-text-main)] transition-colors duration-300'
          >
            <input
              ref={inputRef}
              type='text'
              placeholder='Search essays, topics, or authors...'
              required
              className='flex-1 px-5 py-4 outline-none text-[var(--color-text-main)] placeholder-[var(--color-text-muted)] text-sm sm:text-base bg-transparent'
            />
            <button
              type='submit'
              className='bg-[var(--color-text-main)] text-white px-8 py-4 text-sm font-medium tracking-wide hover:bg-[var(--color-primary)] transition-colors duration-300'
            >
              Search
            </button>
          </form>

          {input && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className='mt-4 flex items-center gap-2'
            >
              <span className='text-sm text-[var(--color-text-muted)]'>Showing results for <strong className="text-[var(--color-text-main)]">"{input}"</strong></span>
              <button
                onClick={onClear}
                className='text-xs font-medium text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] underline underline-offset-4 transition-colors'
              >
                Clear
              </button>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Header;
import React from 'react';
import { motion } from 'framer-motion';

const Loader = () => {
  return (
    <div className='flex justify-center items-center min-h-screen bg-[var(--color-background)]'>
      <motion.div 
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        className='flex items-center gap-3'
      >
        <span className='w-2 h-2 rounded-full bg-[var(--color-text-main)] block'></span>
        <span className='font-editorial text-lg italic text-[var(--color-text-main)] tracking-widest'>Aureon.</span>
      </motion.div>
    </div>
  );
}

export default Loader;

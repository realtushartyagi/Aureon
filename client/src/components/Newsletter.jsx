import React from 'react';

function Newsletter() {
  return (
    <div className='flex flex-col items-center justify-center text-center py-24 px-6 mb-12 border-y border-[var(--color-border)] bg-[var(--color-surface)]'>
      <div className="max-w-2xl w-full">
        <h2 className='font-editorial text-3xl sm:text-4xl font-bold text-[var(--color-text-main)] mb-4 tracking-tight'>
          The Weekly Dispatch
        </h2>
        <p className='text-base sm:text-lg text-[var(--color-text-muted)] font-light mb-10'>
          A curated selection of our finest essays, delivered to your inbox every Sunday.
        </p>
        <form className='flex flex-col sm:flex-row items-stretch justify-center max-w-lg mx-auto gap-4 sm:gap-0'>
          <input 
            className='flex-1 border border-gray-300 sm:border-r-0 rounded-sm sm:rounded-r-none px-5 py-3 outline-none focus:border-[var(--color-text-main)] transition-colors text-[var(--color-text-main)] placeholder-[var(--color-text-muted)]' 
            type="email" 
            placeholder='Your email address' 
            required 
          />
          <button 
            type='submit' 
            className='px-8 py-3 bg-[var(--color-text-main)] text-white font-medium text-sm tracking-wide rounded-sm sm:rounded-l-none hover:bg-[var(--color-primary)] transition-colors duration-300'
          >
            Subscribe
          </button>
        </form>
        <p className="text-xs text-gray-400 mt-6">No spam. Unsubscribe at any time.</p>
      </div>
    </div>
  );
}

export default Newsletter;

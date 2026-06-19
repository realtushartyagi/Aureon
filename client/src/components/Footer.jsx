import React from 'react';
import { assets, footer_data } from '../assets/assets';

const Footer = () => {
  return (
    <footer className='border-t border-[var(--color-border)] bg-[var(--color-surface)]'>
      <div className='max-w-7xl mx-auto px-6 sm:px-12 xl:px-24 py-16'>
        <div className='flex flex-col md:flex-row items-start justify-between gap-12 md:gap-24 mb-16'>
          <div className='md:w-1/3'>
            <h2 className='font-editorial text-3xl font-bold tracking-tight text-[var(--color-text-main)] mb-6'>
              Aureon.
            </h2>
            <p className='text-sm text-[var(--color-text-muted)] leading-relaxed'>
              A sanctuary for uninterrupted reading and deliberate writing. We believe in the power of words to shape minds, spark ideas, and foster meaningful connections in a noisy world.
            </p>
          </div>
          <div className='flex flex-wrap md:flex-nowrap justify-between w-full md:w-2/3 gap-8 sm:gap-12'>
            {footer_data.map((section, index)=> (
                <div key={index} className='w-[45%] sm:w-auto'>
                    <h3 className='font-semibold text-xs uppercase tracking-widest text-[var(--color-text-main)] mb-6'>
                      {section.title}
                    </h3> 
                    <ul className='space-y-3'>
                        {section.links.map((link, i)=> (
                            <li key={i}>
                                <a href="#" className='text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors duration-200'>
                                  {link}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
          </div>
        </div>
        <div className='pt-8 border-t border-[var(--color-border)] flex flex-col sm:flex-row justify-between items-center gap-4'>
          <p className='text-xs text-[var(--color-text-muted)]'>
            &copy; {new Date().getFullYear()} Aureon. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-[var(--color-text-muted)]">
            <a href="#" className="hover:text-[var(--color-primary)] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[var(--color-primary)] transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

import React from 'react';
import { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import {toast} from "react-hot-toast"

const Login = () => {

    const {axios, setToken} = useAppContext('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) =>{
        e.preventDefault()
        try {
          const {data} = await axios.post('/api/admin/login', {email, password})

          if(data.success){
            setToken(data.token)
            localStorage.setItem('token', data.token)
            axios.defaults.headers.common['Authorization'] = data.token;
          }
          else{
            toast.error(data.message)
          }
        } catch (error) {
          toast.error(error.message)
        }
    }

  return (
    <div className='flex items-center justify-center min-h-screen bg-[var(--color-background)] px-4'>
      <div className='w-full max-w-md p-8 sm:p-12 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-sm shadow-[var(--shadow-editorial-md)]'>
        <div className='flex flex-col items-center justify-center'>
            <div className='w-full text-center mb-8'>
                <h1 className='text-3xl font-editorial font-bold text-[var(--color-text-main)] mb-2'>Aureon.</h1>
                <p className='text-sm text-[var(--color-text-muted)] tracking-wide uppercase'>Workspace Login</p>
            </div>
            <form onSubmit={handleSubmit} className='w-full'>
                <div className='flex flex-col mb-5'>
                    <label className='text-xs font-semibold uppercase tracking-widest text-[var(--color-text-main)] mb-2'>Email Address</label>
                    <input 
                      onChange={e=> setEmail(e.target.value)} 
                      value={email}
                      type="email" 
                      required 
                      placeholder='name@example.com' 
                      className='border border-[var(--color-border)] p-3 outline-none focus:border-[var(--color-text-main)] transition-colors rounded-sm text-sm' 
                    />
                </div>

                <div className='flex flex-col mb-8'>
                    <label className='text-xs font-semibold uppercase tracking-widest text-[var(--color-text-main)] mb-2'>Password</label>
                    <input 
                      onChange={e=> setPassword(e.target.value)} 
                      value={password}
                      type="password" 
                      required 
                      placeholder='••••••••' 
                      className='border border-[var(--color-border)] p-3 outline-none focus:border-[var(--color-text-main)] transition-colors rounded-sm text-sm' 
                    />
                </div>
                <button type='submit' className='w-full py-3 font-medium bg-[var(--color-text-main)] text-white rounded-sm cursor-pointer hover:bg-[var(--color-primary)] transition-all tracking-wide text-sm'>
                  Sign In
                </button>
            </form>
        </div>
      </div>
    </div>
  );
}

export default Login;

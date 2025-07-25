import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const [state, setState] = useState('Sign Up');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { backendUrl, setIsLoggedIn, getUserData } = useContext(AppContext);

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      axios.defaults.withCredentials = true;
      if (state == 'Sign Up') {
        const { data } = await axios.post(backendUrl + '/api/auth/register', { name, email, password });
        if (data.success) {
          setIsLoggedIn(true)
          getUserData()
          toast.success(data.message)
        } else {
          toast.error(data.message)
        }
      } else {
        const { data } = await axios.post(backendUrl + '/api/auth/login', { email, password });
        if (data.success) {
          setIsLoggedIn(true)
          getUserData()
          navigate('/')
        } else {
          toast.error(data.message)
        }
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const navigate = useNavigate();
  return (
    <div className='flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400 '>
      <img src={assets.logo} alt="logo" onClick={() => navigate("/")} className='absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer' />
      <div className='bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300  text-sm'>
        <h2 className='text-3xl font-semibold text-white  text-center mb-3 '>{state === 'Sign Up' ? 'Create Account' : 'Login'}</h2>
        <p className='text-center text-sm mb-6 '>{state === 'Sign Up' ? 'Create your account' : 'Login to your account!'}</p>
        <form onSubmit={onSubmitHandler}>

          {state == 'Sign Up' && (<div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C] text-white '>
            <img src={assets.person_icon} alt="erson_icon" />
            <input type="text" placeholder='Full Name ' required value={name} onChange={(e) => setName(e.target.value)} />
          </div>)}


          <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C] text-white '>
            <img src={assets.mail_icon} alt="mail_icon" />
            <input type="email" placeholder='Full Email ' required value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C] text-white '>
            <img src={assets.lock_icon} alt="lock_icon" />
            <input type="password" placeholder='Password ' required value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>

          <p className='mb-4 text-indigo-500 cursor-pointer' onClick={() => navigate("/reset-password")} >forget password? </p>
          <button className='w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900' >{state}</button>
        </form>

        {state === 'Sign Up' ? (
          <p className='mt-4 text-gray-400  text-center text-xs '>Don't have any account?{'  '}
            <span className='text-blue-400 cursor-pointer underline' onClick={() => { setState('Login') }}>Login here </span>
          </p>

        ) : (
          <p className='mt-4 text-gray-400  text-center text-xs '>Already have an account ?{'  '}
            <span className='text-blue-400 cursor-pointer underline' onClick={() => { setState('Sign Up') }}>Sign up</span>
          </p>
        )}



      </div>
    </div>
  )
}

export default Login

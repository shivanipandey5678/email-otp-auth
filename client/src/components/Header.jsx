import React, { useContext } from 'react'
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Header = () => {
    const navigate=useNavigate();
    const {userData} = useContext(AppContext);
  return (
    <div className='flex flex-col items-center mt-10 px-4 text-center' >
      <img src={assets.header_img} alt="header_img" className='w-36 h-36 rounded-full mb-6'/>
      <h1 className='flex items-center gap-2 text-xl sm:text-3xl font-medium mb-2'>Hey {userData?userData.name:'Developer'}!  <img className='w-8 aspect-square' src={assets.hand_wave} alt="hand_wave" /></h1>
      <h2 className='text-3xl sm:5xl font-semibold mb-4 '>Welcome to our app</h2>
      <p className='mb-8 max-w-md'>Let's start with a quick product tour andd we will have you up and running in no time!</p>
      <button className='border border-gray-500 rounded-full px-8 py-2.5 hover:bg-gray-100 transition-all ' onClick={()=>navigate('/login')}>Get started</button>
    </div>
  )
}

export default Header

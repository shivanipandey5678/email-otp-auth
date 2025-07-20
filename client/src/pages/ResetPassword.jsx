import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AppContext } from '../context/AppContext';
import axios from 'axios';

const ResetPassword = () => {
  const { backendUrl, getUserData, isLoggedIn, userData } = useContext(AppContext);
  axios.defaults.withCredentials = true;
  const [email, setEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [isEmailSent, setIsEmailSent] = useState('')
  const [otp, setOtp] = useState(0)
  const [isOtpSubmited, setIsOtpSubmited] = useState(false)


  const navigate = useNavigate();
  const useRefs = React.useRef([]);

  const moveToNextField = (e, i) => {
    if (useRefs.current.length - 1 > i && e.target.value.length > 0) {
      useRefs.current[i + 1].focus();
    }
  }

  const moveToPrevField = (e, i) => {
    if (i > 0 && e.target.value === '' && e.key === "Backspace") {
      useRefs.current[i - 1].focus()
    }
  }

  const printOtp = (e) => {
    const otp = e.clipboardData.getData('text');
    const otpArray = otp.split('');
    otpArray.forEach((el, i) => {
      if (useRefs.current[i]) {
        useRefs.current[i].value = el;
      }

    });
  };

  const onSubmitEmail=async(e)=>{
    e.preventDefault();
    try {
      const {data}=await axios.post(backendUrl+'/api/auth/send-reset-otp',{email})
      data.success?toast.success(data.message):toast.error(data.message);
      data.success && setIsEmailSent(true);
    } catch (error) {
      toast.error(error.message);
    }
  }

  const onSubmitOtp=async(e)=>{
    e.preventDefault();
    const otpArray=useRefs.current.map((e)=>e.value)
    setOtp(otpArray.join(''))
    setIsOtpSubmited(true);
  
  }

  const onSubmitNewPassword=async(e)=>{
    e.preventDefault();
    try {
      const {data}=await axios.post(backendUrl+'/api/auth/reset-password',{email,otp,newPassword});
      data.success?toast.success(data.message):toast.error(data.message);
      data.success && navigate('/login')
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-purple-100 to-purple-400 w-full flex justify-center items-center '>
      <img onClick={() => navigate('/')} src={assets.logo} alt="logo" className='absolute top-4 left-5 w-30 sm:w-32 cursor-pointer' />

      {!isEmailSent &&
        <form onSubmit={onSubmitEmail} className='bg-slate-900 p-10 rounded-md  flex flex-col items-center gap-4 sm:w-94 w-100 text-white'>
          <h2 className='text-2xl font-semibold sm:text-2xl'>Reset password</h2>
          <p className='text-sm text-indigo-400'>Enter your registered email address</p>
          <div className='mb-2 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C] text-white '>
            <img src={assets.mail_icon} alt="" />
            <input type="email" placeholder='Email id' className='bg-transparent outline-none text-white' value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>

          <button className='w-full rounded-full bg-gradient-to-r from-indigo-600 to-indigo-900 text-sm px-5 py-2.5 text-black '>Submit</button>
        </form>
      }



      {/* //otp input form */}

      {!isOtpSubmited && isEmailSent &&

        <form className='bg-slate-900 p-10 rounded-md  flex flex-col items-center gap-4 sm:w-94 w-100 text-white'>
          <h2 className='text-2xl font-semibold sm:text-2xl'>Password Reset OTP</h2>
          <p className='text-sm text-indigo-400'>Enter the 6-digit code sent to your email id</p>
          <div className='flex gap-1 mt-1' onPaste={printOtp}> {
            Array(6).fill(0).map((_, i) => (
              <input type="text" maxLength='1' className='w-9 h-9 text-xl text-white rounded  bg-slate-400  flex justify-center items-center text-center' key={i} onKeyDown={(e) => { moveToPrevField(e, i) }} onChange={(e) => { moveToNextField(e, i) }} ref={(el) => { useRefs.current[i] = el }} />
            ))
          }</div>

          <button className='w-full rounded-full bg-gradient-to-r from-indigo-600 to-indigo-900 text-sm px-5 py-2.5 mt-2 text-black' onClick={onSubmitOtp} >Submit</button>
        </form>
      }

      {/* enter new password */}

      {isOtpSubmited && isEmailSent &&
        <form onSubmit={onSubmitNewPassword} className='bg-slate-900 p-10 rounded-md  flex flex-col items-center gap-4 sm:w-94 w-100 text-white'>
          <h2 className='text-2xl font-semibold sm:text-2xl'>New password</h2>
          <p className='text-sm text-indigo-400'>Enter the new password below</p>
          <div className='mb-2 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C] text-white '>
            <img src={assets.lock_icon} alt="" />
            <input type="password" placeholder='new password' className='bg-transparent outline-none text-white' value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
          </div>

          <button className='w-full rounded-full bg-gradient-to-r from-indigo-600 to-indigo-900 text-sm px-5 py-2.5 text-black '>Submit</button>
        </form>
      }



    </div>
  )
}

export default ResetPassword

import React ,{useContext,useEffect} from 'react'
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AppContext } from '../context/AppContext';
import axios from 'axios';



const EmailVerify = () => {
  const {backendUrl,getUserData,isLoggedIn,userData}=useContext(AppContext)
   const navigate=useNavigate();
   const useRefs=React.useRef([]);
   axios.defaults.withCredentials=true;

   const moveToNextField=(e,i)=>{
      if(useRefs.current.length-1>i  && e.target.value.length>0 ){
        useRefs.current[i+1].focus();
      }
    }

   const moveToPrevField=(e,i)=>{
    if(i>0  && e.target.value==='' && e.key==="Backspace"){
    useRefs.current[i-1].focus()
    }
 }

 const printOtp=(e)=>{
  const otp=e.clipboardData.getData('text');
  const otpArray=otp.split('');
  otpArray.forEach((el,i)=>{
    if(useRefs.current[i]){
      useRefs.current[i].value=el;
    }
   
  });
 };



 const handleSubmit=async(e)=>{
 
  try {
    e.preventDefault();
    const otpArray=useRefs.current.map((el)=>el.value);
     const otp = otpArray.join('')
    const {data}=await axios.post(backendUrl+'/api/auth/verify-account',{otp});
    console.log(data)
    if(data.success){
      toast.success('email verified')
      getUserData();
      navigate('/')
    }else{
      toast.error(data.message)
    }
  } catch (error) {
    toast.error(error.message)
  }
 }

 useEffect(()=>{
  console.log("Login:", isLoggedIn);
  console.log("UserData:", userData);

  if(isLoggedIn && userData?.isAccountVerified){
    navigate('/')
  }

 },[isLoggedIn,userData])

  return (
    <div className='min-h-screen bg-gradient-to-br from-purple-100 to-purple-400 w-full flex justify-center items-center '>
      <img onClick={()=>navigate('/')} src={assets.logo} alt="logo" className='absolute top-4 left-5 w-30 sm:w-32 cursor-pointer' />
      <div className='bg-slate-900 p-10 rounded-md  flex flex-col items-center gap-4 sm:w-94 w-100 text-white'>
         <h2 className='text-2xl font-semibold sm:text-2xl'>Email Verify OTP</h2>
         <p className='text-sm text-indigo-400'>Enter the 6-digit code sent to your email id</p>
         <div className='flex gap-1 mt-1' onPaste={printOtp}> {
          Array(6).fill(0).map((_,i)=>(
             <input type="text" maxLength='1' className='w-9 h-9 text-xl text-white rounded  bg-slate-400  flex justify-center items-center text-center' key={i}  onKeyDown={(e)=>{moveToPrevField(e,i)}} onChange={(e)=>{moveToNextField(e, i)}} ref={(el)=>{useRefs.current[i]=el}}/>
          ))
         }</div>

        <button className='w-full rounded-full bg-gradient-to-r from-indigo-600 to-indigo-900 text-sm px-5 py-2.5 mt-2 text-black' onClick={handleSubmit} >Verify Email</button>
      </div>
       
    </div>
  )
}

export default EmailVerify

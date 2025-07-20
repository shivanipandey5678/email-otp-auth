import React, { useContext } from 'react'
import {assets} from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
const NavBar = () => {

    const navigate=useNavigate();
    const {userData,backendUrl,setUserData,setIsLoggedIn} = useContext(AppContext);
    
    const sendVerificationOtp =async (req,res)=>{
        try {
            axios.defaults.withCredentials=true;
            const {data}=await axios.post(backendUrl+'/api/auth/send-verify-otp');
            if(data.success){
                
                navigate('/email-verify')
                toast.success(data.message)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    const logout =async()=>{
        try {
            axios.defaults.withCredentials=true;
            const {data}=await axios.post(backendUrl+'/api/auth/logout');
            if(data.success){
                setIsLoggedIn(false)
                setUserData(false)
                navigate('/')
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
  return (
    <div className='w-full flex justify-between items-center p-4 sm:p-8'>
       <img src={assets.logo} alt="logo"  className='w-28 sm:w-32'/>
       {userData?(
        <div className='w-8 h-8 flex justify-center items-center rounded-full bg-black text-white relative group '>{userData.name[0].toUpperCase()} <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-10'>
            <ul className='list-none m-0 p-2 bg-gray-100 text-sm w-max'>
                {!userData.isAccountVerified && <li className='py-1 px-2 hover:bg-gray-200 cursor-pointer' onClick={sendVerificationOtp}>Verify Email</li>}
                
                <li className='py-1 px-2 hover:bg-gray-200 cursor-pointer' onClick={logout}>Logout</li>
            </ul>
            </div>
        </div>
       ):(
        <button className='flex items-center gap-2 border border-gray-500 px-6 py-2 rounded-full text-gray-800 hover:bg-gray-100' onClick={()=>{navigate("/login")}}>Login <img src={assets.arrow_icon} alt="" /></button>
       )}
      
    </div>
  )
}

export default NavBar

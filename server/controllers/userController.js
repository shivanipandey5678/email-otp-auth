import User from "../models/userModel.js";

export const getUserData=async(req,res)=>{
    try {
        const {userId}=req;
        console.log({userId})
        const existUser=await User.findById(userId);
        if(!existUser){
            return res.json({success:false,message:'user not found!'})
        }
        res.json({success:true,userData:{name:existUser.name,isAccountVerified:existUser.isAccountVerified}})
    } catch (error) {
        res.json({success:false,message:error.message,key:"beta "})
    }
}
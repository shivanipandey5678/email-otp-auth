import jwt from 'jsonwebtoken';

const Auth=async(req,res,next)=>{
     const {token}=req.cookies;
    //  console.log('1')
     if(!token){
        return res.json({message:'Missing token,Login again',success:false})
        // console.log('2')
     }
     try {
        const decoded=jwt.verify(token,process.env.JWT_ACCESS_TOKEN);
        if(decoded.id){
            // console.log(decoded)
            // console.log("3")
           
            req.userId = decoded.id;  
            // console.log({req})   
            // console.log("id",req.userId)
            req.body = req.body || {};    
            req.body.userId = decoded.id; 
          
            // console.log("4")
        }else{
            return res.json({success:false,message:'Not Authorized,Login again'});
            // console.log("5")
        }
        next();
        // console.log("6")
     } catch (error) {
        res.json({success:false,message:error.message})
        // console.log("7")

     }
}
export default Auth;
const jwt=require('jsonwebtoken');
const { RESPONSE_SENDER } = require('./RESPONSE_SENDER');

const setJWTToken=async(res,status,user)=>{
    if(!user?._id){
            return RESPONSE_SENDER(res,401,{message:'user NOt Found'})
    }

   const token=  await jwt.sign({id:user?._id},process.env.JWT_SECRET,{algorithm:'HS256',expiresIn:'7d'})

   console.log(token);
   if (!token) {
    return RESPONSE_SENDER(res,401,{message:'token not set'})

   }
//    return RESPONSE_SENDER(res,200,{user,token})
if (process.env.NODE_ENV==='Development') {
    
    return res.status(200)
        .cookie('babu', token, {
            maxAge: 24*60 * 60 * 1000, 
            httpOnly: true,
            path: "/",
            secure: process.env.NODE_ENV==="Production", 
            sameSite: "strict",
        })
        .json({ success: true,user });
}else{
    
    return res.status(200)
        .cookie('babu', token, {
            maxAge: 24*60 * 60 * 1000, 
            httpOnly: true,
            path: "/",
            secure: process.env.NODE_ENV==="Production", 
            sameSite: "strict",
        })
        .json({ success: true });

}
}

module.exports=setJWTToken
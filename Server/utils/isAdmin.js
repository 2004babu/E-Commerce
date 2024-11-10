const {RESPONSE_SENDER} =require('./RESPONSE_SENDER')
module.exports=async(req,res,next)=>{
try {
    
    const {_id:userId}=req.user
    console.log(req?.user?.Role);
    
    if (!userId ||req.user.Role!=='Admin') {
        return RESPONSE_SENDER(res,401,{message:"error in isAdmin "},{message:'your Not Authorized Person do Access Admin access '})   
    }
    
    next()
} catch (error) {
    console.log(error);
    return RESPONSE_SENDER(res,401,{message:"error in isAdmin ",error},{message:'your Not Authorized Person do Access Admin access '})   
    
    
}
}
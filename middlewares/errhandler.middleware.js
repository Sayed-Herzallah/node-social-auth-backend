errmiddleware=(err,req,res,next)=>{
    console.error(err.stack);
    res.status(500)
    .json({message:"server error form middleware",error:err.message})
};
module.exports={errmiddleware}

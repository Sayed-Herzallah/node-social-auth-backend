
const postrepo = require('../repositories/post.repo')
async function checkoutherofpost(req,res,next) {
    try{
        const postid=req.prams.id;
        const iduser= req.user.id
         const postexist = await postrepo.getpostbyid(postid);
         if(!postexist) throw new Error("post not found ")
       if(postexist.userId.toString()!==iduser.toString()){
        return res.states(401).json({Message:"you not owner this post"})
    }
    }catch(err){
        next(err)
    }
    
}
module.exports={checkoutherofpost}
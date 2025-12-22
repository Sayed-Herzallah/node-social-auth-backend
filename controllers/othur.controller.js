const othurservice = require('../services/othur.service');
const jwtcreate = require('../services/jwt');
const jwtex=process.env.jwt_exp||'1h'
const CONFIRM_EXPIRE = process.env.CONFIRM_EXPIRE || '24h'; // can be "24h"
const RESET_EXPIRE = process.env.RESET_EXPIRE || '10m'; // token expiry for reset
 async function register(req,res,next) {
    try {
        datauser=req.body
      const user = await othurservice.regster(datauser)
      const token = jwtcreate.sign({id:user._id,email:user.email},jwtex)
      const confirmtoken = jwtcreate.sign({id:user._id,email:user.email},CONFIRM_EXPIRE)
      const hamde= othurservice.sendconfirmemail(user,confirmtoken);
      console.log(hamde);
        return res.status(201).json({user,token})
    } catch (error) {
        next(error)
    } 
 }
  async function login(req,res,next) {
    try {
        datauser = req.body
        const existuser= await othurservice.login(datauser)
       const token = jwtcreate.sign({id:existuser._id,email:existuser.email},jwtex)
         return res.status(201).json({existuser,token})
    } catch (error) {
        next(error)
    }
  }
    async function confirmEmail(req, res, next) {
  try {
   const  payload=req.user
    await othurservice.confirmEmail(payload);
    // you can redirect to frontend success page instead
    return res.status(200).json({ message: 'email confirmed successfully' });
  } catch (err) {
    next(err);
  }
}
async function requestReset(req, res, next) {
  try {
    const { email } = req.body;
    await othurservice.requestPasswordReset(email);
    return res.status(200).json({ message: 'reset email sent if account exists' });
  } catch (err) {
    next(err);
  }
}
async function resetPassword(req, res, next) {
  try {
    const payload=req.user
    const newPassword = req.body.newPassword
    const confirmPassword=req.body.confirmPassword
    await othurservice.resetPassword(payload, newPassword, confirmPassword);
    return res.status(200).json({ message: 'password reset successful' });
  } catch (err) {
    next(err);
  }
}

module.exports={register,login,confirmEmail,requestReset,resetPassword}
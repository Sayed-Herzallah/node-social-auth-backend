const userrepo = require('../repositories/user.repo');
const emailService = require('./email.service');
const jwtcreate = require('../services/jwt');
const RESET_EXPIRE = process.env.RESET_EXPIRE || '10m';
async function regster({username,email,password,age,confirmpassword}) {
    const existuser = await userrepo.findbyemail(email);
    if(existuser) throw Error("email already exist")
     const newuser = await userrepo.createuser({username,email,password,age,confirmpassword})
    return newuser
}
async function login({email,password}){
  const existuser = await userrepo.findbyemail(email);
   if( !existuser) throw Error("user not found")
    const okpassword= await bcrypt.compare(password,existuser.password);
     if( !okpassword) throw Error("invaild data")
    return existuser
}

async function sendconfirmemail(newuser,confirmtoken) {
const confirmUrl = `${'http://localhost:' + (process.env.PORT||8000)}/
  auth/confirm-email?token=${confirmtoken}`;
    // send email (fire-and-forget)
  await emailService.sendEmail({
    to: newuser.email,
    subject: 'Please confirm your email',
    html: emailService.confirmationEmailTemplate({ username: newuser.username, confirmUrl })
  });
  return console.log({ user: newuser, confirmToken: confirmtoken })  ;
}
async function confirmEmail(user) {
  const userId = user.id;
  const existUser = await userrepo.findbyid(userId);
  if (!existUser) throw new Error('user not found');
  existUser.emailConfirmed = true;
  await userrepo.save(existUser);
  return existUser;
}
async function requestPasswordReset(email) {
  const user = await userrepo.findbyemail(email);
  if (!user) throw new Error('user not found');
  const token = jwtcreate.sign({id:user._id,email:user.email},RESET_EXPIRE)
  const port = process.env.PORT || 8000;
  const resetUrl = `http://localhost:${port}/auth/reset-password?token=${token}`;

  await emailService.sendEmail({
    to: user.email,
    subject: 'Password reset request',
    html: emailService.resetPasswordTemplate({ username: user.username, resetUrl })
  });
  return { message: 'reset email sent' };
}

async function resetPassword(payload, newPassword, confirmPassword) {
  const user = await userrepo.findById(payload.id);
  if (!user) throw new Error('user not found');
  user.password = newPassword;
  user.confirmpassword = confirmPassword; // pre-save hook should clear this
  await userrepo.save(user);
  return { message: 'password reset successful' };
}

module.exports={regster,login,sendconfirmemail,confirmEmail,requestPasswordReset,resetPassword}
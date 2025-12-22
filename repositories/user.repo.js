const user = require('../models/user.model');
async function createuser(userdata){
     const newuser= new user(userdata);
     return newuser.save();
};
async function findbyemail(email){
    return user.findOne({email})
}
async function findbyid(id){
    return user.findById(id)
}
 //updateuser
 async function getallusers(){
    return user.find();
 }
 //delateuser
 async function save(userDocument) {
  return userDocument.save();
}

 module.exports={createuser,findbyid,findbyemail,getallusers,save}
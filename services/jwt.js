const jwt = require('jsonwebtoken');
const jwtsec= process.env.SECRET
function sign(payload,exdata){
    return jwt.sign(payload,jwtsec,{expiresIn:exdata})
}
module.exports={sign}

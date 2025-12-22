const mongoose = require('mongoose')
module.exports= async function concectdb(){
    const url= process.env.MONGO_URI;
    if(!url) throw new Error("concection not found")
        await mongoose.connect(url);
    console.log("conected Data Base");
}
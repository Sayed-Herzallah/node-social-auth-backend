const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User',  
         required:[true,'userid is required'],
         validate:{
            validator: async function(v) {
                const user= mongoose.model('User')
                const existuser = await user.exists({_id:v});
                return !!existuser  
            },
            message:'user not eisxt'
         }
         },
title: { type: String,   required:[true,'title is required'], unique: true },
body: { type: String,   required:[true,'body is required'] }
}, { timestamps: true });
module.exports = mongoose.model('Post', postSchema);
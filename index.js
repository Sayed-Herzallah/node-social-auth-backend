const dotenv = require('dotenv');
dotenv.config({path:'./config.env'});
const connectdb=require('./db');
const app = require('./app')
const port = process.env.port||8000;
connectdb()
.then(()=>{
    app.listen(port,'127.0.0.1',()=>{
        console.log(`server running on http 127.0.0.1 on port${port}`)
    });
})
.catch(err=>{
    console.error(" can not start app ",err)
});
    

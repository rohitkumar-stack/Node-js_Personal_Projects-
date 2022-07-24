const mongoose = require("mongoose"); 

const DB = "mongodb+srv://admin:admin123@cluster0.k7zcn.mongodb.net/mernstack?retryWrites=true&w=majority"


mongoose.connect(DB,{
     useNewUrlParser:true,
     useUnifiedTopology:true,
 }).then(()=> console.log("connection start")).catch((error)=> console.log(error.message));
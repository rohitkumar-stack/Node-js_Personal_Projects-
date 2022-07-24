const express = require("express");
const router = express.Router();
const users = require("../models/userSchema");


/*router.get("/", (req, res)=>{
     console.log("connect");
});*/

// Start Add Userdata Api 
     router.post("/register",async(req,res) =>{
          //console.log(req.body);

          const {name, email, age, mobile, work, add, desc} = req.body;

          if(!name || !email || !age || !mobile || !work || !add || !desc){
               res.status(422).send("plz fill the data");
          }

          try {
               const preuser = await users.findOne({email:email});
               console.log(preuser);

               if(preuser){
                    res.status(422).send("this is emailuser is already present");
               }
               else{
                    const adduser = new users({
                         name, email, age, mobile, work, add, desc
                    });

                    await adduser.save();
                    res.status(201).json(adduser);
                    console.log(adduser);
               }
               
          } catch (error) {
               res.status(422).send(error)
               
          }
     })   
// End Add Userdata Api 


//Start Get UserData Api
router.get("/getdata", async(req, res) =>{
     try{
          const userdata = await users.find();
          res.status(201).json(userdata);
          console.log(userdata);
     } catch (error){
          res.status(422).json(error);

     }
})
//End Get UserData Api

//Start Get One UserData help of ID Api
router.get("/getuser/:id", async(req, res) =>{
     try {
          console.log(req.params);
          const {id} = req.params;

          const usergetdata = await users.findById({_id:id});
          console.log(usergetdata);
          res.status(201).json(usergetdata);

     } catch (error) { 
          res.status(422).json(error);
     }
})
//End Get One UserData help of ID Api

//Start Update UserData Api
router.patch("/updateuser/:id", async(req, res)=>{
     try {
          const {id} = req.params;

          const updateuser = await users.findByIdAndUpdate(id, req.body, {
               new:true
          });

          console.log(updateuser);
          res.status(201).json(updateuser);
          
     } catch (error) {
          res.status(422).json(error); 
     }
})
//End Update UserData Api

//Start Delete UserData Api

router.delete("/deleteuser/:id",async(req,res)=>{
     try {
         const {id} = req.params;
 
         const deletuser = await users.findByIdAndDelete({_id:id})
         console.log(deletuser);
         res.status(201).json(deletuser);
 
     } catch (error) {
         res.status(422).json(error);
     }
 })




module.exports = router;
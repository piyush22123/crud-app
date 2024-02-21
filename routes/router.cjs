const express = require("express");
const router = express.Router();
const users = require("../models/userSchema.cjs")

// router.get("/",(req,res)=>{
//     console.log.apply("connect");
// });


// register user 
router.post("/register",async(req,res)=>{
    // console.log(req.body);
    // store the user data in const variable
    const {name,email,age,mobile,work,address,description} = req.body; // another way is to make for every like name.req.body etc
    // if any of the data is not filled by user the throw error message
    if(!name || !email || !age || !mobile || !work || !address || !description){
        res.status(422).json("please fill the data");
    }
    try{
        const preuser = await users.findOne({email:email}) // mongodb method to check if current email is already present in database
        console.log(preuser);
        // if user is already in database then throw error message with 404 code
        if(preuser){
            res.status(422).json("User is already present");
        }
        // else store thier data in the database
        else{
            const adduser = new users({
                name,email,age,mobile,work,address,description
            });

            await adduser.save(); // save the data in the database
            res.status(201).json(adduser); // send user a respons with 201 code
            console.log(adduser);
        }
    }
    // if any error occure then throw error message with 404 code
    catch(error){
        res.status(422).json(error);
    }
});


//get user data

router.get("/getdata",async (req, res) =>{
    try{
        const userdata = await users.find();
        res.status(201).json(userdata);
        console.log(userdata);
    }
    catch(error){
        res.status(422).json(error);
    }
});


// get individual user

router.get("/getuser/:id",async(req,res) =>{
    try{
        console.log(req.params);
        const {id} = req.params;

        const userindividual = await users.findById({_id:id});
        console.log(userindividual);
        res.status(201).json(userindividual);
    }
    catch(error){
        res.status(422).json(error);
    }
})


//update user data
// here we are not using put because when we change perticular input then all data is updated to avoid this we use patch insted of put
router.patch("/updateuser/:id", async(req,res) => {
    try{
        const {id} = req.params;

        const updateduser = await users.findByIdAndUpdate(id, req.body, {
            new:true
        })
        console.log(updateduser);
        res.status(201).json(updateduser);
    }
    catch(error){
        res.status(422).json(error);
    }
})

// delete user
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
const users = require('../Models/userModel')
const jwt = require('jsonwebtoken')



exports.userRegister = async (req, res) => {
    console.log("inside userRegistration function");
    const { username, email, password } = req.body
    console.log(username, email, password);
    try {
        const existingUser = await users.findOne({ email })
        if (existingUser) {
            res.status(406).json("User already exist")
        } else {
            const newUser = new users({ username, email, password, github: "", linkedin: "", profile: "" })
            await newUser.save()
            res.status(200).json(newUser)
        }
    } catch (err) {
        res.status(400).json(err)

    }
}


exports.userLogin = async (req, res) => {
    const { email, password } = req.body
    try {
        const existingUser = await users.findOne({ email, password })
        if (existingUser) {
            const token = jwt.sign({ userId: existingUser._id }, process.env.SECRET_KEY)
            res.status(200).json({ user: existingUser,token })
        } else {
            res.status(404).json("Invalid Email or Password")
        }
    }
    catch (err) {
        console.log(err);
        res.status(400).json(err)

    }
}

exports.userProfile=async(req,res)=>{
    console.log("inside profile update controller");
    const userId=req.userId

    const {username,email,password,github,linkedin,profile}=req.body
    const uploadImg=req.file?req.file.filename:profile

    try{
        const updatedUser=await users.findByIdAndUpdate({_id:userId},{username,email,password,github,linkedin,profile:uploadImg},
            {new:true})
            updatedUser.save()
            res.status(200).json(updatedUser)

    }catch(err){
        res.status(401).json(err)
    }
    
}
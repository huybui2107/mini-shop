const User = require('../models/user');
const bcrypt = require('bcrypt');
module.exports = {
    register :async (req,res,next) => { 
            const name = req.body.name;
            const email = req.body.email;
            const password = req.body.password;
            const phoneNumber = req.body.phoneNumber;
            const gender = req.body.gender;
            const address = req.body.address;
         
            const hasPassword =await bcrypt.hash(password,12);
            const user = new User({
                name: name,
                email: email,
                password : hasPassword,
                phoneNumber: phoneNumber,
                gender: gender,
                address: address
            })
            const result = await user.save();
           if (!result) {
             res.status(404).json({
                 message : "User cannot be registed"
             })
           }
           res.status(200).json(result);
    },
    getListUser :async (req, res) => { 
        try {
            const users =await User.find({}).select("-password");
            if (!users) {
                res.status(404).json({
                    message: "User not found"
                })
            }
            res.status(200).json({
                users: users
            })
        } catch (error) {
            res.status(500).json(error);
        }
    },
    getUserById :async (req,res,next )  =>{
        try {
            const userId = req.params.id;
        const user = await User.findById(userId);
        if(!user) return res.status(404).json({
            message :"User not found"
        })
        res.status(200).json({
            user : user
        })
        } catch (error) {
             res.status(500).json(error);
        
        }
    },
    updateUser :(req, res) =>{ 

    },
    deleteUser :async (req, res) => {
        try {
        const userId = req.params.id;
        const user = await User.findByIdAndDelete(userId);
        if(!user) return res.status(404).json({
            message :"User not found"
        })
        res.status(200).json({
            message :"Delete successful"
        })
        } catch (error) {
             res.status(500).json(error);
        
        }
    }
}
import User from '../models/user.model.js';
import bcrypt from 'bcrypt';

const register = async(req, res, next) => { 
    try {
        const {username, email, password} = req.body;
    
        if([username, email, password].some(field => field?.trim()==="")){
            return res.status(400).json({
                message: "All the fields are required"
            });
        }
        const usernameCheck = await User.findOne({username});
        if(usernameCheck){
            return res.status(409).json({
                message: "Username already exist"
            })
        }
    
        const emailCheck = await User.findOne({email});
        if(emailCheck){
            return res.status(409).json({
                message: "Email already exist"
            })
        }
    
        const hashedPassword = await bcrypt.hash(password, 10);
    
        const user = await User.create({
            username,
            email,
            password: hashedPassword
        });
    
        if(!user){
            return res.status(500).json({
                message: "Something went wrong while registering user"
            })
        }
    
        return res
        .status(201)
        .json({
            data: user,
            message: "User registered Successfully"
        })
    } catch (error) {
        next(error)
    }
}

const login = async(req, res, next) => { 
    try {
        const {username, password} = req.body;
    
        if([username, password].some(field => field?.trim()==="")){
            return res.status(400).json({
                message: "All the fields are required"
            });
        }
        const user = await User.findOne({username});
    
        if(!user){
            return res.status(404).json({
                message: "Account doesn't exist"
            })
        }
        
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if(!isPasswordCorrect){
            return res.status(401).json({
                message: "Password incorrect"
            })
        }
    
        return res
        .status(201)
        .json({
            data: user,
            message: "User logged in Successfully"
        })
    } catch (error) {
        next(error)
    }
}

export {
    register,
    login
}
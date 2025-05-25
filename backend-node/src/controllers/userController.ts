import { Request, Response } from 'express'
import User from '../models/userModel'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const generateToken = (email: String) => {
    return jwt.sign({email}, process.env.SECRET_KEY!, {"expiresIn": "30d"})
}

export const addUser = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;
    const foundUser = await User.findOne({email})
    if (!foundUser) return res.status(401).json({"message": "User already present"})

    const hashedPassword = bcrypt.hash(password, 10)
    const addedUser = await User.insertOne({username, email, password: hashedPassword})
    const token = generateToken(addedUser.email)
    res.status(200).json({
        id: addedUser._id,
        username,
        email,
        token
    })
}

export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const foundUser = await User.findOne({email})
    if  (!foundUser) return res.status(401).json({message: "Wrong credentials"})
    
    const pwdVerified = await bcrypt.compare(password, foundUser.password);
    if (!pwdVerified) return res.status(401).json({message: "Wrong credentials"})
    
    const token = generateToken(email)
    res.json({
        id: foundUser._id.toString(),
        username: foundUser.username,
        email: foundUser.email,
        token
    })

}
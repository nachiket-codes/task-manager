import { Request, Response } from 'express'
import User from '../models/userModel'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const generateToken = (id: String) => {
    return jwt.sign({id}, process.env.SECRET_KEY!, {"expiresIn": "30d"})
}

export const addUser = async (req: Request, res: Response) => {
    console.log("dispacth")
    const { username, email, password } = req.body;
    const foundUser = await User.findOne({email})
    if (foundUser) return res.status(401).json({"message": "User already present"})

    const hashedPassword = await bcrypt.hash(password, 10)
    const addedUser = await User.insertOne({username, email, password: hashedPassword})
    const token = generateToken(addedUser._id.toString())
    res.status(200).json({
        id: addedUser._id,
        username,
        email,
        token
    })
}
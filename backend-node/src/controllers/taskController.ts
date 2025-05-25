import { Response } from "express";
import Task from "../models/taskModel";
import User from "../models/userModel"

export const addTask = async (req: any, res: Response) => {
    const { title } = req.body
    const user = await User.findOne({email: req.user.email})

    if (!user) return res.status(401).json({message: "Unauthorized access"})

    const task = await Task.create({title, user: user._id.toString()})
    res.status(200).json(task)
}
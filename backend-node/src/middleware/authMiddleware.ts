import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken'

interface AuthRequest extends Request {
    user?: any
}

const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.header("Authorization")?.split(" ")[1]
    if (!token){
        return res.status(401).json({message: "No Token!"})
    }
    try {
        const verified = jwt.verify(token, process.env.SECRET_KEY!) as {email: string}
        if (!verified) return res.status(401).json({"message": "Access Unauthorized!"})
        
        req.user = verified

        next()
    }
    catch {
        res.status(401).json({ message: "Token invalid" });
    }
}

export default protect;
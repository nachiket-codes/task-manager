import express from 'express'
import { addUser } from '../controllers/userController'

const router = express.Router()

router.post('/register', addUser)

export default router;
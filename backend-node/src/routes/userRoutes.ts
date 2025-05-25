import express from 'express'
import { addUser } from '../controllers/userController'

const router = express.Router()

router.post('/auth/register', addUser)

export default router;
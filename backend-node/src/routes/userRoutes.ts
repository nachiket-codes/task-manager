import express from 'express'
import { addUser, loginUser } from '../controllers/userController'

const router = express.Router()

router.post('/auth/register', addUser)
router.post('/auth/login', loginUser)

export default router;
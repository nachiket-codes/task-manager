import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import userRoute from './routes/userRoutes'
import taskRoute from './routes/taskRoute'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.use(userRoute);
app.use(taskRoute);

export default app;


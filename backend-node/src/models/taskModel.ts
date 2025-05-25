import mongoose from 'mongoose'

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true},
    completed: { type: Boolean, default: false},
    user: {type: String, ref: 'User', required: true}
})

export default mongoose.model('Task', taskSchema);
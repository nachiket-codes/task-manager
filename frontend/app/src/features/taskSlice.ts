import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api";


interface AddTask {
    title: string | null
}

interface Task extends AddTask{
    completed: boolean
}

interface InitialState {
    tasks: Task[]
    loading: boolean
    error: string | null
}

const initialState: InitialState = {
    tasks: [],
    loading: false,
    error: null
}

export const createTask = createAsyncThunk('/task/create', async (task: AddTask) => {
    const res = await API.post('/tasks', task)
    return res.data
})

export const getTasks = createAsyncThunk('/tasks', async () => {
    const res = await API.get('/tasks')
    return res.data;
})

const taskSlice = createSlice({
    name: '/task',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createTask.fulfilled, (state, action) => {
            state.loading = false
            state.error = null
        }).addCase(createTask.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message || "Failed to create the task"
        }).addCase(createTask.pending, (state) => {
            state.loading = true
        }).addCase(getTasks.fulfilled, (state, action) => {
            state.loading = false
            state.tasks = action.payload
        }).addCase(getTasks.pending, (state) => {
            state.loading = true
        }).addCase(getTasks.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message || "Failed to get the tasks"
        })
    }
})

export default taskSlice.reducer;
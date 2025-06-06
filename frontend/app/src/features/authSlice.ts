import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import API from '../api'

interface AuthState {
    id: string | null
    token: string | null,
    username: string | null,
    email: string | null,
}

interface InitialState  {
    user: AuthState,
    loading: boolean,
    error: string | null
}

const initialState: InitialState = {
    user : {
        id : null,
        token: null,
        username : null,
        email: null
    },
    loading: false,
    error: null
}

interface LoginData {
    email: string,
    password: string
}

interface UserData extends LoginData{
    username: string,
}


export const registerUser = createAsyncThunk('/register', async (userData: UserData) => {
    const res = await API.post('/auth/register', userData)
    return res.data;
})

export const loginUser = createAsyncThunk('/login', async (loginData: LoginData) => {
    const res = await API.post('/auth/login', loginData)
    return res.data;
})

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logoutUser : (state, action) => {
            localStorage.removeItem('token');
            state.user.token = null
            state.user.username = null
            state.user.email = null
            state.loading = false
            state.error = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(registerUser.fulfilled, (state, action) => {
            const { id, username, email, token } = action.payload;
            localStorage.setItem('token', token)
            state.user = { id, username, email, token}
            state.loading = false
            state.error = null
        }).addCase(registerUser.pending, (state) => {
            state.loading = true
        }).addCase(registerUser.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload as string || "Something went wrong";
        }).addCase(loginUser.fulfilled, (state, action) => {
            const { id, username, email, token } = action.payload;
            localStorage.setItem('token', token)
            state.user = { id, username, email, token}
            state.loading = false
            state.error = null
        }).addCase(loginUser.pending, (state) => {
            state.loading = true
        }).addCase(loginUser.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload as string || "Something went wrong";
        })
    }

})

export const {logoutUser} = authSlice.actions;
export default authSlice.reducer;
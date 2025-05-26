import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from "../store";
import { loginUser } from "../features/authSlice";

const Login: React.FC = () => {
    const inputClassStyle = "border border-black p-2 text-xl outline-none hover:bg-black hover:text-white"
    const [ email, setEmail ] = useState<string>('')
    const [ password, setPassword ] = useState<string>('')
    const [ error, setError ] = useState<string>('')
    const { user } = useSelector((state: RootState) => state.authen)

    const navigate = useNavigate();

    const dispatch = useDispatch<AppDispatch>()

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (email.trim() === '' || password.trim() === '') {
            setError("Please fill all the fields")
            return
        }
        dispatch(loginUser({email, password}))
    }

    useEffect(()=>{
        if (user?.token) {
            navigate('/')
        }
    }, [user])

    return (
        <div className="h-screen w-full flex flex-col">
            <Header/>
            <div className="flex-1 flex justify-center flex-col items-center">
                <h1 className="font-bold text-3xl p-2 mb-2">
                    SIGN IN
                </h1>
                <form action="" onSubmit={handleLogin} className="flex flex-col gap-2 w-[40%]">
                    <input required type="text" autoComplete="username  " placeholder="Enter your email" className={inputClassStyle} value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    <input required type="password" autoComplete="current-password" placeholder="Password" className={inputClassStyle} value={password} onChange={(e)=>setPassword(e.target.value)}/>
                    <p className="text-xl text-center text-red-600 font-semibold">{error}</p>
                    <button className="border-2 border-black p-2 text-xl font-bold bg-black text-white hover:bg-white hover:text-black ease-out duration-300">Log in</button>
                </form>
                <p className="p-1 text-[20px] mt-2">Not a member? <Link to="/register" className="text-blue-500 font-semibold">Sign up</Link></p>
            </div>
        </div>
    )
}

export default Login;
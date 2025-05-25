import { Link } from "react-router-dom";
import Header from "./Header";
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from "../store";
import { registerUser } from "../features/authSlice";

const Register : React.FC = () => {
    const inputClassStyle = "border border-black p-2 text-xl outline-none hover:bg-black hover:text-white"
    const [ username, setUsername ] = useState<string>('')
    const [ email, setEmail ] = useState<string>('')
    const [ password, setPassword ] = useState<string>('')
    const [ confPassword, setConfPassword ] = useState<string>('')
    const [ error, setError ] = useState<string>('')
    const dispatch = useDispatch<AppDispatch>()

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        if (username.trim() === '' || email.trim() === '' || password.trim() === '') {
            setError("Please fill all the fields")
            return
        }
        if (! email.includes('@')){
            setError('Please enter a valid email')
            return
        }

        if (password !== confPassword) {
            setError("Password do not match")
            return
        }
        setError('')
        dispatch(registerUser({username, email, password}))

    }
    return (
        <div className="h-screen w-full flex flex-col">
            <Header/>
            <div className="flex-1 flex justify-center flex-col items-center">
                <h1 className="font-bold text-3xl p-2 mb-2">
                    SIGN UP
                </h1>
                <form action="" onSubmit={handleRegister} className="flex flex-col gap-2 w-[40%]">
                    <input required type="text" placeholder="Enter your name" className={inputClassStyle} value={username} onChange={(e)=>setUsername(e.target.value)}/>
                    <input required type="text" placeholder="Enter your email" className={inputClassStyle} value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    <input required type="password" placeholder="Password" className={inputClassStyle} value={password} onChange={(e)=>setPassword(e.target.value)}/>
                    <input type="password" placeholder="Confirm Password" className={inputClassStyle} value={confPassword} onChange={(e)=>setConfPassword(e.target.value)}/>
                    <p className="text-xl text-center text-red-600 font-semibold">{error}</p>
                    <button className="border-2 border-black p-2 text-xl font-bold bg-black text-white hover:bg-white hover:text-black ease-out duration-300">Register</button>
                </form>
                <p className="p-1 text-[20px] mt-2">Already a member? <Link to="/" className="text-blue-500 font-semibold">Login</Link></p>
            </div>
        </div>
    )
}

export default Register;
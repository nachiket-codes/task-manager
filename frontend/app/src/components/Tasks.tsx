import Header from "./Header";
import { useState } from 'react'
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { createTask } from "../features/taskSlice";

const Tasks: React.FC = () => {
    const [ title, setTitle ] = useState<string>('')
    const dispath = useDispatch<AppDispatch>()

    const handleAddTask = (e: React.FormEvent) => {
        e.preventDefault();
        if (title.trim() !== "") {
            dispath(createTask({title}))
            setTitle("")
        }
    }

    return (
        <div className="h-screen w-full flex flex-col">
            <Header/>
            <div className="border-2 border-red-500 flex-1 flex justify-center flex-col items-center">
                <div>
                    <form action="" onSubmit={handleAddTask}>
                        <input type="text" placeholder="add task" value={title} onChange={(e)=>setTitle(e.target.value)}/>
                        <button>Add task</button>
                    </form>
                    
                    
                </div>
            </div>
        </div>
    )
}

export default Tasks;
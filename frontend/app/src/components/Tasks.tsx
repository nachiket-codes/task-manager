import Header from "./Header";
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { createTask, getTasks } from "../features/taskSlice";
import TaskCard from "./TaskCard";

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

    const { tasks, error, loading } = useSelector((state: RootState)=>{
        console.log(state.tasks)
        return state.tasks
    })

    useEffect(()=>{
        dispath(getTasks())
    }, [dispath])

    return (
        <div className="h-screen w-full flex flex-col">
            <Header/>
            <div>
                <form action="" onSubmit={handleAddTask} className="p-3 flex justify-center w-[full]">
                    <input type="text" placeholder="Enter new task" value={title} onChange={(e)=>setTitle(e.target.value)} className="border border-black p-3 w-[70%] outline-none text-2xl"/>
                    <button className="border-2 border-black p-3 text-2xl font-bold text-white bg-black hover:bg-white hover:text-black ease-in-out duration-300">Add task</button>
                </form>
            </div>
            <div className="flex-1 flex justify-center flex-col items-center w-[full]">
                <div className="flex-1 w-[70%] flex flex-col gap-2">
                    {
                        tasks.map((task, idx) => (
                            <TaskCard key={idx} task={task}/>
                        ))
                    }
                    
                    
                </div>
            </div>
        </div>
    )
}

export default Tasks;
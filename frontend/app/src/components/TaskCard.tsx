import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Task {
    title: string | null,
    completed: boolean
}

interface Props {
    task: Task
}

const TaskCard: React.FC<Props> = ({task}) => {
    return (
        <div className="p-3 flex border-2 border-black text-2xl w-[full] bg-black text-white font-semibold hover:bg-white hover:text-black">
            <h1 className="flex-1 cursor-pointer">{task.title}</h1>
            <FontAwesomeIcon className="p-2 hover:text-red-600 ease-out duration-200 cursor-pointer" icon={faTrash}/>
        </div>
    )
}

export default TaskCard;
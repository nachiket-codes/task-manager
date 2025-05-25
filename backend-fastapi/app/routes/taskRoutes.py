from fastapi import APIRouter, Depends, HTTPException, status
from models import TaskReq, TokenData
from oauth2 import getCurrentUser
from database import usersCollection, tasksCollection

router = APIRouter(prefix='/tasks', tags = ["Tasks"])

@router.post('/')
async def createTask(task: TaskReq, user: TokenData = Depends(getCurrentUser)):
    foundUser = await usersCollection.find_one({"email": user.email})
    if not foundUser:
        raise HTTPException(
            status_code = status.HTTP_401_UNAUTHORIZED,
            detail = {"message": "Unauthorized access!"}
        )
    newTaskDoc = {
        "user" : str(foundUser["_id"]),
        "title" : task.title,
        "completed" : task.completed
    }

    result = await tasksCollection.insert_one(newTaskDoc)
    if not result.inserted_id:
        raise HTTPException(
            status_code = status.HTTP_400_BAD_REQUEST,
            detail = {"message": "Failed to add the task!"}
        )
    return {
        "message" : f"Task inserted with id: {result.inserted_id}"
    }

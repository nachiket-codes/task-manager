from fastapi import APIRouter, HTTPException, status
from models import Register
from database import usersCollection
from authentication import createAccessToken
from hashing import Hash

router = APIRouter(prefix = '/auth', tags = ["Authentication"])

@router.post('/register')
async def register(userData: Register):
    user = await usersCollection.find_one({'email' : userData.email})
    if user:
        raise HTTPException(
            status_code = status.HTTP_400_BAD_REQUEST,
            detail = {"message" : "User already present"}
        )
    
    newUserDoc = {
        "username" : userData.username,
        "email" : userData.email,
        "password" : Hash().hash(userData.password)
    }
    
    addedUserId = await usersCollection.insert_one(newUserDoc)
    if not addedUserId:
        raise HTTPException(
            status_code = status.HTTP_400_BAD_REQUEST,
            detail = {"message" : "Failed to add user"}
        )
    
    tokenData = createAccessToken(data = {'sub' : userData.email})
    return tokenData
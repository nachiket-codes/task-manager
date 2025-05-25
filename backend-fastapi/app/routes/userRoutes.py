from fastapi import APIRouter, HTTPException, status
from models import Register
from database import usersCollection
from authentication import createAccessToken
from hashing import Hash


router = APIRouter(prefix = '/auth', tags = ["Authentication"])

@router.post('/register')
async def register(userData: Register):
    print('here')
    user = await usersCollection.find_one({'email' : userData.email})
    if user:
        raise HTTPException(
            status_code = status.HTTP_400_BAD_REQUEST,
            detail = {"message" : "User already present"}
        )
    
    newUserDoc = {
        "username" : userData.username,
        "email" : userData.email,
        "password" : Hash.hash(userData.password)
    }
    
    result = await usersCollection.insert_one(newUserDoc)
    if not result.inserted_id:
        raise HTTPException(
            status_code = status.HTTP_400_BAD_REQUEST,
            detail = {"message" : "Failed to add user"}
        )
    
    tokenData = createAccessToken(data = {'sub' : userData.email})
    return {
        'id' : str(result.inserted_id),
        'username': userData.username,
        'email': userData.email,
        'token' : tokenData.access_token
    }
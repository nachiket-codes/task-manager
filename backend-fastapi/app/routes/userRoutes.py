from fastapi import APIRouter, HTTPException, status
from models import Register, Login
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

@router.post('/login')
async def loginUser(loginData: Login):
    foundUser = await usersCollection.find_one({"email" : Login.email})
    if not foundUser:
        raise HTTPException(
            status_code= status.HTTP_401_UNAUTHORIZED,
            detail= {"message" : "Wrong credentials"}
        )
    
    passwordVerified = Hash.verify(loginData.password, foundUser.password)
    if not passwordVerified:
        raise HTTPException(
            status_code= status.HTTP_401_UNAUTHORIZED,
            detail= {"message" : "Wrong credentials"}
        )
    
    tokenData = createAccessToken(data = {'sub': foundUser.email})
    return {
        'id' : foundUser._id,
        'username': foundUser.username,
        'email': foundUser.email,
        'token' : tokenData.access_token
    }
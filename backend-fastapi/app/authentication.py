from jose import jwt
from datetime import timedelta, datetime
from models import TokenData, Token
import os
from fastapi import HTTPException

def createAccessToken(data: dict, expiresDelta: timedelta = None) -> Token:
    dataToEncode = data.copy()
    if expiresDelta:
        exp = expiresDelta + datetime.utcnow()
    else:
        exp = datetime.utcnow() + timedelta(minutes = os.getenv("EXPIRES_MINUTES"))
    dataToEncode.update({'exp': exp})
    token = jwt.encode(claims = dataToEncode, key = os.getenv('SECRET_KEY'), algorithm = os.getenv('ALGORITHM'))
    return Token(access_token = token)

def verifyAccessToken(token: str, credentialsException: HTTPException) -> TokenData:
    try:
        payload = jwt.decode(token = token, key = os.getenv('SECRET_KEY'), algorithms = [os.getenv('ALGORITH')])
        email = payload.get('sub')
        if not email:
            raise credentialsException
        
        return TokenData(email = email)
    except Exception:
        raise credentialsException

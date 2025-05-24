from fastapi.security import OAuth2PasswordBearer
from fastapi import Depends, HTTPException, status
from authentication import verifyAccessToken

oauthScheme = OAuth2PasswordBearer(tokenUrl = 'login')

def getCurrentUser(token: str = Depends(oauthScheme)):
    credentialsException = HTTPException(
        status_code = status.HTTP_401_UNAUTHORIZED,
        detail = {"message" : "Unauthorized access!"},
        headers = {"WWW-Authenticate": 'Bearer'}
    )

    return verifyAccessToken(token = token, credentialsException = credentialsException)
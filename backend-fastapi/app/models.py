from pydantic import BaseModel

class Register(BaseModel):
    username : str
    email: str
    password: str

class TokenData(BaseModel):
    email: str

class Token(BaseModel):
    access_token: str
    token_type: str = 'bearer'
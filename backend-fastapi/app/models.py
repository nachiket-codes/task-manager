from pydantic import BaseModel

class Login(BaseModel):
    email: str
    password: str

class Register(Login):
    username : str

class TokenData(BaseModel):
    email: str

class Token(BaseModel):
    access_token: str
    token_type: str = 'bearer'

class TaskReq(BaseModel):
    title: str
    completed: bool = False
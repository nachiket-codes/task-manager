from passlib.context import CryptContext

pwdCtx = CryptContext(schemes = ['bcrypt'], deprecated = "auto")

class Hash:
    def hash(password: str) -> str :
        return pwdCtx.hash(secret = password)
    
    def verify(plainPassword: str, hashedPassword: str) -> bool:
        return pwdCtx.verify(plainPassword, hashedPassword)

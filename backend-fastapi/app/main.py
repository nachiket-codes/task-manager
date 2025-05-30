from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import userRoutes, taskRoutes

app = FastAPI()

origins = ["http://localhost:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials = True,
    allow_methods = ['*'],
    allow_headers = ['*']
)

app.include_router(userRoutes.router)
app.include_router(taskRoutes.router)


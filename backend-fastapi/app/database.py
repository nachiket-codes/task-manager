from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv

load_dotenv()


client = AsyncIOMotorClient(os.getenv("MONGOURL"))
db = client["test"]
usersCollection = db["users"]
tasksCollection = db["tasks"]
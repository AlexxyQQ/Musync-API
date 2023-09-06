import os
import pymongo
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# MongoDB URI from environment variables
mongo_uri = os.getenv("PRO_DATABASE")

# Initialize the MongoDB client and database
if mongo_uri:
    myclient = pymongo.MongoClient(mongo_uri)
    mydb = myclient.get_database()
    print("Connected to MongoDB!")
else:
    raise ValueError("MONGODB_URI environment variable not found. Make sure it's set in your .env file.")

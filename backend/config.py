import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    """Base configuration"""
    HOST = os.getenv("HOST", "0.0.0.0")
    PORT = int(os.getenv("PORT", 8000))
    ENV = os.getenv("ENV", "development")
    FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:3000")
    
    # CORS settings
    CORS_ORIGINS = [FRONTEND_URL]
    CORS_ALLOW_CREDENTIALS = True
    CORS_ALLOW_METHODS = ["*"]
    CORS_ALLOW_HEADERS = ["*"]

config = Config()

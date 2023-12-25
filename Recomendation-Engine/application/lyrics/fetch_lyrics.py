import os
from application.musixmatch_api import Musixmatch
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# MongoDB URI from environment variables
apiKey = os.getenv("MUSIXMATCH_API_KEY")


def fetch_lyrics(q_track, q_artist):
    musixmatch = Musixmatch(apikey=apiKey)
    response = musixmatch.matcher_lyrics_get(q_track, q_artist)
    return response

from application.database import mydb


def fetch_songs_without_lyrics():
    # Define the collection containing your songs
    collection = mydb["songs"]

    # Query for songs without lyrics (where "lyrics" field does not exist or is empty)
    songs_without_lyrics = collection.find(
        {"$or": [{"lyrics": {"$exists": False}}, {"lyrics": ""}]}
    )
    songlist = []
    # Iterate over the songs and print or process them as needed
    for song in songs_without_lyrics:
        songlist.append(song)

    return songlist

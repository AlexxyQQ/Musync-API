import re
from flask import Blueprint, jsonify
from application.database import mydb
from application.lyrics.fetch_lyrics import fetch_lyrics

from application.lyrics.scan_songs import fetch_songs_without_lyrics

# Create a Blueprint for your routes
lyrics_route = Blueprint("scrap", __name__)


@lyrics_route.route("/scan-songs")
def scan_songs():
    print(fetch_songs_without_lyrics())
    return "Songs Scanned!"


@lyrics_route.route("/add-lyrics")
def add_lyrics():
    songs = fetch_songs_without_lyrics()
    for song in songs:
        param_title = song["title"]
        param_artist = song["artist"]
        response = fetch_lyrics(param_title, param_artist)
        try:
            lyric = (
                response.get("message", {})
                .get("body", {})
                .get("lyrics", {})
                .get("lyrics_body", {})
            )
        except:
            pass
        save_lyrics_to_file(param_title, param_artist, lyric)
        # songs_collection = mydb["songs"]
        # lyrics_collection = mydb["lyrics"]

        # # Find the song by title and artist
        # found_song = songs_collection.find_one(
        #     {"title": param_title, "artist": param_artist}
        # )

        # if not song:
        #     return jsonify({"message": "Song not found"}), 404

        # # Create a new Lyrics document and associate it with the song
        # lyrics_doc = {
        #     "timestamps": lyric,
        #     "song": found_song["_id"],
        #     "timed": False,
        # }
        # lyrics_id = lyrics_collection.insert_one(lyrics_doc).inserted_id

        # # Update the song's lyrics reference
        # songs_collection.update_one(
        #     {"_id": song["_id"]}, {"$set": {"lyrics": lyrics_id}}
        # )
    return "Lyrics Added!"


def sanitize_filename(filename):
    # Replace invalid characters with underscores
    return re.sub(r'[\/:*?"<>|]', "_", filename)


def save_lyrics_to_file(title, artist, lyrics):
    # Sanitize the title and artist before constructing the filename
    sanitized_title = sanitize_filename(title)
    sanitized_artist = sanitize_filename(artist)

    filename = f"{sanitized_title} - {sanitized_artist}.txt"
    with open(filename, "w", encoding="utf-8") as file:
        file.write(lyrics)

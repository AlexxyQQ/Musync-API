import os


def tts():
    # Define the directory where the text files are located
    directory_path = "D:/GitHub/Node-Js/Musync-API/Recomendation-Engine/"

    # Initialize lists to store titles and lyrics
    song_titles = []
    lyrics = []

    # Iterate through all files in the directory
    for filename in os.listdir(directory_path):
        if filename.endswith(".txt"):
            # Extract title and artist from the filename
            title_artist = os.path.splitext(filename)[0]  # Remove file extension
            song_titles.append(title_artist)

            # Read the lyrics from the file
            with open(
                os.path.join(directory_path, filename), "r", encoding="utf-8"
            ) as file:
                song_lyrics = file.read()

            lyrics.append(song_lyrics)

    # Save the titles and lyrics to a single file
    with open(
        "D:/GitHub/Node-Js/Musync-API/Recomendation-Engine/ass.txt",
        "w",
        encoding="utf-8",
    ) as output_file:
        for title, lyric in zip(song_titles, lyrics):
            output_file.write(f"title = ['{title}']\n")
            output_file.write(f"lyrics = ['''{lyric}''']\n\n")

    print("Titles and lyrics saved to 'titles_and_lyrics.txt'.")


tts()

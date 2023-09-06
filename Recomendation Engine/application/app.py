from flask import Flask, request


# Initialize Flask app
app = Flask(__name__)

# ...
from application.lyrics.lyrics_routes import lyrics_route

app.register_blueprint(lyrics_route)


@app.route("/")
def index():
    return "Hello, World!"

const axios = require("axios");
const Song = require("../../../models/song.model");
const lyricsModel = require("../../../models/lyrics.model");
const mongoose = require("mongoose");

async function getLyric(req, res, next) {
  try {
    // get user
    const user = res.locals.user;

    const { song_id, song_title, song_artist } = req.body;

    // Function to search for tracks and retrieve the lyrics
    const apiKey = process.env.MUSIXMATCH_API_KEY;
    const lyricsUrl = process.env.MUSIXMATCH_API_LYRICS_URL;
    // Set the API endpoint URL
    const url = `${lyricsUrl}${apiKey}`;

    // Set the query parameters
    const params = {
      q_track: song_title,
      q_artist: song_artist,
      format: "json",
      f_has_lyrics: 1,
      quorum_factor: 1,
      s_track_rating: "asc",
      s_artist_rating: "asc",
    };

    try {
      const response = await axios.get(url, { params });

      console.log(response.data.message.body.lyrics.lyrics_body);

      // Check if the request was successful
      if (
        response.status === 200 &&
        response.data.message.header.status_code === 200
      ) {
        if (response.data.message.body.lyrics) {
          // Extract the lyrics from the response
          const lyrics = response.data.message.body.lyrics.lyrics_body;
          function removeAfterAsterisk(input) {
            const asteriskPosition = input.indexOf("*");
            if (asteriskPosition !== -1) {
              return input.substring(0, asteriskPosition);
            } else {
              return input; // If there's no asterisk, return the original string
            }
          }

          // Remove the last part of the lyrics
          const newText = removeAfterAsterisk(lyrics);
          const song = await Song.findOne({ id: song_id });

          // Save lyrics to database
          const newLyrics = new lyricsModel({
            timed: false,
            timestamps: newText,
            song: song._id,
          });
          await newLyrics.save();

          // Add lyrics to song
          song.lyrics = newLyrics._id;
          await song.save();

          res.status(200).json({
            success: true,
            data: {
              lyrics: newText,
              song_id: song_id,
              song_title: song_title,
              song_artist: song_artist,
              muximatch_lyric_id: response.data.message.body.lyrics.lyrics_id,
            },
          });
        } else {
          res.status(404).json({
            success: false,
            data: "Lyrics not found on our database.",
          });
        }
      } else {
        res.status(503).json({
          success: false,
          data: "Error: Failed to fetch lyrics.",
        });
      }
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

module.exports = getLyric;

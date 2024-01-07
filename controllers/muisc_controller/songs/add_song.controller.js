const Song = require("../../../models/song.model");

async function addSong(req, res, next) {
  try {
    const { songMap } = req.body;
    if (!songMap) {
      return res.status(400).json({
        success: false,
        message: "Please choose the song",
      });
    }
    // check the song artist and title , if it is already in the database, just continue
    // else add it to the database
    console.log(songMap.display_name);

    const existingSong = await Song.findOne({
      artist: songMap.artist,
      title: songMap.title,
    });

    if (existingSong) {
      return res.status(200).json({
        success: true,
        message: "Song already exists",
      });
    } else {
      let songModel = new Song({
        id: songMap.id,
        data: songMap.data,
        uri: songMap.uri,
        display_name: songMap.display_name,
        display_name_wo_ext: songMap.display_name_wo_ext,
        size: songMap.size,
        album: songMap.album,
        album_id: songMap.album_id,
        artist: songMap.artist,
        artist_id: songMap.artist_id,
        genre: songMap.genre,
        genre_id: songMap.genre_id,
        bookmark: songMap.bookmark,
        composer: songMap.composer,
        date_added: songMap.date_added,
        date_modified: songMap.date_modified,
        duration: songMap.duration,
        title: songMap.title,
        track: songMap.track,
        file_extension: songMap.file_extension,
        isAlarm: songMap.is_alarm,
        is_audiobook: songMap.is_audiobook,
        isMusic: songMap.is_music,
        is_notification: songMap.is_notification,
        is_podcast: songMap.is_podcast,
        is_ringtone: songMap.is_ringtone,
        album_art: songMap.album_art,
        is_public: songMap.is_public,
        is_favourite: songMap.is_favourite,
      });

      songModel = songModel.save();

      return res.status(200).json({
        success: true,
        message: "Song added successfully",
      });
    }
  } catch (error) {}
}

module.exports = addSong;

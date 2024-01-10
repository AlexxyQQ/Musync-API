const Song = require("../../../models/song.model");

async function addSongs(req, res, next) {
  try {
    const { songMaps } = req.body;

    if (!songMaps || !Array.isArray(songMaps) || songMaps.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No songs provided or invalid format",
      });
    }

    let addedSongsCount = 0;
    for (const songMap of songMaps) {
      const existingSong = await Song.findOne({
        artist: songMap.artist,
        title: songMap.title,
      });

      if (!existingSong) {
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

        await songModel.save();
        addedSongsCount++;
      }
    }

    return res.status(200).json({
      success: true,
      message: `Processed ${songMaps.length} songs, added ${addedSongsCount} new songs`,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while adding songs",
    });
  }
}

module.exports = addSongs;

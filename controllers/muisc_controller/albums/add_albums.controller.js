const AlbumModel = require("../../../models/album.model");
const SongModel = require("../../../models/song.model");

async function addAlbums(req, res, next) {
  try {
    const { albumMaps } = req.body;

    if (!albumMaps || !Array.isArray(albumMaps) || albumMaps.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No albums provided or invalid format",
      });
    }

    let addedAlbumsCount = 0;
    let newSongsCount = 0;

    for (const albumMap of albumMaps) {
      let [existingAlbum, existingSongs] = await Promise.all([
        AlbumModel.findOne({ artist: albumMap.artist, album: albumMap.album }),
        SongModel.find({ artist: albumMap.artist })
          .where("song")
          .in(albumMap.songs.map((s) => s.song)),
      ]);

      if (!existingAlbum) {
        let newAlbum = new AlbumModel({
          id: albumMap.id,
          album: albumMap.album,
          artist: albumMap.artist,
          artist_id: albumMap.artist_id,
          num_of_songs: albumMap.num_of_songs,
          songs: [],
        });

        let songOperations = albumMap.songs.map(async (songMap) => {
          let existingSong = existingSongs.find((s) => s.song === songMap.song);

          if (!existingSong) {
            let newSong = new SongModel({ ...songMap });
            await newSong.save();
            newSongsCount++;
            return newSong._id;
          } else {
            return existingSong._id;
          }
        });

        newAlbum.songs = await Promise.all(songOperations);
        await newAlbum.save();
        addedAlbumsCount++;
      }
    }

    return res.status(200).json({
      success: true,
      message: `Processed ${albumMaps.length} albums, added ${addedAlbumsCount} new albums, and added ${newSongsCount} new songs`,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while adding songs",
    });
  }
}

module.exports = addAlbums;

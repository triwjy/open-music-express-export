const Playlist = require('./model/playlist.model');

const getPlaylist = async (playlistId) => {
  const playlist = await Playlist.findById(playlistId).populate('owner', 'name email').populate('songs', 'title performer');
  const songsResult = playlist.songs.map((song) => {
    const res = {
      id: song._id,
      title: song.title,
      performer: song.performer,
    };
    return res;
  });

  const result = {
    playlist: {
      id: playlist._id,
      name: playlist.name,
      songs: songsResult,
    },
  };
  return result;
};

module.exports = getPlaylist;

const { sendPlaylistExportEmail } = require('./mailsender');
const getPlaylist = require('./playlist.service');

/**
 * Callback to export playlist from queue
 * @param {Buffer} queueMessage
 */
const listenQueue = async (queueMessage) => {
  try {
    const { playlistId, targetEmail } = JSON.parse(queueMessage.content.toString());

    const playlist = await getPlaylist(playlistId);
    const sendEmailResult = await sendPlaylistExportEmail(targetEmail, JSON.stringify(playlist));
    console.log(sendEmailResult);
    return sendEmailResult;
  } catch (error) {
    console.log(error);
  }
};

module.exports = listenQueue;

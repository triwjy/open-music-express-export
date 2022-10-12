const nodemailer = require('nodemailer');
const config = require('./config/config');

const transport = nodemailer.createTransport(config.email.smtp);
/* istanbul ignore next */
if (config.env !== 'test') {
  transport
    .verify()
    .then(() => console.log('Connected to email server'))
    .catch(() => console.log('Unable to connect to email server. Make sure you have configured the SMTP options in .env'));
}

/**
 * Send an email
 * @param {string} to
 * @param {string} content
 * @returns {Promise<SMTPTransport.SentMessageInfo>}
 */
const sendPlaylistExportEmail = async (to, content) => {
  const msg = {
    from: config.email.from,
    to,
    subject: 'OpenMusic Playlist Export',
    text: 'Please find the exported playlist in the attachment',
    attachments: [
      {
        filename: 'playlist.json',
        content,
      },
    ],
  };
  return transport.sendMail(msg);
};

module.exports = {
  transport,
  sendPlaylistExportEmail,
};

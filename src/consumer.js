const mongoose = require('mongoose');
const amqp = require('amqplib');
const listenQueue = require('./listener');
const config = require('./config/config');
const queue = 'export:playlists';

const init = async () => {
  mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
    console.log('Connected to MongoDB');
  });

  const connection = await amqp.connect(config.rabbitmq.url);
  const channel = await connection.createChannel();

  await channel.assertQueue(queue, {
    durable: true,
  });
  channel.consume(
    queue,
    async (message) => {
      listenQueue(message);
    },
    { noAck: true }
  );
};

init();

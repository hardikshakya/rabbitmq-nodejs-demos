const amqp = require('amqplib');

const message = process.argv[2] || 'Hello world!';
const amqpServerURL = 'amqp://localhost:5672';
const queueName = 'msg_queue';

const init = async () => {
  try {
    // Connect to RabbitMQ server
    const connection = await amqp.connect(amqpServerURL);

    /**
     * createChannel()
     * It will create new channel for publish/send data into queue
     */
    const channel = await connection.createChannel();

    /**
     * assertQueue([queue, [options]])
     * Assert an queue into existence. Means "find or create".
     */
    await channel.assertQueue(queueName, { durable: true });

    /**
     * sendToQueue(queue, content, [options])
     * Send a single message with the content given as a buffer to the specific queue named, bypassing routing.
     */
    await channel.sendToQueue(queueName, Buffer.from(message.toString()), {
      persistent: true,
    });

    console.log(`${message} sent successfully :)`);

    // Close a channel. Will be resolved with no value once the closing handshake is complete.
    await channel.close();

    // Close the connection cleanly. Will immediately invalidate any unresolved operations,
    // so it’s best to make sure you’ve done everything you need to before calling this.
    await connection.close();
  } catch (error) {
    console.error(error);
  }
};

init();

const amqp = require('amqplib');

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

    console.log(`Waiting for messages in ${queueName}. To exit press CTRL+C`);

    /**
     * consume(queue, function(msg) {...}, [options])
     * It will consume/get messages/jobs from queue.
     * Argument: noAck (boolean):
     * noAck: if true, the broker won’t expect an acknowledgement of messages delivered to this consumer
     * noAck: if false, the broker will expect an acknowledgement of messages delivered to this consumer
     */
    channel.consume(
      queueName,
      (message) => {
        if (message !== null) {
          console.log(`Received job with input ${message.content.toString()}`);
          channel.ack(message);
        } else {
          console.log('Queue is empty!');
          channel.reject(message);
        }
      },
      { noAck: false }
    );
  } catch (error) {
    console.error(error);
  }
};

init();

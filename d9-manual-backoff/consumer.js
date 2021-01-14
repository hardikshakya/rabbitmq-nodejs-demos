const amqp = require('amqplib');

const amqpServerURL = 'amqp://localhost:5672';
const queueName = 'manual_backoff';
const deadQueueName = 'error_manual_backoff';

const init = async () => {
  try {
    const connection = await amqp.connect(amqpServerURL);
    const channel = await connection.createChannel();

    await channel.assertQueue(queueName, { durable: true });

    channel.consume(
      queueName,
      async (msg) => {
        const retryCount = msg.properties.headers['x-retry-count'];
        const message = msg.content.toString();

        if (retryCount <= 4) {
          if (message !== 'Hello from msg 2') {
            console.log(`Received ${message}`);
          } else {
            console.log(
              `Retrying message '${message}' for ${retryCount + 1} time(s).`
            );

            await channel.sendToQueue(queueName, Buffer.from(message), {
              headers: { 'x-retry-count': retryCount + 1 },
            });
          }
        } else {
          await channel.assertQueue(deadQueueName, { durable: true });
          await channel.sendToQueue(deadQueueName, Buffer.from(message), {
            headers: { 'x-retry-count': retryCount },
          });

          console.log(`Sending '${message}' to dead queue :(`);
        }
      },
      { noAck: true }
    );
  } catch (error) {
    console.log(error);
  }
};

init();

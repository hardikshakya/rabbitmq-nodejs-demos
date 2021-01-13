const amqp = require('amqplib');

const amqpServerURL = 'amqp://localhost:5672';
const queueName = 'priority_queue';

const init = async () => {
  try {
    const connection = await amqp.connect(amqpServerURL);
    const channel = await connection.createChannel();

    await channel.assertQueue(queueName, { durable: false, maxPriority: 10 });

    console.log(`Waiting for messages from ${queueName}. To exit press CTRL+C`);

    channel.consume(
      queueName,
      (msg) => {
        console.log(`Received job with message ${msg.content.toString()}`);
      },
      { noAck: true }
    );
  } catch (error) {
    console.log(error);
  }
};

init();

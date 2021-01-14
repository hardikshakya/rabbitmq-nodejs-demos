const amqp = require('amqplib');

const amqpServerURL = 'amqp://localhost:5672';
const queueName = 'manual_backoff';

const init = async () => {
  try {
    const connection = await amqp.connect(amqpServerURL);
    const channel = await connection.createChannel();

    await channel.assertQueue(queueName, { durable: true });

    for (let index = 1; index <= 10; index++) {
      const msg = `Hello from msg ${index}`;
      await channel.sendToQueue(queueName, Buffer.from(msg), {
        headers: { 'x-retry-count': 0 },
      });
      console.log(`Sending ${msg}`);
    }

    await channel.close();
    await connection.close();
  } catch (error) {
    console.log(error);
  }
};

init();

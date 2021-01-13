const amqp = require('amqplib');

const amqpServerURL = 'amqp://localhost:5672';
const queueName = 'priority_queue';

const init = async () => {
  try {
    const connection = await amqp.connect(amqpServerURL);
    const channel = await connection.createChannel();

    await channel.assertQueue(queueName, { durable: false, maxPriority: 10 });

    for (let i = 1; i <= 20; i++) {
      const priority = Math.floor(Math.random() * 10);
      const message =
        'Sending Message Number = ' + i + ' with Priority Value = ' + priority;

      await channel.sendToQueue(queueName, Buffer.from(message), {
        priority: priority,
      });

      console.log(message);
    }

    await channel.close();
    await connection.close();
  } catch (error) {
    console.log(error);
  }
};

init();

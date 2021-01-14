const amqp = require('amqplib');

const amqpServerURL = 'amqp://localhost:5672';
const queueName = 'delay_queue';

const current_time = () => {
  const now = new Date();
  const hour = '' + now.getHours();
  if (hour.length == 1) {
    hour = '0' + hour;
  }
  const minute = '' + now.getMinutes();
  if (minute.length == 1) {
    minute = '0' + minute;
  }
  const second = '' + now.getSeconds();
  if (second.length == 1) {
    second = '0' + second;
  }
  return hour + ':' + minute + ':' + second;
};

const init = async () => {
  try {
    const connection = await amqp.connect(amqpServerURL);
    const channel = await connection.createChannel();

    await channel.assertQueue(queueName, { durable: true });
    await channel.prefetch(10);

    console.log(`Waiting for messages from ${queueName}. To exit press CTRL+C`);

    channel.consume(
      queueName,
      (msg) => {
        console.log(
          `Received job with message ${msg.content.toString()} at ${current_time()}`
        );
      },
      { noAck: true }
    );
  } catch (error) {
    console.log(error);
  }
};

init();

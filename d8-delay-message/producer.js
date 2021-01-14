const amqp = require('amqplib');

const amqpServerURL = 'amqp://localhost:5672';
const exchangeName = 'my-delay-exchange';
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

    await channel.assertExchange(exchangeName, 'x-delayed-message', {
      autoDelete: false,
      durable: true,
      passive: true,
      arguments: { 'x-delayed-type': 'direct' },
    });
    await channel.assertQueue(queueName, { durable: true });
    await channel.bindQueue(queueName, exchangeName, queueName);

    for (let i = 1; i <= 20; i++) {
      const delayInMilliseconds = Math.floor(Math.random() * 1000);
      const message =
        'Message Number = ' + i + ' with Delay Value = ' + delayInMilliseconds;

      await channel.publish(exchangeName, queueName, Buffer.from(message), {
        headers: { 'x-delay': delayInMilliseconds },
      });

      console.log(`Sending ${message} at ${current_time()}`);
    }

    await channel.close();
    await connection.close();
  } catch (error) {
    console.log(error);
  }
};

init();

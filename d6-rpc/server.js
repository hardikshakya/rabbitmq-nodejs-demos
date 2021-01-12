const amqp = require('amqplib');

const amqpServerURL = 'amqp://localhost:5672';
const queueName = 'rpc_queue';

const fibonacci = (n) => {
  if (n == 0 || n == 1) return n;
  else return fibonacci(n - 1) + fibonacci(n - 2);
};

const init = async () => {
  try {
    const connection = await amqp.connect(amqpServerURL);
    const channel = await connection.createChannel();

    await channel.assertQueue(queueName, { durable: true });
    await channel.prefetch(1);

    console.log('Awaiting RPC requests');

    channel.consume(queueName, async (msg) => {
      const n = parseInt(msg.content.toString());

      console.log(`Calling fibonacci(${n}) function...`);

      const result = fibonacci(n);

      await channel.sendToQueue(
        msg.properties.replyTo,
        Buffer.from(result.toString()),
        { correlationId: msg.properties.correlationId }
      );

      channel.ack(msg);
    });
  } catch (error) {
    console.error(error);
  }
};

init();

const amqp = require('amqplib');

const amqpServerURL = 'amqp://localhost:5672';
const exchangeName = 'topic_logs';
const args = process.argv.slice(2);
const routing_key = args.length > 0 ? args[0] : 'anonymous.info';
const msg = args.slice(1).join(' ') || 'Hello World!';

const init = async () => {
  try {
    const connection = await amqp.connect(amqpServerURL);
    const channel = await connection.createChannel();

    await channel.assertExchange(exchangeName, 'topic', { durable: false });
    await channel.publish(exchangeName, routing_key, Buffer.from(msg));

    console.log(`Job sent with === key '${routing_key}' === message '${msg}' `);

    await channel.close();
    await connection.close();
  } catch (error) {
    console.error(error);
  }
};

init();

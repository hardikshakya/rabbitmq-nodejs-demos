const amqp = require('amqplib');

const amqpServerURL = 'amqp://localhost:5672';
const exchangeName = 'direct_logs';
const args = process.argv.slice(2);
const msg = args.slice(1).join(' ') || 'Hello World!';
const routing_key = args.length > 0 ? args[0] : 'info';

const init = async () => {
  try {
    const connection = await amqp.connect(amqpServerURL);
    const channel = await connection.createChannel();

    await channel.assertExchange(exchangeName, 'direct', { durable: false });
    await channel.publish(exchangeName, routing_key, Buffer.from(msg));

    console.log(`${msg} sent successfully with ${routing_key} key :)`);

    await channel.close();
    await connection.close();
  } catch (error) {
    console.error(error);
  }
};

init();

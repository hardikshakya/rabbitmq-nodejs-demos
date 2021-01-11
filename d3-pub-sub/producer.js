const amqp = require('amqplib');

const amqpServerURL = 'amqp://localhost:5672';
const exchangeName = 'broadcast_logs';
const message = process.argv.slice(2).join(' ') || 'Hello world!';

const init = async () => {
  try {
    const connection = await amqp.connect(amqpServerURL);
    const channel = await connection.createChannel();

    /**
     * assertExchange(exchange, type, [options])
     * Assert an exchange into existence.
     */
    await channel.assertExchange(exchangeName, 'fanout', {
      durable: false,
    });

    /**
     * publish(exchange, routingKey, content, [options])
     * Publish a single message to an exchange.
     */
    await channel.publish(exchangeName, '', Buffer.from(message));

    console.log(`${message} sent successfully :)`);

    await channel.close();
    await connection.close();
  } catch (error) {
    console.error(error);
  }
};

init();

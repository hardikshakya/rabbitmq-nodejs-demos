const amqp = require('amqplib');

const amqpServerURL = 'amqp://localhost:5672';
const exchangeName = 'topic_logs';
const bindingKeys = process.argv.slice(2);

if (bindingKeys.length == 0) {
  console.log('Usage: consumer.js <facility>.<binding_key>');
  process.exit(1);
}

const init = async () => {
  try {
    const connection = await amqp.connect(amqpServerURL);
    const channel = await connection.createChannel();

    await channel.assertExchange(exchangeName, 'topic', { durable: false });

    const tempQueue = await channel.assertQueue('', { exclusive: true });

    console.log('Waiting for logs. To exit press CTRL+C');

    bindingKeys.forEach((binding_key) => {
      channel.bindQueue(tempQueue.queue, exchangeName, binding_key);
    });

    channel.consume(
      tempQueue.queue,
      (msg) => {
        console.log(
          `Received job === key '${
            msg.fields.routingKey
          }' === message '${msg.content.toString()}'`
        );
      },
      {
        noAck: true,
      }
    );
  } catch (error) {
    console.error(error);
  }
};

init();

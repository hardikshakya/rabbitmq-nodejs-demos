const amqp = require('amqplib');

const amqpServerURL = 'amqp://localhost:5672';
const queueName = 'rpc_queue';
const args = process.argv.slice(2);

if (args.length == 0) {
  console.log('Usage: client.js num');
  process.exit(1);
}

const generateUuid = () => {
  return (
    Math.random().toString() +
    Math.random().toString() +
    Math.random().toString()
  );
};

const init = async () => {
  try {
    const connection = await amqp.connect(amqpServerURL);
    const channel = await connection.createChannel();

    const tempQueue = await channel.assertQueue('', { exclusive: true });
    const correlationId = generateUuid();
    const num = parseInt(args[0]);

    console.log(`Requesting fibonacci(${num}) from client...`);

    channel.consume(
      tempQueue.queue,
      async (msg) => {
        if (msg.properties.correlationId === correlationId) {
          console.log(
            `Got response from server with message '${msg.content.toString()}'`
          );

          await channel.close();
          await connection.close();
        }
      },
      { noAck: true }
    );

    channel.sendToQueue(queueName, Buffer.from(num.toString()), {
      correlationId,
      replyTo: tempQueue.queue,
    });
  } catch (error) {
    console.error(error);
  }
};

init();

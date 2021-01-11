const amqp = require('amqplib');

const message = process.argv[2] || 'Hello world!';
const jobCompletionTimeInSeconds = parseInt(process.argv[3]) || 7;
const amqpServerURL = 'amqp://localhost:5672';
const queueName = 'd2_work_queue';
const jobDataObject = {
  jobMessage: message,
  jobCompletionTime: jobCompletionTimeInSeconds,
};

const init = async () => {
  try {
    const connection = await amqp.connect(amqpServerURL);
    const channel = await connection.createChannel();

    await channel.assertQueue(queueName, { durable: true });
    await channel.sendToQueue(
      queueName,
      Buffer.from(JSON.stringify(jobDataObject)),
      {
        persistent: true,
      }
    );

    console.log(`${message} sent successfully :)`);

    await channel.close();
    await connection.close();
  } catch (error) {
    console.error(error);
  }
};

init();

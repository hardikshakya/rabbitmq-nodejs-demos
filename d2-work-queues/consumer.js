const amqp = require('amqplib');

const amqpServerURL = 'amqp://localhost:5672';
const queueName = 'd2_work_queue';

const init = async () => {
  try {
    const connection = await amqp.connect(amqpServerURL);
    const channel = await connection.createChannel();

    await channel.assertQueue(queueName, { durable: true });

    /**
     * prefetch(count, [global])
     * The count given is the maximum number of messages sent over the channel that can be awaiting acknowledgement;
     * once there are count messages outstanding, the server will not send more messages on this channel until one or more have been acknowledged.
     */
    channel.prefetch(1);

    console.log(`Waiting for messages in ${queueName}. To exit press CTRL+C`);

    channel.consume(
      queueName,
      (message) => {
        if (message !== null) {
          const jobData = JSON.parse(message.content.toString());

          console.log(`Received job with message ${jobData.jobMessage}`);

          setTimeout(() => {
            console.log(
              `Worker completed his received job  ${jobData.jobMessage}`
            );

            channel.ack(message);
          }, jobData.jobCompletionTime * 1000);
        } else {
          console.log('Queue is empty!');
          channel.reject(message);
        }
      },
      { noAck: false }
    );
  } catch (error) {
    console.error(error);
  }
};

init();

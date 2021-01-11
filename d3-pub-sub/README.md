# Demo three: Publish/Subscribe

- Using RabbitMQ as a `broadcast mechanism`. [producer.js](producer.js) sends a "log" message to a `fanout` exchange, and all [consumer.js](consumer.js) processes will receive log messages.

- The producer can only send messages to an `exchange`. On one side it receives messages from producers and the other side it pushes them to queues.

- And what exchange gone do with received message is depend of it's `exchange type`.

- There are a few exchange types available: `direct`, `topic`, `headers` and `fanout`. For publish/subscribe broadcast demo we gone use `fanout`.

## Running Locally

- First start `multiple consumers` just by running consumer scripts in new terminal windows.

- Now in another `terminal` start producer with following command:

  ```bash
  node producer.js <arg 1>
  ```

  - `<arg 1>`: Message you wants to broadcast

# Demo one: Simple Hello World

A "Simple Hello World" example, with one script [producer.js](producer.js) sending a message to a queue,and another [consumer.js](consumer.js) receiving messages from the same queue.

## Running Locally

- In `terminal 1` start producer with following command:

  ```bash
  node producer.js <arg 1>
  ```

  - `<arg 1>`: Message you wants to send to consumer/worker

- In `terminal 2` start consumer with following command:

  ```bash
  node consumer.js
  ```

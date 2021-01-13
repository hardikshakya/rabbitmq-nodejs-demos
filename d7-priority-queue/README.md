# Demo seven: Priority Queue

- We can set `priority` for any message in RabbitMQ.

- Note: Versions of RabbitMQ older than `3.5.0` will `not` support this feature.

- For more information refer this [RabbitMQ documentation](https://www.rabbitmq.com/priority.html).

## Running Locally

- In `terminal 1` start producer with following command:

  ```bash
  node producer.js
  ```

- In `terminal 2` start consumer with following command:

  ```bash
  node consumer.js
  ```

# delay/schedule messages

- To use `delay` feature of RabbitMQ there are two prerequisites

  1. RabbitMQ with `3.5.3` and `later` versions

  2. RabbitMQ Delayed Message Plugin

- Installing the RabbitMQ Delayed Message Plugin.
  
  1. Go to the [plugin page](http://www.rabbitmq.com/community-plugins.html).

  2. Download `“rabbitmq_delayed_message_exchange”`.

  3. Move the file to the plugins folder of your RabbitMQ installation.

  4. Run `“rabbitmq-plugins enable rabbitmq_delayed_message_exchange”`.

[ NOTE: In my [Dockerfile](../Dockerfile), I already implemented these above steps. ]

## Running Locally

- In `terminal 1` start producer with following command:

  ```bash
  node producer.js
  ```

- In `terminal 2` start consumer with following command:

  ```bash
  node consumer.js
  ```

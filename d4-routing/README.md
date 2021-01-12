# Demo four: Routing

- Using RabbitMQ as a `routing ('somecast') mechanism`. [producer.js](producer.js) sends a log message with a severity/routing key, and all [consumer.js](consumer.js) processes receive log messages for the severities/binding keys on which they are listening.

- While emitting logs instead of `fanout` we'll send messages to a `direct` exchange. We will supply the log `severity` as a `routing key`. That way the receiving script will be able to select the severity it wants to receive.

## Running Locally

- If you want to save only `'warning'` and `'error'` (and not `'info'`) log messages to a file, just open a console and type:

  ```bash
  node consumer.js warning error > logs_from_rabbit.log
  ```

- If you'd like to see all the log messages on your screen, open a new terminal and do:

  ```bash
  node consumer.js info warning error
  ```

- And, for example, to emit an `error` log message just type:

  ```bash
  node producer.js error "Run. Run. Or it will explode."
  ```

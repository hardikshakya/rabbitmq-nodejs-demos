# Demo nine: Manual Backoff

- With the help of the RabbitMQ I implemented simple `manual backoff` system.

- What it will do ?

  - If any message/job got failed, we will put it again in our queue so it can execute again.

  - Yes. We will pass `x-retry-count` in header, straightforward to solve by simply introducing some kind of counter to limit the number of attempts you try to process the message.

  - This solves the possible infinite loop of retrying the same message forever in case your code finds it impossible to process it.

  - After certain amount of retrying same message we will send that message to `error_manual_backoff` queue. So we can keep track of those failed message/job.

## Running Locally

- In `terminal 1` start producer with following command:

  ```bash
  node producer.js
  ```

- In `terminal 2` start consumer with following command:

  ```bash
  node consumer.js
  ```

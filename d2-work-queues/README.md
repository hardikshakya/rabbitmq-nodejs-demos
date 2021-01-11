# Demo two: Work Queues

- Using RabbitMQ as a work queue; [producer.js](producer.js) creates a task, and [consumer.js](consumer.js) processes tasks. Multiple [consumer.js](consumer.js) process will share the tasks among them. Long-running tasks are simulated by supplying a delay time(second) in command arguments.

- `Round-robin dispatching`: One of the advantages of using a Task Queue is the ability to easily parallelize work. If we are building up a backlog of work, we can just add more workers and that way, scale easily.

## Running Locally

- In `terminal 1` start producer with following command:

  ```bash
  node producer.js <arg 1> <arg 2>
  ```

  - `<arg 1>`: Message you wants to send in job object
  - `<arg 2>`: Numeric number which will consider as a time(second) that worker will take to finished given job

- Now to start consumer run this following command:

  ```bash
  node consumer.js
  ```

- Now you can start multiple consumers just by running consumer scripts in new terminal windows.

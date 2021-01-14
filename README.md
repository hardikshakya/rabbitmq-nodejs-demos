# RabbitMQ Demos/Tutorials Using NodeJS

This repository contains RabbitMQ Demos/Tutorials with `amqplib` node-js library.

RabbitMQ speaks multiple protocols. But in this demo/tutorial I used `AMQP 0-9-1`, which is an open, general-purpose protocol for messaging.

## Requirements

- [Node v10.15+](https://nodejs.org/en/download/current/)

- [Docker](https://www.docker.com/get-started)

## Getting Started

- Wants to run my demo code:

  - Clone the repository:

    ```bash
    git clone <Repository Path>
    cd rabbitmq-nodejs-demos
    ```

  - Install all dependencies:

    ```bash
    npm install
    ```

- Wants to run your own code:

  ```bash
  npm init -y
  npm install amqplib
  ```

## Running Locally

- In `terminal 1` start/run rabbitmq server with docker:

  ```bash
  docker-compose up --build
  ```

- In `terminal 2` start message/job publisher:

  ```bash
  node <folder-name>/producer.js
  ```

- In `terminal 3` start message/job consumer:

  ```bash
  node <folder-name>/consumer.js
  ```

## Demos

## [Demo one: Simple Hello World](d1-simple-hello-world/README.md)

A "Simple Hello World" example, with one script [producer.js](d1-simple-hello-world/producer.js) sending a message to a queue,and another [consumer.js](d1-simple-hello-world/consumer.js) receiving messages from the same queue.

## [Demo two: Work Queues](d2-work-queues/README.md)

Using RabbitMQ as a `work queue`; [producer.js](d2-work-queues/producer.js) creates a task, and [consumer.js](d2-work-queues/consumer.js) processes tasks. Multiple [consumer.js](d2-work-queues/consumer.js) process will share the tasks among them. Long-running tasks are simulated by supplying a delay time(second) in command arguments.

## [Demo three: Publish/Subscribe](d3-pub-sub/README.md)

Using RabbitMQ as a `broadcast mechanism`. [producer.js](d3-pub-sub/producer.js) sends a "log" message to a `fanout` exchange, and all [consumer.js](d3-pub-sub/consumer.js) processes receive log messages.

## [Demo four: Routing](d4-routing/README.md)

Using RabbitMQ as a `routing ('somecast') mechanism`. [producer.js](d4-routing/producer.js) sends a log message with a severity/routing key, and all [consumer.js](d4-routing/consumer.js) processes receive log messages for the severities/binding keys on which they are listening.

## [Demo five: Topics](d5-topics/README.md)

With help of `topic` we can able to overcome the limitation of previous feature/demo `routing`. Here we can pass complex wildcard pattern.

## [Demo six: RPC](d6-rpc/README.md)

Using RabbitMQ as an `RPC(Remote procedure call)` intermediary, queueing requests for servers and routing replies back to clients.

## [Demo seven: Priority Queue](d7-priority-queue/README.md)

Using RabbitMQ as a `priority queue`, showing how to set maximum priority value supported by the queue and setting priority of each message pushed to the queue. In case of messages having equal value of priority, they are consumed in FIFO order.

## [Demo eight: Delay/Schedule Messages](d8-delay-message/README.md)

The RabbitMQ `Delayed Message Plugin` adds a new exchange type to RabbitMQ where messages routed by that exchange can be delayed if the user adds a delay header to a message.

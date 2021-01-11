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

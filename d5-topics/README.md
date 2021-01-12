# Demo five: Topics

- With `direct` exchange can't do routing based on multiple criteria.

- We may want to listen to just critical errors coming from 'cron' but also all logs from 'kern'. To implement that in our logging system we need to use `topic` exchange.

- The logic behind the `topic` exchange is similar to a `direct`, However there are two important special cases for binding keys:
  - `*` (star) can substitute for exactly one word.
  - `#` (hash) can substitute for zero or more words.

## Running Locally

- To receive all the logs:

  ```bash
  node consumer.js "#"
  ```

- To receive all logs from the facility `'kern'`:

  ```bash
  node consumer.js "kern.*"
  ```

- Or if you want to hear only about `'critical'` logs:

  ```bash
  node consumer.js "*.critical"
  ```

- You can create multiple bindings:

  ```bash
  node consumer.js "kern.*" "*.critical"
  ```

- And to emit a log with a routing key `'kern.critical'` type:

  ```bash
  node producer.js "kern.critical" "A critical kernel error"
  ```

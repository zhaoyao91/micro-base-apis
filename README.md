# Micro Base APIs

Define a set of basic apis for a [Zeit Micro][micro] service.

## Installation

```
npm i -S micro-base-apis
```

## Usage

Apply this hoh (high order handler)

```ecmascript 6
const baseApis = require('micro-base-apis')

const myHandler = async (req, res) => {
  ...
}

module.exports = baseApis()(myHandler)
```

## APIs

- GET /ping => 'pong'
- GET /info => {timeString, time, hostname, pid, ips}

## License

ISC

[micro]: https://github.com/zeit/micro
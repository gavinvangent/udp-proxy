# udp-proxy

A NodeJS UDP proxy built in typescript.

## Getting started

You will need to have NodeJS installed, preferablly version 16.16.0. After cloning the repository, run the following command to prepare the codebase

```sh
npm i
```

## Running

The command to start the udp proxy has the following structure:

`npm run start {bindAddress} {bindPort} {serverAddress} {serverPort} {type}`

where

- `bindAddress` is the address the proxy will bind to, ie, 0.0.0.0 or 127.0.0.1
- `bindPort` is the port the proxy will bind to, ie, 9001
- `serverAddress` is the address of the remote server where traffic will be forwarded to, ie, server.example.com or 8.8.4.4
- `serverPort` is the port of the remote server where traffice will be forwarded to, ie, 5000
- `type` is an option of `udp4` or `udp6`. Defaults to `udp4`

Example:

```sh
npm run start 0.0.0.0 9001 server.example.com 5000 udp4
```

## TODO

- Logging: Not much has been added yet. The logging currently is basic and will need attention.
- Tests: No unit/end-to-end tests have been added yet

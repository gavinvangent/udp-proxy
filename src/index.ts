import { createSocket } from 'dgram'
import { Config } from './config'
import { Target } from './types'

const config = Config.fromArgs()
config.validate()
const listener = createSocket('udp4')

let _targets: { [key: string]: Target } = {}
const getServerSocket = (client: Target): Target => {
    const clientId = `${client.address}:${client.port}:${client.family}:${client.size}:${client.alias}`
    if (!_targets[clientId]) {
        const server: Target = _targets[clientId] = {
            socket: createSocket(config.type),
            alias: 'server',
            address: config.serverAddress,
            port: config.serverPort
        }

        server.socket
            .on('message', message => {
                proxyMessage(message, server, client)
            })
            .once('close', () => { _targets[clientId] = undefined })
    }
    return _targets[clientId]
}

const proxyMessage = (message: Buffer, source: Target, destination: Target) => {
    destination.socket.send(message, destination.port, destination.address, error => {
        if (error) {
            console.error('Error forwarding packet to server', error)
            destination.socket.close()
            return
        }

        console.log(`[${source.address}:${source.port}] ${source.alias} -> ${destination.alias} [${destination.address}:${destination.port}] ${message.toString('hex')}`)
    })
}

listener
    .on('error', err => {
        console.log(`listener error:\n${err.stack}`)
        listener.close()
    })
    .on('message', (message, clientRemoteInfo) => {
        const client: Target = { socket: listener, ...clientRemoteInfo, alias: 'client' }
        const server: Target = getServerSocket(client)
        proxyMessage(message, client, server)
    })
    .on('listening', () => {
        const address = listener.address()
        console.log(`Listening on ${address.address}:${address.port}`)
    })
    .bind(config.bindPort, config.bindAddress)

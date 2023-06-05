import { Socket } from 'dgram'

export interface Target {
    socket: Socket
    alias: string
    address: string
    port: number
    family?: string
    size?: number
}

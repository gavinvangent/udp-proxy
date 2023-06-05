export class Config {
    /** The address for the proxy to listen on */
    bindAddress: string
    /** The port for the proxy to listen on */
    bindPort: number
    /** The address for the proxy to send received traffic to */
    serverAddress: string
    /** The port for the proxy to send received traffic to */
    serverPort: number
    /** The type of listener to create, udp6 or udp4, defaults to udp4 */
    type: 'udp4'|'udp6'

    static fromArgs(): Config {
        const config = new Config()

        config.bindAddress = process.argv[2]
        config.bindPort = (process.argv[3] && +process.argv[3] > 0 && +process.argv[3])

        config.serverAddress = process.argv[4]
        config.serverPort = (process.argv[5] && +process.argv[5] > 0 && +process.argv[5])

        config.type = process.argv[6] as any || 'udp4'

        return config
    }

    /**
     * Returns void if valid, throws an error when invalid
     */
    validate(): void {
        if (!this.bindAddress) {
            throw new Error(`No 'bindAddress' was specified [first argument]`)
        }

        if (!this.bindPort) {
            throw new Error(`No 'bindPort' was specified [second argument]`)
        }

        if (!this.serverAddress) {
            throw new Error(`No 'serverAddress' was specified [third argument]`)
        }

        if (!this.serverPort) {
            throw new Error(`No 'serverPort' was specified [fourth argument]`)
        }

        if (!['udp4', 'udp6'].includes(this.type)) {
            throw new Error(`Invalid udp type supplied [fifth argument]. Options are 'udp4' or 'udp6'`)
        }
    }
}

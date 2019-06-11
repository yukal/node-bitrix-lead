module.exports = {
    server: {
        port: 8181,
        host: '172.70.0.2',
    },

    cors: {
        allow_port: 8080,
        allow_headers: 'Origin, X-Requested-With, Content-Type, Accept',
        allow_origin: 'http://172.70.0.3:8080',
        options: '*',
    },

    bitrix: {
        userId: 0,
        webhook: '',
        format: 'json',
        protocol: 'https',
        host: 'endotech.bitrix24.com',
    }
}
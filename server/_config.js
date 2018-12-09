module.exports = {
    // Server Options
    listen_port: 8181,
    listen_host: '0.0.0.0',
    cors: {
        options: '*',
        allow_headers: 'Origin, X-Requested-With, Content-Type, Accept',
        allow_port: 8080,
    },

    // Bitrix Options
    // An ID of the responsible user of the company (that created WebHook)
    user_id: 0,
    webhook: '',
    domain: 'endotech.bitrix24.com',
    format: 'json',
}
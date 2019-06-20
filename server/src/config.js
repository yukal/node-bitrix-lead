module.exports = {
    server: {
        port: 8181,
        host: '0.0.0.0',
    },

    cors: {
        allow_port: 8080,
        allow_headers: 'Origin, X-Requested-With, Content-Type, Accept',
        allow_origin: 'http://0.0.0.0:8080',
        options: '*',
    },

    bitrix: {
        userId: 0,
        webhook: '',
        format: 'json',
        protocol: 'https',
        host: 'your_account_name.bitrix24.com',
    },

    mailer: {
        service: 'gmail',
        auth: {
            user: 'username@gmail.com',
            pass: 'password'
        },
        defaultOptions: {
            to: 'username@email.com',
            from: 'username@gmail.com',
            subject: 'nodemailer'
        }
    }
};

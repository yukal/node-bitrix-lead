const conf = require('../../config');
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport(conf.mailer);

function httpLogger(data) {
    const { method, path } = data.req;
    const { statusCode, statusMessage } = data.res;

    const content = data.err ? data.err 
        : `${method} [${statusCode}] ${statusMessage} ${path} >> ` + data.body.toString('utf8');

    sendMail(content);

    return this;
};

function textLogger(data) {
    sendMail(data);
}

function sendMail(html, subject, to, from) {
    const options = Object.assign({}, conf.mailer.defaultOptions, { html });

    if (subject) {
        options.subject = subject;
    }

    if (from) {
        options.from = from;
    }

    if (to) {
        options.to = to;
    }

    transporter.sendMail(options, function (err, info) {
        if (err) {
            console.error(err);
        } else {
            console.log(info);
        }
    });
}

module.exports = {
    http: httpLogger,
    text: textLogger
};

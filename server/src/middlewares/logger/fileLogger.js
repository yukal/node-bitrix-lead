const fs = require('fs');
const filePath = './reporter.log';

function httpLogger(data) {
    const { method, path } = data.req;
    const { statusCode, statusMessage } = data.res;

    const content = data.err ? data.err 
        : `${method} [${statusCode}] ${statusMessage} ${path} >> ` + data.body.toString('utf8');

    writeData(filePath, content);

    return this;
}

function textLogger(data) {
    writeData(filePath, `${data}\n`);
}

function writeData(filePath, data) {
    const dateISO = (new Date()).toISOString();
    const dateFormatted = dateISO.substr(0,10) + ' ' + dateISO.substr(11,8);

    const content = `[${dateFormatted}] ${data}`;

    fs.appendFile(filePath, content, error => {
        if (error) {
            console.error(error);
        }
    });
}

module.exports = {
    http: httpLogger,
    text: textLogger
};

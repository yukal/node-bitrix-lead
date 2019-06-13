function httpLogger(data) {
    const { method, path } = data.req;
    const { statusCode, statusMessage } = data.res;

    if (data.error) {

        console.error(data.error);

    } else {

        console.log(`${method} [${statusCode}] ${statusMessage} ${path}`);
        console.log(data.body.toString('utf8'));

    }

    return this;
};

function textLogger(data) {
    console.log(data);
}

module.exports = {
    http: httpLogger,
    text: textLogger
};

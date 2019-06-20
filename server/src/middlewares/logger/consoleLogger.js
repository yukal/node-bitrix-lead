function httpLogger(data) {
    const { method, path } = data.req;
    const { statusCode, statusMessage } = data.res;

    if (data.error) {

        console.error(data.error);

    } else {

        const content = `${method} [${statusCode}] ${statusMessage} ${path} >> ` + data.body.toString('utf8');
        console.log(content.replace(/\n+$/,''));

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

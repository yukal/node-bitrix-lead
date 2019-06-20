function httpLogger(data) {
    console.log(data.body);
    return this;
};

function textLogger(data) {
    console.log(data);
};

module.exports = {
    http: httpLogger,
    text: textLogger
};

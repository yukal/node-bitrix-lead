function createLogger(instance) {
    function Logger(data, fn='log') {
        let message;

        if (isMatchedObject(data)) {
            if (data.error) {
                fn = 'error';
                message = data.error;
            } else {
                message = getHttpData(data);
            }
            message && console[fn].apply(console, message);
        }

        return this;
    }

    Logger.info  = data => Logger.call(instance, data, 'info');
    Logger.error = data => Logger.call(instance, data, 'error');

    return Logger;
}

function getHttpData(data, mask='%s [%d] %s %s >> %s') {
    return [
        mask,
        data.req.method,
        data.res.statusCode,
        data.res.statusMessage,
        data.req.path,
        data.body.toString('utf8').replace(/\n+$/,'')
    ];
}

function isMatchedObject(obj) {
    const type = typeof(obj);
    return type !== null && type == 'object'
        && obj.hasOwnProperty('body') 
        && obj.hasOwnProperty('req') 
        && obj.hasOwnProperty('res')
        && obj.hasOwnProperty('err')
    ;
}

module.exports = function decorator(name) {
    return Object.defineProperty({}, name, {
        get: function redefine() {
            Object.defineProperty(this, name, {
                value: createLogger(this),
                enumerable: true,
                configurable: true
            });

            return this[name];
        },
        configurable: true
    });
}

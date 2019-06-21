function createLogger(instance) {
    const fns = ['log','info','error'];

    function Logger() {
        const args = Array.prototype.slice.call(arguments);
        const fn = fns.indexOf(args[args.length-1]) > -1 ?args.pop() :'log';
        args.length && console[fn].apply(console, args);
        return this;
    }

    Logger.info = function infoLogger() {
        const args = Array.prototype.slice.call(arguments);
        return Logger.apply(instance, args.concat('info'));
    }

    Logger.error = function errorLogger() {
        const args = Array.prototype.slice.call(arguments);
        return Logger.apply(instance, args.concat('error'));
    }

    return Logger;
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

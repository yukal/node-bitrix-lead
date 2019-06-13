const logger = require('./consoleLogger');
// const logger = require('./fileLogger');
// const logger = require('./emailLogger');

const httpTargets = ['response', 'request'];
const targets = ['application', ...httpTargets];

module.exports = (express, propertyName = 'log') => {
    const errors = [];

    targets.map(target => {
        const item = express[target];

        if (!item.hasOwnProperty(propertyName)) {
            item[propertyName] = httpTargets.indexOf(target)>-1 ?logger.http :logger.text;
        } else {
            errors.push(`Property name "${propertyName}" already exists in "${target}" object. Please use another property name`);
        }
    })

    if (errors.length) {
        // errors.unshift('');
        throw new Error(errors.join("\n"));
    }

    return express;
};

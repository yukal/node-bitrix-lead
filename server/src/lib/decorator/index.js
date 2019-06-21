function isMatchedObject(object) {
    return (object !== null && typeof object == 'object') 
        && (Object.keys(object).length > 0);
}

function decorate(component, src, fn) {
    let property, instance = component;
    const chunks = src.substr(1).split('.');
    const decoratorName = chunks.pop();

    while (property = chunks.shift()) {
        instance = instance[property];
    }

    if (!instance.hasOwnProperty(decoratorName)) {
        if (typeof(fn) == 'function' && fn.name == 'sandbox') {
            fn(instance, decoratorName);
        }

        else if(typeof(fn) == 'function' && fn.name == 'decorator') {
            const decorator = fn(decoratorName);
            if (decorator.hasOwnProperty(decoratorName)) {
                const descriptors = Object.getOwnPropertyDescriptor(decorator, decoratorName);
                Object.defineProperty(instance, decoratorName, descriptors);
            }
        }

        else {
            instance[decoratorName] = fn;
        }

        return true;
    }

    return false;
}

module.exports = function decoratorManager(component, decorators) {
    if (typeof(component) == 'string') {
        !decorators && (decorators = require(`./${component}`));
        component = require(component);
    }

    if (!isMatchedObject(decorators)) {
        throw new Error('Decorators is not matched');
    }

    for (const src in decorators) {
        if (!decorate(component, src, decorators[src])) {

            // const decoratorName = src.split('.').pop();
            const decoratorName = src.match(/[^.]+$/);
            throw new Error(`Property "${decoratorName}" already exists in path "${src}", use another property name!`);

        }
    }

    return component;
};

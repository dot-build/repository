'use strict';

class Repository {

    save(subject, options) {
        return this.__call__('save', subject, options);
    }

    find(subject, options) {
        return this.__call__('find', subject, options);
    }

    remove(subject, options) {
        return this.__call__('remove', subject, options);
    }

    static new(config = {}) {
        if (!config.name) {
            throw new Error('Invalid repository name');
        }

        if (!config.adapter) {
            throw new Error('Invalid repository adapter');
        }

        let Constructor = function Repository() {
            this.name = config.name;
            this.adapter = config.adapter;
            this.options = config.options || {};
        };

        let prototype = Object.create(Repository.prototype);
        prototype.constructor = Constructor;

        Constructor.prototype = prototype;

        return Constructor;
    }

    __call__(method, subject, options = {}) {
        let mergedOptions = mergeObjects({}, this.options, options);
        let args = [this.name, subject, mergedOptions];

        return this.adapter[method].apply(this.adapter, args);
    }

}

function mergeObjects(destination, ...sources) {
    sources.forEach(source => {
        Object.keys(source).forEach((key) => destination[key] = source[key]);
    });

    return destination;
}

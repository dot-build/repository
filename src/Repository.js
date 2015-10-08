class Repository {
    static create(config = {}) {
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
        Object.defineProperty(Constructor, 'config', {
            writable: false,
            value: config
        });

        return Constructor;
    }

    __callAdapter(method, ...args) {
        let options = args.pop() || {};
        let mergedOptions = mergeObjects(this.options, options);

        args.push(mergedOptions);
        args.unshift(this.name);

        return this.adapter[method].apply(this.adapter, args);
    }
}

let repositoryMethods = ['find', 'remove', 'save', 'findAll', 'removeAll', 'saveAll'];

repositoryMethods.forEach(function addMethodToRepository(methodName) {
    Repository.prototype[methodName] = function(subject, options = {}) {
        return this.__callAdapter(methodName, subject, options);
    };
});

function mergeObjects(destination, source) {
    Object.keys(source).forEach((key) => destination[key] = source[key]);
    return destination;
}
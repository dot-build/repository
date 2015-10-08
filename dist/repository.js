(function(global) {

    'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var repositoryMethods = ['find', 'remove', 'save', 'findAll', 'removeAll', 'saveAll'];

var Repository = (function () {
    function Repository() {
        _classCallCheck(this, Repository);
    }

    _createClass(Repository, [{
        key: '__callAdapter',
        value: function __callAdapter(method) {
            for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                args[_key - 1] = arguments[_key];
            }

            var options = args.pop() || {};
            var mergedOptions = mergeObjects(this.options, options);

            args.push(mergedOptions);
            args.unshift(this.name);

            return this.adapter[method].apply(this.adapter, args);
        }
    }], [{
        key: 'create',
        value: function create() {
            var config = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

            if (!config.name) {
                throw new Error('Invalid repository name');
            }

            if (!config.adapter) {
                throw new Error('Invalid repository adapter');
            }

            var Constructor = function Repository() {
                this.name = config.name;
                this.adapter = config.adapter;
                this.options = config.options || {};
            };

            var prototype = Object.create(Repository.prototype);
            prototype.constructor = Constructor;

            Constructor.prototype = prototype;

            if (config.methods) {
                Object.keys(config.methods).forEach(function addCustomMethod(method) {
                    if (repositoryMethods.indexOf(method) !== -1) return;

                    prototype[method] = config.methods[method];
                });
            }

            return Constructor;
        }
    }]);

    return Repository;
})();

repositoryMethods.forEach(function addMethodToRepository(methodName) {
    Repository.prototype[methodName] = function (subject) {
        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        return this.__callAdapter(methodName, subject, options);
    };
});

function mergeObjects(destination, source) {
    Object.keys(source).forEach(function (key) {
        return destination[key] = source[key];
    });
    return destination;
}

    if (typeof define === 'function' && define.amd) {
        define(function() {
            return Repository;
        });
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = Repository;
    } else {
        global.Repository = Repository;
    }

})(this);
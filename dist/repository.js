(function(global) {

    'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Repository = (function () {
    function Repository() {
        _classCallCheck(this, Repository);
    }

    _createClass(Repository, [{
        key: 'save',
        value: function save(subject, options) {
            return this.__call__('save', subject, options);
        }
    }, {
        key: 'find',
        value: function find(subject, options) {
            return this.__call__('find', subject, options);
        }
    }, {
        key: 'remove',
        value: function remove(subject, options) {
            return this.__call__('remove', subject, options);
        }
    }, {
        key: '__call__',
        value: function __call__(method, subject) {
            var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

            var mergedOptions = mergeObjects({}, this.options, options);
            var args = [this.name, subject, mergedOptions];

            return this.adapter[method].apply(this.adapter, args);
        }
    }], [{
        key: 'new',
        value: function _new() {
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

            return Constructor;
        }
    }]);

    return Repository;
})();

function mergeObjects(destination) {
    for (var _len = arguments.length, sources = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        sources[_key - 1] = arguments[_key];
    }

    sources.forEach(function (source) {
        Object.keys(source).forEach(function (key) {
            return destination[key] = source[key];
        });
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
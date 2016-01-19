(function(global) {

    /* content goes here */

    if (typeof define === 'function' && define.amd) {
        define(function() {
            return Repository;
        });
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports.Repository = Repository;
    } else {
        global.Repository = Repository;
    }

})(this);

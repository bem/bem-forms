/**
 * @module validation_required
 */
modules.define('validation_required',
    function(provide) {

var DEFAULT_MESSAGE = 'Required field';

provide(function(field) {
    return function(val) {
        return val? null : field.getValidationMessage('required') || DEFAULT_MESSAGE;
    };
});

});

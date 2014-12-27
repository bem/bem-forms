/**
 * @module form
 */

modules.define(
    'form',
    ['jquery'],
    function (provide, $, Form) {

        provide(Form.decl({ modName : 'validate', modVal : true }, {

            onSetMod : {
                'js' : {
                    'inited' : function () {
                        var _this = this;

                        _this._setFields();

                        this.bindTo('submit', function(e) {
                            this._onSubmit(e);
                        });

                        this.on('submit', function () {
                            _this.valid() && window.console.log('Yeah!');
                        });
                    }
                }
            },

            _setFields : function() {
                var _this = this;

                _this._fields = _this.elem('field');

                for(var currInputOnField, currInputType, i = 0; i < _this._fields.length; i++) {

                    currInputType = $(_this._fields[i]).attr('class').split(' ')[0];
                    currInputOnField = _this.findBlockOn($(_this._fields[i]), currInputType);

                    _this._fields[i] = {
                        name      : currInputOnField.getName(),
                        validator : _this.findBlockOn($(_this._fields[i]), 'validate')
                    };

                }
            },

            valid : function() {
                for(var i = 0, l = this._fields.length; i < l - 1; i++) {
                    if(this._fields[i].validator && !this._fields[i].validator.run()) {
                        return false;
                    }
                }
                return true;
            },

            _onSubmit : function(e) {
                e.preventDefault();
                this.emit('submit');
            }

        },
        {
            live : false
        }
        ));

    }
);
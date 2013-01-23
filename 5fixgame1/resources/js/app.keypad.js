var app = app || {};

(function(){

    var inte = null;
    var mouseEvent = {};
    var element = [];

    app.keypad = function(config){
        config = config || {};
        
        this.create(config);
    }


    app.keypad.prototype.hide = function(){
        clearInterval(inte);
        inte = null;
        $(document.body).off('mouseup', mouseEvent.mouseup);
        mouseEvent.mouseup = null;

        $.each(element, function(k, v){
            v.remove();
            return;
        });
    };



    app.keypad.prototype.create = function(config){
        config = config || {};
        config.listeners = config.listeners || {};
        var thisObj = this;

        config.target = config.target ? $(config.target) : $(document.body);

        $.each(config.pad, function(k, v){
            
            switch(k){
            case 'cross':
                var b = $('<div />').on('mousedown', function(e){
                    var t = e.offsetY;
                    var l = e.offsetX;
                    var h = b.height();
                    var w = b.width();

                    v.code = 0;
                    switch(true){
                        case (t < h / 2) && (l > w / 3) && (l < w / 3 * 2):
                            v.code = 38;
                            break;
                        case (t > h / 2) && (l > w / 3) && (l < w / 3 * 2):
                            v.code = 40;
                            break;
                        case (l < w / 2):
                            v.code = 37;
                            break;
                        case (l > w / 2):
                            v.code = 39;
                            break;
                    }

                    clearInterval(inte);
                    inte = setInterval(function(){
                        config.listeners.click.call(config.scope || thisObj, v.code || 0);
                    }, 50);
                    return;
                }).on('mouseup', function(){
                    clearInterval(inte);
                    inte = null;
                    return;
                });
                break;
            
            default:
                var b = $('<div />').on('mousedown', function(e){
                    config.listeners.click.call(config.scope || thisObj, v.code || 0);
                });
                break;
            };

            b
            .text(v.name)
            .addClass(k == 'cross' ? 'crossbutton' : 'padbutton')
            .addClass(k)
            .css('top', v.top).css('left', v.left)
            .css('cursor', 'pointer')
            .appendTo(config.target);
        
            element.push(b);
            return;
        });

        mouseEvent.mouseup = function(){
            clearInterval(inte);
            inte = null;
        };
        $(document.body).on('mouseup', mouseEvent.mouseup);

        return config.target;
    }



})();

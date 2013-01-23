var app = app || {};


(function(){



    app.startboard = function(config){
        //中央に表示
        this.base = this.create(config);
    }



    app.startboard.prototype.hide = function(){
        this.base.fadeOut(null, function(){
            if(!this.base) return;
            this.base.remove();
        
            this.base = null;
        });
        return;
    }



    app.startboard.prototype.show = function(config){
        config = config || {};
        if(!this.base) return;

        this.base.width(config.width || $(window).width() * 0.7);
        this.base.height(config.height || $(window).height() * 0.7);

        this.base.css('left', parseInt($(window).width() - this.base.width()) / 2);
        this.base.css('top', ($(window).height() - this.base.height()) / 2);


        //内容を記述
        var d = $('.board', this.base);

        this.base.appendTo($(document.body));
        return;
    }



    app.startboard.prototype.create = function(config){
        config = config || {};
        var thisObj = this;
        var lis = config.listeners || {};
        
        //スコアボードの表示
        var el = $('<div class="startboard"></div>');
        el.css('position', 'absolute');
        el.css('z-index', 1000);

        //タイトルの表示
        $('<div class="title" />').appendTo(el).text(config.title || 'No title');

        //スコアボード本体の表示
        var d = $('<div class="board" />');
        el.append(d);

        var s = $('<div class="sub" />').html(config.desc || 'No description!').appendTo(d);

        //もう一度遊ぶの表記
        var b = $('<div class="button" />').appendTo(el).text('Start!');
        b.on('click', function(){
            if($.isFunction(lis.close)){
                lis.close.call(thisObj);
            }
        });
        
        return el;
    }


})();

var app = app || {};


(function(){



    app.scoreboard = function(config){
        //中央に表示
        this.base = this.create(config);
    }



    app.scoreboard.prototype.hide = function(){
        this.base.fadeOut(null, function(){
            if(!this.base) return;
            this.base.remove();
        
            this.base = null;
        });
        return;
    }



    app.scoreboard.prototype.show = function(config){
        config = config || {};
        if(!this.base) return;

        this.base.width(config.width || $(window).width() * 0.7);
        this.base.height(config.height || $(window).height() * 0.7);

        this.base.css('left', parseInt($(window).width() - this.base.width()) / 2);
        this.base.css('top', ($(window).height() - this.base.height()) / 2);


        //内容を記述
        var d = $('.board', this.base);

        if(config.total != null){
            var t = $('<div class="total"/>').appendTo(d);
            t.append($('<span class="title" />').text('トータル'));
            t.append($('<span class="value" />').text(config.total));
        }

        $.each(config.detail, function(k, v){
            var t = $('<div class="sub"/>').appendTo(d);
            t.append($('<span class="title" />').text(v.name));
            t.append($('<span class="value" />').text(v.value));
        });

        this.base.appendTo($(document.body));
        return;
    }



    app.scoreboard.prototype.create = function(config){
        config = config || {};
        var thisObj = this;
        var lis = config.listeners || {};
        
        //スコアボードの表示
        var el = $('<div class="scoreboard"></div>');
        el.css('position', 'absolute');
        el.css('z-index', 1000);

        //タイトルの表示
        $('<div class="gameover" />').appendTo(el).text('GAME OVER');

        //スコアボード本体の表示
        var d = $('<div class="board" />');
        el.append(d);

        //もう一度遊ぶの表記
        var b = $('<div class="button" />').appendTo(el).text('Try Again');
        b.on('click', function(){
            if($.isFunction(lis.close)){
                lis.close.call(thisObj);
            }
        });
        
        return el;
    }


})();

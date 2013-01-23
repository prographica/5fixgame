var app = app || {};

(function(){


    //コンストラクタ　
    app.background = function(config){
        config = config || {};

        //コンテナーの作成
        var c = new createjs.Container();

        //ビットマップの作成
        var b = new createjs.Bitmap(config.url);
        
        //http://kudox.jp/java-script/createjs-tweenjs
        b.image.onload = function() {
            
            //背景をフィットさせる
            var sw = $(window).width() / b.image.width;
            var sh = $(window).height() / b.image.height;
            b.scaleX = sw > sh ? sw : sh;
            b.scaleY = sw > sh ? sw : sh;

            stage.update();
        };
        c.addChild(b);

        //内部的にobjを利用できるように格納
        this.obj = c;
    }

    /**
     * コンテナーオブジェクトを返却する
     */
    app.background.prototype.getObject = function(){
        return this.obj;
    }

    /**
     * 画面をシェイクさせる
     */
    app.background.prototype.shake = function(){
        var loop = 0;
        createjs.Tween.get(this.obj, {loop: true, paused: false})
        .to({x: -5, y: -5}, 100)
        .to({x: -5, y: 5}, 100)
        .call(function(e){
            loop++;

            if(loop > 5){
                e.setPaused(true);
            }
        });
        return;
    }

})();


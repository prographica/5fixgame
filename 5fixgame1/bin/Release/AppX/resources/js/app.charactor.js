var app = app || {};


/**
 * キャラクター生成クラス 
 */
(function(){


    /**
     * コンストラクタ 
     */
    app.charactor = function(config){
        config = config || {};
        var baseUrl = config.baseurl;

        this.stat = 'normal';
        this.parts = {};

        //コンテナーの作成
        var c = new createjs.Container();

        //左手の配置
        var lh = new createjs.Bitmap(baseUrl + '/lefthand.png');
        lh.image.onload = function(e){
            lh.regX = lh.image.width - 30;
            lh.regY = 50;

            lh.x = -85;
            lh.y = -20;
        }
        c.addChild(lh);
        this.parts.lefthand = lh;
        
        //右手の配置
        var rh = new createjs.Bitmap(baseUrl + '/righthand.png');
        rh.image.onload = function(e){
            rh.regX = 30;
            rh.regY = 50;
            
            rh.x = 75;
            rh.y = -20;
        }
        c.addChild(rh);
        this.parts.righthand = rh;

        var ll = new createjs.Bitmap(baseUrl + '/leftleg.png');
        ll.image.onload = function(e){
            ll.regX = ll.image.width - 15;
            ll.regY = 10;

            ll.x = -15;
            ll.y = 330;
        }
        c.addChild(ll);
        this.parts.leftleg = ll;
        
        var rl = new createjs.Bitmap(baseUrl + '/rightleg.png');
        rl.image.onload = function(e){
            rl.regX = 15;
            rl.regY = 10;

            rl.x = 15;
            rl.y = 300;
        }
        c.addChild(rl);
        this.parts.rightleg = rl;
        
        //体の作成
        var b = new createjs.Bitmap(baseUrl + '/body.png');
        b.image.onload = function(){
            b.regX = b.image.width / 2;
            b.regY = b.image.height / 2;

            return;
        }
        c.addChild(b);
        this.parts.body = b;

        this.obj = c;
    }



    /**
     * コンテナーオブジェクトを返却する
     */
    app.charactor.prototype.getObject = function(){
        return this.obj;
    }


    app.charactor.prototype.getStatus = function(){
        return this.stat;
    }


    app.charactor.prototype.banzai = function(){
        var ease = createjs.Ease.bounceOut;
        var time = 1000;

        this.stat = 'banzai';

        createjs.Tween.get(this.parts.lefthand).to({rotation: 90}, time, ease);
        createjs.Tween.get(this.parts.righthand).to({rotation: -90}, time, ease);
        return;
    }


    app.charactor.prototype.clear = function(){
        var ease = createjs.Ease.bounceOut;
        var time = 1000;
        
        this.stat = 'normal';

        createjs.Tween.get(this.parts.lefthand).to({rotation: 0}, time, ease);
        createjs.Tween.get(this.parts.righthand).to({rotation: 0}, time, ease);
        return;
    }



    app.charactor.prototype.walk = function(amount, time, cb){
        amount = amount || 10;
        
        var ease = createjs.Ease.liner;
        var time = time || 0;

        //動く
        var p = this.parts;
        createjs.Tween.get(this.getObject())
        .to({x: this.getObject().x + amount}, time, ease);

        if(this.inte){
            return;
        }

        //足が動く
        var l = createjs.Tween.get(this.parts.leftleg, {loop: true})
        .wait(100)
        .to({rotation: 20}, 200)
        .to({rotation: 0}, 200)
        .wait(200);

        //足が動く
        var r = createjs.Tween.get(this.parts.rightleg, {loop: true})
        .wait(100)
        .wait(200)
        .to({rotation: -20}, 200)
        .to({rotation: 0}, 200);
 
        var thisObj = this;
        this.inte = setTimeout(function(){
            if(l) l.setPaused(true);
            createjs.Tween.get(p.leftleg).to({rotation: 0}, 100);
            
            if(r) r.setPaused(true);
            createjs.Tween.get(p.rightleg).to({rotation: 0}, 100);
        
            thisObj.inte = null;

            if($.isFunction(cb)){
                cb.call(thisObj);
            }

            return;
        }, time + 1000);
    
    }


    app.charactor.prototype.onHit = function(){
        return;
    }



    app.charactor.prototype.destroy = function(){
        if(!this) return;
        var c = this.getObject();
        if(!c || !c.parent) return;
        c.parent.removeChild(c);
    }


})();

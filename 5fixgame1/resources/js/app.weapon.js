var app = app || {};


/**
 * 武器を管理するクラス 
 */
(function(){



    /**
     * コンストラクタ
     *
     * @param {object} config 設定オブジェクト
     *  url 武器画像
     *  scale 武器のスケール
     *  target 発射オブジェクト　 
     */
    app.weapon = function(config){
        config = config || {};

        if(!config.target){
            return;
        }
    
        var c = new createjs.Container();
        var b = new createjs.Bitmap(config.url);
        b.image.onload = function(){
            b.regX = b.image.width / 2;
            b.regY = b.image.height / 2;
        
            var tar = (config.target.getObject());
            if(!tar) return;
        
            c.x = tar.x;
            c.y = tar.y;
        }

        c.addChild(b);

        c.scaleX = config.scale;
        c.scaleY = config.scale;

        //enemyに入っているコンテナーを調査して当たっていたらイベントを実行
        var thisObj = this;
        c.onTick = function(){
            if(!config.enemy) return;
        
            $.each(config.enemy, function(k, v){
                var co = v.getObject().globalToLocal(c.x , c.y);
                if(v.getObject().hitTest(co.x, co.y)){
                    thisObj.destroy();
                    v.onHit();
                    return false;
                }

                return true;
            });
        }

        this.obj = c;
    }



    app.weapon.prototype.getObject = function(){
        return this.obj;
    }


    app.weapon.prototype.shoot = function(config){
        config = config || {};
    
        var thisObj = this;
        this.shooting = createjs.Tween.get(this.getObject())
        .to(config, config.time || 1000)
        .call(function(){
            thisObj.destroy();
        });
    }



    app.weapon.prototype.destroy = function(config){
        config = config || {};

        if(this.shooting){
            this.shooting.setPaused(true);
            this.shooting = null;
        }

        var c = this.getObject();

        createjs.Tween.get(c)
        .to({scaleX: c.scaleX * 2, scaleY: c.scaleY * 2, alpha: 0}, 500)
        .call(function(){
            if(!c || !c.parent) return;
            c.parent.removeChild(c);
            delete this;
        });
    }



})();

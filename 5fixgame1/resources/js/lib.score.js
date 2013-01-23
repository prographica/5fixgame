var lib = lib || {};



/**
 * 
 */
(function(){



    lib.score = function(config){
        config = config || {};
        var thisObj = this;
        
        //タイプを設定(初期化)
        this.type = {};
        $.each(config.type, function(k, v){
            thisObj.type[v] = 0;
        });
        this.type['other'] = 0;
    
        this.total = 0;

        return;
    }



    /**
     * ポイントを追加する 
     */
    lib.score.prototype.set = function(point, kind){
    
        if(this.type[kind] == undefined){
            kind = 'other';
        }
        this.type[kind] += parseInt(point);

        this.total += parseInt(point);

        return;
    }



    /**
     * 合計ポイントを取得する 
     */
    lib.score.prototype.get = function(){
        return this.total;
    }



    /**
     * 個別ポイントを取得する 
     */
    lib.score.prototype.getDetail = function(){
        return this.type;
    }



})();

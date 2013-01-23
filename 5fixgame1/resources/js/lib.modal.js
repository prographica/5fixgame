var lib = lib || {};


(function(){
    var base = null;



    /**
     * モーダルを表示 
     */
    lib.modal = function(config){
        config = config || {};

        if(base){
            //base.remove();
            //base = null;
        }else{
            base = this.create(); 
        }

        if(config.color){
            base.css('background-color', config.color);
        }else{
            base.css('background-color', '#000');
        }

        base.hide();
    }
    
    
    /**
     * モーダルを非表示 
     */
    lib.modal.prototype.show = function(){
        if(!base) return;
        
        base.width($(window).width());
        base.height($(window).height());
        
        base.fadeIn();
        return;
    }


    /**
     * モーダルを非表示 
     */
    lib.modal.prototype.hide = function(){
        if(!base) return;
        base.fadeOut(100, function(){
        });
        return;
    }



    /**
     * モーダルを生成 
     */
    lib.modal.prototype.create = function(){
        var el = $('<div class="modal-bg" />').appendTo($(document.body));
        el.css('opacity', .8);
        el.css('z-index', 100);
        el.css('top', 0);
        el.css('left', 0);
        el.css('position', 'fixed');

        return el;
    }



})();

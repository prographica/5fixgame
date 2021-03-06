﻿/**
 * グローバルオブジェクトを取得 
 */
var stage = null;
var keyEvent = {};
var enemy = [];
    
//スコアサービスの準備
var score = new lib.score({
    type: ['hit', 'clear', 'bonus']
});



/**
 * アプリエントリポイント（ここから書き始めます） 
 */
$(document).ready(function(){
    setStartboard();
});



/**
 * ゲーム画面を作成して表示 
 */
var setPlay = function(){

    if($('#stage')){
        $('#stage').remove();
    }

    //ステージのセッティング
    var width = $(window).width();
    var height = $(window).height();

	//キャンバスの作成
    stage = $('<canvas id="stage" />').appendTo($(document.body));
    stage.attr('width', width);
    stage.attr('height', height);
    
    //CreateJSで使うステージを作成
    stage = new createjs.Stage("stage");
    createjs.Ticker.addListener(stage);

    //バックグラウンドの描画
    var bg = new app.background({
        url: app.config.baseUrl + "/images/set1/background/background_front.jpg"
    });
    stage.addChild(bg.getObject());

    //主人公を描画
    var mc = new app.charactor({
        baseurl: app.config.baseUrl + "/images/set1/bear"
    });

    //主人公の初期位置を設定
    var chara = mc.getObject();
    chara.x = 200;
    chara.y = $(window).height() - 200;
    chara.scaleX = .3;
    chara.scaleY = .3;
    stage.addChild(chara);

    //キーイベントを一旦解除
    $(window).off('keydown', keyEvent.keydown);
    
    //キーイベントを追加
    keyEvent.keydown = function(e){
        switch(e.keyCode){

        //スペースをクリックしたとき
        case 32:
            if(mc.getStatus() === 'normal'){
                //万歳させる
                mc.banzai();
            
            	//武器を生成
                var wp = new app.weapon({
                    url: app.config.baseUrl + "/images/set1/accesarry/apple.png",
                    scale: .3,
                    target: mc,
                    enemy: enemy
                });
                stage.addChild(wp.getObject());

                setTimeout(function(){
                    
                    //武器を一定方向に投げる
                    wp.shoot({
                        y: 0,
                        time: 1000
                    });
                }, 500);

            }else{
                mc.clear();
            }
            break;

        //右キーを押したときに実行
        case 39:
            mc.walk(10);
            break;
    
        //左キーを押したときに実行
        case 37:
            mc.walk(-10);
            break;
    
        }

        return;
    };
    $(window).keydown(keyEvent.keydown);

	//キーパッドの操作
    var keyPad = new app.keypad({
        listeners: {
            click: function(code){
                keyEvent.keydown({keyCode: code});
            }
        },
        pad: {
            red: {
                name: 'A',
                top: $(window).height() - 200,
                left: 10,
                code: 32
            },
            blue: {
                name: 'B',
                top: $(window).height() - 200,
                left: 130,
                code: 32
            },
            cross: {
                top: $(window).height() - 250,
                left: $(window).width() - 250
            }
        }
    });

    //敵を作成するためのまとめ関数（この関数を実行すると1体できる）
    enemy = [];
    var setEn = function(initx, inity, scale){

        //敵を作成（常に横に動いている）
        var en = new app.charactor({
            baseurl: app.config.baseUrl + "/images/set1/bear"
        });

        //武器が敵に当たったときに実行
        en.onHit = function(){
            en.destroy();
            bg.shake();

            //加点する
            score.set(100, 'hit');

            $.each(enemy, function(k, v){
                if(en === v){
                    enemy.splice(k, 1);
                    return false;
                }

                return true;
            });

            if(enemy.length === 0){
                keyPad.hide();
                setScoreboard();
            }
            return;
        }

        //敵オブジェクトを取得してステージに表示
        var emy = en.getObject();
        emy.x = initx || 500;
        emy.y = inity || 200;
        emy.scaleX = scale;
        emy.scaleY = scale;
        stage.addChild(emy);
    
        //敵は自動的に動く様に
        var move = function(amount){
            en.walk(amount, 1000, function(){
                var a = Math.random() * ($(window).width() / 3) * (Math.random() > 0.5 ? 1 : -1);
                if($(window).width() < emy.x + a){
                    a = a * -1;
                }else if(emy.x + a < 0){
                    a = a * -1;
                }

                if(Math.random() > .5){
                    en.banzai();
                }else{
                    en.clear();
                }

                move(a);
            });
        };
        move(Math.random() * 100);
    
        return en;
    }

    //敵を10体作成
    for(var i = 0; i < 10; i++){
        enemy.push(
            setEn($(window).width() * Math.random(), 300 * Math.random(), 0.2)
        );
    }
    return;
};




/**
 * スタート画面を表示 
 */
var setStartboard = function(){
    var m = new lib.modal();
    m.show();

    var s = new app.startboard({
        title: '戦え！森のくまさん',
        desc: '森にあらわれたいじわる熊にリンゴをなげつけて、森から追い出せ！',
        listeners: {
            close: function(){
                m.hide();
                s.hide();
                
                setTimeout(function(){
                    setPlay();
                }, 1000);
                return;
            }
        }
    });
    s.show();
    return;

};



/**
 * ゲーム終了後のスコアボードの表示
 */
var setScoreboard = function(){
    var m = new lib.modal();
    m.show();

    var d = score.getDetail();
    var s = new app.scoreboard({
        listeners: {
            close: function(){
                m.hide();
                s.hide();

                setPlay();
                return;
            }
        }
    });
    s.show({
        total: score.get(),
        detail: [
            {
                name: 'ヒット',
                value: d.hit
            },
            {
                name: 'クリア',
                value: d.clear
            },
            {
                name: 'ボーナス',
                value: d.bonus
            }
        ]
    });

    return;
};

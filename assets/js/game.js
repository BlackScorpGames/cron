window.onload = function(){
    Crafty.init();
    Crafty.canvas.init();
    Crafty.sprite(60,50,"assets/img/Ships_1.png",{
        ship1 : [0,0],
        ship2 : [1,0],
        shadow_ship1: [0,1],
        shadow_ship2: [1,1]
    });
    Crafty.scene("game",function(){
        Crafty.background("url(assets/img/dunes_simple.jpg)");
        Crafty.c("Player",{});
        console.log(Crafty.viewport);
        Crafty.e("2D,Canvas,ship1").attr({x:Crafty.viewport.width/2,y:Crafty.viewport.height});
    });
    Crafty.scene("game");
}
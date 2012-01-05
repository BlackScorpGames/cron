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
        
        
        Crafty.c("Player",{
           init:function(){
               this.requires("Collision").
                   attr({
                   x:Crafty.viewport.width/2,
                   y:Crafty.viewport.height-this.h-100
                   });
           } 
        });
        Crafty.c("BackGround",{
            init:function(){
                this.image('assets/img/dunes_simple.jpg','repeat')
                .attr({x:0,w:Crafty.viewport.width,h:Crafty.viewport.height});
            }
        })
       
        var bg = {
            0:Crafty.e("2D,Canvas,Image,BackGround").attr({y:0}),
            1:Crafty.e("2D,Canvas,Image,BackGround").attr({y:-Crafty.viewport.height}),
            2:Crafty.e("2D,Canvas,Image,BackGround").attr({y:-Crafty.viewport.height*2})
        },last=0;
         var player = Crafty.e("2D,Canvas,ship1,Player,Collision");
        
        
        Crafty.bind("EnterFrame",function(){
            
            Crafty.viewport.y += 1;
            player.y -= 1;
           if(Crafty.viewport.y % Crafty.viewport.height == 0){
              
              
               
               bg[last].y = -Crafty.viewport.y-Crafty.viewport.height;
               
               if(last < bg.length){
                   last = 0;
               }else{
                   last++; 
               }
            
           }
        })
    });
    Crafty.scene("game");
}
window.onload = function(){
    Crafty.init(800,600);
    Crafty.canvas.init();
    Crafty.sprite(60,50,"assets/img/Ships_1.png",{
        ship1 : [0,0],
        ship2 : [1,0],
        shadow_ship1: [0,1],
        shadow_ship2: [1,1]
    });
    Crafty.sprite(40,40,"assets/img/Wpn2.png",{
        bullet:[0,0] 
    });
    Crafty.scene("game",function(){
        
        var area = 50;
        Crafty.c("Player",{
            init:function(){
                
                this.requires("Keyboard,Collision").
                attr({
                    x:Crafty.viewport.width/2-this.w/2,
                    y:Crafty.viewport.height-this.h-100
                }).bind('Moved', function(from) {
    
                    if(this.x+this.w/2+area > Crafty.viewport.width || this.x+this.w/2-area < 0 || this.y+this.h-area + Crafty.viewport.y <0 || this.y+this.h/2+area + Crafty.viewport.y > Crafty.viewport.height){
                        this.attr({
                            x:from.x, 
                            y:from.y
                        });
                    }
                }).bind("KeyDown", function(e) {
                    if(e.keyCode === Crafty.keys.SPACE){
                        Crafty.e("2D, Canvas, bullet")
                        .attr({
                            x: this._x,
                            y: this._y,
                            rotation: this._rotation,
                            xspeed: 20 * Math.sin(this._rotation / 57.3),
                            yspeed: 20 * Math.cos(this._rotation / 57.3)
                        })
                        .bind("EnterFrame", function() {
                            this.x += this.xspeed;
                            this.y -= this.yspeed;

                            //destroy if it goes out of bounds
                            if(this._x > Crafty.viewport.width || this._x < 0 || this._y+Crafty.viewport.y > Crafty.viewport.height || this._y+Crafty.viewport.y < 0) {
                                this.destroy();
                            }
                        });
                    } 
                });
            } 
        });
        Crafty.c("RightControls", {
            init: function() {
                this.requires('Multiway');
            },

            rightControls: function(speed) {
                this.multiway(speed, {
                    UP_ARROW: -90, 
                    DOWN_ARROW: 90, 
                    RIGHT_ARROW: 0, 
                    LEFT_ARROW: 180
                })
                return this;
            }

        });
        Crafty.c("BackGround",{
            init:function(){
                this.image('assets/img/dunes_simple.jpg','repeat')
                .attr({
                    x:0,
                    w:Crafty.viewport.width,
                    h:Crafty.viewport.height
                })
            }
        })
       
        var bg = {
            0:Crafty.e("2D,Canvas,Image,BackGround").attr({
                y:0
            }),
            1:Crafty.e("2D,Canvas,Image,BackGround").attr({
                y:-Crafty.viewport.height
            }),
            2:Crafty.e("2D,Canvas,Image,BackGround").attr({
                y:-Crafty.viewport.height*2
            })
        },last=0;
        var player = Crafty.e("2D,Canvas,ship1,Player,Collision,RightControls").rightControls(5);
        
        
        Crafty.bind("EnterFrame",function(){
            
            Crafty.viewport.y += 1;
            player.y -= 1;
            
            if(Crafty.viewport.y % Crafty.viewport.height == 0){  
                if(typeof last == undefined) console.log(last);
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
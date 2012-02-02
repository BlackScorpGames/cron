window.onload = function(){
    Crafty.init();
    Crafty.canvas.init();
    Crafty.sprite(57,44,"assets/img/ship1.png",{
        ship1:[0,0]
    });
    Crafty.sprite(57,32,"assets/img/ship2.png",{
        ship2:[0,0]
    });
    Crafty.sprite(57,32,"assets/img/ship3.png",{
        ship3:[0,0]
    });
    Crafty.sprite(57,32,"assets/img/ship4.png",{
        ship4:[0,0]
    });
    Crafty.sprite(11,28,"assets/img/bullet.png",{
        bullet:[0,0] 
    });
   
    Crafty.scene("game",function(){
        
        var area = 50;
        Crafty.background('url(assets/img/bg.jpg)');
        Crafty.c("Enemy",{
            init:function(){
                this.requires("Collision")
                .attr({
                    rotation:180
                }).bind('Moved', function() {
                    this._y += 1; 
                }).origin("center");
                return this;
            },
            move:function(){
                this.trigger("Moved");
               
            }
        });
        Crafty.c("Player",{
            init:function(){
                var keyDown = false;
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
                        keyDown = true;
                    } 
                }).bind("KeyUp", function(e) {
                    if(e.keyCode === Crafty.keys.SPACE){
                        keyDown = false;
                    } 
                }).bind("EnterFrame",function(frame){
                    if(keyDown && (frame.frame % 10 == 0)){
                        this.shoot();
                    }
                });
            },
            shoot:function(){
                Crafty.e("2D, Canvas, bullet")
                .attr({
                    x: this._x+this._w/2,
                    y: this._y-this._h/2,
                    rotation: this._rotation,
                    xspeed: 20 * Math.sin(this._rotation / 57.3),
                    yspeed: 20 * Math.cos(this._rotation / 57.3)
                })
                .bind("EnterFrame", function() {
                    //this.x += this.xspeed;
                    this.y -= this.yspeed; 
                    //destroy if it goes out of bounds
                    if( this._y > Crafty.viewport.height || this._y < 0) {
                        this.destroy();
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
        
       
     
        var player = Crafty.e("2D,Canvas,ship1,Player,Collision,RightControls").rightControls(5);
        var enemy = Crafty.e("2D,Canvas,ship2,Enemy,Collision");
        var speed = 1;
        var scroll = 0;
        Crafty.bind("EnterFrame",function(frame){
            scroll += 1;
            enemy.trigger("Moved");
            Crafty.stage.elem.style.backgroundPosition ="0px "+scroll+"px";
            
        })
    });
    Crafty.scene("game");
}
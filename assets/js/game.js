$(function(){
    Crafty.init(640,480);
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
    Crafty.sprite(29,"assets/img/dmg.png",{
        dmg:[0,0]
    });
  
    Crafty.scene("game",function(){
        Crafty.canvas._canvas.style.zIndex = '1';
        var area = 50;
        Crafty.background('url(assets/img/bg.jpg)');
        Crafty.c("Enemy",{
            _hp:2,
            _dmg:{},
            init:function(){
                this.requires("Collision")
                .origin("center")
                .attr({
                    y:0,
                    rotation:180
                })
                .bind('EnterFrame',function(frame){
                    this.move(2);
                    var bulletCollision = this.hit("bullet"),bullet,playerCollision = this.hit("Player"),player;
                  
                    if(bulletCollision){
                        bullet = bulletCollision[0].obj;
                        this.hurt();
                        this._dmg[frame.frame+10] = Crafty.e("2D,Canvas,dmg").attr({
                            x:bullet.x,
                            y:bullet.y
                        });
                        bullet.destroy(); 
                    }
                    if(playerCollision){
                        player = playerCollision[0].obj;
                        player.hurt(this._hp);
                        this.die();
                        
                        this._dmg[frame.frame+10] = Crafty.e("2D,Canvas,dmg").attr({
                            x:this.x,
                            y:this.y
                        });

                    }
                    for(var i in this._dmg){
                        if(frame.frame >= i){
                            this._dmg[i].destroy();
                            delete this._dmg[i];
                        } 
                    }
                   
                });
                return this;
            },
            move:function(speed){
                this.y +=speed;
                if(this.y > Crafty.viewport.height) this.destroy();
            },
            hurt:function(){
                this._hp -=1;
                if(this._hp == 0) this.die();
            },
            die:function(){
                this.destroy();
            }
        });
        Crafty.c("Player",{
            _hp:{
                current:10,
                max:10
            },
            _lives:3,
            _movingSpeed:5,
            _heatLevel:{
                current:0,
                max:100
            },
            init:function(){
                var keyDown = false;
                var heatLevel = $( ".heat" ).progressbar({
                    value: this._heatLevel.current/this._heatLevel.max * 100
                });
                this.requires("Multiway,Keyboard,Collision").
                reset()
                .multiway(this._movingSpeed, {
                    UP_ARROW: -90, 
                    DOWN_ARROW: 90, 
                    RIGHT_ARROW: 0, 
                    LEFT_ARROW: 180
                }).bind('Moved', function(from) {
                    if(this.x+this.w/2+area > Crafty.viewport.width || this.x+this.w/2-area < 0 || this.y+this.h/2-area + Crafty.viewport.y <0 || this.y+this.h/2+area + Crafty.viewport.y > Crafty.viewport.height){
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
                        this._heatLevel.current +=3;
                        this.shoot();
                    }
                    if(this._heatLevel.current > 0 && (frame.frame % 10 == 0))
                        this._heatLevel.current--;
                    if(this._heatLevel.current >= this._heatLevel.max)
                        this._heatLevel.current=this._heatLevel.max;
                    heatLevel.progressbar({
                        value: this._heatLevel.current/this._heatLevel.max * 100
                    });
                });
            },
            shoot:function(){
                
                if(this._heatLevel.current < this._heatLevel.max){
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
            },
            hurt:function(dmg){        
                this._hp.current -= dmg;
                $( ".hp" ).progressbar({
                    value: this._hp.current/this._hp.max * 100
                });
                if(this._hp.current <= 0)
                    this.die();
            },
            reset:function(){
               
                
                this.attr({
                    _hp:{
                        current:10,
                        max:10
                    },
                    x:Crafty.viewport.width/2-this.w/2,
                    y:Crafty.viewport.height-this.h-100,
                    _heatLevel:{
                        current:0,
                        max:100
                    }
                });
                $( ".hp" ).progressbar({
                    value: this._hp.current/this._hp.max * 100
                });
                $( ".heat" ).progressbar({
                    value: this._heatLevel.current/this._heatLevel.max * 100
                });
                return this;
            },
            die:function(){
                this._lives --;
                this.reset();
                $('.lives span').text('x'+this._lives);
                if(this._lives <= 0){
                    this.destroy(); 
                }
                   
            }
        });

        
        var spotEnemys = function(){
            var enemy = Crafty.e("2D,Canvas,ship2,Enemy,Collision");
            var left = Crafty.math.randomInt(enemy.w,Crafty.viewport.width - enemy.w);
            enemy.attr({
                x:left
            });         
        }
     
        var player = Crafty.e("2D,Canvas,ship1,Player,Collision");
        var scroll = 0;
        Crafty.bind("EnterFrame",function(frame){
            scroll += 1;
            if(frame.frame % 50 == 0)
                spotEnemys();
            Crafty.stage.elem.style.backgroundPosition ="0px "+scroll+"px";
        });
    });
    Crafty.scene("game");
});
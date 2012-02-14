Crafty.c("Enemy",{
    init:function(){
        this.addComponent("2D","Canvas","Collision")  
        .bind("EnterFrame",function(){
            if(this.x > Crafty.viewport.width+this.w ||
                this.x < -this.w || 
                this.y < -this.h || 
                this.y > Crafty.viewport.height+this.h){
                this.destroy();
            }
        })
        .onHit("PlayerBullet",function(ent){
            var bullet = ent[0].obj;
            this.hurt(bullet.dmg);
            bullet.destroy();
        });
    },
    hurt:function(dmg){
        Crafty.e("Damage").attr({
            x:this.x,
            y:this.y
        });
        this.hp -= dmg;
        if(this.hp <= 0) this.die();
    }
});

Crafty.c("Asteroid",{
    hp:2,
    points:5,
    init:function(){
        var speed =  Crafty.math.randomInt(1,2);
        var direction = Crafty.math.randomInt(-speed,speed);
      
        this.addComponent("Enemy","asteroid64","SpriteAnimation")
        .origin("center")
        .animate("rotate",0,0,63)
        .animate("rotate",15,-1)
        .bind("EnterFrame",function(){
            this.y += speed;
            this.x += direction;
        })
        .attr({
            y:-this.h,
            x:Crafty.math.randomInt(this.w,Crafty.viewport.width - this.w),
            rotation:Crafty.math.randomInt(0,360)
        });
    },
    die:function(){
        Crafty.e("RandomExplosion").attr({
            x:this.x,
            y:this.y
        });
        for(var i = 0;i<Crafty.math.randomInt(1,4);i++){
            Crafty.e("SmallAsteroid").attr({
                x:this.x,
                y:this.y
            });
        }
        
        this.destroy();
    }
});

Crafty.c("SmallAsteroid",{
    hp:1,
    points:10,
    init:function(){
        var speed =  Crafty.math.randomInt(1,3);
        var direction = Crafty.math.randomInt(-speed,speed);
        this.addComponent("Enemy","asteroid32","SpriteAnimation")
        .origin("center")
        .animate("rotate",0,0,63)
        .animate("rotate",15,-1)
        .bind("EnterFrame",function(){
            this.y += speed;
            this.x += direction;
        })
        .attr({
            rotation:Crafty.math.randomInt(0,360)
        });
    },
    die:function(){
        Crafty.e("RandomExplosion").attr({
            x:this.x,
            y:this.y
        });
        this.destroy();
    }
});

Crafty.c("Kamikaze",{
    hp:3,
    points:15,
    init:function(){
        var player = Crafty("Player");
        var attacking = false;
        this.addComponent("Enemy","ship11")
        .origin("center")
        .attr({
            rotation:180,
            y:-this.h,
            x:Crafty.math.randomInt(this.w,Crafty.viewport.width - this.w)
        })
        .bind("EnterFrame",function(){
            player = Crafty(player[0]);
            if(this.y < 0)
                this.y +=2;

            if(this.x < player.x && !attacking)
                this.x++;
            
            if(this.x > player.x && !attacking)
                this.x--;
        
            if(this.x == player.x)
                attacking = true;
            
            if(attacking)
                this.y += 10;
        });
    },
    die:function(){
        Crafty.e("RandomExplosion").attr({
            x:this.x,
            y:this.y
        });
        this.destroy();
    }
});

Crafty.c("Level1",{
    hp:2,
    points:5,
    init:function(){
        var player = Crafty("Player");
        var x = 0;
        this.addComponent("Enemy","ship9")
        .origin("center")
        .attr({
            rotation:180,
            y:-this.h,
            x:Crafty.math.randomInt(this.w,Crafty.viewport.width - this.w)
        })
        .bind("EnterFrame",function(frame){
            player = Crafty(player[0]);
            x = Math.abs(this.x-player.x);
        
            if((x<40)&& this._y < player.y && frame.frame % 20 == 0){
                this.shoot();
            }
               
            
           
            this.y += 2;
        });
    },
    die:function(){
        Crafty.e("RandomExplosion").attr({
            x:this.x,
            y:this.y
        });
        this.destroy();
    },
    shoot:function(){
        var bullet = Crafty.e("Weapon1");
        bullet.attr({
            x: this._x+this._w/2-bullet.w/2,
            y: this._y+this._h-bullet.h/2,
            rotation: this._rotation,
            xspeed: 20 * Math.sin(this._rotation / (180 / Math.PI)),
            yspeed: 20 * Math.cos(this._rotation / (180 / Math.PI))
        });  
    }
});
Crafty.c("Level2",{
    hp:2,
    points:10,
    init:function(){
        var player = Crafty("Player");
        var x = 0;
        this.addComponent("Enemy","ship10")
        .origin("center")
        .attr({
            rotation:180,
            y:-this.h,
            x:Crafty.math.randomInt(this.w,Crafty.viewport.width - this.w)
        })
        .bind("EnterFrame",function(frame){
            player = Crafty(player[0]);
            x = Math.abs(this.x-player.x);
            if(this.x < player.x)
                this.x++;
            if(this.x > player.x)
                this.x--;
             
        
            if((x<40)&& this._y < player.y && frame.frame % 20 == 0){
                this.shoot();
            }
            this.y += 2;
        });
    },
    die:function(){
        Crafty.e("RandomExplosion").attr({
            x:this.x,
            y:this.y
        });
        this.destroy();
    },
    shoot:function(){
        var bullet = Crafty.e("Weapon1");
        bullet.attr({
            x: this._x+this._w/2-bullet.w/2,
            y: this._y+this._h-bullet.h/2,
            rotation: this._rotation,
            xspeed: 20 * Math.sin(this._rotation / (180 / Math.PI)),
            yspeed: 20 * Math.cos(this._rotation / (180 / Math.PI))
        });  
    }
});
Crafty.c("ShipSnakeLeft",{
    hp:2,
    points:10,
    init:function(){
       
        this.addComponent("Enemy","ship10")
        .origin("center")
        .attr({
            rotation:180,
            y:-this.h,
            x:Crafty.math.randomInt(this.w,Crafty.viewport.width - this.w)
        })
        .bind("EnterFrame",function(frame){
            player = Crafty(player[0]);
            if(this.x < player.x)
                this.x++;
            if(this.x > player.x)
                this.x--;
        
            if((this.x + 5 >= player.x || this.x - 5 <= player.x )&& this.y < player.y && frame.frame % 20 == 0)
                this.shoot();
            
           
            this.y += 2;
        });
    },
    die:function(){
        Crafty.e("RandomExplosion").attr({
            x:this.x,
            y:this.y
        });
        this.destroy();
    },
    shoot:function(){
        var bullet = Crafty.e("Weapon1");
        bullet.attr({
            x: this._x+this._w/2-bullet.w/2,
            y: this._y+this._h-bullet.h/2,
            rotation: this._rotation,
            xspeed: 20 * Math.sin(this._rotation / (180 / Math.PI)),
            yspeed: 20 * Math.cos(this._rotation / (180 / Math.PI))
        });  
    }
});
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
        .onHit("Bullet",function(ent){
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
            rotation:Crafty.math.randomInt(0,360)
        });
    },
    die:function(){
        Crafty.e("RandomExplosion").attr({
            x:this.x,
            y:this.y
        });
        for(var i = 0;i<4;i++){
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
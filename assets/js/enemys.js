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
            var target = ent[0].obj;
            this.hurt(target.dmg);
        });
    },
    hurt:function(dmg){
        this.hp -= dmg;
        if(this.hp < 0) this.die();
    }
});

Crafty.c("Asteroid",{
    hp:1,
    init:function(){
        var speed =  Crafty.math.randomInt(1,3);
        var direction = Crafty.math.randomInt(-speed,speed);
        this.addComponent("Enemy","asteroid","SpriteAnimation")
        .animate("move",0,0,63)
        .animate("move",15,-1)
        .bind("EnterFrame",function(){
            this.y += speed;
            this.x += direction;
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
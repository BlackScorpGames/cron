Crafty.c("Bullet",{
    dmg:0,
    firerate:0,
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
            this.destroy();
            ent[0].obj.destroy();
        });
    }
});

Crafty.c("Weapon1",{
    init:function(){
        this
        .addComponent("Bullet","laser1")
        .origin("center")
        .bind("EnterFrame", function() {
            this.x += this.xspeed;
            this.y -= this.yspeed; 
        })
        .attr({
            dmg:1
        });
        Crafty.audio.play("laser1",1,0.8);
    } 
});
Crafty.c("Weapon2",{
    init:function(){
        this
        .addComponent("Bullet","laser2")
        .origin("center")
        .bind("EnterFrame", function() {
            this.x += this.xspeed;
            this.y -= this.yspeed;  
        }).attr({
            dmg:2
        });
        Crafty.audio.play("laser2",1,0.8);
    } 
});

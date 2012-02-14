Crafty.c("Player",{
    hp:{
        current:100,
        max:100
    },
    shield:{
        current:100,
        max:100
    },
    movementSpeed:8,
    lives:3,
    points:0,
    weapon:{
        firerate:5,
        name:"Weapon1"
    },
    powerups:{},
    ship:"ship1",
    init:function(){
        var keyDown = false; //Player didnt pressed a key
        this
        .addComponent("2D","Canvas",this.ship,"Multiway","Keyboard","Collision") /*Add needed Components*/
        .multiway(this.movementSpeed, { /*Enable Movement Control*/
            UP_ARROW: -90, 
            DOWN_ARROW: 90, 
            RIGHT_ARROW: 0, 
            LEFT_ARROW: 180
        })
        .bind('Moved', function(from) { /*Bind a function which is triggered if player is moved*/
            /*Dont allow to move the player out of Screen*/
            if(this.x+this.w > Crafty.viewport.width ||
                this.x+this.w < this.w || 
                this.y+this.h < this.h || 
                this.y+this.h > Crafty.viewport.height){
                this.attr({
                    x:from.x, 
                    y:from.y
                });
            }
        })
        .bind("KeyDown", function(e) {
            if(e.keyCode === Crafty.keys.SPACE){
                keyDown = true;
            } 
        })
        .bind("KeyUp", function(e) {
            if(e.keyCode === Crafty.keys.SPACE){
                keyDown = false;
            } 
        })
        .bind("EnterFrame",function(frame){
            if(keyDown && (frame.frame % this.weapon.firerate == 0)){
                this.shoot();
            }
        })
        .bind("Killed",function(points){
            this.points += points;
        })
        .onHit("Enemy",function(ent){
           var target = ent[0].obj;
           this.hurt(target.hp);
            })
        .reset() /*Set initial points*/;
        return this;
    },
    reset:function(){
        this.x = Crafty.viewport.width/2-this.w/2;
        this.y = Crafty.viewport.height-this.h-100;
    },
    shoot:function(){ 
        var bullet = Crafty.e(this.weapon.name,"PlayerBullet");
        bullet.attr({
            x: this._x+this._w/2-bullet.w/2,
            y: this._y-this._h/2+bullet.h/2,
            rotation: this._rotation,
            xspeed: 20 * Math.sin(this._rotation / (180 / Math.PI)),
            yspeed: 20 * Math.cos(this._rotation / (180 / Math.PI))
        });  
    },
    hurt:function(dmg){
        this.hp -= dmg;
        if(this.hp <= 0) this.die();
    },
    die:function(){
        
    }
    
});
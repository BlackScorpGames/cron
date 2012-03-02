/**
 * This File describes all enemies
 */

//Basic enemy component
Crafty.c("Enemy",{
    playerID:null, //ID of player which has something todo with that enemy
    init:function(){
        //All enemies will get same basic components
        this.requires("2D,Canvas,Collision")  
        //Destroy all enemies if they leave the viewport
        .bind("EnterFrame",function(){
            if(this.x > Crafty.viewport.width+this.w ||
                this.x < -this.w || 
                this.y < -this.h || 
                this.y > Crafty.viewport.height+this.h){
                this.destroy();
            }
        })
        //Describe behavior on getting hitted by Player Bullet
        .onHit("PlayerBullet",function(ent){
            var bullet = ent[0].obj;
            this.playerID = bullet.playerID; //Which player hurted you
            this.hurt(bullet.dmg); //Hurt the enemy with bullet damage
            bullet.destroy(); //Destroy the bullet
        })
        //Describe behavior on getting hitted by Player
        .onHit("Player",function(ent){
            var player = ent[0].obj;
            //Hurt the player with my hp
            Crafty(player[0]).hurt(this.hp);
            //Hurt enemy with all hp he has
            this.hurt(this.hp);
        });
    },
    //Function to hurt the enemy
    hurt:function(dmg){
        //Create a damage effect
        Crafty.e("Damage").attr({
            x:this.x,
            y:this.y
        });
        //Reduce HP
        this.hp -= dmg;
        //Die if hp is 0
        if(this.hp <= 0) this.die();
    }
});

//Enemy type Asteroid
Crafty.c("Asteroid",{
    hp:2, //Has 2 HP
    points:5, //Give 5 points if killed
    init:function(){
        var speed =  Crafty.math.randomInt(1,2); //get Random movin speed
        var direction = Crafty.math.randomInt(-speed,speed); //Get ramdom moving direction
      
        //Asteroid requires Enemy so it gets their functions and behavior
        this.requires("Enemy,asteroid64,SpriteAnimation")
        .origin("center")
        //define animation
        .animate("rotate",0,0,63)
        //start animation without end
        .animate("rotate",15,-1)
        .bind("EnterFrame",function(){
            //Move the Enemy in game loop
            this.y += speed;
            this.x += direction;
        })
        //Set initial attributes
        .attr({
            y:-this.h, //display asteroid over the viewport at start
            x:Crafty.math.randomInt(this.w,Crafty.viewport.width - this.w),//random position within the viewport
            rotation:Crafty.math.randomInt(0,360) //rotate it random
        });
    },
    //Function to die
    die:function(){
       //Create a random explosion at his position
        Crafty.e("RandomExplosion").attr({
            x:this.x,
            y:this.y
        });
        //Create 1-4 Small asteroids
        for(var i = 0;i<Crafty.math.randomInt(1,4);i++){
            Crafty.e("SmallAsteroid").attr({
                x:this.x,
                y:this.y
            });
        }
        //Trigger the player event to calculate points
        Crafty(this.playerID).trigger("Killed",this.points);
        //Destroy the asteroid
        this.destroy();
    }
});

//Same like Asteroid but dont create smaller asteroids
Crafty.c("SmallAsteroid",{
    hp:1,
    points:10,
    init:function(){
        var speed =  Crafty.math.randomInt(1,3);
        var direction = Crafty.math.randomInt(-speed,speed);
        this.requires("Enemy,asteroid32,SpriteAnimation")
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
        Crafty(this.playerID).trigger("Killed",this.points);
        this.destroy();
    }
});

//EnemyType Kamikaze
Crafty.c("Kamikaze",{
    hp:3,
    points:15,
    init:function(){
        var player = Crafty("Player");
        var attacking = false;
        this.requires("Enemy,ship11")
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
                this.y += 6;
        });
    },
    die:function(){
        Crafty.e("RandomExplosion").attr({
            x:this.x,
            y:this.y
        });
        Crafty(this.playerID).trigger("Killed",this.points);
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
            x = Math.abs((this.x+this._w/2)-player.x);
        
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
        Crafty(this.playerID).trigger("Killed",this.points);
        this.destroy();
    },
    shoot:function(){
        var bullet = Crafty.e("Weapon1","EnemyBullet");
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
            x = Math.abs((this.x+this._w/2)-player.x);
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
        Crafty(this.playerID).trigger("Killed",this.points);
        this.destroy();
    },
    shoot:function(){
        var bullet = Crafty.e("Weapon1","EnemyBullet");
        bullet.attr({
            x: this._x+this._w/2-bullet.w/2,
            y: this._y+this._h-bullet.h/2,
            rotation: this._rotation,
            xspeed: 20 * Math.sin(this._rotation / (180 / Math.PI)),
            yspeed: 20 * Math.cos(this._rotation / (180 / Math.PI))
        });  
    }
});

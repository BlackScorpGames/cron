Crafty.c("Player",{
    hp:{
        current:10,
        max:10,
        percent:100
    },
    shield:{
        current:10,
        max:10,
        percent:100
    },
    heat:{
        current:0,
        max:100,
        percent:0
    },
    movementSpeed:8,
    lives:3,
    score:0,
    weapon:{
        firerate:5,
        name:"Weapon1",
        overheated:false
    },
    powerups:{},
    ship:"ship1",
    bars:{},
    infos:{},
    preparing:true,
    init:function(){
        this.bars = {
            hp:$('#hp'),
            heat:$('#heat'),
            shield:$('#shield')
        };
        this.infos = {
            lives :$('.lives'),
            score: $('.score'),
            hp:this.bars.hp.find('.text'),
            heat:this.bars.heat.find('.text'),
            shield:this.bars.shield.find('.text'),
            alert:$('.alert')
        }
        this.bars.hp.addClass('green');
        this.bars.shield.addClass('green');
        this.bars.heat.addClass('green');
        
        var keyDown = false; //Player didnt pressed a key
        this
        .requires("2D,Canvas,"+this.ship+",Multiway,Keyboard,Collision,Flicker") /*Add needed Components*/
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
                this.y+this.h-35 < this.h || 
                this.y+this.h+35 > Crafty.viewport.height || this.preparing){
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
            if(frame.frame % this.weapon.firerate == 0){
               
                if(keyDown && !this.weapon.overheated){
                    this.shoot();
                }else{
                    if(this.heat.current > 0) //Cooldown the weapon
                        this.heat.current = ~~(this.heat.current*29/30); 
                }

                this.updateHeat();
                
                if(this.weapon.overheated && this.heat.percent < 85){
                    this.weapon.overheated = false;
                    this.infos.alert.hide();
                }
                    
            }
            if(this.preparing){
                this.y--;
                if(this.y < Crafty.viewport.height-this.h-Crafty.viewport.height/4){
                    this.preparing = false;
                    this.flicker=false;
                  
                }
            }
            
        })
        .bind("Killed",function(points){
            this.score += points;
            this.updateScore();
        })
        .bind("Hurt",function(dmg){
            if(this.flicker) return;
            Crafty.e("Damage").attr({
                x:this.x,
                y:this.y
            });
            if(this.shield.current <= 0){
                this.shield.current = 0;
                this.hp.current -= dmg;
            }else{
                this.shield.current -= dmg;
            } 
            this.updateShield();
            this.updateHp();
            if(this.hp.current <= 0) this.die();
        })
        .onHit("EnemyBullet",function(ent){
            var bullet = ent[0].obj;
            this.trigger("Hurt",bullet.dmg);
            bullet.destroy();
        })
        .bind("RestoreHP",function(val){
            if(this.hp.current < this.hp.max){
                this.hp.current += val;
                this.updateHp();  
            }
        })
        .bind("RestoreShield",function(val){
            if(this.shield.current < this.shield.max){
                this.shield.current += val;
                this.updateShield();  
            }  
        })
        .reset() /*Set initial points*/;
        return this;
    },
    reset:function(){
        this.hp = {
            current:10,
            max:10,
            percent:100
        };
        this.shield = {
            current:10,
            max:10,
            percent:100
        };
        this.heat = {
            current:0,
            max:100,
            percent:0
        }
        this.updateHp();
        this.updateShield();
        this.updateHeat();
        this.updateLives();
        this.updateScore();
        //Init position
        this.x = Crafty.viewport.width/2-this.w/2;
        this.y = Crafty.viewport.height-this.h-36;
        
        this.flicker = true;
        this.preparing = true;
    },
    shoot:function(){ 
        if(this.preparing) return;
        var bullet = Crafty.e(this.weapon.name,"PlayerBullet");
        bullet.attr({
            playerID:this[0],
            x: this._x+this._w/2-bullet.w/2,
            y: this._y-this._h/2+bullet.h/2,
            rotation: this._rotation,
            xspeed: 20 * Math.sin(this._rotation / (180 / Math.PI)),
            yspeed: 20 * Math.cos(this._rotation / (180 / Math.PI))
        }); 
     
        if(this.heat.current < this.heat.max)
            this.heat.current ++;
         
        if(this.heat.current >= this.heat.max){
            this.infos.alert.text('Weapon Overheated!').show().effect('pulsate',500);
            this.weapon.overheated = true;
        }
           
    },
    die:function(){
        Crafty.e("RandomExplosion").attr({
            x:this.x,
            y:this.y
        });
        this.lives--;
        this.updateLives();
        if(this.lives <= 0){
            this.destroy();
            this.infos.alert.show().text('Game Over!').effect('pulsate',500);
            Crafty.audio.stop("space");
            Crafty.audio.play("gameover",-1);
            gameHooks.endGame(this.score);
             
        // Crafty.pause();
        }else{
          
            this.reset();
        }
        
        
    },
    updateHeat:function(){
    
        this.heat.percent = Math.round(this.heat.current/this.heat.max * 100);
        this.infos.heat.text('Heat: '+this.heat.current+ '/'+this.heat.max);
        this.bars.heat.progressbar({
            value:this.heat.percent
        });
    },
    updateHp:function(){
        this.hp.percent = Math.round(this.hp.current/this.hp.max * 100);
        this.infos.hp.text('HP: '+this.hp.current+ '/'+this.hp.max);
        this.bars.hp.progressbar({
            value:this.hp.percent
        });
    },
    updateShield:function(){
        this.shield.percent = Math.round(this.shield.current/this.shield.max * 100);
        this.infos.shield.text('Shield: '+this.shield.current+ '/'+this.shield.max);
        this.bars.shield.progressbar({
            value:this.shield.percent
        });
    },
    updateScore:function(){
        this.infos.score.text("Score: "+this.score);
    },
    updateLives:function(){
        this.infos.lives.text("Lives: "+this.lives);
    }
    
});

var gameHooks = {
    endGame: function (score) {}
}

//Level 1 Scene
Crafty.scene("Level1",function(){
    var fps = Crafty.timer.getFPS();
    //Setup background of level
    Crafty.background("url(assets/img/bg.png)");
    //Play background music and repeat
    Crafty.audio.play("space",-1);
    

    var spotEnemys = function(){
        var enemy = Crafty.e("Asteroid");
        var left = Crafty.math.randomInt(enemy.w,Crafty.viewport.width - enemy.w);
        enemy.attr({
            x:left
        }); 
    };
    //Create the player
    Crafty.e("Player");
    //Bin Gameloop to the Scene
    this.bind("EnterFrame",function(frame){

        if(frame.frame % fps == 0){
            //Trigger Event to display enemies
            spotEnemys();
        } 
        //Setup Background position
        Crafty.stage.elem.style.backgroundPosition ="0px "+frame.frame+"px";
        
    });
   
  
});
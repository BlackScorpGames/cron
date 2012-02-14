//Loading Scene
Crafty.scene("Loading",function(){
    
    var toLoad = [
    //Images
    "assets/img/bg.png",
    "assets/img/ships.png",
    "assets/img/weapon1.png",
    "assets/img/weapon2.png",
    "assets/img/dmg.png",
    "assets/img/asteroid64.png",
    "assets/img/asteroid32.png",
    "assets/img/explosion.png",
  
    "media/music/through-space.ogg",
    "media/sounds/explodemini.wav",
    "media/sounds/explode.wav",
    "media/sounds/laser1.wav",
    "media/sounds/laser2.wav",
    "media/sounds/laser3.wav",
    "media/sounds/laser4.wav"
    ];
    Crafty.background("black");
    Crafty.e("2D","DOM","Text").css({
        "color":"#ffffff"
    }).text("Loading..");
    var loaded =  Crafty.e("2D","DOM","Text").attr({
        x:100
    }).css({
        "color":"#ffffff"
    });
    Crafty.load(toLoad,
        function() {
            //when loaded
            Crafty.scene("Level1"); //go to Level1 scene
        },

        function(e) {

            loaded.text(Math.round(e.percent)+" %");
        //progress
        },

        function(e) {
            console.log(e);
 
        //uh oh, error loading
        }
        );
});
//Level 1 Scene
Crafty.scene("Level1",function(){
    //Setup background of level
    Crafty.background("url(assets/img/bg.png)");
    //Play background music and repeat
    // Crafty.audio.play("space",-1);
    

    var spotEnemys = function(frame){   
        //Spot each 50th Fram one Asteroid
 
        if(frame % 50 == 0){
            for(var i = 1;i < Crafty.math.randomInt(1,5);i++){
                Crafty.e("Asteroid");
            }
           Crafty.e("Kamikaze");
         
           
        }
         
    };
    //Create the player
    Crafty.e("Player");
    //Bin Gameloop to the Scene
    this.bind("EnterFrame",function(frame){
        //Trigger Event to display enemies
        spotEnemys(frame.frame);
        //Setup Background position
        Crafty.stage.elem.style.backgroundPosition ="0px "+frame.frame+"px";
        
    });
   
  
});
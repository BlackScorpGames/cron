//Loading Scene
Crafty.scene("Loading",function(){
    
    var toLoad = [
    //Images
    game_path + "/assets/img/bg.png",
    game_path + "/assets/img/ships.png",
    game_path + "/assets/img/weapon1_small.png",
    game_path + "/assets/img/weapon2.png",
    game_path + "/assets/img/dmg.png",
    game_path + "/assets/img/asteroid64.png",
    game_path + "/assets/img/asteroid32.png",
    game_path + "/assets/img/explosion.png",
    game_path + "/media/sounds/explode.mp3",
    game_path + "/media/sounds/explode.ogg",
    game_path + "/media/sounds/explode.wav",
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
        //  Crafty.scene("Level1"); //go to Level1 scene
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
    Crafty.background("url(" + game_path + "/assets/img/bg.png)");
    //Play background music and repeat
    Crafty.audio.play("space",-1);
    $('.level').text('Level: 1');

    var spotEnemys = function(frame){   
        //Spot each 50th Fram one Asteroid
 
        if(frame % 50 == 0 && Crafty("Asteroid").length < 1){
            Crafty.e("Asteroid"); 
        }
        if(frame % 70 == 0 && Crafty("Kamikaze").length < 1){
            Crafty.e("Kamikaze");   
        }
        if(frame % 80 == 0  && Crafty("Level1").length < 1){
            Crafty.e("Level1");
        }
        if(frame % 90 == 0  && Crafty("Level2").length < 1){
            Crafty.e("Level2");
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

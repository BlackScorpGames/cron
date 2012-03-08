/**
 * This file describe different scenes
 */
//Loading Scene
Crafty.scene("Loading",function(){
    var toLoad = [];
    toLoad.push(game_path + "assets/img/loading.jpg", game_path + "assets/img/bg.png",game_path + "media/music/spaceship.ogg");
    for(var i in Crafty.assets){
        toLoad.push(i);
    }
      
    //Setup background image
    Crafty.background("url("+game_path+"assets/img/loading.jpg) black");
    
    //Select DOM elements
    var loading = $('#loading');
    var bar = $('#load');
    var button = $('.button');
    var text = bar.find('.text');
    
    //Display loading interface
    loading.show();
    //Setup progressbar
    bar.progressbar({
        value:0
    });
    //Bind click event on button
    button.live('click',function(){
        //Hide loading interface
        loading.hide();
        //Start scene level 1
        Crafty.scene("Level1");  
    });
   
    Crafty.load(toLoad,
        function() {
            //Everything is loaded
            bar.fadeOut(2000,function(){
                button.show();
            });
        },
        function(e) {
            var src = e.src ||"";
            //update progress
            text.text("Loading "+src.substr(src.lastIndexOf('/') + 1).toLowerCase()+" Loaded: "+~~e.percent+"%");
            bar.progressbar({
                value:~~e.percent
            });
        //   console.log("Loaded: ");
        // console.log(e.src);
        },
        function(e) {
            //uh oh, error loading
            console.log("Error on loading: ");
            console.log(e.src);
        }
        );
    //Play background music and repeat will work only Safari /IE
    Crafty.audio.play("spaceship",-1);
     Crafty.audio.play("spaceship.ogg",-1); //Works with others
});
//Level 1 Scene
Crafty.scene("Level1",function(){
    //Stop loading sound
    Crafty.audio.stop("spaceship");
    Crafty.audio.stop("spaceship.ogg");
    //Display interface
    $('#interface').show();
    //Setup background of level
    Crafty.background("url(" + game_path + "/assets/img/bg.png)");
   
    $('.level').text('Level: 1');

    var spotEnemys = function(frame){   
        //Spot each 50th Fram one Asteroid
 
        if(frame % 50 == 0 && Crafty("Asteroid").length < 1 && Crafty("SmallAsteroid").length < 1){
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
    //Play background music and repeat
    Crafty.audio.play("space",-1);
  
});

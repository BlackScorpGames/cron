$(function(){
    //Init Crafty
    Crafty.init(600,500);
    //Add Canvas Element
    Crafty.canvas.init();
    //Define Sprites
   
    Crafty.canvas._canvas.style.zIndex = '1';
    
    var bars = {
        hp:$('#hp'),
        heat:$('#heat'),
        shield:$('#shield')
    }
    bars.hp.progressbar({
        value: 0
    });
    bars.heat.progressbar({
        value: 0
    });
    bars.shield.progressbar({
        value: 0
    });
    //$('#interface').hide();
    Crafty.scene("Level1");
});
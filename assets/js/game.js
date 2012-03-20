//Enable Console log in opera
if(window.opera){ console = {log:window.opera.postError} }
/**
 * This is the Main JS File
 */

$(function(){

    //Init Crafty
    Crafty.init(600,500);
    //Add Canvas Element
    Crafty.canvas.init();
    //Set canvas under interface
    Crafty.canvas._canvas.style.zIndex = '1';
    
    //play the loading scene
    Crafty.scene("Loading");
});


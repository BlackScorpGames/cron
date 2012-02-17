Crafty.c("RandomExplosion",{
    init:function(){
        var rand = Crafty.math.randomInt(1,4);
        this.addComponent("2D","Canvas","explosion"+rand,"SpriteAnimation")
        .animate("explode1",0,0,4)
        .animate("explode2",0,1,4)
        .animate("explode3",0,2,4)
        .animate("explode4",0,3,4)
        .animate("explode"+rand,10)
        .delay(function(){this.destroy()},500);

        Crafty.audio.play("explosion"+(rand %2));
    }
});
Crafty.c("Damage",{
    init:function(){
        this.addComponent("2D","Canvas","dmg")
        .delay(function(){this.destroy()},100);
        
    }
});

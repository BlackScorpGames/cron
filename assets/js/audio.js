Crafty.extend({
    audio:{
        sounds:{},
        type: {
            'mp3': 'audio/mpeg',
            'ogg': 'audio/ogg; codecs="vorbis"',
            'wav': 'audio/wav; codecs="1"',
            'mp4': 'audio/mp4; codecs="mp4a.40.2"'
        },
        srcType: {
            'mp3': 'audio/mpeg',
            'ogg': 'audio/ogg',
            'wav': 'audio/wav',
            'mp4': 'audio/mp4'
        },
        volume:1, //Global Volume
        add:function(id,url){
            if (!Crafty.support.audio) return;
            
            var audio,source,ext,path,canplay;
            if(arguments.length === 1 && typeof id === "object"){
                for(var i in id){
                    audio = new Audio("");
                    audio.id = i;
                    //old attribute
                    audio.autobuffer = true;
                    audio.preload = "auto";
                    audio.volume = Crafty.audio.volume;
                   
                    for(var src in id[i]){
                        path = id[i][src];
                        ext = path.substr(path.lastIndexOf('.') + 1).toLowerCase();	
                        canplay = audio.canPlayType(this.type[ext]);
                        if(canplay !== "" && canplay !== "no" ){
                            source = document.createElement('source');
                            source.src = path;
                            source.type=this.srcType[ext];
                            audio.appendChild(source); 
                            if (!Crafty.assets[path]) Crafty.assets[path] = audio;   
                        }
                      
                    }
                    this.sounds[i] = {
                        obj:audio,
                        played:0
                    } 
                }
               
              
            }
            if(typeof id === "string"){
              
               
            }
           
   
        },
        play:function(id,repeat,volume){
            if(repeat == 0 || !Crafty.support.audio || !this.sounds[id]) return;
            
            var s = this.sounds[id];
            
            s.obj.volume = Crafty.audio.volume || volume;   
            if(s.obj.currentTime) s.obj.currentTime = 0;
            
            s.obj.play(); 
            s.played ++;
            
            function r(){
                if(s.played < repeat || repeat == -1){
                    if(this.currentTime) this.currentTime = 0;
                    this.play(); 
                    s.played ++;
                }
              
            }
            if (s.attachEvent) { //IE
                s.obj.attachEvent('onended', r);     
            } else { //Everyone else
                s.obj.addEventListener('ended', r, false);      
            }
            return s;
        }
    } 
});
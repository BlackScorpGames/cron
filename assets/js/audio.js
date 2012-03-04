Crafty.extend({
    audio:{
        sounds:{},
        type: {
            'mp3': 'audio/mpeg;',
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
        
        add:function(id,url){
            if (!Crafty.support.audio) return this;
            var audio,source,ext,url,canplay;
            if(arguments.length === 1 && typeof id === "object"){
                for(var i in id){
                    audio = document.createElement('audio');
                    audio.id = i;
                    audio.autobuffer = true;
                    audio.preload = "auto";
                    audio.volume = 1;
                   
                   
                    for(var src in id[i]){
                        url = id[i][src];
                        ext = url.substr(url.lastIndexOf('.') + 1).toLowerCase();	
                        canplay = audio.canPlayType(this.type[ext]);
                        if(canplay === "probably"){
                            source = document.createElement('source');
                            source.src = url;
                            source.type=this.srcType[ext];
                            
                            audio.appendChild(source); 
                            if (!Crafty.assets[url]) Crafty.assets[url] = audio;
                           
                            
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
            
            s.obj.volume = 1 || volume;   
            if(s.obj.currentTime) s.obj.currentTime = 0;
            
            // s.obj.mozCurrentSampleOffset = -10;
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
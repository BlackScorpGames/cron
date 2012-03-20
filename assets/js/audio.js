Crafty.extend({
    audio:{
        sounds:{},
        supported:{},
        codecs :{ // Chart from jPlayer
            ogg:  'audio/ogg; codecs="vorbis"', //OGG
            wav: 'audio/wav; codecs="1"', // PCM
            webma:  'audio/webm; codecs="vorbis"',// WEBM
            mp3:  'audio/mpeg; codecs="mp3"', //MP3
            m4a: 'audio/mp4; codecs="mp4a.40.2"'// AAC / MP4
        },
        volume:1, //Global Volume
        muted:false,
        canPlay:function(){
            var audio = this.audioElement(),canplay;
            for(var i in this.codecs){
                canplay = audio.canPlayType(this.codecs[i]);
                if(canplay !== "" && canplay !== "no"){
                    this.supported[i] = true;
                }else{
                    this.supported[i] = false;
                }
            }
          
        },
        audioElement:function(){
            //IE does not support Audio Object
            return typeof Audio !== 'undefined' ? new Audio("") : document.createElement('audio');
        },
        add:function(id,url){
            Crafty.support.audio = !!this.audioElement().canPlayType; //Setup audio support
            if (!Crafty.support.audio) return;
            
            this.canPlay(); //Setup supported Extensions
            
            var audio,ext,path;
            if(arguments.length === 1 && typeof id === "object"){
                for(var i in id){
                    for(var src in id[i]){
                        audio = this.audioElement();
                        audio.id = i;
                        audio.preload = "auto";
                        audio.volume = Crafty.audio.volume;
                        path = id[i][src];
                        ext = path.substr(path.lastIndexOf('.') + 1).toLowerCase();
                        if(this.supported[ext]){
                            audio.src = path;
                            if (!Crafty.assets[path]) Crafty.assets[path] = audio; 
                            this.sounds[i] = {
                                obj:audio,
                                played:0
                            } 
                        }
                        
                    }
                }          
            }
            if(typeof id === "string"){
                audio = this.audioElement();
                audio.id = id;
                audio.preload = "auto";
                audio.volume = Crafty.audio.volume;
              
                if(typeof url === "string"){
                    ext = url.substr(url.lastIndexOf('.') + 1).toLowerCase();
                    if(this.supported[ext]){
                        audio.src = url;
                        if (!Crafty.assets[url]) Crafty.assets[url] = audio;  
                        this.sounds[id] = {
                            obj:audio,
                            played:0
                        } 
                       
                    }
                  
                }
             
                if(typeof url === "object"){
                    for(src in url){   
                        audio = this.audioElement();
                        audio.id = id;
                        audio.preload = "auto";
                        audio.volume = Crafty.audio.volume;
                        path = url[src];
                        ext = path.substr(path.lastIndexOf('.') + 1).toLowerCase();	
                        if(this.supported[ext]){
                            audio.src = path;
                            if (!Crafty.assets[path]) Crafty.assets[path] = audio;   
                            this.sounds[id] = {
                                obj:audio,
                                played:0
                            } 
                        }
                       
                    }
                }
               
               
            }
          

        },
        play:function(id,repeat,volume){
            if(repeat == 0 || !Crafty.support.audio || !this.sounds[id]) return;
            var s = this.sounds[id];
            s.obj.volume = volume || Crafty.audio.volume ;   
            if(s.obj.currentTime) s.obj.currentTime = 0;   
            s.obj.play(); 
            s.played ++;
            s.obj.onended = function(){
                if(s.played < repeat || repeat == -1){
                    if(this.currentTime) this.currentTime = 0;
                    this.play(); 
                    s.played ++;
                }
            };    
        },
        stop:function(id){
            if(!Crafty.support.audio) return;
            var s;
            if(!id){
                for(var i in this.sounds){
                    s = this.sounds[i];
                    if(!s.obj.paused) s.obj.pause();
                }
            }
            if(!this.sounds[id]) return;    
            s = this.sounds[id];
            if(!s.obj.paused) s.obj.pause();
        },
        mute:function(){
            if(!Crafty.support.audio) return;
            var s;
            if(!this.muted){
                for(var i in this.sounds){
                    s = this.sounds[i];
                    s.obj.pause();
                }
                this.muted = true;
            }else{
                for(var i in this.sounds){
                    s = this.sounds[i];
                    if(s.obj.currentTime && s.obj.currentTime > 0) 
                        this.sounds[i].obj.play();
                }
                this.muted = false; 
            }
         
        }
    } 
});
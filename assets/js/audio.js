Crafty.extend({
    audio:{
        sounds:{},
        type: {
            'mp3': 'audio/mpeg; codecs="mp3"',
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
        muted:false,
        add:function(id,url){
            if (!Crafty.support.audio) return;
            
            var audio,source,ext,path;
            if(arguments.length === 1 && typeof id === "object"){
                for(var i in id){
                    audio = document.createElement('audio');
                    audio.id = i;
                    audio.preload = "auto";
                    audio.volume = Crafty.audio.volume;
                    for(var src in id[i]){
                        path = id[i][src];
                        ext = path.substr(path.lastIndexOf('.') + 1).toLowerCase();	
                        source = document.createElement('source');
                        source.src = path;
                        source.type=this.srcType[ext];
                        audio.appendChild(source); 
                    }
                    this.sounds[i] = {
                        obj:audio,
                        played:0
                    } 
                    audio.load();
                    
                }          
            }
            if(typeof id === "string"){
                audio = document.createElement('audio');
                audio.id = id;
                audio.preload = "auto";
                audio.volume = Crafty.audio.volume;
                if(typeof url === "string"){
                    audio.src = url;
                    if (!Crafty.assets[url]) Crafty.assets[url] = audio;   
                }
             
                if(typeof url === "object"){
                    for(src in url){    
                        path = url[src];
                        ext = path.substr(path.lastIndexOf('.') + 1).toLowerCase();	
                        source = document.createElement('source');
                        source.src = path;
                        source.type=this.srcType[ext];
                        audio.appendChild(source); 
                        if (!Crafty.assets[path]) Crafty.assets[path] = audio;   
                 
                    }
                }
                this.sounds[id] = {
                    obj:audio,
                    played:0
                } 
                audio.load();
            }
          
   
        },
        play:function(id,repeat,volume){
            if(repeat == 0 || !Crafty.support.audio || !this.sounds[id]) return;
            var s = this.sounds[id];
            s.obj.volume = Crafty.audio.volume || volume;   
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
        mute:function(){
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
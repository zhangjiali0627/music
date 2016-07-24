window.onload=function(){
   //播放 暂停
   btnplay.onclick=function(){
    if(audio.paused){
      audio.play();
    }else{
      audio.pause();
    }
  }
  audio.onplay=function(){
    btnplay.className="pause_bt";
  }
  audio.onpause=function(){
    btnplay.className="play_bt";
  }

    //控制音量
    spanvolume.onclick=function(ev){
      var v=ev.offsetX/this.offsetWidth;
      audio.volume=v;
    }
    audio.onvolumechange=function(){
      if(audio.volume===0){
       spanmute.classList.add("volume_mute");
     }else{
       spanmute.classList.remove("volume_mute");
     }

     spanvolumeop.style.left=audio.volume*100+"%";
     spanvolumebar.style.width=audio.volume*100+"%";
   }

     //闭包  控制静音
     spanmute.onclick=(function(){
      var oldvolume;
      return function(){
        if(audio.volume!=0){
         oldvolume=audio.volume;
         audio.volume=0;

       }else{
         audio.volume=oldvolume;
       }

     }
   })();


  //音乐库
  var yinyueku=
  [{name:"BangBangBang",src:"BangBangBang.mp3",geshou:"Bigbang",duration:"3:41"},
  {name:"年轮",src:"年轮.mp3",geshou:"张碧晨",duration:"4:34"},
  {name:"Hotel California",src:"Hotel California.mp3",geshou:"Eagles",duration:"6:33"},
  {name:"回忆里的那个人",src:"回忆里的那个人.mp3",geshou:"李行亮",duration:"3:46"},
  {name:"泡沫",src:"泡沫.mp3",geshou:"邓紫棋",duration:"4:18"},
  {name:"好久不见",src:"好久不见.mp3",geshou:"陈奕迅",duration:"4:10"},
  {name:"给我一个理由忘记",src:"给我一个理由忘记.mp3",geshou:"A-Lin",duration:"4:41"}
  ];
  var currentsongindex;//记录当前几首歌
  var LIEBIAO=3,SHUNXU=2,DANQU=1,SUIJI=4;
  var currentbofangmoshi=LIEBIAO;

  var createList=function(){
   var el="";
   for(var i=0;i<yinyueku.length;i++){
    var ac=(i==currentsongindex)?'play_current':'';
    el+='<li mid="j0" class="'+ac+'"><strong class="music_name">'+yinyueku[i].name+'</strong><strong class="singer_name">'+yinyueku[i].geshou+'</strong><strong class="play_time">'+yinyueku[i].duration+'</strong><div class="list_cp"><strong class="btn_like" title="喜欢" name="myfav_0038RM350w8m1V" mid="0038RM350w8m1V"><span>我喜欢</span></strong><strong class="btn_share" title="分享"><span>分享</span></strong><strong class="btn_fav" title="收藏到歌单"><span>收藏</span></strong><strong class="btn_del" title="从列表中删除"><span>删除</span></strong></div></li>';
  }
  divsonglist.firstElementChild.innerHTML=el;
  spansongnum1.innerHTML='<span>'+yinyueku.length+'</span>';
  var lis=divsonglist.firstElementChild.children;
  for(var i=0;i<lis.length;i++){
    lis[i].index=i;
    lis[i].onclick=function(){
      audio.src=yinyueku[this.index].src;
      audio.play();
      currentsongindex=this.index;
      onsongchange();
    }
    lis[i].onmouseover=function(){
      this.classList.add("play_hover");
    }
    lis[i].onmouseout=function(){
      this.classList.remove("play_hover");
    }
  }

      //删除歌曲
      var des=document.querySelectorAll(".btn_del");
      for(var i=0;i<des.length;i++){
        des[i].index=i;
        des[i].onclick=function(e){
          e.stopPropagation();
          var that=this;
          var newarr=[];
          for(var i=0;i<yinyueku.length;i++){
            if(yinyueku[this.index]!=yinyueku[i]){
              newarr.push(yinyueku[i]);
            }
          }
          yinyueku=newarr;
          if(this.index<currentsongindex){currentsongindex-=1;}
          createList();
          if(this.index==currentsongindex){
            if(currentsongindex==yinyueku.length){
              audio.src="";
              uireset();
            }else if(this.index!=currentsongindex){
              audio.src=yinyueku[currentsongindex].src;
              audio.play();
              onsongchange();
            }
          }
        }
      }
    }
    createList();

    //清空列表
    clear_list.onclick=function(){
      yinyueku=[];
      createList();
      uireset();
    }
    var uireset=function(){
      document.querySelector(".music_name").innerHTML='<span>听我想听的歌</span>';
      document.querySelector(".singer_name").innerHTML='<span>QQ音乐</span>';
      ptime.innerHTML='';
      document.querySelector(".music_op").style.display='none';
      audio.src="";
      spanprogress_op.style.left="0%";
      spanvolumebar.style.width="0%";
      spanplaybar.style.width="0%";
    }





    //换歌
    var onsongchange=function(){
      var lis=divsonglist.firstElementChild.children;
      for(var i=0;i<lis.length;i++){
        lis[i].classList.remove("play_current");
      }
      lis[currentsongindex].classList.add("play_current");
      document.querySelector(".music_name").innerHTML=yinyueku[currentsongindex].name;
      document.querySelector(".singer_name").innerHTML=yinyueku[currentsongindex].geshou;
      document.querySelector(".play_date").innerHTML=yinyueku[currentsongindex].duration;
      document.querySelector(".music_op").style.display="block";
    }

//播放顺序
btnPlayway.onclick=function(){
  divselect.style.display="block";
}
setbofangmoshi=function(num){
  currentbofangmoshi=num;
  divselect.style.display="none";
  var data={
    1:"cycle_single_bt",//单曲循环
    2:"ordered_bt",//顺序循环
    3:"cycle_bt",//列表循环
    4:"unordered_bt"//随机循环
  };
  btnPlayway.className=(data[num]);
}


    // 切歌
    var nextSong=function(){
      if(currentsongindex==undefined){
        return;
      }
      if(currentbofangmoshi==SUIJI){
        randomSong();
        return;
      }
      currentsongindex+=1;
      currentsongindex=(currentsongindex==yinyueku.length)?0:currentsongindex;
      audio.src=yinyueku[currentsongindex].src;
      audio.play();
      onsongchange();
    }
    var prevSong=function(){
      if(currentsongindex==undefined){
        return;
      }
      if(currentbofangmoshi==SUIJI){
        randomSong();
        return;
      }
      currentsongindex-=1;
      currentsongindex=(currentsongindex==-1)?(yinyueku.length-1):currentsongindex;
      audio.src=yinyueku[currentsongindex].src;
      audio.play();
      onsongchange();
    }
    document.querySelector(".next_bt").onclick=nextSong;
    document.querySelector(".prev_bt").onclick=prevSong;

//进度条时间显示
var timeShow= document.querySelector('.time_show');
var zhuanhuan=function(time){
  var minutes=parseInt(time/60);
  var s=parseInt(time-minutes*60);
  minutes=(minutes<10)?('0'+minutes):minutes;
  s=(s<10)?('0'+s):s;
  return minutes+':'+s;
}

    //进度条
    downloadbar.onmouseover=spanplaybar.onmouseover=function(ev){
      timeShow.style.display='block';
      timeShow.style.left=ev.offsetX-timeShow.offsetWidth/2+"px";
      var time=ev.offsetX/spanplayer_bgbar.offsetWidth*audio.duration;
      timeShow.firstElementChild.innerHTML=zhuanhuan(time);
      downloadbar.onmousemove=function(ev){
        timeShow.style.left=ev.offsetX-timeShow.offsetWidth/2+'px';
        var time=time=ev.offsetX/spanplayer_bgbar.offsetWidth*audio.duration;
        timeShow.firstElementChild.innerHTML=zhuanhuan(time);
      }
    }
    downloadbar.onmouseout = spanplaybar.onmouseout = function (ev){
      timeShow.style.display = "none"
    }
    downloadbar.onclick=function(ev){
      audio.currentTime=ev.offsetX/spanplayer_bgbar.offsetWidth*audio.duration;
    }
    spanplaybar.onclick=function(ev){
      audio.currentTime=ev.offsetX/spanplayer_bgbar.offsetWidth*audio.duration;
    }
    audio.ontimeupdate=function(){
      spanprogress_op.style.left=this.currentTime/this.duration*100+'%';
      spanplaybar.style.width=this.currentTime/this.duration*100+'%';

      //歌曲播放
      if(audio.ended){
        if(currentbofangmoshi==DANQU){
          audio.play();
        }else if(currentbofangmoshi==LIEBIAO){
          nextSong();
        }else if(currentbofangmoshi==SUIJI){
          randomSong();
        }else if(currentbofangmoshi==SHUNXU){
          if(currentsongindex!=yinyueku.length-1){
            nextSong();
          }
        }
      } 
    }
    var randomSong=function(){
      currentsongindex=Math.floor(Math.random()*yinyueku.length);
      audio.src=yinyueku[currentsongindex].src;
      audio.play();
      onsongchange();
    }


    
   
    
    btnfold.onclick=function(){
      var dianji=document.querySelector(".m_player_folded");
      if(dianji==undefined){
        divplayer.classList.add("m_player_folded");
        divplayer.style.left='-540px';
      }else{
        divplayer.style.left='0px';
        divplayer.classList.remove("m_player_folded");


      }
    }

 
 //展开播放列表
    spansongnum1.onclick = function(){
      if(divplayframe.style.display == 'block'){
        divplayframe.style.display = 'none';
      divplayframe.style.opacity=0;
      }else{
       divplayframe.style.display = 'block';
      divplayframe.style.opacity=1;
    }
    }


    btnclose.onclick = function (){
      divplayframe.style.display = 'none';
      divplayframe.style.opacity=1;
    }
    
    
    
    






  }
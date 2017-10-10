var audio=document.getElementsByTagName('audio')[0];
		 var onoff=true;
		 var onoff1=true;
		 var jindu;
		 var weizhi;
		   //换肤
       $('.changeColor ul>li').click(function(){
       	$('body').removeClass();
       	$('body').addClass($(this).attr('class'));
       })

		 function changeMusicActive(){
		 	clearTimeout(t2);
		 	rotateClear();
		 	$('.play2').removeClass('icon-you-copy');
		 	$('.play2').addClass('icon-zantingjian');
		 	onoff=false;
		 	var t2=setTimeout(function(){
		 		$('.picbg').css('animation','active 3s linear infinite .5s');
		 		$('.cdt').css('transform' ,'rotate(0deg)');
		 		musicTime();
		 	},500)
		 }

		 	function musicStart(){
		 		audio.load();
		 		audio.play();
		 	}
		 function musicTime(){
		 		var time=null;
		 		jindu=audio.duration;
		 		$('n.min2').text(parseInt(jindu/60));
		 		$('n.sec2').text(parseInt(jindu%60));
		 }
		 function rotateClear(){
		 		$('.picbg').css('animation','');
		 		$('.cdt').css('transform','rotate(-21deg)');
		 }
		var arrmusics=[["music/Daya - Sit Still, Look Pretty.mp3","Sit Still, Look Pretty","Daya","Daya","1.png","Daya - Sit Still, Look Pretty.mp4"],["music/Lana Del Rey - Summer Wine.mp3","Summer Wine","Summer Wine","Lana Del Rey","2.png","Lana Del Rey - Summer Wine.mp4"],["music/Noosa - Walk on By.mp3","Walk on By","Wonderland","Noosa","3.png","Noosa - Walk on By.mp4"],["music/岑宁儿 - 追光者.mp3","追光者","夏至未至","岑宁儿","4.png","岑宁儿 - 追光者.mp4"]];
		var $index=4;
		$(".center>li").click(function(){
			changeMusicActive();
			$index=$(this).index();
			changeAllInformation()
			musicStart();
			hideMv();
		})

		function changeAllInformation(){
			audio.src=arrmusics[$index][0];
			$('.mv').attr('src',"video/"+arrmusics[$index][5])
			$('.songName').text(arrmusics[$index][1]);
			$('.singer').text(arrmusics[$index][3]);
			$('.zhaungji').text(arrmusics[$index][2])
			$('.pic').css('background','url(img/'+arrmusics[$index][4] +')no-repeat')
			$('.pic').css('backgroundSize','100%')
		}
		audio.addEventListener('timeupdate',function(){
			weizhi=audio.currentTime;
			var weiMin=parseInt(weizhi/60)<10?"0"+parseInt(weizhi/60):parseInt(weizhi/60);
			var weiSec=parseInt(weizhi%60)<10?"0"+parseInt(weizhi%60):parseInt(weizhi%60);
			$('n.min1').text(weiMin);
			$('n.sec1').text(weiSec);
			var percent=audio.currentTime/audio.duration;
			$('.xxx').css('width',300*percent);
			if(weizhi>=jindu){
				rotateClear();
				$index++;
			if($index>3) $index=0;
			audio.src=arr[$index][0];
			$('h1').text(arrmusics[$index][1]);
			musicStart();
			changeMusicActive();
			}
		})
		//上一首
		$('.prev').click(function(){
			$index--;
			if($index<0) $index=3;
			audio.src=arrmusics[$index][0];
			changeAllInformation()
			musicStart();
			changeMusicActive();
			hideMv()
		})
		//下一首
		$('.next').click(function(){
			$index++;
			if($index>3) $index=0;
			changeAllInformation()
			musicStart();
			changeMusicActive();
			hideMv()
		})
		//随机播放
		$('.icon-suijibofang').click(function(event){
			$index=Math.floor(Math.random()*4);
			audio.src=arrmusics[$index][0];
		
			changeAllInformation()
			musicStart();
			changeMusicActive();
			hideMv()
		})
		//进度移动
		$('.jindu').click(function(e){
			e=e||event;
			var jindu_w=e.clientX-$('.jindu').offset().left;
			audio.currentTime=parseInt(jindu_w/300*audio.duration);
		})
		$('.play2').click(function(){
			jindu=0;
			weizhi=0;
			musicTime();
			hideMv();
			if(onoff){
				audio.play();
				$(this).removeClass('icon-you-copy');
				$(this).addClass('icon-zantingjian');
				$('.picbg').css('animation','active 3s linear infinite .5s');
				$('.cdt').css('transform' ,'rotate(0deg)');
			}else{
				audio.pause();
				$(this).removeClass('icon-zantingjian');
				$(this).addClass('icon-you-copy');
				rotateClear();
			}
			onoff=!onoff;
		})
		//音量键的设置
		audio.volume=0.5;
		var t=null;
		$('.icon-1yinpinbofangmin').mouseover(function(){
			$('.vol').show();
		}).mouseout(function(event){
			t=setTimeout(function(){
				$('.vol').hide();
			},1000);
		})
        var volpast;
        $('.icon-1yinpinbofangmin').click(function(){
        	//音量键点击一下静音
        	if(onoff1){
        		volpast=$('.vol1').css('height');
        		$(this).attr('class','iconfont icon-1');
        		audio.volume=0;
        		$('.vol1').css('height',0);
        	}else{
        		$(this).attr('class','iconfont icon-1yinpinbofangmin');
        		audio.volume=parseInt(volpast)/100;
        		$('.vol1').css('height',volpast);
        	}
        	onoff1=!onoff1;
        })
        $('.vol').mouseover(function(){
        	clearTimeout(t);
        	$(this).show();
        }).mouseout(function(event){
        	$(this).hide();
        })
       //声音大小
       $('.vol').click(function(e){
       		e=e||event;
       		var volH=$('.vol').offset().top+100-event.clientY
       		$('.vol1').css('height',volH);
       		audio.volume=volH/100;
       })
       $(".icon-zhongxinbofangicon").click(function(){
       		musicStart();
       })
       //播放mv
     	$('#mv').click(function(){
     		showMv();
     		audio.pause();
     	})
     	//mv播放器显示,背景层显示
     		function showMv(){
     		$('.mv-box').css('display','block');
     		$('.pic-b').css('display','none');
     		}
     	//mv播放器隐藏,背景层隐藏
     		function hideMv(){
     		$('.mv-box').css('display','none');
     		$('.pic-b').css('display','block');
     		}
     /* 超链接文字提示 */
     $(function(){
    var x = 10;  
	var y = 20;
	$("a.tooltip").mouseover(function(e){
       	this.myTitle = this.name;
		this.name = "";	
	    var tooltip = "<div id='tooltip'>"+ this.myTitle +"</div>"; //创建 div 元素
		$("body").append(tooltip);	//把它追加到文档中
		$("#tooltip")
			.css({
				"top": (e.pageY+y) + "px",
				"left": (e.pageX+x)  + "px"
			}).show("fast");	  //设置x坐标和y坐标，并且显示
    }).mouseout(function(){		
		this.name= this.myTitle;
		$("#tooltip").remove();   //移除 
    }).mousemove(function(e){
		$("#tooltip")
			.css({
				"top": (e.pageY+y) + "px",
				"left": (e.pageX+x)  + "px"
			});
	});
})
require([], function (){

    var isMobileInit = false;
    var loadMobile = function(){
        require([yiliaConfig.rootUrl + 'js/mobile.js'], function(mobile){
            mobile.init();
            isMobileInit = true;
        })
    }
    var isPCInit = false;
    var loadPC = function(){
        require([yiliaConfig.rootUrl + 'js/pc.js'], function(pc){
            pc.init();
            isPCInit = true;
        })
    }

    var browser = {
        versions: function() {
        var u = window.navigator.userAgent;
        return {
            trident: u.indexOf('Trident') > -1, //IE内核
            presto: u.indexOf('Presto') > -1, //opera内核
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
            iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者安卓QQ浏览器
            iPad: u.indexOf('iPad') > -1, //是否为iPad
            webApp: u.indexOf('Safari') == -1 ,//是否为web应用程序，没有头部与底部
            weixin: u.indexOf('MicroMessenger') == -1 //是否为微信浏览器
            };
        }()
    }

    $(window).bind("resize", function() {
        if (isMobileInit && isPCInit) {
            $(window).unbind("resize");
            return;
        }
        var w = $(window).width();
        if (w >= 700) {
            loadPC();
        } else {
            loadMobile();
        }
    });

    if(!!browser.versions.mobile || $(window).width() < 800){
        loadMobile();
    } else {
        loadPC();
    }

    resetTags = function(){
        var tags = $(".tagcloud a");
        for(var i = 0; i < tags.length; i++){
            var num = Math.floor(Math.random()*7);
            tags.eq(i).addClass("color" + num);
        }
        $(".article-category a:nth-child(-n+2)").attr("class", "color0");
    }

    // fancyBox
    if(!!yiliaConfig.fancybox){
        require([yiliaConfig.fancybox_js], function(pc){
            var isFancy = $(".isFancy");
            if(isFancy.length != 0){
                var imgArr = $(".article-inner img");
                for(var i=0,len=imgArr.length;i<len;i++){
                    var src = imgArr.eq(i).attr("src");
                    var title = imgArr.eq(i).attr("alt");
                    if(typeof(title) == "undefined"){
                        var title = imgArr.eq(i).attr("title");
                    }
                    var width = imgArr.eq(i).attr("width");
                    var height = imgArr.eq(i).attr("height");
                    imgArr.eq(i).replaceWith("<a href='"+src+"' title='"+title+"' rel='fancy-group' class='fancy-ctn fancybox'><img src='"+src+"' width="+width+" height="+height+" title='"+title+"' alt='"+title+"'></a>");
                }
                $(".article-inner .fancy-ctn").fancybox({ type: "image" });
            }
        })
    }

    // Animate on Homepage
    if(!!yiliaConfig.animate) {
		
        if(!!yiliaConfig.isHome) {
            require([yiliaConfig.scrollreveal], function (ScrollReveal) {
                var animationNames = [
                "pulse", "fadeIn","fadeInRight", "flipInX", "lightSpeedIn","rotateInUpLeft", "slideInUp","zoomIn",
				"bounceInRight", "bounceInUp", "flipInY", "rotateIn", "rotateInUpLeft", "rotateInUpRight", "slideInRight", "rollIn",
                ],
                len = animationNames.length;
				var randomAnimationName = "fadeInUp";//移动端中有从下往上的动画
				if(!navigator.userAgent.match(/(iPhone|iPod|Android|ios|Opera Mini|BlackBerry|webOS)/i)){//非移动端再添加多点动画
					randomAnimationName = animationNames[Math.ceil(Math.random() * len) - 1];
				}

                // Fallback (CSS3 keyframe, requestAnimationFrame)
				 // ie9 不支持css3 keyframe动画, safari不支持requestAnimationFrame, 不使用随机动画，切回原来的动画
                if (!window.requestAnimationFrame) {
                    $('.body-wrap > article').css({opacity: 1});
                    if (navigator.userAgent.match(/Safari/i)) {
                        function showArticle(){
                            $(".article").each(function(){
                                if( $(this).offset().top <= $(window).scrollTop()+$(window).height() && !($(this).hasClass('show')) ) {
                                    $(this).removeClass("hidden").addClass("show");
                                    $(this).addClass("is-hiddened");
                                } else {
                                    if(!$(this).hasClass("is-hiddened")) {
                                        $(this).addClass("hidden");
                                    }
                                }
                            })
                        }
                        $(window).on('scroll', function(){
                            showArticle();
                        });
                        showArticle();
                    }
                    return;
                }

                var animateScope = ".body-wrap > article";
                var $firstArticle = $(".body-wrap > article:first-child");
                if ($firstArticle.height() > $(window).height()) {
                    var animateScope = ".body-wrap > article:not(:first-child)";
                    $firstArticle.css({opacity: 1});
                }
				// document.body有些浏览器不支持监听scroll，所以使用默认的document.documentElement
                ScrollReveal({
                    duration: 100,
                    afterReveal: function (domEl) {
						// safari不支持requestAnimationFrame不支持document.documentElement的onscroll所以这里不会执行
						// 初始状态设为opacity: 0, 动画效果更平滑一些(由于脚本加载是异步，页面元素渲染后在执行动画，感觉像是延时)
                        $(domEl).addClass('animated ' + randomAnimationName).css({opacity: 1})
                    }
                }).reveal(animateScope);
            })
        } else {
            $('.body-wrap > article').css({opacity: 1});
        }
    }

    // TOC
    if (yiliaConfig.toc) {
        require(['toc'], function(){ })
    }

    // Random Color 边栏顶部随机颜色
    var colorList = ["#6da336", "#ff945c", "#66CC66", "#99CC99", "#CC6666", "#76becc", "#c99979", "#918597", "#4d4d4d"];
    var id = Math.ceil(Math.random()*(colorList.length-1));
    // PC
    $("#container .left-col .overlay").css({"background-color": colorList[id],"opacity": .5});
    // Mobile
    $("#container #mobile-nav .overlay").css({"background-color": colorList[id],"opacity": .7});
	
	$(window).load(function() {
		if(!navigator.userAgent.match(/(iPhone|iPod|Android|ios|Opera Mini|BlackBerry|webOS)/i)){
			// 代码雨
			var width = matrix.width;
			var height = matrix.height;
			var letters = Array(256).join(1).split('');
			var colorBGList = ["rgba(109,163,54,0.05)", "rgba(255,148,92, 0.05)", "rgba(102,204,102,0.05)", "rgba(153,204,153,0.05)", "rgba(204,102,102,0.05)", "rgba(118,190,204,0.05)", "rgba(201,153,121,0.05)", "rgba(145,133,151,0.05)", "rgba(77,77,77,0.05)"];
			var colorLetterList = ["#ffffff", "#000000", "#000000", "#000080", "#000000", "#FFFF00", "#000000", "#0F0", "#0F0"]
			var draw = function () {
				matrix.getContext('2d').globalAlpha = 1.0; 
				matrix.getContext('2d').fillStyle = colorBGList[id];
				matrix.getContext('2d').fillRect(0, 0, width, height);
				matrix.getContext('2d').fillStyle = colorLetterList[id];
				matrix.getContext('2d').font = "10pt Calibri";
				letters.map(function (y_pos, index) {
					text = String.fromCharCode(/*3e4*/ 65 + Math.random() * 33);
					x_pos = index * 10;
					matrix.getContext('2d').fillText(text, x_pos, y_pos);
					letters[index] = (y_pos > 180 + Math.random() * 1e4) ? 0 : y_pos + 10;
				});
			};
			var timer = setInterval(draw, 60);
			
			window.onfocus = function() {//获取焦点时开始
				clearInterval(timer); 
				timer = setInterval(draw, 60);//定时器
			}
			window.onblur = function() {//失去焦点时停止
				clearInterval(timer); 
			}
		}
	});

	//设置左边栏宽度
	//var leftcol = document.getElementsByClassName("left-col")[0];
	//if(totalwidth >= 100){
	//	leftcol.style.width = "400px";
	//} else if(totalwidth >= 1550 && totalwidth < 1900){
	//	leftcol.style.width = "350px";
	//}
	
    // Table
    $("table").wrap("<div class='table-area'></div>");

    // Hide Comment Button
    $(document).ready(function() {
        if ($("#comments").length < 1) {
            $("#scroll > a:nth-child(2)").hide();
        }
    })

    // Hide Labels
    if(yiliaConfig.isArchive || yiliaConfig.isTag || yiliaConfig.isCategory) {
        $(document).ready(function() {
            $("#footer").after("<button class='hide-labels fa fa-eye animated infinite pulse' style='margin-left:10px;margin-top:10px;'></button>");
            $(".hide-labels").click(function() {
                $(".article-info").toggle(200);
            })
        })
    }

    // Task lists in markdown
    $('ul > li').each(function() {
        var taskList = {
            field: this.textContent.substring(0, 2),
            check: function(str) {
                var re = new RegExp(str);
                return this.field.match(re);
            }
        }

        var string = ["[ ]", ["[x]", "checked"]];
        var checked = taskList.check(string[1][0]);
        var unchecked = taskList.check(string[0]);

        var $current = $(this);
        function update(str, check) {
            var click = ["disabled", ""];
            $current.html($current.html().replace(
              str, "<input type='checkbox' " + check + " " + click[1] + " >")
            )
        }

        if (checked || unchecked) {
            this.classList.add("task-list");
            if (checked) {
                update(string[1][0], string[1][1]);
                this.classList.add("check");
            } else {
                update(string[0], "");
            }
        }
    })

})


//插件名字：scrollHighlight（滚动高亮节点插件）
//说明：ngudream基于蔡宝坚原插件做的修改

;
(function($) {
	$.fn.scrollHighlight = function(options) {
		return this.each(function() {
			var defualts = {
				childItem: "a", //高亮的节点
				attribute: "href", //高亮节点属性
				highlight: 'highlight', //给高亮节点添加的类
				buffer: 0, //距离节点的距离
				cancelFlag: true, //当超过节点时是否取消高亮，默认是取消高亮
				container: window,
				mode: 'vertical' //滚动的模式，默认为竖直方向，可以为其他如horizontal(水平方向)
			};
			var opts = $.extend({}, defualts, options),
				obj = $(this),
				mode = opts.mode,
				buffer = opts.buffer,
				highlight = opts.highlight,
				childItem = opts.childItem,
				attribute = opts.attribute,
				$con = $(opts.container),
				$w = $(window);
			if (obj.length <= 0) return;
			var resizeTimer; // Set resizeTimer to empty so it resets on page load

			var item = obj.find(childItem),
				i = 0,
				len = item.length,
				wrap = [],
				index = [],
				anchor = [];
			for (; i < len; i++) {
				anchor.push(item.eq(i).attr(attribute)); //获取需要高亮的所有节点
			}

			var aLen = anchor.length;
			for (var j = 0; j < aLen; j++) {
				var that = $(anchor[j]);//container中的内容
				if (that.length && that.is(":visible")) { //筛选出容器内存在的节点并且是显示的
					wrap.push(anchor[j]); //将节点放置在数组wrap中
					index.push(j); //筛选出他们的位置
				}
			}

			function myOffset(attr){
				//获取元素上边(左边)偏移值
				return (mode == 'vertical') ? $(attr).offset().top : $(attr).offset().left;
			}

			var wLen = wrap.length;
			// var pos = [];
			// for (var i = 0; i < wLen; i++) {
			// 	pos.push(myOffset(wrap[i])); //存储每个节点的偏移值
			// }

			//滚动时的函数
			function onScroll(e) {
				var xy =  (mode == 'vertical') ? $w.scrollTop() + buffer : $w.scrollLeft() + buffer;
				function myOuter(attr){
					//获取元素外部高度(宽度)
					return (mode == 'vertical') ? $(attr).offset().top : $(attr).offset().left;
					//return (mode == 'vertical') ? $(attr).outerHeight() : $(attr).outerWidth();
				}
				function myPos(i) {
					//当是垂直(水平)滚动时，滚动高度(宽度)大于它的上边(左边)的偏移值，高亮。
					if (xy >= pos[i]) {
						item.eq(index[i]).css("color", "blue");
					}
				}

				var $win = $(window);
				var visiable = false;
				for (var i = 0; i < wLen; i++) {
					//方法1
					//myPos(i); //当是垂直(水平)滚动时，获取节点上边(左边)的偏移值，并和滚动高度(宽度)对比，当滚动高度(宽度)大于它的时候，高亮。
					// var sub = 1;
					// if(i == (wLen - 1)){
					// 	sub = 0;
					// }
					// if (opts.cancelFlag && (xy >= pos[i+sub] || xy < pos[i])) { //当滚动高度(宽度)超过它的位置加上它的高度(宽度)时，取消节点的高亮
					// 	if(i == wLen - 1){//最后一个
					// 		if(xy < pos[i]){
					// 			item.eq(index[i]).css("color", "gray");
					// 		}
					// 	} else {
					// 		item.eq(index[i]).css("color", "gray");
					// 	}
					// }

					//方法2
					try {
						var sub = 1;
						if(i == (wLen - 1)){
							sub = 0;
						}
						var winHeight = $win.height();//是获取当前也就是浏览器所能看到的页面的那部分的高度，这个大小在你缩放浏览器窗口大小时
						var winScrollTop = $win.scrollTop();//获取垂直滚动的距离即当前滚动的地方的窗口顶端到整个页面顶端的距离
						var itemOffsetTop = $(wrap[i]).offset().top;//该元素距离页面顶部的距离
						var itemNextOffsetTop = $(wrap[i+sub]).offset().top;//该元素距离页面顶部的距离
						var itemOuterHeight = $(wrap[i]).outerHeight(true);//元素的高度
						if(opts.cancelFlag){
							if(!(winScrollTop > itemOffsetTop+itemOuterHeight) && !(winScrollTop < itemOffsetTop-winHeight)) {
								if(!visiable){//可见区的每一个标题高亮
									item.eq(index[i]).css("color", "blue");
									visiable = true;
								} else {
									item.eq(index[i]).css("color", "gray");
								}
							} else if(i != wLen - 1 && winScrollTop > itemOffsetTop && winScrollTop < (itemNextOffsetTop-itemOuterHeight)){
								if(!visiable){
									item.eq(index[i]).css("color", "blue");
									visiable = true;
								} else {
									item.eq(index[i]).css("color", "gray");
								}
							} else if(i == wLen - 1 && winScrollTop > itemOffsetTop){
								item.eq(index[i]).css("color", "blue");
							}	else {
								item.eq(index[i]).css("color", "gray");
							}
						}
					} catch (e) {

					}
				}
			}

			function is_post(){//根据自己实际需要来判断
	      var url = window.location.pathname;
	      var urlArray = url.split("/");
	      if(urlArray.length > 2){
	        var id = $(".article").eq(0).attr("id");
	        var resultUrl = "post-" + urlArray[urlArray.length - 2];
	        if(resultUrl == id){
	          return true;
	        }
	      }
	      return false;
	    }

			// 当有滚动时执行下面代码
			$(window).on("scroll", function() {
				if(is_post()){
					clearTimeout(resizeTimer);
					resizeTimer = setTimeout(onScroll, 100);
				}
			});
			// 当发现调整屏幕大小时，重新执行代码
			$(window).on("resize", function() {
				if(is_post()){
					clearTimeout(resizeTimer);
					resizeTimer = setTimeout(onScroll, 100);
				}
			});
			if(is_post()){
				resizeTimer = setTimeout(onScroll, 100);
			}
		});
	};
})(jQuery);

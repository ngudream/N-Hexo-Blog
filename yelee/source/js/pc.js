define([], function() {

    var Tips = (function() {

        var $tipBox = $(".tips-box");

        return {
            show: function() {
                $tipBox.removeClass("hide");
            },
            hide: function() {
                $tipBox.addClass("hide");
            },
            init: function() {

            }
        }
    })();

    var slide = function(idx) {
        // 修复IE10+切换无效的bug
        var $wrap = $(".switch-wrap"),
            transform = [
                '-webkit-transform: translate(-' + idx * 100 + '%, 0);',
                '-moz-transform: translate(-' + idx * 100 + '%, 0);',
                '-o-transform: translate(-' + idx * 100 + '%, 0);',
                '-ms-transform: translate(-' + idx * 100 + '%, 0);',
                'transform: translate(-' + idx * 100 + '%, 0);'
            ];
        $wrap[0].style.cssText = transform.join('');
        $(".icon-wrap").addClass("hide");
        $(".icon-wrap").eq(idx).removeClass("hide");
    }

    var bind = function() {
        var switchBtn = $("#myonoffswitch");
        var tagcloud = $(".second-part");
        var navDiv = $(".first-part");
        switchBtn.click(function() {
            if (switchBtn.hasClass("clicked")) {
                switchBtn.removeClass("clicked");
                tagcloud.removeClass("turn-left");
                navDiv.removeClass("turn-left");
            } else {
                switchBtn.addClass("clicked");
                tagcloud.addClass("turn-left");
                navDiv.addClass("turn-left");
                resetTags();
            }
        });

        var timeout;
        var isEnterBtn = false;
        var isEnterTips = false;

        $(".icon").bind("mouseenter", function() {
            isEnterBtn = true;
            Tips.show();
        }).bind("mouseleave", function() {
            isEnterBtn = false;
            setTimeout(function() {
                if (!isEnterTips) {
                    Tips.hide();
                }
            }, 100);
        });

        $(".tips-box").bind("mouseenter", function() {
            isEnterTips = true;
            Tips.show();
        }).bind("mouseleave", function() {
            isEnterTips = false;
            setTimeout(function() {
                if (!isEnterBtn) {
                    Tips.hide();
                }
            }, 100);
        });

        $(".tips-inner li").bind("click", function() { //控制鸟屋点击事件
            var idx = $(this).index();
            if(idx == 3){
              if ($("#my_signature").length <= 0) {
                $("#bee_div").append("<img id='my_signature' src='/img/bee.png' />");
              }
            } else if(idx == 4){
              if($("#ds-recent-visitors").length <= 0){
                $("#js-visitor").append("<ul class='ds-recent-visitors' data-num-items='28' data-avatar-size='50' id='ds-recent-visitors'></ul>");
                DUOSHUO.RecentVisitors($("#ds-recent-visitors"));
              }
            }
            slide(idx);
            Tips.hide();
        });

        $(".QQ").bind("click", function() { //qq扫码
            //var idx = $(this).index();
            if ($("#my_qq").length <= 0) {
                $("#qq_div").append("<img id='my_qq' src='/img/qq.png' style='cursor:pointer; margin-top:-8px;' />");
                $("#my_qq").bind("click", function() { //qq扫码
                  if ($("#my_wechat").length <= 0) {
                      $("#wechat_div").append("<img id='my_wechat' src='/img/wechat.png' style='cursor:pointer; margin-left:12px;' />");
                      $("#my_wechat").bind("click", function() { //微信扫码
                          slide(5);
                          Tips.hide();
                      });
                  }
                    slide(6);
                    Tips.hide();
                });
            }
            slide(5);
            Tips.hide();
        });

        $(".WeChat").bind("click", function() { //微信扫码
            //var idx = $(this).index();
            if ($("#my_wechat").length <= 0) {
                $("#wechat_div").append("<img id='my_wechat' src='/img/wechat.png' style='cursor:pointer; margin-left:12px;' />");
                $("#my_wechat").bind("click", function() { //微信扫码
                  if ($("#my_qq").length <= 0) {
                      $("#qq_div").append("<img id='my_qq' src='/img/qq.png' style='cursor:pointer; margin-top:-8px;' />");
                      $("#my_qq").bind("click", function() { //qq扫码
                          slide(6);
                          Tips.hide();
                      });
                  }
                    slide(5);
                    Tips.hide();
                });
            }
            slide(6);
            Tips.hide();
        });

    }

    var miniArchives = function() {
        if (yiliaConfig.isPost) {
            $(".post-list").addClass("toc-article");
            $("#post-nav-button > a:nth-child(2)").click(function() {
                $("#post-nav-button .fa-bars,#post-nav-button .fa-times").toggle();
                $(".post-list").toggle(300);
                if ($(".toc").length > 0) {
                    $("#toc, #tocButton").toggle(200, function() {
                        if ($(".switch-area").is(":visible")) {
                            $("#toc, .switch-btn, .switch-area").toggle();
                            $("#tocButton").attr("value", yiliaConfig.toc[0]);
                        }
                    });
                } else {
                    $(".switch-btn, .switch-area").fadeToggle(300);
                }
            });
        }
    }()

    //主题默认提示样式
    if (yiliaConfig.jquery_ui[0]) {
        var tooltip = function() {
            require([yiliaConfig.jquery_ui[1]], function() {
                var loadCSS = function(url, num) {
                    var link = document.createElement("link");
                    link.rel = "stylesheet";
                    link.href = url;
                    var head = document.querySelector("head");
                    head.insertBefore(link, head.childNodes[num]);
                }
                loadCSS(yiliaConfig.jquery_ui[2], 25);
                if (!$().tooltip) return;
                if (navigator.userAgent.match(/(iPhone|iPad|Android|ios|PlayBook|Touch)/i)) return;
                $("[title]").tooltip({
                    show: {
                        effect: 'blind',
                        delay: 250,
                        duration: 55,
                    }
                })
                $("#scroll").tooltip({
                    show: {
                        effect: 'clip',
                        delay: 600,
                        duration: 50,
                    }
                })
                $("#tocButton, #comments").tooltip({
                    show: {
                        delay: 1200,
                    }
                })
                $(".ds-replybox form").off("tooltip")
                $("#post-nav-button").tooltip({
                    show: {
                        effect: 'clip',
                        delay: 280,
                        duration: 65,
                    }
                })
                $("#post-nav-button > a:nth-child(2)").tooltip({
                    show: {
                        delay: 1500,
                    }
                })
                $(".social").tooltip({
                    show: {
                        effect: 'scale',
                        delay: 350,
                        duration: 70,
                    }
                })
            })
        }()
    }

    if (yiliaConfig.search) {
        var search = function() {
            require([yiliaConfig.rootUrl + 'js/search.js'], function() {
                var inputArea = document.querySelector("#local-search-input");
                var $HideWhenSearch = $("#toc, #tocButton, .post-list, #post-nav-button a:nth-child(2)");
                var $resetButton = $("#search-form .button");
                var $resultArea = $("#local-search-result");

                var getSearchFile = function() {
                    var search_path = "search.xml";
                    var path = yiliaConfig.rootUrl + search_path;
                    searchFunc(path, 'local-search-input', 'local-search-result');
                }

                var getFileOnload = inputArea.getAttribute('searchonload');
                if (yiliaConfig.search && getFileOnload === "true") {
                    getSearchFile();
                } else {
                    inputArea.onfocus = function() {
                        getSearchFile()
                    }
                }

                var HideTocArea = function() {
                    $HideWhenSearch.css("visibility", "hidden");
                    $resetButton.show();
                }
                inputArea.oninput = function() {
                    HideTocArea()
                }
                inputArea.onkeydown = function() {
                    if (event.keyCode == 13) return false
                }

                //搜索框删除按钮
                resetSearch = function() {
                    $HideWhenSearch.css("visibility", "initial");
                    $resultArea.html("");
                    document.querySelector("#search-form").reset();
                    $resetButton.hide();
                    $(".no-result").hide();
                    $("#left_col_div").css("overflow-y", "hidden");
                }

                //监控搜索框内容，内容为空时主动调用删除函数
                $(function() {
                    $('#local-search-input').bind('input propertychange', function() {
                        $('#result').html($(this).val().length + ' characters');
                        var len = $(this).val().length;
                        if (len <= 0) {
                            var searchDel = document.getElementById("search-delete");
                            searchDel.click();
                        }
                    });
                })

                $resultArea.bind("DOMNodeRemoved DOMNodeInserted", function(e) {
                    if (!$(e.target).text()) {
                        $(".no-result").show(200);
                        $("#left_col_div").css("overflow-y", "hidden");
                    } else {
                        $(".no-result").hide();
                        $("#left_col_div").css("overflow-y", "auto").css("overflow-x", "hidden");
                    }
                })
            })
        }()
    }

    return {
        init: function() {
            //resetTags();
            bind();
            Tips.init();
        }
    }
});

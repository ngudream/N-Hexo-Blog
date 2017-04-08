<!-- http://suninuni.com/2015/11/27/frontend/hexo/back-to-top/ -->
var bigfa_scroll = {
        drawCircle: function(id, percentage, color) {
            var button = $(id)
            var width = button.width();
            var height = button.height();
            var radius = parseInt(width / 2.20);
            var position = width;
            var positionBy2 = position / 2;
            var bg = button[0];
            id = id.split("#");
            var ctx = bg.getContext("2d");
            var imd = null;
            var circ = Math.PI * 2;
            var quart = Math.PI / 2;
            ctx.clearRect(0, 0, width, height);
            ctx.beginPath();
            ctx.strokeStyle = color;
            ctx.lineCap = "square";
            ctx.closePath();
            ctx.fill();
            ctx.lineWidth = 3;
            imd = ctx.getImageData(0, 0, position, position);
            var draw = function(current, ctxPass) {
                ctxPass.putImageData(imd, 0, 0);
                ctxPass.beginPath();
                ctxPass.arc(positionBy2, positionBy2, radius, -(quart), ((circ) * current) - quart, false);
                ctxPass.stroke();
            }
            draw(percentage / 100, ctx);
        },
        backToTop: function($this) {
            $this.click(function() {
                jQuery("body,html").animate({
                    scrollTop: '0px'
                },
                800);
                return false;
            });
        },
        scrollHook: function($this, color) {
            color = color ? color: "#000000";
            $this.scroll(function() {
                var docHeight = (jQuery(document).height() - jQuery(window).height()),
                $windowObj = $this,
                $per = jQuery(".per"),
                percentage = 0;
                defaultScroll = $windowObj.scrollTop();
                percentage = parseInt((defaultScroll / docHeight) * 100);
                var backToTop = jQuery("#backtoTop");
                if (backToTop.length > 0) {
                    if ($windowObj.scrollTop() > 0) {
                        backToTop.addClass("button--show");
                    } else {
                        backToTop.removeClass("button--show");
                    }
                    if (document.body.clientWidth < 1111) {
                        backToTop.removeClass("button--show");
                    }
                    $per.attr("data-percent", percentage);
                    bigfa_scroll.drawCircle("#backtoTopCanvas", percentage, color);
                }

            });
        }
    }

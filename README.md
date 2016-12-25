# ngudream的Hexo博客源码

**修改自[MOxFIVE](http://moxfive.xyz/)的[yelee](https://github.com/MOxFIVE/hexo-theme-yelee)主题**

### 1、安装Node.js
	sudo add-apt-repository ppa:chris-lea/node.js
	sudo apt-get update
	sudo apt-get install nodejs

### 2、安装hexo
	sudo npm install hexo -g

### 3、插件安装
（1）安装hexo-deployer-Git

	npm install hexo-deployer-git --save

（2）字数统计插件
	
	npm install hexo-wordcount --save

（3）用于生成搜索引擎网站地图

	npm install hexo-generator-sitemap --save

（4）博客备份请参考

https://github.com/coneycode/hexo-git-backup

（5）右下角的站内搜索

https://github.com/androiddevelop/hexo-search

（6）左边拦的站内搜索优化

http://www.tuicool.com/articles/ZRZnErq

http://gaomf.cn/2016/10/10/%E4%B8%BAHexo%E5%8D%9A%E5%AE%A2Yilia%E4%B8%BB%E9%A2%98%E6%B7%BB%E5%8A%A0%E6%9C%AC%E5%9C%B0%E7%AB%99%E5%86%85%E6%90%9C%E7%B4%A2%E5%8A%9F%E8%83%BD/

笔者修改的Hexo\node_modules\hexo-generator-search下的文件index.js、search.ejs已附上，可以减少生成的search.xml文件大小。

（7）代码高亮

http://ngudream.com/2016/09/13/hexo-install-prettify/

（8）css、js、image等压缩

http://luckykun.com/work/2016-07-10/hexo-faster.html?utm_source=tuicool&utm_medium=referral

笔者修改的gulpfile.js文件也已附上。

（9）博客图片文件夹，hexo new page的时候同时在_post目录下生成一个同名的文件夹，这样每篇文章用到的图片就是单独放在相应的文件夹下，方便寻找、处理。

http://www.jianshu.com/p/c2ba9533088a

### 4、部署
个人博客是同时部署在 github 和 coding，国内走的是 coding，网站的访问速度会快点。方法可以参考：
http://www.jianshu.com/p/7ad9d3cd4d6e

### 5、说明
（1）plugins文件夹里面是放一些博客额外用到的css、js文件，笔者现在是放在hexo/source目录下，也可以放在yelee主题的source目录下，请自行修改资源的相对路径。

* font下面的是左边栏Never Give Up Dream往下掉
* hint是博客用到的提示框css
* prettify是博客用到的代码高亮插件

（2）首页文章概要样式是使用的semantic-ui，如果不喜欢可以修改yelee/layout/_partial/article.ejs文件下面的概要div的样式

（3）404在pc端笔者使用的是iframe加载网易的，移动端则是使用yelee/source/publicwelfare的加载腾讯的

（4）多说样式使用的是yelee/source/duoshuo/shejidaren.css

### 个人博客

[移动开发|ngudream](http://ngudream.com)
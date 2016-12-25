# Ngudream-Hexo-Blog

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

我修改的Hexo\node_modules\hexo-generator-search下的文件index.js、search.ejs已附上，可以减少生成的search.xml文件大小。

### 4、部署
个人博客是同时部署在 github 和 coding，国内走的是 coding，网站的访问速度会快点。方法可以参考：
http://www.jianshu.com/p/7ad9d3cd4d6e

### 个人博客

[移动开发|ngudream](http://ngudream.com)
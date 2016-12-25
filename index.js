var merge = require('utils-merge');
var pathFn = require('path');

var config = hexo.config.search = merge({
	path: 'search.xml',
	field: 'post'
}, hexo.config.search);

// Set default search path
if (!config.path){
  config.path = 'search.xml';
}

// Add extension name if don't have
if (!pathFn.extname(config.path)){
  config.path += '.xml';
}

hexo.extend.generator.register('search', require('./lib/generator'));

stripe_code = function(str) { // 去除代码
	//console.log(str.replace(/<pre class="prettyprint.*?<\/pre>/ig, ''));
	var regRN = /\r\n/g;
	var regR = /\r/g;
	var regN = /\n/g;
	var preR = /<pre[^>/]*>(.*?)<\/pre>/ig;
	str = str.replace(regRN, "").replace(regR, "").replace(regN, "").replace(preR, '');
    return str;
}
stripe = function (str) { // 去除html标签
    return str.replace(/(<([^>]+)>)/ig, '');
}
minify = function (str) { // 压缩成一行
    return str.trim().replace(/\n/g, ' ').replace(/\s+/g, ' ');
}
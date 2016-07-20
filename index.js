var fs = require('fs')
var keys = null
/**
 * 读取json文件，并返回json对象
 * @param  {String} file 文件路径
 * @return JSON
 */
var readJson = function(file){
	var str = fs.readFileSync(file)
	var json = {}
	try{
		json = JSON.parse(str)
	}catch(e){
		fis.log.notice('fis3-parser-config: parse file content to json error.[' + file + ']')
	}
	return json
}
/**
 * 加载配置文件，并添加监听
 * @param  {String} file 文件路径
 * @return JSON
 */
var loadConfig = function(file){
	if(file && fs.existsSync(file)){
		fs.unwatchFile(file)
		//添加监听
		fs.watchFile(file, {}, function(){
			// keys = readJson(file)
			// 清理编译缓存
			fis.compile.clean()
			// 退出当前编译进程重启编译
			process.exit()
		})
		return readJson(file)
	}
	else{
		return {}
	}
}
/**
 * 在对应的脚本中使用__conf(key),__confIn(key)来替换配置数据内对应key键值的数据。
 * 解析规则如下：
 * __conf(key)会替换成"options[key]"
 * __confIn(key)会替换成options[key]
 */
module.exports = function (content, file, options) {
  var config = options.file || null
  // 初次加载环境变量数据，并存储到keys对象
  keys || (keys = loadConfig(config))
  if(options.keys){
  	for(var i in options.keys){
  		keys[i] = options.keys[i]
  	}
  }
  //替换keys对象中，所有键值属性对应的__conf环境变量。
  for(var i in keys){
  	if(typeof keys[i] == 'string'){
  		var reg = new RegExp('__conf\\(' + i + '\\)', 'g')
	  	content = content.replace(reg, '"' + keys[i].replace(/"/g, '\\"') + '"')
	  	var reg = new RegExp('__confIn\\(' + i + '\\)', 'g')
	  	content = content.replace(reg, keys[i])
  	}
  }
  return content;
}
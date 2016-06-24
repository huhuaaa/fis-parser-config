/**
 * 在对应的脚本中使用__conf(key),__confIn(key)来替换配置数据内对应key键值的数据。
 * 解析规则如下：
 * __conf(key)会替换成"options[key]"
 * __confIn(key)会替换成options[key]
 */
module.exports = function (content, file, options) {
  for(var i in options){
  	var reg = new RegExp('__conf\\(' + i + '\\)', 'g')
  	content = content.replace(reg, '"' + options[i].replace(/"/g, '\\"') + '"')
  	var reg = new RegExp('__confIn\\(' + i + '\\)', 'g')
  	content = content.replace(reg, options[i])
  }
  return content;
}
# fis-parser-config

为了解决多站点域名各异以及一些前端变量在各个环境下的不同，而给程序带来复杂的判断逻辑、容易遗漏等问题。我们使用了fis-parser-config来通过前端编译，来替换设定的一些公共属性值。

## 安装插件

```
npm install -g fis-parser-config
```

## fis3中添加插件

```
//以fis3为例
fis.match('*', {
	parser: fis.plugin('config', options)
})
```

## options说明


| 参数    |   类型  | 是否可选 | 说明 |
| ------- |:------:|:-------:| :---- |
| file    | String |   是    | 指定读取键值的json文件，文件内容必须为标准JSON格式。 |
| keys    | JSON   |   是    | 指定键值变量；若和file参数一起使用，两个参数执行的JSON对象将会合并，并且相同价值会覆盖file指定的数据。|

options详细实例：

```
fis.match('*', {
	parser: fis.plugin('config', {
		"file": "env/debug.json",
		"keys": {
			"version": "1.0.0"
		}
	})
})
```


## 使用规则举例

例如：配置中，声明了如下的数据。
```
{
  "key": "value"
}
```

那么在js中可以，使用如下的方式来获得。

编译前：

```
//方法1(推荐使用)
var domain = __conf(key);
//方法2
var domain = "__confIn(key)";
```

编译后：

```
//方法1(推荐使用)
var domain = "value";
//方法2
var domain = "value";
```

非js语法中，使用__confIn方式。

编译前：

```
<a href="__confIn(key)">得图网</a>
```

编译后：

```
<a href="value">得图网</a>
```
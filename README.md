# fis-parser-config

为了解决多站点域名各异以及一些前端变量在各个环境下的不同，而给程序带来复杂的判断逻辑和容易遗漏混乱。我们使用了fis-parser-config来通过前端编译，来替换设定的一些公共属性值。

## 安装插件

```
npm install -g fis-parser-config
```

## fis中添加插件举例

```
//以fis3为例
fis.match('*', {
	parser: fis.plugin('config', {
		"key": "value"
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
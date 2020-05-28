# 介绍
本工具根据 excel 中 percentile 算法计算百分位数值

如果你是需要求数据中最接近所给百分位的值的话可以使用`percentile`而非`@iusername/percentile`

# 安装
```bash
npm i @iusername/percentile

// 或者
yarn add @iusername/percentile
```

# 使用
```js
// node
const Percentile = require('@iusername/percentile')
// broswer
import Percentile from '@iusername/percentile'
```

**只求值一次的情况**
```js
var percentile = new Percentile()

// mock data
const data = [2, 3, 5, 5, 5, 7, 20, 21]

var res = percentile.incsOnce(data, [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100])
// res: [2, 2.7, 3.8, 5, 5, 5, 5.4, 6.8, 14.8, 20.3, 21]

var res = percentile.incsOnce(data, 90)
// res: 20.3
```
**需要多次求值时，可以通过初始化时传入 data 或者 init(data) 来缓存处理好的 data 数据减少每次求职所耗时间**
```js
const data = [2, 3, 5, 5, 5, 7, 20, 21]

var percentile = new Percentile(data)
// 或者下面注释部分也行
// PS: init 后会覆盖上一次 init 或者初始化时的缓存数据
/*
  var percentile = new Percentile()
  percentile.init(data)
*/

// inc 方式
var res = percentile.incValue(90)
// res: 20.3

var res = percentile.incValues([80, 90, 100])
// res: [14.8, 20.3, 21]

// exc 方式
var res = percentile.excValue(90)
// res: '#NUM!'

var res = percentile.incValues([80, 90, 100])
// res: [20.2, '#NUM!', '#NUM!']
```

# 实例方法
- 方法中的参数说明
1. data: 用于计算的原数组
2. P:百分位值 1~100, inc时为闭区间，exc时为开区间
3. PList: 需要一次求得的多个百分位值得数组
4. accuracy:结果的小数位数精度值，默认为 1 表示一位小数

- init(data: number[])
>初始化 percentile对象数据，后续则不需要再传入相同数据进行计算了
- incValue(P: number, accuracy?: number)
>根据 PERCENTILE.INC 获取结果
- incValues(PList: number[], accuracy?: number)
>根据 PERCENTILE.INC 获取多个对应结果
- excValue(P: number, accuracy?: number)
>根据 PERCENTILE.EXC 获取结果
- excValues(PList: number[], accuracy?: number)
>根据 PERCENTILE.EXC 获取多个对应结果
- incOnce(data: number[], P: number, accuracy?: number)
>根据 PERCENTILE.INC 获取结果，data 不会被缓存，适用于只计算一次即可的情况，用完后实例对象会恢复原先缓存data
- incsOnce(data: number[], PList: number[], accuracy?: number)
> incOnce 的多值用法
- excOnce(data: number[], P: number, accuracy?: number)
>根据 PERCENTILE.EXC 获取结果，data 不会被缓存，适用于只计算一次即可的情况，用完后实例对象会恢复原先缓存data
- excsOnce(data: number[], PList: number[], accuracy?: number)
> excOnce 的多值用法

# 静态方法
- help()
>查看计算说明


# ！注意
>本工具只导出一个实例，也就意味着

>计算说明
```js
// 运行下面代码后再控制台查看
Percentile.help()
```


# Microsoft Office 中 PERCENTILE 函数说明
[PERCENTILE 函数](https://support.office.com/zh-cn/article/percentile-%E5%87%BD%E6%95%B0-91b43a53-543c-4708-93de-d626debdddca)

# License
MIT License
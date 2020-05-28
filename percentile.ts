/**
 * k 为非数值型
 */
const NO_VALUE = '#VALUE!'

/**
 * 1. array 为空
 * 2. k 超出范围
 * 3. PERCENTILE.EXC 不能指定插入值时
 */
const NO_NUM = '#NUM!'

const paramsTxt = `
参数说明：
array: 传入的 dataList
.INC：调用 incValue
.EXC：调用 excValue
k：经过计算后的百分位所在的百分值小数表示，P = 90 => k = 0.9
n：dataList 数组长度
----------------------------------`
const incHelpTxt = `
incValue:
如果 array 为空，则为百分点。.INC 返回 #NUM！ 。
如果 k 为非数值型，则值为百分点。.INC 返回 #VALUE！ 。
如果 k 为 < 0 或 k > 1，百分点。.INC 返回 #NUM！ 。
如果 k 不是 1/(n-1) 的倍数，则 PERCENTILE.INC 使用插值法来确定第 k 个百分点的值。
----------------------------------`
const excHelpTxt = `
excValue:
如果 array 为空，则为百分点。.EXC 返回 #NUM！ 错误值
如果 k 为非数值型，则值为百分点。.EXC 返回 #VALUE！ 。
如果 k 为≤0或 k ≥1，百分点为1。.EXC 返回 #NUM！ 。
如果 k 不是 1/（n + 1）的倍数，则为百分点。PERCENTILE.EXC 内插以确定第 k 个百分点的值。
排.当指定的百分点值位于数组中的两个值之间时，PERCENTILE.EXC 将会插入。 如果不能为指定的百分点值进行内插，Excel 将返回 #NUM！ 错误。
----------------------------------`
const helper = { paramsTxt, incHelpTxt, excHelpTxt }


const isNumber = (num: any) => Object.prototype.toString.call(num) === '[object Number]'
const toAccuracy = (num: number, accuracy: number = 1) => {
  if (accuracy > 0 && accuracy <= 6) {
    const acc = Math.pow(10, accuracy)
    return Math.round(num * acc) / acc
  } else if (accuracy === 0) {
    return Math.round(num)
  }
  throw new Error('accuracy必须为不大于 6 的自然数')
}
const numVerify = (num: number) => {
  return Number.isNaN(num) ? Number.NEGATIVE_INFINITY : num;
}
const percentVerfy = (num: any, isExc?: boolean) => {
  if (isExc) {
    return num > 0 && num < 100
  }
  return num >= 0 && num <= 100
}

class Perentile {
  constructor(data?: number[]) {
    this.init(data)
  }
  public init = (dataList: number[] = []) => {
    this.len = dataList.length
    this.data = dataList.slice().sort((a, b) => {
      const val_1 = numVerify(a)
      const val_2 = numVerify(b)
      return val_1 - val_2
    })
  }
  private len: number = 0
  private data: number[] = []
  // public value = (P: number, accuracy?: number) => this.incValue(P, accuracy)
  // public values = (PList: number[], accuracy?: number) => this.incValues(PList, accuracy)
  public incValue = (P: number, accuracy?: number) => {
    const data = this.data
    const n = this.len
    if (n === 0) {
      return NO_NUM
    } if (!isNumber(P)) {
      return NO_VALUE
    } else if (!percentVerfy(P)) {
      return NO_NUM
    }
    const k = Math.floor(P) / 100
    const index = (n - 1) * k
    if (index % 1 === 0) {
      return data[index]
    }
    const A = Math.floor(index)
    const B = A + 1
    const val_A = data[A]
    const val_B = data[B]
    const res = val_A + (val_B - val_A) * (k * (n - 1) - A)
    return toAccuracy(res, accuracy)
  }
  public incValues = (PList: number[], accuracy?: number) => PList.map((num) => this.incValue(num, accuracy))
  public excValue = (P: number, accuracy?: number) => {
    const data: number[] = [Number.MIN_SAFE_INTEGER, ...this.data, Number.MAX_SAFE_INTEGER]
    const n = data.length
    if (n === 0) {
      return NO_NUM
    } else if (!isNumber(P)) {
      return NO_VALUE
    } else if (!percentVerfy(P, true)) {
      return NO_NUM
    }
    const k = Math.floor(P) / 100
    const index = (n - 1) * k
    if (index < 1 || index > n - 2) {
      return NO_NUM
    } else if (index % 1 === 0) {
      return data[index]
    }
    const A = Math.floor(index)
    const B = A + 1
    const val_A = data[A]
    const val_B = data[B]
    const res = val_A + (val_B - val_A) * (k * (n - 1) - A)
    return toAccuracy(res, accuracy)
  }
  public excValues = (PList: number[], accuracy?: number) => PList.map((num) => this.excValue(num, accuracy))
  public incOnce = (data: number[], P: number, accuracy?: number) => {
    const cacheData = this.data.slice()
    this.init(data)
    const res = this.incValue(P, accuracy)
    this.init(cacheData)
    return res
  }
  public incsOnce = (data: number[], PList: number[], accuracy?: number) => {
    const cacheData = this.data.slice()
    this.init(data)
    const res = this.incValues(PList, accuracy)
    this.init(cacheData)
    return res
  }
  public excOnce = (data: number[], P: number, accuracy?: number) => {
    const cacheData = this.data.slice()
    this.init(data)
    const res = this.excValue(P, accuracy)
    this.init(cacheData)
    return res
  }
  public excsOnce = (data: number[], PList: number[], accuracy?: number) => {
    const cacheData = this.data.slice()
    this.init(data)
    const res = this.excValues(PList, accuracy)
    this.init(cacheData)
    return res
  }
  static help = (helpType?: 'inc' | 'exc') => {
    const helpTxt = paramsTxt + (helpType ? helper[`${helpType}HelpTxt` as 'incHelpTxt' | 'excHelpTxt'] : `${helper.incHelpTxt}${helper.excHelpTxt}`)
    console.log(helpTxt)
    return helpTxt
  }
}

export default Perentile

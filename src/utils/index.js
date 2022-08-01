import moment from 'moment'

/**
 * 时间戳转格式化时间
 * @param {number} timestamp 时间戳
 * @param {*} format 格式 默认 “YYYY-MM-DD HH:mm:ss”
 * @param {*} type 时间类型，s/ms, 默认 ms
 */
export const handleTimestampFormat = (timestamp, format = 'YYYY-MM-DD HH:mm:ss', type = 'ms') => {
  const time = type === 'ms' ? timestamp : timestamp * 1000

  return moment(time).format(format)
}

/**
 * 数字单位转换
 * @param {*} num 需转换数值
 * @param {*} unit 单位
 * @returns
 */
export const handleUnitTransform = (num, unit) => {
  if (num >= 10000) {
    return `${(num / 10000).toFixed(2)}万`
  } else if (num > 100000000) {
    return `${(num / 100000000).toFixed(2)}亿`
  }
}

/**
 *  转换歌手信息
 * @param {Array} singers 歌手列表
 * @returns
 */
export const handleGetSiner = (singers) => {
  return singers.reduce((prev, next, index) => {
    prev += index < singers.length - 1 ? next.name + '/' : next.name
    return prev
  }, '')
}

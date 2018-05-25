export function getDate (day) {
  var dd = new Date()
  dd.setDate(dd.getDate() + day) // 获取AddDayCount天后的日期
  var y = dd.getFullYear()
  var m = dd.getMonth() + 1 // 获取当前月份的日期
  m = m >= 10 ? m : '0' + m
  var d = dd.getDate()
  d = d >= 10 ? d : '0' + d
  return y + '' + m + '' + d
}

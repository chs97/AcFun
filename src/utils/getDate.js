import moment from 'moment'
const prefixZero = (len, number) => {
  let src = number.toString()
  while (src.length < len) src = '0' + src
  return src
}
const getMonthDate = (year, month) => {
  let monthStartStr = `${year}-${prefixZero(2, month)}-01`
  let monthStartDay = moment(monthStartStr)
  let dateStart = monthStartDay.day(0)
  let nowDay = dateStart
  let res = []
  let cnt = 0
  let weekData = []
  while ((nowDay.month() < month && nowDay.year() == year) || cnt != 0 || nowDay.year() < year) {
    weekData.push({
      className: nowDay.month() === month - 1 ? '' : nowDay.month() === month - 2 ? 'pre-month' : 'next-month',
      date: nowDay.date(),
      timestamp: nowDay.unix(),
      month: nowDay.month()
    })
    nowDay = nowDay.add(1, 'day')
    cnt++
    if (cnt == 7) {
      cnt = 0
      res.push(weekData)
      weekData = []
    }
  }
  return res
}

const splitTodos = (src) => {
  let arr = src.slice(0)
  let res = []
  let tmp = []
  let st = -1
  let pos = 0
  while (arr.length) {
    if (pos < arr.length && arr[pos].start > st) {
      tmp.push(arr[pos])
      st = arr[pos].end
      arr.splice(pos, 1)
    } else if (pos >= arr.length) {
      res.push(tmp)
      tmp = []
      pos = 0
      st = -1
    } else {
      pos++
    }
  }
  res.push(tmp)
  return res
}

const getOffsetLeft = (elm) => {
  let actualLeft = elm.offsetLeft
  let current = elm.offsetParent
  while (current !== null) {
    actualLeft += current.offsetLeft
    current = current.offsetParent
  }
  return actualLeft
}

const getOffsetTop = (elm) => {
  let actualTop = elm.offsetTop
  let current = elm.offsetParent
  while (current !== null) {
    actualTop += current.offsetTop
    current = current.offsetParent
  }
  return actualTop
}

export { getMonthDate, splitTodos, getOffsetLeft, getOffsetTop, prefixZero }
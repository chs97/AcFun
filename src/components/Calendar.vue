<template>
  <div class="calendar">
    <div class="header">
      <div class="week-name" v-for="(item) in weekName" :key="item">
        <span>{{item}}</span>
      </div>
    </div>
    <div class="weeks" v-for="(weeks, windex) in date" :key="windex">
      <div class="week-days">
        <div  class="day" v-for="(day, index) in weeks" :key="index" @click="handleDayClick(day)" :class="day.className">
        <span>{{day.date}} {{day.date == 1 ? monthShortName[day.month] : ''}}</span>
      </div>
      </div>
      <div class="todos">
        <div class="lines" v-for="(todos, index) in getWeekTodos(weeks[0])" :key="index">
          <template v-for="(todo, index) in todos">
            <div class="padding" v-for="i in (index == 0 ? todos[0].start : todos[index].start - todos[index - 1].end - 1 )" :key="index + i.toString()"></div>  
            <div @click="handleTodoClick(todo.id, $event)" class="todo" :class="computedClass(todo)" :style="{width: computedWidth(todo) - 10 + 'px'}" :key="index">
              {{todo.title}} {{todo.len}} {{todo.id}}
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getMonthDate, splitTodos } from '../utils/getDate'
import { checkInter } from '../utils/check'
import moment from 'moment'
import '../style/calendar.less'
export default {
  name: 'Calendar',
  props: {
    year: Number,
    month: Number,
    todos: Array
  },
  data() {
    return {
      date: [],
      weekName: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
      monthShortName: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
     
    } 
  },
  created() {
    this.getDate()
  },
  mounted() {
    console.log(this.year, this.month)
  },
  methods: {
    getDate() {
      this.date = getMonthDate(this.year, this.month)
      console.log(this.date)
    },
    getWeekTodos(firstDay) {
      let day = moment.unix(firstDay.timestamp)
      let startTime = day.unix()
      let endTime = day.add(7, 'day').unix()
      let thisWeekTodos = this.todos.filter((item) => checkInter(item.start, item.end, startTime, endTime)).map(item => {
        let isStart = item.start >= startTime
        let isEnd = item.end < endTime && item.end >= startTime
        let start = isStart ? moment.unix(item.start).day() : 0
        let end = isEnd ? moment.unix(item.end).day() : 6
        let len = end - start + 1
        return {
          start, end, len, isStart, isEnd,
          title: item.title,
          id: item.id,
          style: item.style
        }
      }).sort((a, b) => a.start - b.start)
      
      return splitTodos(thisWeekTodos)
    },
    computedClass(todo) {
      let className = []
      if (todo.isStart) className.push('todo-start')
      if (todo.isEnd) className.push('todo-end')
      className.push(todo.style)
      return className
    },
    computedWidth(todo) {
      return todo.len * 135 - 5 * todo.isStart - 5 * todo.isEnd
    },
    handleTodoClick(id, $event) {
      this.$emit('todoClick', id, $event)
    },
    handleDayClick(day) {
      this.$emit('dayClick', {
        date: day.date,
        month: day.month + 1
      })
    }
  },
  watch: {
    year() {
      this.getDate()
    },
    month() {
      this.getDate()
    }
  }
}
</script>

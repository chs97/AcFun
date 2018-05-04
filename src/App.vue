<template>
  <div id="app">
    <Month :month="month" @decMonth="decMonth" @incMonth="incMonth"/>
    <p class="year">{{year}}</p>
    <Calendar :year="year" :month="month" :todos="allTodo" @dayClick="handleDayClick" @todoClick="handleTodoClick" />
  </div>
</template>

<script>
import Calendar from './components/Calendar'
import Detail from './components/Detail'
import Month from './components/Month'
import Vue from 'vue'
import { getOffsetTop, getOffsetLeft, firstOfToday } from './utils/getDate'
import moment from 'moment'
import './style/global.less'
export default {
  name: 'App',
  components: {
    Calendar,
    Month
  },
  data() {
    return {
      year: 2018,
      month: 4,
      // arr: [11111, 22222, 33333, 44444, 5555],
      todos: [],
      // todos: [],
      contests: [],
      detailDOM: null
    }
  },
  computed: {
    allTodo() {
      return [].concat(this.todos, this.contests)
    }
  },
  mounted() {
    let self = this
    const fileName = firstOfToday() + '.json'
    const url = `	http://acfun-1251130357.cossh.myqcloud.com/${fileName}`
    fetch(url).then(res => {
      res.json().then(body => {
        console.log(body)
        self.contests = body
      })
    }).catch(err => {
      console.log(err)
    })
    const now = moment()
    this.year = now.year()
    this.month = now.month() + 1
    // setTimeout(() => self.year ++, 1000)
    document.addEventListener(
      'click',
      e => {
        if (self.detailDOM !== null) {
          self.detailDOM.displayDetail = false
        }
      },
      false
    )
  },
  methods: {
    decMonth() {
      if (this.month == 1) {
        this.year = this.year - 1
        this.month = 12
      } else {
        this.month = this.month - 1
      }
    },
    incMonth() {
      if (this.month == 12) {
        this.year = this.year + 1
        this.month = 1
      } else {
        this.month = this.month + 1
      }
    },
    dragStart(index, e) {
      console.log('start: ', index)
    },
    dropOver(e) {
      e.preventDefault()
    },
    dragEnter(index, e) {
      console.log('enter: ', index)
    },
    drop(index, e) {
      console.log('over: ', index)
    },
    dragEnd(index, e) {
      console.log('end: ', index)
    },
    handleDayClick(d) {
      console.log(d)
    },
    changeDetailPosition(left, top) {
      this.detailDOM.displayDetail = true
      this.detailDOM.top = top - 25
      this.detailDOM.left = left
    },
    handleTodoClick(id, $event) {
      console.log(id)
      let left = getOffsetLeft($event.target) + $event.target.clientWidth
      let top = getOffsetTop($event.target)
      if (this.detailDOM === null) {
        this.detailDOM = new Vue(Detail).$mount()
        document.body.appendChild(this.detailDOM.$el)
        this.detailDOM.displayDetail = true
      }
      this.changeDetailPosition(left, top)
      let findTodoById = this.allTodo.filter(i => i.id == id)
      this.detailDOM.todo = findTodoById[0]
      $event.stopPropagation()
    }
  },
  destroyed() {
    document.body.removeChild(this.detailDOM.$el)
  }
}
</script>

<style>
#app {
  /* font-family: 'Avenir', Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

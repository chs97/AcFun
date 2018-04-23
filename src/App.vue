<template>
  <div id="app">
    <Month :month="month" @decMonth="decMonth" @incMonth="incMonth"/>
    <p class="year">{{year}}</p>
    <Calendar :year="year" :month="month" :todos="todos" @dayClick="handleDayClick" @todoClick="handleTodoClick" />
  </div>
</template>

<script>
import Calendar from './components/Calendar'
import Detail from './components/Detail'
import Month from './components/Month'
import Vue from 'vue'
import { getOffsetTop, getOffsetLeft } from './utils/getDate'
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
      arr: [11111, 22222, 33333, 44444, 5555],
      todos: [
        {
          id: 1,
          start: 1524677700,
          end: 1524684900,
          title: 'Codeforces Round #47',
          style: 'green',
          notes: [{
            type: 'href',
            href: 'http://codeforces.com/contests',
            text: 'Register'
          }, {
            type: 'text',
            text: 'Codeforces Round #476 (Div. 2)'
          }]
        },
        {
          id: 2,
          start: 1524916800,
          end: 1524923400,
          title: 'AtCoder Grand Contes',
          style: 'blue'
        },
        {
          id: 3,
          start: 1522884800,
          end: 1522984800,
          title: 'Hello world - 2',
          style: 'yellow'
        },
        {
          id: 4,
          start: 1522684800,
          end: 1522984800,
          title: 'Hello world - 2',
          style: 'red'
        },
        {
          id: 5,
          start: 1522598400,
          end: 1522599800,
          title: 'Hello world - 1',
          style: 'yellow'
        },
        {
          id: 6,
          start: 1522598400,
          end: 1522599800,
          title: 'Hello world - 1',
          style: 'blue'
        },
        {
          id: 7,
          start: 1522598400,
          end: 1523167800,
          title: 'Hello world - 1',
          style: 'red'
        }
      ],
      // todos: [],
      contests: [],
      detailDOM: null
    }
  },
  mounted() {
    let self = this
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
      // console.log(id)
      let left = getOffsetLeft($event.target) + $event.target.clientWidth
      let top = getOffsetTop($event.target)
      if (this.detailDOM === null) {
        this.detailDOM = new Vue(Detail).$mount()
        document.body.appendChild(this.detailDOM.$el)
        this.detailDOM.displayDetail = true
      }
      this.changeDetailPosition(left, top)
      let findTodoById = this.todos.filter(i => i.id === id)
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

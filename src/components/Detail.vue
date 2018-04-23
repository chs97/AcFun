<template>
  <transition name="fade">
    <div class="todo-detail" :style="{'left': left + 'px', 'top': top + 'px'}" v-show="displayDetail" @click="handleClick">
      <p class="title">{{todo.title}}</p>
      <p class="time">
        <span>Start: </span>{{formatTime(todo.start)}}
      </p>
      <p class="length">
        <span>Length: </span>{{deltaTime()}}
      </p>
      <p class="note sub-title">
        Note
      </p>
      <p class="sub-contain">
        <a href="">Register</a>
        <a href="">Final standings</a>
      </p>
    </div>
  </transition>
</template>
<script>
import moment from 'moment'
import {prefixZero} from '../utils/getDate'
export default {
  name: 'Detail',
  props: {
    
  },
  data() {
    return {
      top: 0,
      left: 0,
      todo: {
        title: 'String',
        start: 0,
        end: 0
      },
      displayDetail: false
    }
  },
  create() {
    console.log(123)
  },
  methods: {
    handleClick(e) {
      e.stopPropagation()
    },
    formatTime(time) {
      let t = moment.unix(time)
      let format = t.year() !== moment().year() ? 'YYYY ' : ''
      format += 'MM-DD HH:mm:ss'
      return t.format(format)
    },
    deltaTime() {
      let det = this.todo.end - this.todo.start
      // console.log(det)
      let sec = det % 60
      det = (det - sec) / 60
      let min = det % 60
      let hour = (det - min) / 60
      return `${prefixZero(2, hour)}:${prefixZero(2, min)}:${prefixZero(2, sec)}`
    }
  }
}
</script>

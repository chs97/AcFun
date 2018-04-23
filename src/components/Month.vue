<template>
  <div class="month">
    <span class="left" @click="decMonth"> < </span>
    <span class="month-name">{{monthName[month - 1]}}</span>
    <span class="right" @click="incMonth">> </span>
  </div>
</template>
<script>
export default {
  name: 'Month',
  props: {
    month: Number
  },
  data() {
    return {
      monthName: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    }
  },
  methods: {
    decMonth() {
      this.$emit('decMonth')
    },
    incMonth() {
      this.$emit('incMonth')
    }
  }
}
</script>
<style lang="less">
.month {
  color: #454d57;
  font-size: 20px;
  line-height: 40px;
  font-weight: bold;
  .month-name {
    display: inline-block;
    width: 120px;
  }
  .left, .right {
    user-select: none;
    cursor: pointer;
  }
}
</style>

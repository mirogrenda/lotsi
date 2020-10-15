<template>
  <calculator/>
</template>

<script>
import Calculator from '@/components/Calculator.vue'

export default {
  name: 'App',
  components: { Calculator }
}
</script>

<style>
html {
  min-width: 200px;
  min-height: 200px;
}

body {
  margin: 0;
  padding: 30px;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 14px;
  line-height: 1;
  color: #fff;
  background-color: #182a54;
}
</style>

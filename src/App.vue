<template>
  <div id="app">
    <Navigation/>
    <router-view/>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation'

export default {
  components: {
    Navigation
  },
  beforeMount () {
    this.$store.dispatch('tabletop/getSheet')
  }
}
</script>

<style lang="scss">
    @import "@/scss/main.scss";
</style>

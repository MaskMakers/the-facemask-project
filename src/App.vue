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
  async beforeMount () {
    await this.$store.dispatch('tabletop/getSheet')

    // wait a few seconds to fetch all the data
    setTimeout(() => {
      document.dispatchEvent(new Event('x-app-rendered'))
    }, 2000)
  }
}
</script>

<style lang="scss">
    @import "@/scss/main.scss";
</style>

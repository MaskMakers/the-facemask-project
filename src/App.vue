<template>
  <div id="app">
    <Navigation/>
    <router-view/>
    <Social/>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation'
import Social from './components/Social'

export default {
  components: {
    Navigation,
    Social
  },
  async beforeMount () {
    await this.$store.dispatch('tabletop/getSheet')

    // wait a few seconds to all fetching all the data
    setTimeout(() => {
      document.dispatchEvent(new Event('x-app-rendered'))
    }, 2000)

    // if we still don't have sheet data after 9 seconds
    // fallback to cached data
    setTimeout(() => {
      this.$store.dispatch('tabletop/getFallbackData')
    }, 9000)
  }
}
</script>

<style lang="scss">
    @import "@/scss/main.scss";
</style>

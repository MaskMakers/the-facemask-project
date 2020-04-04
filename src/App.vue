<template>
  <div id="app">
    <Navigation/>
    <router-view/>
    <Footer/>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default {
  components: {
    Navigation,
    Footer
  },
  async beforeMount () {
    await this.$store.dispatch('tabletop/getSheet')

    // wait a few seconds to allow fetching all the data
    // before emitting the prerender hook
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

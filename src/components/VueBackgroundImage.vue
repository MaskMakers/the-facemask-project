<template>
<div class="vue-background-image">
  <div v-if="!loaded" :class="parentClass" :style="{ 'background-color': backgroundColor }">
    <slot />
  </div>
  <div v-else :class="parentClass" :style="{ 'background-image': `url(${source})` }">
    <slot />
  </div>
</div>
</template>

<script>
import variables from '../scss/shared/_variables.scss'

export default {
  props: {
    parentClass: {
      type: String,
      default: ''
    },
    backgroundColor: {
      type: String,
      default: variables.accent
    },
    source: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      loaded: false
    }
  },

  mounted () {
    if (this.source !== '') {
      let newImg = new Image()
      newImg.src = this.source

      newImg.onload = () => {
        this.loaded = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.vue-background-image {
  > div {
    height: 100%;
  }
}
</style>

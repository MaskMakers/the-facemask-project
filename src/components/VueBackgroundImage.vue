<template>
<div class="vue-background-image">
  <transition name="fade">
    <div v-if="!loaded" :class="parentClass" key="1" :style="{ 'background-color': backgroundColor }">
      <slot />
    </div>
    <div v-else :class="parentClass" key="2" :style="{ 'background-image': `url(${source})` }">
      <slot />
    </div>
  </transition>
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
  position: relative;
  overflow: hidden;
  width: 100%;

  > div {
    width: 100%;
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

.fade-leave-active {
  position: absolute;
}
</style>

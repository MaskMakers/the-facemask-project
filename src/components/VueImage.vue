<template>
<div class="vue-image">
  <transition name="fade">
    <img v-if="loaded" :src="source" />
    <svg
      v-else
      xmlns:svg="http://www.w3.org/2000/svg"
      xmlns="http://www.w3.org/2000/svg"
      viewbox="0 0 10 10"
      :width="width"
      :height="height"
      :style="{ 'background-color': backgroundColor }"
    ></svg>
  </transition>
</div>
</template>

<script>
export default {
  props: {
    backgroundColor: {
      type: String,
      default: `#efefef`
    },
    width: {
      type: Number,
      default: 200
    },
    height: {
      type: Number,
      default: 200
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
.vue-image {
  position: relative;

  svg, img {
    display: block;
    height: auto;
    width: 100%;
    max-width: 100%;
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

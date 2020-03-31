<template>
  <div class="button-wrapper">
    <div class="first">
      <span class="char" v-for="(char, index) in chars" :key="index">{{char}}</span>
    </div>
    <div class="second">
      <span class="char" v-for="(char, index) in chars" :key="index">{{char}}</span>
    </div>
  </div>
</template>

<script>
import { TimelineMax, Expo } from 'gsap'

export default {
  name: 'AnimationButton',
  props: {
    text: {
      type: String
    }
  },
  data () {
    return {
      chars: this.text.split(''),
      tl: null
    }
  },
  mounted () {
    let button = this.$el.parentNode
    let fChars = button.querySelectorAll('.first .char')
    let sChars = button.querySelectorAll('.second .char')

    // create animation timeline
    // TODO: Make the timing dynamic based on length of chars
    this.tl = new TimelineMax({ paused: true })
    this.tl
      .staggerTo(fChars, 0.13, { y: '-5px', opacity: 0 }, 0.03)
      .staggerTo(sChars, 0.3, { y: '0', opacity: 1, ease: Expo.easeOut }, 0.025, '-=0.35')

    // Play on mouse enter
    button.addEventListener('mouseenter', (e) => {
      this.tl.play()
    })

    button.addEventListener('mouseleave', (e) => {
      this.tl.pause(0)
    })
  }
}
</script>

<style lang="scss" scoped>
.button-wrapper {
  overflow: hidden;
}

.char {
  display: inline-block;
}

.second {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);

  .char {
    transform: translateY(18px);
    opacity: 0;
  }
}
</style>

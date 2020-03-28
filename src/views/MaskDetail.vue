<template>
  <div class="mask-detail-container basic-page-container">
    <h1>Make a {{ currentMask.name }}</h1>
    <p>{{ currentMask.description }}</p>
    <div class="steps-container">
      <div class="step" v-for="{ step, index } in steps" :key="index"></div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'MakeMask',
  components: {},
  computed: {
    ...mapState('tabletop', [
      'masks',
      'steps'
    ]),

    currentMask () {
      // console.log(this.$route.params.maskId)
      let current
      this.masks.forEach(el => {
        if (el.id === this.$route.params.maskId) {
          current = el
        }
      })
      return current
    }
  }
}
</script>

<style lang="scss" scoped>
.mask-detail-container {
  margin-top: 50px;
}
</style>

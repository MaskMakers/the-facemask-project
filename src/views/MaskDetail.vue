<template>
  <div class="mask-detail-container basic-page-container">
    <div v-if="currentMask">
      <h1>Make a {{ currentMask.name }}</h1>
      <p>{{ currentMask.description }}</p>
      <div class="steps">
        <div class="step" v-for="{ id, step, title, description, templateLink, image } in currentMaskSteps" :key="id">
          <vue-image
            :source='image'
            :width='500'
            :height='300'
          ></vue-image>
          <div class="copy">
            <h3 class="step">{{ step }}</h3>
            <h2 class="title">{{ title }}</h2>
            <p class="description" v-if="description">{{ description }}</p>
            <button v-if="templateLink">Download Template</button>
          </div>
        </div>
      </div>
    </div>
    <loading v-else />
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
      let current
      this.masks.forEach(el => {
        if (el.id === this.$route.params.maskId) {
          current = el
        }
      })

      return current
    },

    currentMaskSteps () {
      let steps = []
      this.steps.forEach(el => {
        if (el.id === this.$route.params.maskId) {
          steps.push(el)
        }
      })

      return steps
    }
  }
}
</script>

<style lang="scss" scoped>
.mask-detail-container {
  margin-top: 50px;
}

.steps {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 3%;
  padding-top: 1em;
  margin-top: 50px;

  @media screen and (max-width: $bp-m) {
    grid-template-columns: 1fr 1fr;
    grid-gap: 4%;
  }

  .step {
    text-align: left;

    a {
      color: $secondary-color;
    }

    .image {
      width: 100%;
      height: 300px;
      background-color: $gray-light;
    }

    .step {
      margin-bottom: 5px;
    }

    .title {
      margin-top: 0;
    }
  }
}
</style>

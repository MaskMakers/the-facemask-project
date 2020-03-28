<template>
  <div class="mask-detail-container basic-page-container">
    <div v-if="currentMask">
      <h1>Make {{ aOrAn }} {{ currentMask.name }}</h1>
      <p>{{ currentMask.description }}</p>
      <div class="steps">
        <div class="step" v-for="{ id, step, title, description, templateLink, image } in currentMaskSteps" :key="step">
          <vue-image
            :source='image'
            :width='500'
            :height='300'
          ></vue-image>
          <div class="copy">
            <h3 class="step">{{ step }}</h3>
            <h2 class="title">{{ title }}</h2>
            <p class="description" v-if="description">{{ description }}</p>
            <a class="button" v-if="templateLink" :href="templateLink" target="_blank">Download Template</a>
          </div>
        </div>
      </div>
      <router-link tag="button" to="/send-a-mask" @click.native="scrollToTop()">Send your mask to a facility</router-link>
    </div>
    <loading v-else />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { setMetaForMaskDetail } from '../helpers/meta/setMeta'

export default {
  name: 'MaskDetail',
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
    },

    aOrAn () {
      if (this.currentMask.name.toLowerCase().includes('accordion')) {
        return 'An'
      }

      return 'A'
    }
  },
  watch: {
    currentMask: {
      immediate: true,
      handler (mask) {
        setMetaForMaskDetail({
          title: `Make ${this.aOrAn} ${mask.name}`
        })
      }
    }
  },
  methods: {
    scrollToTop () {
      this.$nextTick(() => {
        window.scrollTo(0, 0)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.mask-detail-container {
  margin-top: 50px;

  /deep/ .loading-wrapper, .steps {
    margin-top: 50px;
  }

  .steps {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 3%;
    padding-top: 1em;
    margin-top: 50px;
    margin-bottom: 100px;

    @media screen and (max-width: $bp-m) {
      grid-template-columns: 1fr 1fr;
      grid-gap: 4%;
    }

    @media screen and (max-width: $bp-xs) {
      display: block;

      .step {
        margin-bottom: 3em;
      }
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
        margin-top: 1em;
        margin-bottom: 0.25em;
      }

      .title {
        margin-top: 0;
      }
    }
  }
}
</style>

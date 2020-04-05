<template>
  <div class="mask-detail-container basic-page-container">
    <div v-if="currentMask">
      <div class="header-grid">
      <div class="header-grid-image image-bg" :style="{backgroundImage: 'url(' + require(`@/assets/img/masks/${$route.params.maskId}-hero.jpg`)}"></div>
      <div class="header-grid-copy">
        <h1 class="typography-hero">{{ currentMask.name }}</h1>
        <h2>{{ currentMask.subtitle }}</h2>
        <div class="list">
          <div class="fabric list-item">
            <p class="list-title">Fabric:</p>
            <p class="list-description">{{currentMask.fabric}}</p>
          </div>
          <br>
          <div class="skill list-item">
            <p class="list-title">Skill Level:</p>
            <p class="list-description">{{currentMask.skill}}</p>
          </div>
          <br>
          <div class="time list-item">
            <p class="list-title">Estimated Time:</p>
            <p class="list-description">{{currentMask.time}}</p>
          </div>
          <br>
          <div class="seam list-item">
            <p class="list-title">Seam Allowance:</p>
            <p class="list-description">{{currentMask.seamAllowance}}</p>
          </div>
        </div>
        <div class="download-button">
            <a class="button accent-button" :href="'/assets/mask-templates/'" target="_blank" download>Download Template</a>
          </div>
      </div>
    </div>
    <div class="content-container">
      <div class="steps">
        <div class="step" v-for="({ id, step, title, description, templateLink, image }, index) in currentMaskSteps" :key="step">
          <div class="step-card">
            <vue-image
              :source='requireImage(step)'
              :width='500'
              :height='322'
              :background-color='variables.accent'
            ></vue-image>
            <div class="copy">
              <div class="copy-title">
                <h2 class="step-number">{{ step }}</h2>
                <p class="typography-featured title">{{ title }}</p>
              </div>
              <p class="description" v-if="description">{{ description }}</p>
            </div>
          </div>
          <div class="send-button" v-if="index == currentMaskSteps.length - 1">
            <router-link class="button accent-button" to="/send-a-mask">Send a mask</router-link>
          </div>
        </div>
      </div>
      <div class="fabrics card no-hover">
        <h2 class="typography-headline">Fabrics and Filters</h2>
        <p>Continue sewing around the corner and along the long side, stopping 2” before you reach your starting stitches.</p>
      </div>
    </div>
    </div>
    <loading v-else />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { setMetaForMaskDetail } from '../helpers/meta/setMeta'
import variables from '../scss/shared/_variables.scss'

export default {
  name: 'MaskDetail',
  components: {},
  data () {
    return {
      variables
    }
  },
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

      steps.push({
        description: '',
        id: this.$route.params.maskId,
        image: '',
        step: String(steps.length + 1),
        templateLink: '',
        title: 'Send Mask in!'
      })

      return steps
    },

    aOrAn () {
      if (this.currentMask.name.toLowerCase().startsWith('a')) {
        return 'An'
      }

      return 'A'
    }
  },
  watch: {
    currentMask: {
      immediate: true,
      handler (mask) {
        if (mask && mask.name) {
          setMetaForMaskDetail({
            title: `${mask.name}`,
            description: `Make ${this.aOrAn} ${mask.name}`
          })
        }
      }
    }
  },
  methods: {
    requireImage (step) {
      try {
        return require(`@/assets/img/steps/${this.$route.params.maskId}/step-` + step + `.jpg`)
      } catch {
        return ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.mask-detail-container {
  padding: 0;

  /deep/ .loading-wrapper, .steps {
    margin-top: 50px;
  }

  button, .button {
    &:hover, &.active {
      color: $white;
      background-color: $accent-color;
    }
  }

  .header-grid {
    @media screen and (max-width: $bp-m - 1) {
      display: block;
      margin-bottom: 60px;
    }
  }

  .header-grid-image {
    @media screen and (max-width: $bp-m - 1) {
      @include aspect-ratio(16, 9);
    }
  }

  .header-grid-copy {
    max-width: none;
    text-align: left;

    @media screen and (max-width: $bp-s) {
      padding-bottom: 0;
      padding-top: 40px;
      max-width: 80%;
    }

    h1 {
      text-transform: uppercase;
      line-height: 1;
      font-size: 55px;
      max-width: 7em;

      @media screen and (max-width: $bp-s) {
        font-size: 42px;
        line-height: 1.1;
      }
    }

    h2 {
      font-size: 1.6em;
      margin-top: -0.5em;
    }

    p {
      max-width: 400px;
      margin: 0 auto;
    }

    .list {
      margin-top: 30px;
    }

    .list-item {
      display: grid;
      grid-template-columns: 200px 1fr;
      text-align: left;

      @media screen and (max-width: $bp-s) {
        grid-template-columns: 1fr 1fr;
      }

      p {
        margin: 0;
        padding-left: 0;
      }

      .list-title {
        font-weight: bold;
      }
    }

    .download-button {
      margin-top: 40px;
    }
  }

  .steps {
    @include neumorphism(false);
    @include grid-2-column();
    padding: 90px;
    border-radius: 20px;
    margin: $space-l auto;

    @media screen and (max-width: $bp-s) {
      margin-bottom: 0;
      padding: 40px;
    }

    .step {
      text-align: left;

      .image {
        width: 100%;
        height: 300px;
        background-color: $gray-light;
      }

      .copy-title {
        display: flex;
        margin-top: $space-m;
      }

      .step-number {
        font-size: 72px;
        line-height: 1.05;
        margin-bottom: 0;
      }

      .title {
        margin: 0 0 0 10px;
        line-height: 1.25;
      }

      .gradient-bar {
        margin: 10px 0 13px;
      }

      .download-button, .send-button {
        margin: $space-m auto 0;
        text-align: center;

        a {
          width: 50%;
        }
      }
    }

    .step-place-holder {
      position: relative;

      @media screen and (max-width: $bp-s) {
        display: none;
      }

      /deep/ .vue-image {
        width: 200%;
        height: 100%;
      }
    }
  }

  .fabrics {
    max-width: 1000px;
    margin: 0 auto;
    padding: 90px;
    box-sizing: content-box;

    @media screen and (max-width: $bp-s) {
      margin-top: 60px;
      padding: 50px;
    }

    h2 {
      text-transform: uppercase;
    }
  }
}
</style>

<template>
  <div class="mask-detail-container basic-page-container">
    <div v-if="currentMask">
      <div class="header-grid">
      <div class="header-grid-image image-bg" :style="{backgroundImage: 'url(' + require(`@/assets/img/masks/${$route.params.maskId}-hero.jpg`)}"></div>
      <div class="header-grid-copy">
        <h1 class="typography-hero">{{ currentMask.name }}</h1>
        <div class="gradient-bar"></div>
        <p class="subtitle">{{ currentMask.description }}</p>
      </div>
    </div>
    <div class="content-container">
      <div class="steps">
        <div class="step" v-for="({ id, step, title, description, templateLink, image }, index) in currentMaskSteps" :key="step">
          <div class="step-card">
            <div class="copy">
              <div class="copy-title">
                <h2 class="step-number">{{ step }}</h2>
                <p class="typography-featured title">{{ title }}</p>
              </div>
              <div class="gradient-bar"></div>
              <p class="description" v-if="description">{{ description }}</p>
            </div>
            <vue-image
              :source='image'
              :width='500'
              :height='300'
              :background-color='variables.accent'
            ></vue-image>
          </div>
          <div class="download-button" v-if="templateLink">
            <a class="button" :href="'/assets/mask-templates/' + templateLink" target="_blank" download>Download Template</a>
          </div>
          <div class="send-button" v-if="index == currentMaskSteps.length - 1">
            <router-link class="button" to="/send-a-mask">Send a mask</router-link>
          </div>
        </div>
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
  }
}
</script>

<style lang="scss" scoped>
.mask-detail-container {
  padding: 0;

  /deep/ .loading-wrapper, .steps {
    margin-top: 50px;
  }

  .header-grid-image {
    @media screen and (max-width: $bp-s) {
      @include aspect-ratio(4, 3);
    }
  }

  .header-grid-copy {
    max-width: none;

    @media screen and (max-width: $bp-s) {
      padding-bottom: 0;
      max-width: 80%;
    }

    h1 {
      text-transform: uppercase;

      @media screen and (max-width: $bp-s) {
        font-size: 42px;
      }
    }

    p {
      max-width: 400px;
      margin: 0 auto;
    }

    .gradient-bar {
      margin: 30px auto 20px;
    }
  }

  .steps {
    @include neumorphism(false);
    @include grid-2-column();
    padding: 45px 90px;
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
        align-items: center;
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
}
</style>

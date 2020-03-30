<template>
  <div class="mask-detail-container basic-page-container">
    <div v-if="currentMask">
      <div class="header-grid">
      <div class="mask-header-image">
        <vue-image
          :source='image'
          :width='500'
          :height='500'
        ></vue-image>
      </div>
      <div>
        <h1>{{ currentMask.name }}</h1>
        <div class="gradient-bar"></div>
        <br>
        <p>{{ currentMask.description }}</p>
      </div>
    </div>
      <div class="steps">
        <div class="step" v-for="({ id, step, title, description, templateLink, image }, index) in currentMaskSteps" :key="step">
          <div class="step-card">
            <div class="copy">
              <div class="copy-title">
                <h2 class="step-number">{{ step }}</h2>
                <p class="title">{{ title }}</p>
              </div>
              <div class="gradient-bar"></div>
              <br>
              <p class="description" v-if="description">{{ description }}</p>
            </div>
            <vue-image
              :source='image'
              :width='500'
              :height='300'
            ></vue-image>
          </div>
          <div class="download-button" v-if="templateLink">
            <a class="button" :href="'/assets/mask-templates/' + templateLink" target="_blank" download>Download Template</a>
          </div>
          <div class="send-button" v-if="index == currentMaskSteps.length - 1">
            <router-link class="button" to="/send-a-mask">Send a mask</router-link>
          </div>
        </div>
        <div class="step step-place-holder" v-if="currentMaskSteps.length % 2">
          <div class="image-container"></div>
        </div>
      </div>
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
        setMetaForMaskDetail({
          title: `Make ${this.aOrAn} ${mask.name}`
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.mask-detail-container {
  margin-top: 50px;
  overflow: hidden;

  /deep/ .loading-wrapper, .steps {
    margin-top: 50px;
  }

  .steps {
    @include grid-2-column();
    margin: $space-l auto;

    @media screen and (max-width: $bp-s) {
      margin-bottom: 0;
      padding-bottom: 20px;
    }

    .step {
      text-align: left;

      .step-card {
        @include neumorphism(false);
        padding: 24px;
        box-sizing: border-box;
        border-radius: 24px;
      }

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
        font-size: $base-large * 3;
        line-height: 0;
      }

      .title {
        margin-top: 0;
        margin-left: $space-s;
        width: 125px;
      }

      .gradient-bar {
        width: 75%;
      }

      .download-button, .send-button {
        margin: $space-m auto 0;
        text-align: center;
      }
    }

    .step-place-holder {
      position: relative;

      @media screen and (max-width: $bp-s) {
        display: none;
      }

      .image-container {
        position: absolute;
        left: 0;
        top: 0;
        width: 200%;
        height: 100%;
        background: $accent-color;
      }
    }
  }
}
</style>

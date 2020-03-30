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
        <div class="step" v-for="{ id, step, title, description, templateLink, image } in currentMaskSteps" :key="step">
          <div class="card">
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
            <a class="button" :href="templateLink" target="_blank" download>Download Template</a>
          </div>
        </div>
      </div>
      <router-link tag="button" to="/send-a-mask">Send your mask to a facility</router-link>
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

  /deep/ .loading-wrapper, .steps {
    margin-top: 50px;
  }

  .steps {
    @include grid-2-column();
    padding-top: $space-s;
    margin: 50px auto 200px;

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

      .download-button {
        margin: $space-m auto 0;
        text-align: center;
      }
    }
  }
}
</style>

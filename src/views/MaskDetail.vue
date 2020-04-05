<template>
  <div class="mask-detail-container basic-page-container">
    <div v-if="currentMask">
      <div class="header-grid">
      <vue-background-image parent-class="header-grid-image image-bg" :source="require(`@/assets/img/masks/${$route.params.maskId}-hero.jpg`)">
      </vue-background-image>
      <div class="header-grid-copy">
        <h1 class="typography-hero">{{ currentMask.name }}</h1>
        <h2>{{ currentMask.subtitle }}</h2>
        <div class="list">
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
          <br>
          <div class="fabric list-item">
            <p class="list-title">Fabric:</p>
            <p class="list-description">{{currentMask.fabric}}</p>
          </div>
        </div>
        <div class="download-button">
            <a class="button accent-button" :href="`/pdf/${currentMask.template}`" target="_blank" download>Download Template</a>
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
        <h2 class="typography-headline">Fabrics & Filters</h2>
        <p>Here’s the deal, we’re not trying to be prescriptive—we want you to use what is readily at-hand, easy, and available. There may be a few materials that you have lying around that you didn’t know are great to repurpose for masks, and that’s where we come in…</p>
        <div class="fabric-item">
          <h2>EFFECTIVE FABRICS</h2>
          <h3>Materials To Use</h3>
          <p>Woven cotton, cotton/polyester blends, silk, flannel, quilter’s cotton, unused mechanic/car shop towels, non-woven polypropylene (NWPP) and linen. Think—dish towels, T-Shirts, pillow cases, sheets, and scarves.</p>
          <p>Pro Tip: You’re going to want to use two layers (four is even better) of these materials to make your masks truly effective.</p>
          <p>Why these materials? They’re breathable, accessible, and easy to work with! Breathability is key. If you can't breath well through the mask you are more likely to adjust it.</p>
          <h3>Materials NOT too use</h3>
          <p>Synthetics, polyester, spandex - These are bad ideas because the virus can survive on those surfaces for a long period of time.</p>
        </div>
        <div class="fabric-item">
          <h2>EFFECTIVE FILTERS</h2>
          <h3>Materials To Use</h3>
          <p>(MUST be sandwiched between fabric for safety)</p>
          <p>Coffee filters, A 1900+ furnace filter (2 layers), tyvek, vacuum cleaner bag, non-woven polypropylene (NWPP), unused mechanic/car shop towels</p>
          <h3>Materials NOT too use</h3>
          <p>HEPA filters have glass particulate that you DO NOT want to be breathing.</p>
        </div>
        <div class="fabric-item">
          <h2>Cleaning & Care</h2>
          <ul>
            <li>Wash hands for 20 seconds (yeah, yeah—hum Happy Birthday twice) with soap and water before touching or putting on a mask.</li>
            <li>If wearing the mask, DO NOT fidget, touch, or adjust it.</li>
            <li>Remove the mask at the back, DO NOT touch the front.</li>
            <li>Wash your hands for 20 seconds after you remove the mask</li>
            <li>Discard filter and wash masks daily and before wearing again. Use color safe bleach or boil for 20 minutes.</li>
          </ul>
        </div>
        <div class="fabric-item">
          <h2>KEEP IN MIND</h2>
          <p>Wearing a mask does not mean you do not have to practice other recommended activities: stay at home unless going out for essentials/exercise, avoid groups, maintain social distance of 6+ feet from people, wash your hands, do not touch your face.</p>
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

export default {
  name: 'MaskDetail',
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
        title: 'Package the masks, be sure to include the note that is in the pdf, and send to a hospital in need.'
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

  /deep/ .header-grid-image {
    @media screen and (max-width: $bp-m - 1) {
      @include aspect-ratio(16, 9);
    }
  }

  .header-grid-copy {
    max-width: none;
    text-align: left;

    @media screen and (max-width: $bp-m) {
      max-width: 600px;
      margin: 0 auto;
    }

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
      padding: 30px;
      grid-gap: $space-xl;
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

        @media screen and (max-width: $bp-s) {
          margin-top: $space-s;
        }
      }

      .step-number {
        font-size: 72px;
        line-height: 1.05;
        margin-bottom: 0;

        @media screen and (max-width: $bp-s) {
          font-size: 50px;
          line-height: .95;
        }
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
    text-align: left;

    @media screen and (max-width: $bp-s) {
      margin-top: 60px;
      padding: 50px;
    }

    .typography-headline {
      margin-bottom: 0;
      font-size: 34px;
    }

    h2 {
      text-transform: uppercase;
    }

    h3 {
      font-size: 22px;
      margin-bottom: 0;
    }

    p {
      max-width: 900px;
    }

    ul {
      padding-left: 1.4em;

      li {
        font-size: 20px;
      }
    }
  }

  .fabric-item {
    margin: 70px 0 0;
  }
}
</style>

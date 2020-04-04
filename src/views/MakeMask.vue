<template>
  <div class="make-a-mask-container basic-page-container">
    <div class="header-grid">
      <div class="header-grid-image image-bg" :style="{backgroundImage: 'url(' + require('@/assets/img/masks-pattern.jpg')}">
        <h1 class="typography-hero">Make <br>A <br>Mask</h1>
      </div>
      <div class="header-grid-copy">
        <h2 class="typography-headline">Choose a mask template</h2>
        <p class="typography-featured">The template you choose will be dependant on who you are making them for and what materials you have available.</p>
        <div class="gradient-bar"></div>
      </div>
    </div>
      <div class="content-container" v-if="masks.length > 0">
        <div class="masks">
          <div class="mask card" v-for="{ id, name, subtitle, description } in masks" :key="id">
            <router-link :to="'/mask/' + id">
              <div class="copy-container">
                <h3 class="typography-headline name">{{name}}</h3>
                <p class="typography-featured subtitle">{{ subtitle }}</p>
                <div class="gradient-bar"></div>
                <p class="typography-featured description">{{ description }}</p>
              </div>
              <vue-image
                :background-color="variables.accent"
                :source="require(`@/assets/img/masks/${id}-default.jpg`)"
              ></vue-image>
            </router-link>
          </div>
        </div>
    </div>
    <loading v-else />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import variables from '../scss/shared/_variables.scss'

export default {
  name: 'MakeMask',
  components: {},
  computed: {
    ...mapState('tabletop', [
      'masks'
    ])
  },
  data () {
    return {
      variables
    }
  }
}
</script>

<style lang="scss" scoped>
.make-a-mask-container {
  padding: 0;

  /deep/ .loading-wrapper {
    padding-top: $space-m;
  }

  .header-grid-copy {
    @media screen and (max-width: $bp-s) {
      padding-bottom: 0;
    }

    .typography-headline {
      @media screen and (max-width: $bp-s) {
        margin-bottom: 10px;
      }
    }

    .gradient-bar {
      margin-top: 60px;

      @media screen and (max-width: $bp-s) {
        display: none;
      }
    }
  }

  .masks {
    @include grid-2-column();
    grid-gap: 100px;
    padding-top: $space-s;
    margin: 50px auto 100px;
  }

  .mask {
    text-align: left;
    color: $text-color;

    a {
      color: $text-color;
    }

    .subtitle {
      font-family: $sans-serif-bold;
    }
  }

  .name {
    margin: 0;
  }

  .subtitle {
    margin-top: 0;
  }

  .gradient-bar {
    width: 75%;
  }
}
</style>

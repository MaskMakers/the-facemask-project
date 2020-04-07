<template>
  <div class="make-a-mask-container basic-page-container">
    <div class="header-grid">
      <vue-background-image parent-class="header-grid-image image-bg" :source="require('@/assets/img/masks-selection.jpg')">
        <h1 class="typography-hero">Make <br>A <br>Mask</h1>
      </vue-background-image>
      <div class="header-grid-copy">
        <h2 class="typography-headline">PICK A TEMPLATE<br>& GET SEWING</h2>
        <p class="typography-featured">
          Consider your skill level, what materials you have available and who you’re making a mask for.
          Since some facilities request specific mask designs, you may want to <router-link class="hover strong" to="/send-a-mask">choose your hospital</router-link> first.
          </p>
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
                <div class="typography-featured description" v-html="description"></div>
              </div>
              <vue-image
                :source="require(`@/assets/img/masks/${id}-default.jpg`)"
                :width='500'
                :height='335'
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

export default {
  name: 'MakeMask',
  components: {},
  computed: {
    ...mapState('firebase', [
      'masks'
    ])
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
      line-height: 1.1;

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
      display: flex;
      flex-flow: column;
      justify-content: space-between;
      height: 100%;
      color: $text-color;
    }

    .subtitle {
      font-family: $sans-serif-bold;
      margin-bottom: 0;
    }

    .name, .subtitle {
      transition: color 0.3s;
    }

    .gradient-bar {
      margin: 20px 0 18px;

      @media screen and (max-width: $bp-s) {
        margin: 12px 0 10px;
      }
    }

    &:hover {
      .name, .subtitle {
        color: $accent-color;
      }
    }
  }

  .name {
    margin: 0;
    line-height: 0.9;
  }

  .subtitle {
    margin-top: 0;
  }

  .gradient-bar {
    width: 75%;
  }

  .description {
    padding-left: 1em;
    margin-bottom: 1em;
    font-size: 18px;
  }
}
</style>

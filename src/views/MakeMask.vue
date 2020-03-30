<template>
  <div class="make-a-mask-container basic-page-container">
    <div class="header-grid">
      <div class="mask-header-image">
        <vue-image
          :source='image'
          :width='500'
          :height='500'
        ></vue-image>
        <h1>Make <br> A Mask</h1>
      </div>
      <div>
        <h2>Choose a mask template</h2>
        <p>
          The template you choose will be dependant on who you are making
          them for and what materials you have available.
        </p>
        <br>
        <div class="gradient-bar"></div>
      </div>
    </div>
      <div v-if="masks.length > 0">
        <div class="masks">
          <div class="mask card" v-for="{ id, name, subtitle, description } in masks" :key="id">
            <router-link :to="'/mask/' + id">
              <div class="copy">
                <h3 class="name">{{name}}</h3>
                <p class="subtitle">{{ subtitle }}</p>
                <div class="gradient-bar"></div>
                <br>
                <p class="subtitle description">{{ description }}</p>
                <vue-image
                  :width='500'
                  :height='500'
                ></vue-image>
              </div>
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
    ...mapState('tabletop', [
      'masks'
    ])
  }
}
</script>

<style lang="scss" scoped>
.make-a-mask-container {
  margin: 50px auto 100px;

  /deep/ .loading-wrapper {
    padding-top: $space-m;
  }

  .masks {
    @include grid-2-column();
    padding-top: $space-s;
    margin: 50px auto 200px;
  }

  .mask {
    text-align: left;

    a {
      color: $text-color;
    }
  }

  .name {
    margin-bottom: 0.25em;
  }

  .subtitle {
    margin-top: 0;
  }

  .gradient-bar {
    width: 75%;
  }
}
</style>

<template>
  <div class="make-a-mask-container basic-page-container">
      <h1>Make A Mask</h1>
      <h2>Choose A Mask Template</h2>
      <p>The template you choose will be dependant on who you are making them for and what materials you have available.</p>
      <div v-if="masks.length > 0">
        <div class="masks">
          <div class="mask card" v-for="{ id, name, subtitle, description } in masks" :key="id">
            <router-link :to="'/mask/' + id">
              <vue-image
                :width='500'
                :height='300'
              ></vue-image>
              <div class="copy">
                <h3 class="name">{{name}}</h3>
                <p class="subtitle">{{ subtitle }}</p>
                <div class="gradient-bar"></div>
                <p class="subtitle description">{{ description }}</p>
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
    padding-top: 2em;
  }

  .masks {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 10%;
    padding-top: 1em;
    max-width: 1000px;
    margin: 50px auto 200px;

    @media screen and (max-width: $bp-s) {
      grid-template-columns: 1fr;
      grid-gap: 2em;
    }
  }

  .mask {
    text-align: left;

    a {
      color: $text-color;
    }
  }

  .name {
    margin-top: 1em;
    margin-bottom: 0.25em;
  }

  .subtitle {
    margin-top: 0;
  }
}
</style>

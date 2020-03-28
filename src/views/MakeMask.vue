<template>
  <div class="make-a-mask-container basic-page-container">
      <h1>Make A Mask</h1>
      <h2>Choose A Mask Template</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      <div v-if="masks.length > 0">
        <div class="masks">
          <div class="mask" v-for="{ id, name, subtitle, description } in masks" :key="id">
            <router-link :to="'/mask/' + id">
              <vue-image
                :source='image'
                :width='500'
                :height='500'
              ></vue-image>
              <div class="copy">
                <h3 class="name">{{name}}</h3>
                <p class="subtitle">{{ subtitle }}</p>
                <p class="description">{{ description }}</p>
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
}

.masks {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 3%;
  padding-top: 1em;
  margin-top: 50px;

  @media screen and (max-width: $bp-m) {
    grid-template-columns: 1fr 1fr;
    grid-gap: 4%;
  }
}

.mask {
  text-align: left;

  a {
    color: $secondary-color;
  }
}

.image {
  width: 100%;
  height: 300px;
  background-color: $gray-light;
}

.name {
  margin-bottom: 5px;
}

.subtitle {
  margin-top: 0;
}
</style>

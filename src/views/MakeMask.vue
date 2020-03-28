<template>
  <div class="masks-container basic-page-container">
    <h1>Make A Mask</h1>
    <h2>Choose A Mask Template</h2>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
    <div class="masks">
      <div class="mask" v-for="{ id, name, subtitle, description, steps } in masks" :key="id">
        <p>{{ id }}</p>
        <p>{{ name }}</p>
        <p>{{ subtitle }}</p>
        <p>{{ description }}</p>
        <p>{{ steps }} step(s)</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'MakeMask',
  components: {},
  computed: {
    ...mapState('tabletop', [
      'masks',
      'steps'
    ])
  }
}
</script>

<style lang="scss" scoped>
.masks-container {
  margin-top: 50px;
}

.masks {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 5%;
  padding-top: 1em;
}

.mask {
  background: $gray;
  padding: 1em;
}
</style>

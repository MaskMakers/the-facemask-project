<template>
  <nav class="navigation">
    <div class="logo-container">
      <router-link to="/">
        <img :src="require('@/assets/img/facemask-logo.png')" alt="The Facemask Project logo">
      </router-link>
    </div>
    <div class="links-container">
      <router-link to="/make-a-mask" class="button button-small">Make A Mask</router-link>
      <router-link to="/send-a-mask" class="button button-small">Send A Mask</router-link>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navigation',
  props: {}
}
</script>

<style lang="scss" scoped>
.navigation {
  padding: 0.75em 1.25em;
  display: flex;
  justify-content: space-between;
  @include neumorphism(false);

  .logo-container {
    max-width: 140px;

    img {
      display: inline-block;
      width: 60px;
      margin: -0.25em 0 -0.5em;
    }
  }

  .links-container {
    display: flex;
    align-items: center;

    a {
      margin: 0.25em 0 0.25em $space-s;
      color: $text-color;
      position: relative;
      line-height: 1.1;

      &.router-link-exact-active {
        color: $secondary-color;
      }

      &:hover, &.router-link-exact-active {
        color: $accent-color;
      }
    }
  }
}
</style>

<template>
  <nav class="navigation">
    <div class="logo-container">
      <router-link to="/">
        <img :src="require('@/assets/img/mask-makers-logo.svg')" alt="The Facemask Project logo">
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
    a {
      display: block;
    }

    img {
      width: 150px;

      @media screen and (max-width: $bp-s) {
        width: 120px;
      }
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

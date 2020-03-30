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
  padding: 20px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid $gray;

  .logo-container {
    max-width: 140px;

    img {
      width: 100%;
    }
  }

  .links-container {
    display: flex;
    align-items: center;

    a {
      margin: 6px 0 6px 18px;
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

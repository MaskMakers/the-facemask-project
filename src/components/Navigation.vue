<template>
  <nav class="navigation">
    <div class="logo-container">
      <router-link to="/">
        <img :src="require('@/assets/img/facemask-project-logo.png')" alt="The Facemask Project logo">
      </router-link>
    </div>
    <div class="links-container">
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navigation',
  props: {}
}
</script>

<template>
  <div class="home-container basic-page-container">
    <h1 class="visuallyhidden">The Facemask Project</h1>
    <h2>Make a facemask at home. Send it to a hospital that&nbsp;needs&nbsp;one.</h2>
    <div class="hero-links-container">
      <router-link to="/make-a-mask" class="hero-link">
        <div class="image"></div>
        <h2 class="link-text">MAKE A MASK</h2>
      </router-link>
      <router-link to="/send-a-mask" class="hero-link">
        <div class="image"></div>
        <h2 class="link-text">SEND A MASK</h2>
      </router-link>
    </div>
    <div class="featured-info">
      <p>The Facemask Project is a grassroots way of helping to protect the medical staffs in our communities through the COVID-19 pandemic, by encouraging ordinary citizens under quarantine (and with a sewing machine) to become heroes of the pandemic!</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {},
  mounted () {

  },
  methods: {}
}
</script>

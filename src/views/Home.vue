<template>
  <div class="home-container basic-page-container">
    <h1 class="visuallyhidden">The Facemask Project</h1>
    <h2>Make a facemask at home. Send it to a hospital that&nbsp;needs&nbsp;one.</h2>
    <div class="hero-links-container">
      <router-link to="/sewing-page" class="hero-link">
        <div class="image"></div>
        <div class="link-text">I AM QUARANTINED AND I HAVE A SEWING&nbsp;MACHINE!</div>
      </router-link>
      <router-link to="/hospital-list" class="hero-link">
        <div class="image"></div>
        <div class="link-text">I WORK IN A HOSPITAL AND DON’T HAVE A&nbsp;FACEMASK!</div>
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

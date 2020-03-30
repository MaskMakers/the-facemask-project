<template>
  <div class="home-container basic-page-container">
    <h1 class="visuallyhidden">Mask Makers</h1>
    <h2>
      Make a facemask at home.
      <br>
      Send it to a hospital that needs one
    </h2>
    <div class="hero-links-container">
      <router-link to="/make-a-mask" class="hero-link card">
        <div class="image"></div>
        <h2 class="link-text">MAKE A MASK</h2>
      </router-link>
      <router-link to="/send-a-mask" class="hero-link card">
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

<style lang="scss" scoped>
.home-container {
  margin: 50px auto 0;

  .hero-links-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 100px;
    max-width: 900px;
    margin: 0 auto;
    padding: 50px 0 100px;

    @media screen and (max-width: $bp-m) {
      grid-gap: 40px;
    }

    @media screen and (max-width: $bp-s) {
      display: block;
      padding-bottom: 50px;
    }
  }

  .hero-link {
    min-height: 240px;
    text-decoration: none;
    font-weight: 700;
    padding: 30px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;

    @media screen and (max-width: $bp-s) {
      display: block;
      min-height: auto;
      margin-bottom: 20px;
    }

    .image {
      width: 60px;
      height: 60px;
      border: 5px solid $gray-dark;
      border-radius: 10px;
      margin: 0 auto;
      display: none;
    }

    .link-text {
      margin-bottom: 0;
    }
  }

  .featured-info {
    padding: 100px 0;
    border-top: 1px solid $gray;

    @media screen and (max-width: $bp-s) {
      padding: 50px 0;
    }

    p {
      max-width: 700px;
      margin: 0 auto;
    }
  }
}
</style>

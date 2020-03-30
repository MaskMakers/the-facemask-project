<template>
  <div class="home-container basic-page-container">
    <h1 class="visuallyhidden">Mask Makers</h1>
    <h2>
      Make a mask at home.
      <br>
      Send it to a hospital that needs one.
    </h2>
    <div class="hero-links-container">
      <router-link to="/make-a-mask" class="hero-link card">
        <div class="image"></div>
        <h2 class="link-text">
          Make
          <div class="gradient-bar"></div>
          A Mask
        </h2>
      </router-link>
      <router-link to="/send-a-mask" class="hero-link card">
        <div class="image"></div>
        <h2 class="link-text">
          Send
          <div class="gradient-bar"></div>
          A Mask
        </h2>
      </router-link>
    </div>
    <div class="about-container">
      <div class="about">
        <div class="featured-info">
          <div class="gradient-bar"></div>
          <br>
          <p>The Facemask Project is a grassroots way of helping to protect the medical staffs in our communities through the COVID-19 pandemic, by encouraging ordinary citizens under quarantine (and with a sewing machine) to become heroes of the pandemic!</p>
        </div>
        <vue-image
          :width="1000"
          :height="500"
          :background-color="variables.accent"
        ></vue-image>
      </div>
    </div>
    <div class="featured-info quote">
      <h2>
        “I have good news, Its all going to get better<br>
        And its all going to get worse<br>
        And its up to us to make the worse parts better.”
      </h2>
      <span>John Maeda</span>
    </div>
  </div>
</template>

<script>
import variables from '../scss/shared/_variables.scss'

export default {
  name: 'Home',
  mounted () {},
  data () {
    return {
      variables
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.home-container {
  margin: $space-m auto 0;

  .hero-links-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 100px;
    max-width: 900px;
    margin: 0 auto;
    padding: $space-s 0 $space-l;

    @media screen and (max-width: $bp-m) {
      grid-gap: $space-m;
    }

    @media screen and (max-width: $bp-s) {
      display: block;
      padding-bottom: $space-m;
    }
  }

  .hero-link {
    min-height: 240px;
    text-decoration: none;
    font-weight: 700;
    padding: $space-m;
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
      font-size: $header-large;
      text-align: left;

      @media screen and (max-width: $bp-s) {
        font-size: 3em;
        line-height: 1.1;
      }

      .gradient-bar {
        max-width: 205px;
      }
    }
  }

  .about-container {
    overflow: hidden;

    .about {
      @include grid-2-column();
      align-items: center;
    }
  }

  .featured-info {
    padding: $space-l 0;

    &.quote {
      max-width: 700px;
      margin: 0 auto;
      padding-bottom: 0;

      span {
        font-weight: bold;
        font-size: $base-small;
      }

      @media(max-width: $bp-s) {
        br {
          display: none;
        }
      }
    }

    .gradient-bar {
      width: 100px;
      margin: 0 auto;
    }

    p {
      max-width: 700px;
      margin: 0 auto;
    }
  }

  /deep/ .vue-image {
    @media(min-width: $bp-s + 1) {
      width: 200%;
      max-width: 200%;
      margin-right: -100%;
    }
  }
}
</style>

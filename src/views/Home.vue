<template>
  <div class="home-container basic-page-container">
    <h1 class="visuallyhidden">Mask Makers</h1>
    <h2 class="typography-headline">
      Make a mask at home.
      <br>
      Send it to a hospital that needs one.
    </h2>
    <div class="hero-links-container">
      <router-link to="/make-a-mask" class="hero-link card">
        <h2 class="link-text typography-hero-cta">Make A Mask</h2>
        <img src="~@/assets/img/icon-sewing-fpo.png" alt="Sewing Machine">
      </router-link>
      <router-link to="/send-a-mask" class="hero-link card">
        <h2 class="link-text typography-hero-cta">Send A Mask</h2>
        <img src="~@/assets/img/icon-sewing-fpo.png" alt="Sewing Machine">
      </router-link>
    </div>
    <div class="about-container">
      <div class="about">
        <div class="featured-info">
          <div class="gradient-bar"></div>
          <br>
          <p>{{decoder(mission)}}</p>
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
import decoder from '../helpers/decoder.js'

export default {
  name: 'Home',
  mounted () {},
  data () {
    return {
      variables,
      decoder,
      mission: 'The Facemask Project is a grassroots way of helping to protect the medical staffs in our communities through the COVID-19 pandemic, by encouraging ordinary citizens under quarantine (and with a sewing machine) to become heroes of&nbsp;the&nbsp;pandemic!'
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.home-container {
  margin: $space-m auto 0;

  .typography-headline {
    margin: 46px 0;
  }

  .hero-links-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 100px;
    max-width: 900px;
    margin: 0 auto 96px;

    @media screen and (max-width: $bp-m) {
      grid-gap: $space-m;
    }

    @media screen and (max-width: $bp-s) {
      display: block;
      padding-bottom: $space-m;
    }
  }

  .hero-link {
    padding: $space-xl $space-s 5em;
    box-sizing: border-box;
    text-align: center;
    display: block;

    @media screen and (max-width: $bp-s) {
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
      text-transform: uppercase;
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

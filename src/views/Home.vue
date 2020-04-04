<template>
  <div class="home-container basic-page-container">
    <h1 class="visuallyhidden">Mask Makers</h1>
    <div class="hero-copy">
      <h2 class="typography-headline home-headline">
        Make a mask at home.
        <br>
        Send it to a hospital that needs one.
      </h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sed consequat sapien, vel interdum sapien. Duis tristique nunc nec nisl aliquam finibus. Fusce lorem nibh, varius eu tincidunt in, rutrum eu nulla. Suspendisse in tincidunt metus, eu dapibus turpis. Aenean eu tincidunt dolor, nec cursus ligula. </p>
    </div>
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
          <p class="typography-base">{{decoder(mission)}}</p>
          <div class="gradient-bar"></div>
        </div>
        <div class="image-bg" :style="{backgroundImage: 'url(' + require('@/assets/img/masks-pattern.jpg')}">
          <h2 class="typography-hero">Everyday Heroes<br> Helping <br>Everyday Heroes</h2>
        </div>
      </div>
    </div>
    <div class="quote-container">
      <h2 class="typography-headline featured-quote">“I have good news, Its all going to get better and its all going to get worse and its up to us to make the worse parts better.”</h2>
      <span class="typography-action-small">John Maeda</span>
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
  padding: 0;
  margin: $space-m auto 0;

  .home-headline, .quote-container, .hero-links-container {
    @media screen and (max-width: $bp-m) {
      padding: 0 $space-l;
    }

    @media screen and (max-width: $bp-m) {
      padding: 0 $space-m;
    }
  }

  .hero-copy {
    max-width: 800px;
    width: 100%;
    margin: 50px auto;

    @media screen and (max-width: $bp-s) {
      margin: 40px auto;

      br { display: none }
    }
  }

  .gradient-bar {
    margin: 40px auto 0;

    @media screen and (max-width: $bp-s) {
      margin-top: 30px;
    }
  }

  .home-headline {
    @media screen and (max-width: $bp-s) {
      br { display: none }
    }
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
    }
  }

  .hero-link {
    padding: $space-xl $space-s 5em;
    box-sizing: border-box;
    text-align: center;
    display: block;

    @media screen and (max-width: $bp-s) {
      padding: $space-m $space-s 5em;

      &:not(:last-of-type) {
        margin-bottom: 40px;
      }
    }

    .link-text {
      text-transform: uppercase;
    }
  }

  .about {
    display: grid;
    grid-template-columns: 50% 50%;
    align-items: center;
    margin-bottom: 80px;

    @media screen and (max-width: $bp-s) {
      display: flex;
      flex-direction: column-reverse;
    }
  }

  .image-bg {
    padding: 118px $space-l;

    @media screen and (max-width: $bp-s) {
      width: 100%;
      padding: 100px $space-m;
      margin-bottom: 120px;
    }

    h2 {
      color: $white;
      text-transform: uppercase;
    }
  }

  .featured-info {
    max-width: 400px;
    margin: 0 auto;
    padding: 0 $space-l;
  }

  .quote-container {
    max-width: 587px;
    margin: 0 auto;

    span {
      font-weight: bold;
    }
  }

  .featured-quote {
    color: $accent-color;
    margin-bottom: 18px;
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

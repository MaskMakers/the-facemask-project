<template>
  <div class="home-container basic-page-container">
    <h1 class="visuallyhidden">Mask Makers</h1>
    <div class="hero-copy">
      <h2 class="typography-headline home-headline">
        {{decoder(heroOne)}}
        <br>
        {{decoder(heroTwo)}}
      </h2>
      <p>
        Mask Maskers is a group of volunteers working to connect<br>
        {{decoder(heroCopy)}}
      </p>
    </div>
    <div class="hero-links-container">
      <router-link to="/make-a-mask" class="hero-link card">
        <h2 class="link-text typography-hero-cta">
          Make A <span>Mask<arrow-icon /></span>
        </h2>
        <p>Choose a template based on your skill level and materials you have at home.</p>
        <img  class="arrow" src="~@/assets/img/icon-sewing.gif" alt="Sewing Machine Animated Icon">
      </router-link>
      <router-link to="/send-a-mask" class="hero-link card">
        <h2 class="link-text typography-hero-cta">
          Send A <span>Mask<arrow-icon /></span>
        </h2>
        <p>Choose a hospital that needs the type of mask that you’ve made.</p>
        <img src="~@/assets/img/icon-hospital.gif" alt="Hospital Animated Icon">
      </router-link>
    </div>
    <div class="about-container">
      <div class="about">
        <div class="featured-info">
          <p class="typography-base">{{decoder(mission)}}</p>
          <div class="gradient-bar"></div>
        </div>
        <vue-background-image parent-class="image-bg" :source="require('@/assets/img/masks-pattern.jpg')">
          <h2 class="typography-hero">Everyday Heroes<br> Helping <br>Everyday Heroes</h2>
        </vue-background-image>
      </div>
    </div>
    <div class="quote-container">
      <h2 class="typography-headline featured-quote">
        “I have good news.<br class="small">
        It's all going to get better<br>
        and it's all going to get worse<br>
        and it's up to us to make<br>
        the worse parts better.”
      </h2>
      <span class="typography-action-small">
        <strong>John Maeda</strong>, world-renowned designer & advocate for humanizing technology
      </span>
    </div>
  </div>
</template>

<script>
import decoder from '../helpers/decoder.js'

export default {
  name: 'Home',
  mounted () {},
  data () {
    return {
      decoder,
      heroOne: 'MAKE A MASK AT&nbsp;HOME.',
      heroTwo: 'SEND IT TO A HOSPITAL THAT NEEDS&nbsp;ONE.',
      heroCopy: 'people who make masks to healthcare workers who need&nbsp;masks.',
      mission: 'Mask Makers is a grassroots effort to help protect healthcare workers on the frontlines of the COVID-19 pandemic. Our volunteer-driven mission is to connect ordinary citizens who are sheltering in place (with needle and thread!) to the doctors, nurses and hospital staff who need more masks.'
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
    width: 80%;
    margin: 50px auto;
    padding: 0;
    box-sizing: border-box;

    @media screen and (max-width: $bp-s) {
      margin: 40px auto 80px;
      width: 87%;
    }

    p br {
      @media screen and (max-width: $bp-s) {
        display: none;
      }
    }
  }

  .gradient-bar {
    margin: 40px auto 0;

    @media screen and (max-width: $bp-s) {
      margin-top: 30px;
    }
  }

  .home-headline {
    line-height: 1;

    @media screen and (max-width: $bp-s) {
      padding: 0;
    }
  }

  .hero-links-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 100px;
    max-width: 900px;
    margin: 0 auto 10em;

    @media screen and (max-width: $bp-m) {
      grid-gap: $space-m;
    }

    @media screen and (max-width: $bp-s) {
      display: block;
    }
  }

  .hero-link {
    padding: $space-xl $space-s $space-s;
    box-sizing: border-box;
    text-align: center;
    display: block;

    @media screen and (max-width: $bp-s) {
      padding: $space-m $space-s 0;

      &:not(:last-of-type) {
        margin-bottom: 40px;
      }
    }

    p {
      font-size: 1em;
      color: $primary-color;
      padding: 0 1em;
      margin-bottom: 0;
    }

    &:hover {
      .link-text {
        color: $accent-color;
      }

      /deep/ svg {
        fill: $accent-color;
      }
    }

    .link-text {
      text-transform: uppercase;
    }

    img {
      width: 70%;
    }

    span {
      white-space: nowrap;
    }

    /deep/ svg {
      display: inline-block;
      margin-top: -8px;
      margin-left: 0.3rem;
      vertical-align: middle;
      fill: $primary-color;
    }
  }

  .about {
    display: grid;
    grid-template-columns: 50% 50%;
    align-items: center;
    margin-bottom: 10em;

    @media screen and (max-width: $bp-s) {
      display: flex;
      flex-direction: column;
      margin-bottom: 0;

      .featured-info {
        margin-bottom: 10em;
      }
    }
  }

  /deep/ .image-bg {
    padding: 118px $space-l;
    width: calc(100% - #{$space-l * 2});

    @media screen and (max-width: $bp-s) {
      width: calc(100% - #{$space-m * 2});
      padding: 100px $space-m;
      margin-bottom: 10em;
    }

    h2 {
      color: $white;
      text-transform: uppercase;

      @media screen and (max-width: $bp-s) {
        padding: 0 1em;
        font-size: 2.25em;
      }
    }
  }

  .featured-info {
    max-width: 340px;
    margin: 0 auto;
    padding: 0 $space-l;
  }

  .quote-container {
    max-width: 645px;
    margin: 0 auto;
    padding-bottom: 5em;

    @media(max-width: $bp-xxs) {
      h2 {
        font-size: 19px;
      }
    }

    @media(max-width: 400px) {
      br:not(.small) {
        display: none;
      }
    }
  }

  .featured-quote {
    color: $accent-color;
    margin-bottom: 18px;
    line-height: 1.25;

    @media(min-width: $bp-l + 1) {
      font-size: 40px;
    }
  }
}
</style>

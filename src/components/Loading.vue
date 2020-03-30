<template>
  <div class="loading-wrapper">
    <div class="loading" v-if="!error"></div>
     <div class="error-message" v-else>
      <h2>Uh oh.. something went wrong. Try reloading the page.</h2>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      error: false
    }
  },

  mounted () {
    setTimeout(() => {
      this.error = true
    }, 10000)
  }
}
</script>

<style lang="scss" scoped>
@keyframes spinner {
  0% {
    transform: rotate(0deg)
  }

  to {
    transform: rotate(359deg)
  }
}

.loading-wrapper {
  margin: 0 auto;
  padding: 0 1.25em $space-s;
  text-align: center;

  .loading {
    width: 36px;
    height: 36px;
    margin: 30px auto;
    transform: rotate(0deg);
    animation: spinner .6s infinite linear;
    border: 4px solid transparent;
    border-top: 4px solid $primary-color;
    border-radius: 50%;
    stroke: transparent;

    @media(max-width: $bp-xs) {
      width: 24px;
      height: 24px;
      border: 2px solid transparent;
      border-top: 2px solid $primary-color;
    }
  }
}
</style>

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
  padding: 0 1.25em 2em;
  text-align: center;

  .loading {
    width: 36px;
    height: 36px;
    margin: 30px auto;
    transform: rotate(0deg);
    animation: spinner .6s infinite linear;
    border: 4px solid $white;
    border-top: 4px solid $navy;
    border-radius: 50%;
    stroke: $white;

    @media(max-width: $bp-xs) {
      width: 24px;
      height: 24px;
      border: 2px solid $white;
      border-top: 2px solid $navy;
    }
  }
}
</style>

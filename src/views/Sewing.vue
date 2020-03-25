<template>
    <div class="sewing-container basic-page-container">
        <h1>HELP YOUR COMMUNITY IN 5 EASY STEPS</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in</p>
        <div class="steps-container">
            <div class="step">1</div>
            <div class="step">2</div>
            <div class="step">3</div>
            <div class="step">4</div>
            <div class="step">5</div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Sewing',
  components: {},
  mounted () {

  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.sewing-container {
    margin-top: 50px;
}

p {
    max-width: 800px;
    margin: 20px auto 50px;
}

.steps-container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    grid-gap: 5%;
}

.step {
    background-color: #ccc;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>

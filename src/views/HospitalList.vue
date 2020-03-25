<template>
    <div class="hospital-list-container basic-page-container">
        <h1>FIND A HOSPITAL THAT NEEDS FACEMASKS!</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in</p>
        <div class="list-container">
            <div class="list-item list-header">
                <div class="name">Hospital</div>
                <div class="location">Location</div>
                <div class="address">Address</div>
                <div class="need">Need</div>
            </div>
            <div class="list-item">
                <div class="name">UPMC</div>
                <div class="location">Pittsburgh, PA</div>
                <div class="address">1234 Main St, Pittsburgh, PA 15672</div>
                <div class="need">400 Facemasks</div>
            </div>
            <div class="list-item">
                <div class="name">UPMC</div>
                <div class="location">Pittsburgh, PA</div>
                <div class="address">1234 Main St, Pittsburgh, PA 15672</div>
                <div class="need">400 Facemasks</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Sewing',
  components: {},
  mounted() {

  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.hospital-list-container {
    margin-top: 50px;
}

.list-container {
    margin-top: 50px;
}

p {
    max-width: 800px;
    margin: 20px auto 50px;
}

.list-item {
    display: flex;

    &.list-header {
        font-weight: bold;
    }

    > div {
        width: 25%;
        padding: 8px;
    }
}
</style>
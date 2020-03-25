<template>
    <div class="hospital-list-container basic-page-container">
        <h1>FIND A HOSPITAL THAT NEEDS FACEMASKS!</h1>
        <router-link tag="button" to="/hospital-input">Add your hospital!</router-link>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in</p>
        <div class="list-container">
            <div class="list-item list-header">
                <div class="name">Hospital</div>
                <div class="location">Location</div>
                <div class="address">Address</div>
                <div class="need">Need</div>
            </div>
            <div class="list-item" v-for="{ name, city, address, facemaskNeed } in hospitals" :key="name">
                <div class="name">{{ name }}</div>
                <div class="location">{{ city }}</div>
                <div class="address">{{ address }}</div>
                <div class="need">{{ facemaskNeed }}</div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Sewing',
  computed: {
    ...mapState('hospitals', [
      'hospitals'
    ])
  }
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

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
      <div class="list-item" v-for="{ name, city, address, facemaskNeed } in currentHospitalsPage" :key="name">
        <div class="name">{{ name }}</div>
        <div class="location">{{ city }}</div>
        <div class="address">{{ address }}</div>
        <div class="need">{{ facemaskNeed }}</div>
      </div>
    </div>
    <div class="pagination" v-if="paginatedHospitalsLength > 1">
      <button
        v-for="page in paginatedHospitalsLength"
        :key="page"
        @click="goToPage(page)"
      >
        {{ page }}
      </button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Sewing',

  data () {
    return {
      currentPage: 0,
      pageSize: 3
    }
  },

  computed: {
    ...mapState('hospitals', [
      'hospitals'
    ]),

    paginatedHospitals () {
      // Create array from Object
      let hospitalsArray = []

      if (Object.keys(this.hospitals).length > 0) {
        Object.keys(this.hospitals).forEach(hospital => {
          hospitalsArray.push(this.hospitals[hospital])
        })
      }

      // Splice array into chunks
      if (hospitalsArray.length > 0) {
        return hospitalsArray.reduce((resultArray, item, index) => {
          const chunkIndex = Math.floor(index / this.pageSize)

          if (!resultArray[chunkIndex]) {
            resultArray[chunkIndex] = []
          }

          resultArray[chunkIndex].push(item)

          return resultArray
        }, [])
      }

      return hospitalsArray
    },

    currentHospitalsPage () {
      return this.paginatedHospitals[this.currentPage]
    },

    paginatedHospitalsLength () {
      return this.paginatedHospitals.length
    }
  },

  methods: {
    goToPage (pageIndex) {
      this.currentPage = pageIndex - 1
    }
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

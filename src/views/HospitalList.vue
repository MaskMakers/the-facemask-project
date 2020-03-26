<template>
  <div class="hospital-list-container basic-page-container">
    <h1>FIND A HOSPITAL THAT NEEDS FACEMASKS!</h1>
    <router-link tag="button" to="/hospital-input">Add your hospital!</router-link>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in</p>
    <input v-model="searchText" placeholder="Search Hospitals" @keyup="currentPage = 0" />
    <select v-model="pageSize">
      <option v-for="option in pageSizeOptions" :key="option">{{ option }}</option>
    </select>
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
        <div class="need">{{ formatFacemaskNeed(facemaskNeed) }}</div>
      </div>
    </div>
    <div class="pagination" v-if="paginatedHospitalsLength > 1">
      <button @click="goToPage('back')">&lt;</button>
      <button
        v-for="page in paginatedHospitalsLength"
        :key="page"
        @click="goToPage(page)"
      >
        {{ page }}
      </button>
      <button @click="goToPage('forward')">&gt;</button>
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
      pageSize: 10,
      pageSizeOptions: [
        5,
        10,
        25,
        50,
        100,
        500,
        1000
      ],
      searchText: ''
    }
  },

  computed: {
    ...mapState('hospitals', [
      'hospitals'
    ]),

    hospitalsArray () {
      // Create array from Object
      let hospitalsArray = []

      if (Object.keys(this.hospitals).length > 0) {
        Object.keys(this.hospitals).forEach(hospital => {
          hospitalsArray.push(this.hospitals[hospital])
        })
      }

      return hospitalsArray
    },

    filteredHospitals () {
      const searchText = this.searchText && this.searchText.toLowerCase()

      if (searchText) {
        return this.hospitalsArray.filter(row => Object.keys(row).some(key => String(row[key]).toLowerCase().indexOf(searchText) > -1))
      }

      return this.hospitalsArray
    },

    paginatedHospitals () {
      // Splice array into chunks
      if (this.filteredHospitals.length > 0 && this.pageSize !== 'All') {
        return this.filteredHospitals.reduce((resultArray, item, index) => {
          const chunkIndex = Math.floor(index / this.pageSize)

          if (!resultArray[chunkIndex]) {
            resultArray[chunkIndex] = []
          }

          resultArray[chunkIndex].push(item)

          return resultArray
        }, [])
      }

      return this.filteredHospitals
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
      if (pageIndex === 'back') {
        if (this.currentPage <= 0) {
          this.currentPage = this.paginatedHospitalsLength - 1
        } else {
          this.currentPage = this.currentPage - 1
        }
      } else if (pageIndex === 'forward') {
        if (this.currentPage >= this.paginatedHospitalsLength - 1) {
          this.currentPage = 0
        } else {
          this.currentPage = this.currentPage + 1
        }
      } else {
        this.currentPage = pageIndex - 1
      }
    },

    formatFacemaskNeed (facemaskNeed) {
      return facemaskNeed.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
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

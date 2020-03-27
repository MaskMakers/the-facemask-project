<template>
  <div class="hospital-list-container basic-page-container">
    <h1>FIND A HOSPITAL THAT NEEDS FACEMASKS!</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in</p>
    <div class="actions-container">
      <div class="search-container">
        <input class="input-search" v-model="searchText" placeholder="Search Hospitals" @keyup="currentPage = 0" />
        <span v-if="currentHospitalsPageData.length > 0">{{ hospitals.length }} hospitals in need</span>
      </div>
      <select v-model="pageSize">
        <option v-for="option in pageSizeOptions" :key="option" @keyup="currentPage = 0">{{ option }}</option>
      </select>
    </div>
    <div class="list-container">
      <div class="list">
        <div class="list-header">
          <div class="name">Facility Name</div>
          <div class="address">Address</div>
          <div class="state">State</div>
          <div class="phone">Phone Number</div>
          <div class="need">Quantity Needed</div>
          <div class="pattern">Specific Pattern Request?</div>
          <div class="delivery">Delivery Instructions</div>
        </div>
        <div v-if="hospitals.length > 0">
          <div v-if="currentHospitalsPageData.length > 0">
            <div class="list-item" v-for="{ name, address, state, phone, need, pattern, delivery } in currentHospitalsPageData" :key="name">
              <div class="name">{{ name }}</div>
              <div class="address">{{ address }}</div>
              <div class="state">{{ state }}</div>
              <div class="phone">{{ phone }}</div>
              <div class="need">{{ need }}</div>
              <div class="pattern">{{ pattern }}</div>
              <div class="delivery">{{ delivery }}</div>
            </div>
          </div>
          <p v-else>No results for '{{ searchText }}'</p>
        </div>
        <loading v-else />
      </div>
    </div>
    <div class="pagination" v-if="paginatedHospitalsLength > 1">
      <button @click="goToPage('back')">&lt;</button>
      <button
        v-for="page in paginatedHospitalsLength"
        :key="page"
        @click="goToPage(page)"
        :class="{ 'active' : page - 1 === currentPage }"
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
      pageSize: 50,
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

    filteredHospitals () {
      const searchText = this.searchText && this.searchText.toLowerCase().trim()

      if (searchText) {
        return this.hospitals.filter(row => Object.keys(row).some(key => String(row[key]).toLowerCase().indexOf(searchText) > -1))
      }

      return this.hospitals
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

    currentHospitalsPageData () {
      return this.paginatedHospitals[this.currentPage] || []
    },

    paginatedHospitalsLength () {
      return this.paginatedHospitals && this.paginatedHospitals.length
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
    }
  }
}
</script>

<style lang="scss" scoped>
.hospital-list-container {
  margin-top: 50px;
}

.actions-container {
  width: 100%;
  padding: 0;
  margin: 100px 0 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;

  .search-container {
    input {
      width: 25%;
      min-width: 150px;
    }

    span {
      font-size: 0.9em;
      margin-left: 1rem;
      color: $red;
    }
  }

}

.list-container {
  margin-top: 30px;
  overflow-y: scroll;

  .list {
    min-width: 1000px;
  }
}

p {
  max-width: 800px;
  margin: 20px auto;
}

.list-item, .list-header {
  display: grid;
  grid-template-columns: 1fr 1.25fr 1fr 1.5fr 1fr 1fr 2fr;
  grid-column-gap: 1em;
  padding: 1em 0;
  border-bottom: 1px solid $gray;
  align-items: center;

  &:last-of-type {
    border-bottom: 0;
  }

  &.list-header {
    font-weight: bold;
  }

  .name, .address {
    text-align: left;
  }

  .delivery {
    text-align: right;
  }
}

.list-item {
  font-size: 0.9em;
}

.pagination {
  margin-top: 20px;

  button {
    margin: 0 6px;
    padding: 0;
    width: 30px;
    height: 30px;

    &.active {
      color: $gray;
      border: 1px solid $gray;
    }
  }
}
</style>

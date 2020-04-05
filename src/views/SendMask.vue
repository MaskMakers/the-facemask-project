<template>
  <div class="hospital-list-container basic-page-container">
    <div class="header-grid">
      <vue-background-image parent-class="header-grid-image image-bg" :source="require(`@/assets/img/masks-envelope.jpg`)">
        <h1 class="typography-hero">Send <br>A <br>Mask</h1>
      </vue-background-image>
      <div class="header-grid-copy">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        <p>
          This data was provided by <a class="hover strong" href="https://publichealth.berkeley.edu/" target="_blank">UC Berkeley School of Public Health</a>.
          If you would like to view their document directly, please <a class="hover strong" href="https://docs.google.com/document/d/12a5YO0Z9RpHZk9Zkzl4NOj9CbjzhFfoKjPLFFC-21LU/preview#heading=h.o8glz8qqtcdo" target="_blank">click here</a>,
          or email <a class="email-link hover strong" href="mailto:we.need.handmade.masks@gmail.com" target="_blank">we.need.handmade.masks @ gmail.com</a> for more info!
        </p>
      </div>
    </div>
    <div class="content-container">
      <div class="actions-container">
        <div class="search-container">
          <div class="input-container">
            <input class="input-search" v-model="searchText" placeholder="Search Facilities" @keyup="updatePageAndURL()" />
            <p v-if="hospitals.length > 0">
              <span v-if="hospitals.length > filteredHospitals.length">showing {{ filteredHospitals.length }} of </span>
              {{ hospitals.length }} facilities in need
            </p>
          </div>
          <select v-model="currentState" @change="updatePageAndURL()">
            <option disabled>Select A State</option>
            <option value="" selected>All States</option>
            <option v-for="state in states" :key="state">{{ state }}</option>
          </select>
          <button class="hide-s" @click="clearSearch()">Clear</button>
        </div>
        <div class="select-clear">
          <button class="show-s" @click="clearSearch()">Clear</button>
          <select v-model="pageSize" @change="updatePageAndURL()">
            <option v-for="option in pageSizeOptions" :key="option">{{ option }}</option>
          </select>
        </div>
      </div>
      <input
        class="scrollbar"
        type="range"
        v-model="scrollPercent"
        min="0"
        step="0.1"
        max="100"
        @input="updateScrollPositionFromRange()"
        :class="{ 'loading': hospitals.length === 0, 'no-results': currentHospitalsPageData.length === 0 }"
      />
      <div class="list-container" @scroll="updateScrollPositionFromEl()">
        <div class="list" :class="{ 'loading': hospitals.length === 0, 'no-results': currentHospitalsPageData.length === 0 }">
          <div class="list-header">
            <div class="name">Facility<br>Name</div>
            <div class="address">Facility<br>Address</div>
            <div class="state">State</div>
            <div class="phone">Facility<br>Phone</div>
            <div class="need">Quantity<br>Needed</div>
            <div class="pattern">Pattern<br>Request?</div>
            <div class="delivery">Delivery<br>Instructions</div>
          </div>
          <div v-if="hospitals.length > 0">
            <div v-if="currentHospitalsPageData.length > 0">
              <div class="list-item" v-for="({ name, address, state, phone, need, pattern, delivery }, i) in currentHospitalsPageData" :key="i">
                <div class="name">{{ name }}</div>
                <div class="address">{{ address }}</div>
                <div class="state">{{ state }}</div>
                <div class="phone" v-html="generatePhoneText(phone)"></div>
                <div class="need">{{ need }}</div>
                <div class="pattern" v-html="pattern"></div>
                <div class="delivery">{{ delivery }}</div>
              </div>
            </div>
            <p v-else>
              No results for '{{ searchText }}'
              <span v-if="currentState"> in {{ currentState }}</span>
            </p>
          </div>
          <loading v-else />
        </div>
      </div>
      <div class="pagination" v-if="paginatedHospitalsLength > 1 && pageSize !== 'All'">
        <button @click="goToPage('back')">
          <ArrowIcon/>
        </button>
        <button
          v-for="page in paginatedHospitalsLength"
          :key="page"
          @click="goToPage(page)"
          :class="{ 'active' : page - 1 === currentPage }"
        >
          {{ page }}
        </button>
        <button @click="goToPage('forward')">
          <ArrowIcon/>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import debounce from '../helpers/debounce'
import ArrowIcon from '../components/ArrowIcon'

export default {
  name: 'SendMask',
  components: {
    ArrowIcon
  },

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
        'All'
      ],
      searchText: '',
      currentState: '',
      scrollPercent: 0,
      resizeListener: null,
      windowSize: 0
    }
  },

  computed: {
    ...mapState('tabletop', [
      'hospitals',
      'states'
    ]),

    filteredHospitals () {
      const searchText = this.searchText && this.searchText.toLowerCase().trim()
      const selectedState = this.currentState && this.currentState.toLowerCase().trim()
      let hospitalsClone = this.hospitals

      if (searchText && this.hospitals.length > 0) {
        hospitalsClone = hospitalsClone.filter(row => Object.keys(row).some(key => String(row[key]).toLowerCase().indexOf(searchText) > -1))
      }

      if (selectedState) {
        hospitalsClone = hospitalsClone.filter(row => Object.keys(row).some(key => String(row[key]).toLowerCase().indexOf(selectedState) > -1))
      }

      return hospitalsClone
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
      if (this.pageSize === 'All') return this.paginatedHospitals
      return this.paginatedHospitals[this.currentPage] || []
    },

    paginatedHospitalsLength () {
      return this.paginatedHospitals && this.paginatedHospitals.length
    }
  },

  mounted () {
    const searchParams = new URLSearchParams(window.location.search)
    this.currentState = searchParams.get('state') || ''
    this.searchText = searchParams.get('search') || ''
    this.windowSize = window.innerWidth
    this.resizeListener = debounce(this.resetRangeSlider.bind(this), 250)

    window.addEventListener('resize', this.resizeListener)
  },

  beforeRouteLeave (to, from, next) {
    window.removeEventListener('resize', this.resizeListener)
    next()
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

      document.querySelector('.list-header').scrollIntoView({ behavior: 'smooth' })
    },

    updatePageAndURL () {
      let query = window.location.protocol + '//' + window.location.host + window.location.pathname

      if (this.searchText !== '') {
        query += '?search=' + this.searchText
      }

      if (this.currentState !== '') {
        const prepend = this.searchText !== '' ? '&' : '?'
        query += `${prepend}state=${this.currentState}`
      }

      window.history.replaceState(null, null, query)

      this.currentPage = 0
      this.resetRangeSlider()
    },

    generatePhoneText (phone) {
      var number = phone.match(/\d+/g)
      if (number) number.toString().replace(/,/g, '')
      if (!number) return '-'
      return `<p class="typography-action"><a class="phone-link" href="tel:${number}">${phone}</a></p>`
    },

    clearSearch () {
      this.currentState = ''
      this.searchText = ''
      this.updatePageAndURL()
    },

    updateScrollPositionFromRange () {
      this.windowSize = window.innerWidth
      const listContainer = document.querySelector('.list-container')
      const list = document.querySelector('.list')

      listContainer.scrollLeft = (list.scrollWidth - listContainer.offsetWidth) * (this.scrollPercent / 100)
    },

    updateScrollPositionFromEl () {
      const listContainer = document.querySelector('.list-container')
      const list = document.querySelector('.list')

      this.scrollPercent = listContainer.scrollLeft / (list.scrollWidth - listContainer.offsetWidth) * 100
    },

    resetRangeSlider () {
      if (window.innerWidth !== this.windowSize) {
        this.scrollPercent = 0
        this.updateScrollPositionFromRange()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.hospital-list-container {
  padding: 0;
}

.header-grid-copy {
  max-width: 433px;

  @media screen and (max-width: $bp-s) {
    padding-bottom: 0;
  }

  p {
    padding: 0;
  }
}

.email-link br {
  @media(min-width: $bp-s - 150) and (max-width: $bp-s), (min-width: $bp-m - 100) {
    display: none;
  }
}

.actions-container {
  width: 100%;
  padding: 0;
  margin: 100px 0 0;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  box-sizing: border-box;

  @media(max-width: $bp-s) {
    flex-flow: column;
  }

  .search-container {
    display: flex;
    align-items: flex-start;
    text-align: left;
    flex-grow: 1;

    .input-container {
      display: flex;
      flex-flow: column;
      text-align: center;

      input {
        width: 100%;
        text-align: center;
      }
    }

    .input-container, select {
      width: 50%;
      margin-right: 1rem;
    }

    @media(max-width: $bp-s) {
      display: flex;
      flex-flow: column;
      align-items: flex-start;

      &, .input-container, select {
        width: 100%;
      }

      select, button {
        margin-top: $space-s;
      }
    }

    button {
      margin-right: $space-s;
      width: auto;
    }

    p {
      display: inline-block;
      font-size: 0.9em;
      font-weight: bold;
      color: $accent-color;
      margin: $space-s 0 0 0;
    }
  }

  .select-clear {
    @media(max-width: $bp-s) {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-top: $space-s;
      width: 100%;
    }
  }
}

.scrollbar {
  margin: 0;
  height: 0;
  width: 100%;
  opacity: 0;
  transition: all 0.35s;

  @media(max-width: $page-width - 40) {
    &:not(.loading):not(.no-results) {
      margin: 2em 0 0;
      opacity: 1;
      height: auto;
    }
  }
}

.list-container {
  margin-top: 30px;
  overflow-y: scroll;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
    width: 0;
    height: 0;
  }

  .list {
    position: relative;

    &.loading {
      width: 100%;
    }

    &:not(.loading):not(.no-results) {
      min-width: $page-width - 100;
    }
  }
}

p {
  max-width: 800px;
  margin: 20px auto;
}

.list-item, .list-header {
  font-size: 15px;
  display: grid;
  grid-template-columns: 1fr 1.25fr 1fr 1.25fr 1fr 1fr 2fr;
  grid-column-gap: 1.5em;
  padding: $space-s;
  text-align: left;
  border-bottom: 1px solid $gray;

  &:last-of-type {
    border-bottom: 0;
  }

  &.list-header {
    font-weight: bold;
    font-weight: 16px;
  }
}

.pagination {
  margin: 20px auto;
  display: flex;
  justify-content: center;
  align-items: center;

  button {
    margin: 0 6px;
    padding: 0;
    width: 40px;
    height: 40px;

    &.active {
      background-color: $accent-color;
      color: $white;
    }

    &:first-of-type, &:last-of-type {
      background: none;
      box-shadow: none;
      transform: translateY(2px);

      svg {
        height: 45%;
      }

      /deep/ polygon {
        transition: .3s;
        fill: $text-color;
      }

      &:hover {
        /deep/ polygon {
          fill: $accent-color;
          transition: .3s;
        }
      }
    }

    &:first-of-type {
      svg {
        transform: rotate(180deg);
      }
    }
  }
}
</style>

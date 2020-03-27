import Tabletop from 'tabletop'

export default {
  namespaced: true,

  state: {
    hospitals: []
  },

  mutations: {
    setHospitals (state, hospitals) {
      state.hospitals = hospitals
    }
  },

  actions: {
    getHospitals (store) {
      if (store.state.hospitals.length <= 0) {
        // get Sheet
        Tabletop.init({
          key: 'https://docs.google.com/spreadsheets/d/1rmgPd6HEt8xRymQTVyFzbPgP0WCvA00i3Xn7rr2Ohfk/pubhtml',
          simpleSheet: true
        }).then((data) => {
          let formattedArray = []

          // format data
          data.forEach(hospital => {
            if (
              Object.prototype.hasOwnProperty.bind(hospital, 'Delivery Instructions') &&
              hospital['Delivery Instructions'] !== 'Delivery Instructions'
            ) {
              formattedArray.push({
                name: hospital['Facility Name'],
                state: hospital['State'],
                address: hospital['Facility Address'],
                phone: hospital['Facility Phone Number'],
                need: hospital['Quantity Needed'],
                pattern: hospital['Specific Pattern Request?'],
                delivery: hospital['Delivery Instructions']
              })
            }
          })

          store.commit('setHospitals', formattedArray)
        })
      }
    }
  }
}

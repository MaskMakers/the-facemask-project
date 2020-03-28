import Tabletop from 'tabletop'

export default {
  namespaced: true,

  state: {
    hospitals: [],
    states: [],
    masks: [],
    steps: []
  },

  mutations: {
    setHospitals (state, hospitals) {
      state.hospitals = hospitals
    },

    pushState (state, sentState) {
      state.states.push(sentState)
    },

    setMasks (state, masks) {
      state.masks = masks
    },

    setSteps (state, steps) {
      state.steps = steps
    }
  },

  actions: {
    getSheet (store) {
      if (store.state.hospitals.length <= 0) {
        // get Sheet
        Tabletop.init({
          key: 'https://docs.google.com/spreadsheets/d/1rmgPd6HEt8xRymQTVyFzbPgP0WCvA00i3Xn7rr2Ohfk/pubhtml'
        }).then((data) => {
          const hospitals = data['Hospitals'].elements
          store.dispatch('formatHospitals', hospitals)
          store.dispatch('formatStates', hospitals)

          const masks = data['Masks'].elements
          store.dispatch('formatMasks', masks)

          const steps = data['Steps'].elements
          store.dispatch('formatSteps', steps)
        })
      }
    },

    formatHospitals (store, hospitals) {
      let formattedArray = []

      // format data
      hospitals.forEach(hospital => {
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
    },

    formatStates (store, hospitals) {
      hospitals.forEach(hospital => {
        const currentState = hospital['State']
        if (!store.state.states.includes(currentState)) {
          store.commit('pushState', currentState)
        }
      })
    },

    formatMasks (store, masks) {
      store.commit('setMasks', masks)
    },

    formatSteps (store, steps) {
      store.commit('setSteps', steps)
    }
  }
}

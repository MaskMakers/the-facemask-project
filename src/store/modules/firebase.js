import firebase from 'firebase/app'
import 'firebase/database'
import rawFallbackData from '@/assets/firebase-fallback-data.json'

// firebase setup
firebase.initializeApp({
  apiKey: 'AIzaSyBmxq9lhljIr45GZ9zvlyeDh3cd0blBvPQ',
  authDomain: 'the-facemask-project.firebaseapp.com',
  databaseURL: 'https://the-facemask-project.firebaseio.com',
  storageBucket: 'the-facemask-project.appspot.com'
})

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

    setStates (state, states) {
      state.states = states
    },

    setMasks (state, masks) {
      state.masks = masks
    },

    setSteps (state, steps) {
      state.steps = steps
    }
  },

  actions: {
    getData (store) {
      firebase.database().ref('/').once('value').then((snapshot) => {
        const data = snapshot.val()

        const hospitals = data['Hospitals']
        store.dispatch('formatHospitals', hospitals)
        store.dispatch('formatStates', hospitals)

        const masks = data['Masks']
        store.dispatch('formatMasks', masks)

        const steps = data['Steps']
        store.dispatch('formatSteps', steps)
      }).catch(() => {
        store.dispatch('getFallbackData')
      })
    },

    getFallbackData (store) {
      if (store.state.hospitals.length <= 0) {
        const fallbackData = rawFallbackData.tabletop

        store.commit('setHospitals', fallbackData.hospitals)
        store.commit('setStates', fallbackData.states)
        store.commit('setMasks', fallbackData.masks)
        store.commit('setSteps', fallbackData.steps)
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

import firebase from 'firebase/app'
import 'firebase/database'

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
    hospitals: {}
  },

  mutations: {
    setHospitals (state, hospitals) {
      state.hospitals = hospitals
    }
  },

  actions: {
    getHospitals (store) {
      firebase.database().ref('hospitals').once('value').then((snapshot) => {
        store.commit('setHospitals', snapshot.val())
      })
    },

    setHospital ({ dispatch }, hospital) {
      firebase.database().ref('hospitals/' + hospital.name).set(hospital)
        .then(() => {
          dispatch('getHospitals')
        })
    }
  }
}

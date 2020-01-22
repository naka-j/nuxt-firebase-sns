import firebase from '@/plugins/firebase';
import { vuexfireMutations, firestoreAction } from 'vuexfire'

const db = firebase.database();

export const state = () => ({
  userUid: '',
  userName: ''
})

export const mutations = {
  ...vuexfireMutations,
  setUserUid(state, userUid) {
    state.userUid = userUid
  },
  setUserName(state, userName) {
    state.userName = userName
  },
}

export const getters = {
  getUserName: state => {
    return state.userName
  }
}

export const actions = {
  init: firestoreAction(({ bindFirebaseRef }, usersRef) => {
    bindFirebaseRef('users', usersRef);
  }),
  signin: ({ commit }) => {
    const provider = new firebase.auth.GoogleAuthProvider()
    firebase.auth().signInWithPopup(provider).then(function(result) {
      const user = result.user
      commit('setUserUid', user.id)
      commit('setUserName', user.displayName)
    }).catch(function(error) {
      console.log(error)
      console.log('error : ' + error.code)
    })
  }
}
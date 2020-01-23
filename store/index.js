import firebase from '@/plugins/firebase';
import { vuexfireMutations, firestoreAction } from 'vuexfire'

const db = firebase.firestore();
const commentRef = db.collection('comments')

export const state = () => ({
  userUid: '',
  userName: '',
  comments: []
})

export const mutations = {
  ...vuexfireMutations,
  setUserUid(state, userUid) {
    state.userUid = userUid
  },
  setUserName(state, userName) {
    state.userName = userName
  },
  setComments(state, comments) {
    state.comments = comments
  },
}

export const getters = {
  getUserName(state){
    return state.userName
  },
  getComments(state) {
    return state.comments
  },
}

export const actions = {
  init: firestoreAction(({ bindFirebaseRef }, usersRef) => {
    bindFirebaseRef('users', usersRef);
  }),
  signin({ commit }) {
    const provider = new firebase.auth.GoogleAuthProvider()
    firebase.auth().signInWithPopup(provider).then(function(result) {
      const user = result.user
      commit('setUserUid', user.id)
      commit('setUserName', user.displayName)
    }).catch(function(error) {
      console.log(error)
      console.log('error : ' + error.code)
    })
  },
  async fetchComments({ commit }) {
    try {
      // const comments = await commentRef.get()
      const comments = [
        {
          'id': 'hogehogehogehoge',
          'text': 'テストテストダミーダミー',
          'userId': 'user1',
        }
      ]
      console.log(comments)
      commit('setComments', comments)
    } catch(error) {
      console.log(error)
    }
  }
}
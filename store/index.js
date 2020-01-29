import firebase from '@/plugins/firebase';
import { vuexfireMutations, firestoreAction } from 'vuexfire'
import {
  SET_CURRENT_USER, 
  SET_COMMENTS,
  ADD_COMMENT
} from './mutation-type'

const db = firebase.firestore();
const commentRef = db.collection('comments')

export const state = () => ({
  currentUser: null,
  userName: '',
  comments: []
})

export const mutations = {
  ...vuexfireMutations,
  [SET_CURRENT_USER](state, payload) {
    state.currentUser = payload.user
  },
  [SET_COMMENTS](state, payload) {
    state.comments = payload.comments
  },
  [ADD_COMMENT](state, payload) {
    state.comments.push(payload.comment)
  }
}

export const getters = {
  getCurrentUser(state) {
    return state.currentUser
  },
  getUserName(state){
    return state.currentUser ? state.currentUser.displayName : ''
  },
  getComments(state) {
    return state.comments
  },
}

export const actions = {
  init: firestoreAction(({ bindFirebaseRef }, usersRef) => {
    bindFirebaseRef('users', usersRef);
  }),
  async signin({ commit }) {
    const provider = new firebase.auth.GoogleAuthProvider()
    await firebase.auth().signInWithPopup(provider).then(function(result) {
      const user = { 
        uid: result.user.uid,
        displayName: result.user.displayName,
        photoURL: result.user.photoURL
      }
      commit(SET_CURRENT_USER, { user })
    }).catch(function(error) {
      console.log(error)
    })
  },
  async fetchComments({ commit }) {
    try {
      // const comments = await commentRef.get()
      const comments = [
        {
          'id': 'hogehogehogehoge',
          'text': 'テストテストダミーダミー',
          'userId': 'dummy',
        },
        {
          'id': 'hogehogehogehoge2',
          'text': 'こんにちは！',
          'userId': 'qVsUYvnZ1man5PgivohCp9pX5Ui1',
        }
      ]
      commit(SET_COMMENTS, { comments })
    } catch(error) {
      console.log(error)
    }
  },
  async sendComment({ commit }, comment) {
    commit(ADD_COMMENT, { comment })
  }
}
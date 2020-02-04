import firebase from '@/plugins/firebase';
import { vuexfireMutations, firestoreAction } from 'vuexfire'
import Cookie from 'js-cookie'
import cloneDeep from 'lodash/cloneDeep'
import {
  SET_CURRENT_USER, 
  SET_COMMENTS,
  ADD_COMMENT
} from './mutation-type'
const authHelper = require('../helpers/auth')

const db = firebase.firestore();
const commentRef = db.collection('comments')

export const state = () => ({
  currentUser: null,
  userName: '',
  comments: null
})

export const mutations = {
  ...vuexfireMutations,
  [SET_CURRENT_USER](state, payload) {
    state.currentUser = payload.userInfo
  },
  [SET_COMMENTS](state, payload) {
    state.comments = cloneDeep(payload.comments)
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
  async nuxtServerInit({ commit }, { req }) {
    // cookieから認証状態を復元
    const user = authHelper.getUserFromCookie(req)
    if (!user) return 
    const userInfo = { 
      uid: user.user_id,
      name: user.name,
      email: user.email,
      photoUrl: user.picture
    }
    commit(SET_CURRENT_USER, { userInfo })
  },
  init: firestoreAction(({ bindFirebaseRef }, usersRef) => {
    bindFirebaseRef('users', usersRef);
  }),
  async signinWithGoogle({ dispatch }) {
    const provider = new firebase.auth.GoogleAuthProvider()
    const { user } = await firebase.auth().signInWithPopup(provider)
    await dispatch('signin', user).catch(function(error) {
      console.log(error)
    })
  },
  async signin({ commit }, user) {
    const token = await firebase.auth().currentUser.getIdToken(true)
    const userInfo = { 
      uid: user.uid,
      name: user.displayName,
      email: user.email,
      photoUrl: user.photoURL
    }
    Cookie.set('access_token', token)
    commit(SET_CURRENT_USER, { userInfo })
  },
  async logout({ commit }) {
    Cookie.remove('access_token')
    commit(SET_CURRENT_USER, {})
  },
  async fetchComments({ commit }) {
    try {
      const comments = await commentRef.get()
      if (!comments.docs.length) return
      commit(SET_COMMENTS, { 
        comments: comments.docs.map(function(doc) {
          return doc.data()
        }) 
      })
    } catch(error) {
      console.log(error)
    }
  },
  async sendComment({ commit }, comment) {
    commit(ADD_COMMENT, { comment })
  }
}
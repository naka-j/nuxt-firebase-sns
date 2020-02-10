import firebase from '@/plugins/firebase';
import { vuexfireMutations, firestoreAction } from 'vuexfire'
import Cookie from 'js-cookie'
import moment from 'moment'

import {
  SET_CURRENT_USER,
  USER_SIGNUP,
  USER_SIGNIN,
  SET_USERINFO_MAP,
  ADD_COMMENT
} from './mutation-type'
const authHelper = require('../helpers/auth')

const db = firebase.firestore()
const userRef = db.collection('users')
const commentRef = db.collection('comments')

export const state = () => ({
  currentUser: null,
  userName: '',
  userinfoMap: {},
  comments: []
})

export const mutations = {
  ...vuexfireMutations,
  async [USER_SIGNUP](state, payload) {
    // 新規ユーザーの場合DBに保存
    await userRef.add(payload.user)
  },
  async [USER_SIGNIN](state, payload) {
    // 既存ユーザーのsignin時はtokenを更新
    const user = payload.user
    await userRef.where('uid', user.uid).update({ token: user.token })
  },
  [SET_CURRENT_USER](state, payload) {
    state.currentUser = payload.userInfo
  } ,
  [SET_USERINFO_MAP](state, payload) {
    state.userinfoMap = payload.userinfoMap
  },
  async [ADD_COMMENT](state, payload) {
    await commentRef.add(payload.comment)
  }
}

export const getters = {
  getCurrentUser(state) {
    return state.currentUser
  },
  getUserName(state){
    return state.currentUser ? state.currentUser.displayName : ''
  },
  getUserinfoMap(state) {
    return state.userinfoMap
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
  async signinWithGoogle({ dispatch }) {
    const provider = new firebase.auth.GoogleAuthProvider()
    const { user } = await firebase.auth().signInWithPopup(provider)
    await dispatch('signin', user).catch(function(error) {
      console.log(error)
    })
  },
  async isRegisteredUser({}, uid) {
    const users = await userRef.where('uid', '==', uid).get()
    return users.size > 0
  },
  async signin({ commit, dispatch }, user) {
    const token = await firebase.auth().currentUser.getIdToken(true)
    const userInfo = { 
      uid: user.uid,
      name: user.displayName,
      email: user.email,
      photoUrl: user.photoURL
    }
    const isRegisteredUser = await dispatch('isRegisteredUser', userInfo.uid)
    // 既存ユーザーかどうかでmutationを変える（signin or signup）
    const SIGNIN_MUTATION = isRegisteredUser ? USER_SIGNIN : USER_SIGNUP
    commit(SIGNIN_MUTATION, { 
      user: {
        ...userInfo,
        token
      } 
    })
    Cookie.set('access_token', token)
    commit(SET_CURRENT_USER, { userInfo })
  },
  async logout({ commit }) {
    Cookie.remove('access_token')
    commit(SET_CURRENT_USER, {})
  },
  realtimeFetchComments: firestoreAction(({ bindFirestoreRef }) => {
    bindFirestoreRef('comments', commentRef.orderBy('postedAt'))
  }),
  async sendComment({ commit }, comment) {
    try {
      commit(ADD_COMMENT, { 
        comment: { 
          ...comment, 
          postedAt: moment().toDate()
        }
      })
    } catch(error) {
      console.log(error)
    }
  },
  fecthUserinfoMap({ commit }) {
    userRef.get().then(function(result) {
      const userinfoMap = {}
      result.docs.map(function(doc) {
        const user = doc.data()
        userinfoMap[user.uid] = {
          name: user.name,
          photoUrl: user.photoUrl
        }
      })

      commit(SET_USERINFO_MAP, { userinfoMap })
    })
  } 
}
<template>
  <div>
    <b-button size='is-large' @click='signin'>Sign in with Google</b-button>
    <div>{{ $store.getters.getUserName }} でログイン中</div>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  methods: {
    signin() {
      this.$store.dispatch('signin')
    }
  } 
}
</script>
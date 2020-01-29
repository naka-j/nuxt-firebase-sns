<template>
  <div>
    <b-button size='is-large' @click='signin'>Sign in with Google</b-button>
  </div>
</template>

<script>
export default {
  methods: {
    signin() {
      const _this = this
      _this.$store.dispatch('signin').then(function() {
        _this.$router.push('/chat')
      })
    }
  } 
}
</script>
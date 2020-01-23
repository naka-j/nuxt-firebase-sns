<template>
  <div>
    <div>{{ $store.getters.getUserName }} でログイン中</div>
    <div v-for='comment in loadedComments' :key='comment' class='comment'>
      {{ comment.text }}
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  created() {
    this.fetchComments()
  },
  methods: {
    fetchComments() {
      this.$store.dispatch('fetchComments')
    },
  },
  computed: {
    loadedComments() {
      return this.$store.getters.getComments
    }
  }
}
</script>
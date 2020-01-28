<template>
  <div>
    <section class="hero is-primary">
      <div class="hero-body">
        <p class="title">
          Welcome!
        </p>
        <p class="subtitle">
          free chat
        </p>
      </div>
    </section>
    <div v-for='comment in loadedComments' :key='comment.id' class='comment'>
      {{ comment.text }}
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  layout: 'authenticated',
  created() {
    this.fetchComments()
  },
  methods: {
    async fetchComments() {
      await this.$store.dispatch('fetchComments')
    },
  },
  computed: {
    loadedComments() {
      return this.$store.getters.getComments
    },
    currentUserName() {
      return this.$store.getters.getUserName
    }
  }
}
</script>
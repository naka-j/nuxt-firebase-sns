<template>
  <div class='chat-block'>
    <div v-for='comment in loadedComments' :key='comment.id' class='comment'>
      <comment-item :text="comment.text" :isOwner="isOwner(comment)"></comment-item>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import commentItem from '@/components/chat/comment-item'
export default {
  layout: 'authenticated',
  created() {
    this.fetchComments()
  },
  methods: {
    async fetchComments() {
      await this.$store.dispatch('fetchComments')
    },
    // ログインユーザーのコメントかどうか？
    isOwner(comment) {
      return comment.userId === this.currentUserId
    }
  },
  computed: {
    loadedComments() {
      return this.$store.getters.getComments
    },
    currentUserName() {
      return this.$store.getters.getUserName
    },
    currentUserId() {
      return this.$store.getters.getCurrentUser.uid
    },
  },
  components: {
    'comment-item': commentItem
  }
}
</script>

<style scoped>
  .chat-block {
    max-width: 30rem;
    height: 75vh;
    margin: auto;
  }
  
  .comment {
    margin: 5px;
  }


</style>
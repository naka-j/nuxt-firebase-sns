<template>
  <div class='comment-list'>
    <div v-for='comment in comments' :key='comment.id' class='comment'>
      <comment-item :text="comment.text" :userinfo="getCommentOwnerInfo(comment)" :isOwner="isOwner(comment)" />
    </div>
  </div>
</template>

<script>
import commentItem from '@/components/chat/comment-item'

export default {
  props: {
    comments: Array
  },
  methods: {
    // ログインユーザーのコメントかどうか？
    isOwner(comment) {
      return comment.userId === this.$store.getters.getCurrentUser.uid
    },
    getCommentOwnerInfo(comment) {
      return this.$store.getters.getUserinfoMap[comment.userId]
    }
  },
  components: {
    'comment-item': commentItem
  }
}
</script>

<style scoped>
  .comment-list {
    height: 75vh;
    overflow-y: scroll;
  }
  
  .comment {
    margin: 5px;
  }
</style>
<template>
  <div class="chat-block">
    <comment-list :comments="loadedComments" />
    <comment-textarea :keydownEvent="sendComment" />
  </div>
</template>

<script>
import commentList from '@/components/chat/comment-list'
import commentTextarea from '@/components/input/textarea'

export default {
  layout: 'authenticated',
  mounted() {
  },
  async created() {
    this.$store.dispatch('fecthUserinfoMap')
    this.$store.dispatch('realtimeFetchComments')
  },
  methods: {
    async sendComment(e) {
      if (e.metaKey && e.target.value.trim()) {
        const comment = {
          text: e.target.value,
          userId: this.$store.getters.getCurrentUser.uid
        }
        await this.$store.dispatch('sendComment', comment).then(function() {
          e.target.value = ''
        })
      }
    },
  },
  computed: {
    loadedComments() {
      return this.$store.getters.getComments
    }
  },
  components: {
    commentList,
    commentTextarea
  }
}
</script>

<style scoped>
  .chat-block {
    max-width: 30rem;
    margin: auto;
  }
</style>
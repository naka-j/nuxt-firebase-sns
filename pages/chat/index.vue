<template>
  <div>
    <div class="room-block">
      <room-list />
    </div>
    <div class="chat-block">

      <comment-list :comments="loadedComments" />
      <comment-textarea :keydownEvent="sendComment" />
      
    </div>
  </div>
</template>

<script>
import roomList from '@/components/chat/room-list'
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
    roomList,
    commentList,
    commentTextarea
  }
}
</script>

<style scoped>
  .room-block {
    display: inline-block;
    vertical-align: top;
    width: 20%;
  }
  .chat-block {
    display: inline-block;
    vertical-align: top;
    width: 70%;
    margin: auto;
  }
</style>
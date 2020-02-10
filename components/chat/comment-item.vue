<template>
  <div class='is-clearfix'>
    <div :class="[isOwner ? 'is-pulled-right is-success' : 'is-pulled-left']">
      <img :src="userinfo.photoUrl" width="30" height="30" class="user-icon">
    </div>
    <div class='chat-massege-block' :class="[isOwner ? 'is-pulled-right is-success' : 'is-pulled-left']">
      <p class='is-size-7' :class="[isOwner ? 'has-text-right' : 'has-text-left']">{{ userinfo.name }}</p>
      <div class="notification">
        <div class="content">
          {{ text }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    text: String,
    userinfo: Object,
    isOwner: Boolean
  },
}
</script>

<style scoped>
  .user-icon {
    border-radius: 50%;
    margin: 10px;
  }

  .chat-massege-block {
    max-width: 80%;
  }
</style>
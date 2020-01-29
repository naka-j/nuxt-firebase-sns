<template>
  <div class='is-clearfix'>
    <div class="notification " :class="[isOwner ? 'is-pulled-right is-success' : 'is-pulled-left']">
      <div class="content">
        <p>{{ text }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    text: String,
    isOwner: Boolean
  },
}
</script>
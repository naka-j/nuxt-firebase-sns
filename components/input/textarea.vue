<template>
  <textarea maxlength="200" class="textarea" @keydown.enter="keydownEvent"></textarea>
</template>

<script>
export default {
  props: {
    keydownEvent: Function
  }
}
</script>
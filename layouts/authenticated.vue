<template>
  <div>
    <nav class="navbar is-light" role="navigation" aria-label="dropdown navigation">
      <div class="navbar-menu">
        <div class="navbar-end">
          <div class="navbar-item has-dropdown" :class="{ 'is-active': showMenu }" @click="toggleMenu">
            <a class="navbar-link">
              <img :src="userPhotoUrl" alt="">
            </a>

            <div class="navbar-dropdown is-right">
              <a class="navbar-item">
                ログアウト
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <nuxt />
  </div>

</template>

<script>
export default {
  middleware: 'authenticated',
  data() {
    return {
      showMenu: false
    }
  },
  computed: {
    userPhotoUrl() {
      return this.$store.getters.getCurrentUser.photoUrl
    } 
  },
  methods: {
    toggleMenu() {
      this.showMenu = !this.showMenu
    }
  }
}
</script>

<style scoped>
  .header {
    padding: 1.5rem;
  }
</style>
<template>
  <div>
    <v-app-bar
      id="home-app-bar"
      app
      color="white"
      elevation="1"
      height="80"
    >
      <v-spacer />
      <v-app-bar-nav-icon
        @click="showHideDrawer"
      />
    </v-app-bar>
  </div>
</template>

<script>
  export default {
    name: 'HomeAppBar',

    data: () => ({
      items: [
        'Home',
        'About',
        'Contact',
        'Pro',
      ],
    }),
    methods: {
      showHideDrawer () {
        this.$store.commit('setDrawer')
      },
    },
  }
</script>

<style lang="sass">
  #home-app-bar
    .v-tabs-slider
      max-width: 24px
      margin: 0 auto

    .v-tab
      &::before
        display: none
</style>

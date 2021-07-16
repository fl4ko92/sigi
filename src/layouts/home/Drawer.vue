<template>
  <v-navigation-drawer
    v-model="drawer"
    app
    height="100%"
    overlay-color="secondary"
    overlay-opacity=".8"
    v-on="$listeners"
  >
    <v-container
      style="margin: 8px"
    >
      <v-avatar>
        <img
          :src="require('@/assets/icon.png')"
          alt="SIGI"
        >
      </v-avatar> SIGI / COVID-19
    </v-container>

    <v-list
      color="white"
      shaped
    >
      <v-list-item
        v-for="name in items"
        :key="name"
        :to="{ name }"
        :exact="name === 'Home'"
        color="primary"
      >
        <v-list-item-content>
          <v-list-item-title v-text="name" />
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
  export default {
    name: 'HomeDrawer',

    props: {
      items: {
        type: Array,
        default: () => ([]),
      },
    },
    data: () => ({
      iconsrc: '@/assets/icon.png',
    }),
    computed: {
      drawer () {
        return this.$store.getters.drawer
      },
    },
  }
</script>

<template>
  <v-app>
    <home-app-bar />
    <home-drawer
      v-model="drawer"
      :items="items"
    />

    <home-view />

    <home-footer />
  </v-app>
</template>

<script>
  export default {
    name: 'HomeLayout',

    components: {
      HomeAppBar: () => import('@/layouts/home/AppBar'),
      HomeFooter: () => import('@/layouts/home/Footer'),
      HomeView: () => import('@/layouts/home/View'),
      HomeDrawer: () => import('@/layouts/home/Drawer'),
    },
    data: () => ({
      drawer: !null,
      items: [
        'Control',
        'Centros',
        'Pacientes',
      ],
    }),
  }
</script>

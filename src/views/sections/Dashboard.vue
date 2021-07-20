<template>
  <section id="dashboard">
    <v-row
      no-gutters
      style="padding: 8px"
    >
      <!-- <info-box
        :stats="monthlyStats"
        :more="true"
      /> -->
    </v-row>
  </section>
</template>

<script>
 // import InfoBox from '@/components/InfoBox'
  export default {

    name: 'SectionDashboard',
    // components: { InfoBox },
    data: () => ({
      monthlyStats: [
        {
          bgColor: 'success darken-1',
          iconClass: 'blue lighten-3 white--text',
          icon: 'mdi-hospital-building',
          title: 'Centros de aislamiento',
          data: '22',
          action: {
            label: 'more',
            link: '',
          },
        },
        {
          bgColor: 'success  ligthen-1',
          iconClass: 'blue lighten-3 white--text',
          icon: 'mdi-bunk-bed-outline',
          title: 'Camas Totales',
          data: '450',
          action: {
            label: 'more',
            link: '',
          },
        },
        {
          bgColor: 'success  ligthen-1',
          iconClass: 'blue lighten-3 white--text',
          icon: 'mdi-bed',
          title: 'Camas Usadas',
          data: '200',
          action: {
            label: 'more',
            link: '',
          },
        },
        {
          bgColor: 'success  ligthen-1',
          iconClass: 'blue lighten-3 white--text',
          icon: 'mdi-bed-empty',
          title: 'Camas Disponibles',
          data: '250',
          action: {
            label: 'more',
            link: '',
          },
        },
        {
          bgColor: 'red  lighten-1',
          iconClass: 'grey white--text',
          icon: 'mdi-account-alert',
          title: 'Pacientes Registrados',
          data: '150',
          action: {
            label: 'more',
            link: '',
          },
        },
        {
          bgColor: 'orange lighten-2',
          iconClass: 'grey darken-5 white--text',
          icon: 'mdi-account-search',
          title: 'Pacientes Sospechosos',
          data: '78',
          action: {
            label: 'more',
            link: '',
          },
        },
        {
          bgColor: 'pink  darken-1',
          iconClass: 'grey darken-5 white--text',
          icon: 'mdi-account-plus',
          title: 'Pacientes Positivos',
          data: '72',
          action: {
            label: 'more',
            link: '',
          },
        },
        {
          bgColor: 'pink  darken-1',
          iconClass: 'grey darken-5 white--text',
          icon: 'mdi-account-plus',
          title: 'Sospechosos Pendientes a Ingreso',
          data: '25',
          action: {
            label: 'more',
            link: '',
          },
        },
        {
          bgColor: 'pink  darken-1',
          iconClass: 'grey darken-5 white--text',
          icon: 'mdi-account-plus',
          title: 'Positivos Pendientes a Ingreso',
          data: '15',
          action: {
            label: 'more',
            link: '',
          },
        },
      ],
    }),

    provide: {
      theme: { isDark: true },
    },

    computed: {
      minHeight () {
        const height = this.$vuetify.breakpoint.mdAndUp ? '100vh' : '50vh'

        return `calc(${height} - ${this.$vuetify.application.top}px)`
      },
    },
  }
</script>

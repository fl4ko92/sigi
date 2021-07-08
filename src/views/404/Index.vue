<script>
  // Extensions
  import View from '@/views/View'

  // Mixins
  import LoadSections from '@/mixins/load-sections'

  export default {
    name: 'FourOhFour',

    metaInfo: { title: 'Oops! Pagina no encontrada!' },

    extends: View,

    mixins: [
      LoadSections([
        '404',
      ]),
    ],

    props: {
      id: {
        type: String,
        default: 'about',
      },
    },
  }
</script>

<script>
  // Extensions
  import View from '@/views/View'

  // Mixins
  import LoadSections from '@/mixins/load-sections'

  export default {
    name: 'About',

    metaInfo: { title: 'Centros de Aislamiento' },

    extends: View,

    mixins: [
      LoadSections([
        'centers',
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

<script>
  // Extensions
  import View from '@/views/View'

  // Mixins
  import LoadSections from '@/mixins/load-sections'

  export default {
    name: 'ContactUs',

    metaInfo: { title: 'Pacientes' },

    extends: View,

    mixins: [
      LoadSections([
        'patients',
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

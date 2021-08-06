/* eslint-disabled */
<script>
  // Extensions
  import View from '@/views/View'

  // Mixins
  import LoadSections from '@/mixins/load-sections'

  export default {
    name: 'IngresarPacientes',

    metaInfo: { title: 'Inicio de Sesión' },

    extends: View,

    mixins: [
      LoadSections([
        'IngresarPacientes',
      ]),
    ],

    props: {
      id: {
        type: String,
        default: 'enter_patients',
      },
    },
  }
</script>

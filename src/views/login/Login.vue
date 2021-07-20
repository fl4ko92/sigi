
<script>
  // Extensions
  import View from '@/views/View'

  // Mixins
  import LoadSections from '@/mixins/load-sections'

  export default {
    name: 'Login',

    metaInfo: { title: 'Inicio de Sesión' },

    extends: View,

    mixins: [
      LoadSections([
        'login',
      ]),
    ],

    props: {
      id: {
        type: String,
        default: 'login',
      },
    },
  }
</script>

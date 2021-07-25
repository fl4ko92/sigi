<template>
  <v-card style="padding: 8px">
    <v-list>
      <v-subheader>
        CENTROS DISPONIBLES <v-spacer />
        <v-btn
          icon
          @click="sendClose"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-subheader>
      <filter-tool :filters="filters" />
      <v-list-item-group
        v-model="selectedItem"
        color="primary"
      >
        <template v-for="(item, index) in centers">
          <v-list-item :key="item.id_centro">
            <template>
              <v-list-item-content>
                <v-list-item-title class="text-h6">
                  {{ item.nombre_centro }}
                  <v-list-item-subtitle>
                    {{ province(item.provincia) }} / {{ item.municipio }}
                  </v-list-item-subtitle>
                </v-list-item-title>

                <v-list-item-subtitle v-text="item.organismo" />
                Categorias:
              </v-list-item-content>

              <v-list-item-action>
                {{ item.disponible }} camas disponibles
              </v-list-item-action>
            </template>
          </v-list-item>
        </template>
      </v-list-item-group>
    </v-list>

    <v-card-actions>
      <v-spacer />
      <v-btn
        color="black darken-1"
        text
        @click="assignate"
      >
        cancelar
      </v-btn>
      <v-spacer />
      <v-btn
        color="green darken-1"
        dark
        :disabled="canAssignate"
        @click="assignate"
      >
        <v-icon>mdi-clipboard-check</v-icon>
        Asignar
      </v-btn>
      <v-spacer />
    </v-card-actions>
  </v-card>
</template>

<script>
  import { assignatePatient } from '@/axios/patients'
  import { getMunicipalities } from '@/axios/nomenclators'
  import FilterTool from '@/components/FilterTool.vue'
  export default {
    name: 'AssignOnePatient',
    components: { FilterTool },

    props: {
      filters: {
        type: Object,
        default: null,
      },
      patient: {
        type: Object,
        default: null,
      },
    },
    data: () => ({
      selectedItem: null,
      centers: [
        {
          id_centro: 1,
          disponible: 15,
          organismo: 'UCLV',
          municipio: 9,
          provincia: 6,
          nombre_centro: '900',
        },
        {
          id_centro: 2,
          disponible: 15,
          organismo: 'UCLV',
          municipio: 9,
          provincia: 6,
          nombre_centro: '90hvhg uig vbiu vgb luiv ui vguip vpui v puiv pi uv0',
        },
        {
          id_centro: 3,
          disponible: 15,
          organismo: 'UCLV',
          municipio: 9,
          provincia: 6,
          nombre_centro: '900',
        },
        {
          id_centro: 4,
          disponible: 15,
          organismo: 'UCLV',
          municipio: 9,
          provincia: 6,
          nombre_centro: '900',
        },
        {
          id_centro: 5,
          disponible: 15,
          organismo: 'UCLV',
          municipio: 9,
          provincia: 6,
          nombre_centro: '900',
        },
        {
          id_centro: 6,
          disponible: 15,
          organismo: 'UCLV',
          municipio: 9,
          provincia: 6,
          nombre_centro: '900',
        },
      ],
    }),
    computed: {
      canAssignate () {
        return this.selectedItem == null
      },
      provinces () {
        return this.$store.getters.provinces
      },
    },
    methods: {
      province (id) {
        const prov = this.provinces
        let ok = null
        prov.forEach(element => {
          if (element.id === id) {
            ok = element.nombre
          }
        })
        return ok
      },
      sendClose () {
        this.$emit('close-click')
      },
      async assignate () {
        try {
          await assignatePatient(this.selectedItem.id_centro, this.patient.is_paciente)
          this.$toast.success('Paciente asignado coreectamente', {
            position: 'bottom-center',
            timeout: 5000,
            closeOnClick: true,
            pauseOnFocusLoss: false,
            pauseOnHover: true,
            draggable: true,
            draggablePercent: 0.6,
            showCloseButtonOnHover: false,
            hideProgressBar: true,
            closeButton: 'button',
            icon: true,
            rtl: false,
          })
          this.sendClose()
        } catch (e) {
          this.$toast.error(e.toString(), {
            position: 'bottom-center',
            timeout: 5000,
            closeOnClick: true,
            pauseOnFocusLoss: false,
            pauseOnHover: true,
            draggable: true,
            draggablePercent: 0.6,
            showCloseButtonOnHover: false,
            hideProgressBar: true,
            closeButton: 'button',
            icon: true,
            rtl: false,
          })
        }
      },
    },
  }
</script>
<style scoped>
.fix-title {
  word-break: normal;
}
</style>

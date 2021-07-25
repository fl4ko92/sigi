<template>
  <div style="margin: 8px">
    <v-card>
      <v-card-title>
        <v-toolbar-title>Pacientes Registrados</v-toolbar-title>
        <v-divider
          vertical
          style="margin-left: 8px"
        />
        <v-spacer />
        <v-btn
          color="info"
          dark
          class="toolbar-btn"
          @click="showMe"
        >
          Show
        </v-btn>
        <v-btn
          color="info"
          class="toolbar-btn"
          dark
        >
          <v-icon>mdi-hospital-building</v-icon> Ingresar Pacientes
        </v-btn>
        <v-dialog
          v-model="dialog"
          max-width="800px"
          persistent
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="success"
              dark
              class="toolbar-btn"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>mdi-plus</v-icon>Registrar Paciente
            </v-btn>
          </template>
          <patient-form
            :title="formTitle"
            :index="editedIndex"
            :patient="editedItem"
            @close-click="close"
          />
        </v-dialog>
      </v-card-title>
      <v-expansion-panels
        v-model="filterPanel"
      >
        <filter-tool
          :filters="patientsFilters"
          :loading="loadingPatientsData"
          @filter-click="filterData"
        />
      </v-expansion-panels>
      <v-data-table
        v-model="selectedItems"
        locale="es-es"
        style="margin-top: 8px"
        :headers="headers"
        :items="patients"
        :loading="loadingPatientsData"
        :footer-props="{
          'disable-items-per-page': true,
          'items-per-page-text': 'Pacientes por página'
        }"
        :server-items-length="totalPatientsItems"
        loading-text="Cargando Pacientes"
        class="elevation-1"
        @pagination="paginatePatients"
      >
        <template v-slot:item.actions="{ item }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                class="mr-2"
                color="orange"
                v-bind="attrs"
                :loading="loadingPatientData"
                v-on="on"
                @click="editItem(item)"
              >
                mdi-pencil
              </v-icon>
            </template>
            <span>Editar</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                class="mr-2"
                color="error"
                v-bind="attrs"
                v-on="on"
                @click="deleteItem(item)"
              >
                mdi-delete
              </v-icon>
            </template>
            <span>Eliminar</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                class="mr-2"
                color="info"
                v-bind="attrs"
                v-on="on"
                @click="detailsItem(item)"
              >
                mdi-dots-horizontal-circle
              </v-icon>
            </template>
            <span>Detalle Paciente</span>
          </v-tooltip>
          <v-tooltip
            v-if="item.status !== 'Ingresado'"
            bottom
          >
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                class="mr-2"
                color="success"
                v-bind="attrs"
                v-on="on"
                @click="admit(item)"
              >
                mdi-notebook-check
              </v-icon>
            </template>
            <span>Confirmar Ingreso</span>
          </v-tooltip>
        </template>
        <template v-slot:no-data>
          No hay datos disponibles
        </template>
      </v-data-table>
    </v-card>

    <v-dialog
      v-model="infoPatient"
      persistent
      max-width="800px"
    >
      <patient-file
        :patient="editedItem"
        @close-click="closeDetails"
        @edit-click="editFromDetails"
      />
    </v-dialog>
    <v-dialog
      v-model="dialogDelete"
      max-width="500px"
      persistent
    >
      <v-card>
        <v-card-title
          class="text-h5"
          style="word-break: normal"
        >
          ¿Está seguro que desea eliminar el elemento?
        </v-card-title>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="blue darken-1"
            text
            @click="closeDelete"
          >
            Cancelar
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            :loading="loadingPatientsData"
            @click="deleteItemConfirm"
          >
            Borrar
          </v-btn>
          <v-spacer />
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="dialogDeleteUnavailable"
      max-width="500px"
      persistent
    >
      <v-card>
        <v-card-title class="text-h5">
          Este Centro no se puede eliminar porque tiene camas en uso!!!!
        </v-card-title>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="blue darken-1"
            text
            @click="closeDeleteU"
          >
            OK
          </v-btn>
          <v-spacer />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>

  import InfoBox from '@/components/InfoBox.vue'
  import PatientFile from '@/components/PatientFile.vue'
  import PatientForm from '@/components/PatientForm.vue'
  import { getPatients, getPatient, postPatient, deletePatient, putPatient } from '@/axios/patients'
  import { getCategories, getHealthStatus, getSystemStatus, getAntigenos, getProvinces, getMunicipalities, getHealthAreas } from '@/axios/nomenclators'
  import FilterTool from '@/components/FilterTool.vue'
  export default {
    components: { InfoBox, PatientFile, FilterTool, PatientForm },
    data: () => ({
      filterPanel: false,
      selectedItems: [],
      assignOnePatient: false,
      antigensData: [],
      patientsFilters: {
        page: 1,
        categoria: null,
        estado_sistema: null,
        nombre: null,
        apellidos: null,
        ci: null,
        centro: null,
      },
      patientsFirstLoad: true,
      totalPatientsItems: 0,
      infoPatient: false,
      toDeleteId: -1,
      loadingPatientsData: false,
      loadingPatientData: false,
      valid: false,
      asymptomatic: true,
      modal: false,
      dialogDeleteUnavailable: false,
      dialog: false,
      dialogDelete: false,
      healthAreas: [],
      categories: [],
      headers: [
        {
          text: 'CI',
          align: 'start',
          sortable: false,
          value: 'ci',
        },
        { text: 'Nombre', value: 'nombre', sortable: false },
        { text: 'Apellidos', value: 'apellidos', sortable: false },
        { text: 'Acciones', value: 'actions', sortable: false },
      ],
      patients: [],
      editedIndex: -1,
      editedItem: {
        asymptomatic: true,
        isContact: false,
        arrived: false,
        nombre: '',
        apellidos: '',
        ci: '',
        edad: 0,
        sexo: '',
        direccion: '',
        municipio: '',
        provincia: '',
        cmf: '',
        area_salud: '',
        remite_caso: '',
        noApp: true,
        estado_sistema: '',
        trabajador_salud: false,
        ninho: false,
        embarazada: false,
        vacunado: false,
        test_antigeno: 2,
        sintomas: [],
        app: [],

        // eslint-disable-next-line camelcase
        fecha_sintomas: null,
        fiebre: false,
        rinorrea: false,
        congestion_nasal: false,
        tos: false,
        expectoracion: false,
        dificultad_respiratoria: false,
        cefalea: false,
        dolor_garganta: false,
        otros_sint: '',

        hipertension: false,
        diabetes: false,
        asma: false,
        obesidad: false,
        insuficiencia_renal: false,
        oncologia: false,
        otros_apps: '',

        fecha_arribo: null,
        pais_procedencia: '',
        lugar_estancia: '',

        fecha_contacto: null,
        tipo_contacto: '',
        lugar_contacto: '',

      },
      defaultItem: {
        asymptomatic: true,
        isContact: false,
        arrived: false,
        nombre: '',
        apellidos: '',
        ci: '',
        edad: 0,
        noApp: true,
        sexo: '',
        direccion: '',
        municipio: '',
        provincia: '',
        cmf: '',
        area_salud: '',
        remite_caso: '',
        sintomas: [],
        app: [],
        estado_sistema: '',
        trabajador_salud: false,
        ninho: false,
        embarazada: false,
        vacunado: false,
        test_antigeno: 2,

        // eslint-disable-next-line camelcase
        fecha_sintomas: null,
        fiebre: false,
        rinorrea: false,
        congestion_nasal: false,
        tos: false,
        expectoracion: false,
        dificultad_respiratoria: false,
        cefalea: false,
        dolor_garganta: false,
        otros_sint: '',

        hipertension: false,
        diabetes: false,
        asma: false,
        obesidad: false,
        insuficiencia_renal: false,
        oncologia: false,
        otros_apps: '',

        fecha_arribo: null,
        pais_procedencia: '',
        lugar_estancia: '',

        fecha_contacto: null,
        tipo_contacto: '',
        lugar_contacto: '',
      },
    }),

    computed: {
      provinces () {
        return this.$store.getters.provinces
      },
      municipalities () {
        return this.$store.getters.municipalities
      },
      formTitle () {
        return this.editedIndex === -1 ? 'Registrar Paciente' : 'Editar datos de paciente'
      },
      disableRemissionCenterName () {
        return (this.editedItem.remissionCenter.type !== 'Hospital') && (this.editedItem.remissionCenter.type !== 'Otro')
      },
      systemStatusesData () {
        return this.$store.getters.systemStatuses
      },
    },

    created () {
      this.loadPatientsData()
      if (this.$store.getters.systemStatuses === null) {
        this.getSystemStatusData()
      }
      getHealthStatus()
      getProvinces()
      this.getAntigenData()
    },

    methods: {
      showMe () {
        console.log(this.patientsFilters)
      },
      filterData () {
        this.loadPatientsData()
        this.filterPanel = false
      },
      async getSystemStatusData () {
        try {
          await getSystemStatus()
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
      async getAntigenData () {
        try {
          const antigenResponse = await getAntigenos()
          this.antigensData = antigenResponse.data
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
      editFromDetails () {
        this.closeDetails()
        this.editItem(this.editedItem)
      },
      closeAssignate () {
        this.assignOnePatient = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },
      async detailsItem (item) {
        this.loadingPatientData = true
        try {
          const patientResponse = await getPatient(item.id_paciente)
          this.editedItem = Object.assign({}, patientResponse.data.paciente)
          /*      if (this.editedItem.apps !== null) {
            this.editedItem.hipertension = this.editedItem.apps.hipertension
            this.editedItem.diabetes = this.editedItem.apps.diabetes
            this.editedItem.asma = this.editedItem.apps.asma
            this.editedItem.obesidad = this.editedItem.apps.obesidad
            this.editedItem.insuficiencia_renal = this.editedItem.apps.insuficiencia_renal
            this.editedItem.oncologia = this.editedItem.apps.oncologia
            this.editedItem.otros_apps = this.editedItem.apps.otros
            if (this.editedItem.hipertension || this.editedItem.diabetes || this.editedItem.asma || this.editedItem.obesidad || this.editedItem.insuficiencia_renal || this.editedItem.oncologia || this.editedItem.otros_apps) {
              this.noApp = false
            }
          }
          if (this.editedItem.sintomas !== null) {
            this.editedItem.fecha_sintomas = this.editedItem.sintomas.fecha_sintomas
            this.editedItem.fiebre = this.editedItem.sintomas.fiebre
            this.editedItem.rinorrea = this.editedItem.sintomas.rinorrea
            this.editedItem.congestion_nasal = this.editedItem.sintomas.congestion_nasal
            this.editedItem.tos = this.editedItem.sintomas.tos
            this.editedItem.expectoracion = this.editedItem.sintomas.expectoracion
            this.editedItem.dificultad_respiratoria = this.editedItem.sintomas.dificultad_respiratoria
            this.editedItem.cefalea = this.editedItem.sintomas.cefalea
            this.editedItem.dolor_garganta = this.editedItem.sintomas.dolor_garganta
            this.editedItem.otros_sint = this.editedItem.sintomas.otros
            if (this.editedItem.fecha_sintomas || this.editedItem.fiebre || this.editedItem.rinorrea || this.editedItem.congestion_nasal || this.editedItem.tos || this.editedItem.expectoracion || this.editedItem.dificultad_respiratoria || this.editedItem.cefalea || this.editedItem.dolor_garganta || this.editedItem.otros_sint) {
              this.asymptomatic = false
            }
          }
          if (this.editedItem.contacto !== null) {
            this.editedItem.fecha_contacto = this.editedItem.contacto.fecha_contacto
            this.editedItem.lugar_contacto = this.editedItem.contacto.lugar_contacto
            this.editedItem.tipo_contacto = this.editedItem.contacto.tipo_contacto
            if (this.editedItem.fecha_contacto || this.editedItem.lugar_contacto || this.editedItem.tipo_contacto) {
              this.isContact = true
            }
          }
          if (this.editedItem.arribo !== null) {
            this.editedItem.pais_procedencia = this.editedItem.arribo.pais_procedencia
            this.editedItem.lugar_estancia = this.editedItem.arribo.lugar_estancia
            this.editedItem.fecha_arribo = this.editedItem.arribo.fecha_arribo
            if (this.editedItem.pais_procedencia || this.editedItem.lugar_estancia || this.editedItem.fecha_arribo) {
              this.arrived = true
            }
          } */
          this.infoPatient = true
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
        this.loadingPatientData = true
      },
      closeDeleteU () {
        this.dialogDeleteUnavailable = false
      },
      async loadPatientsData () {
        this.loadingPatientsData = true
        try {
          const patientsResponse = await getPatients(this.patientsFilters)
          this.totalPatientsItems = patientsResponse.data.meta.total
          this.patients = patientsResponse.data.pacientes
          this.loadingPatientsData = false
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
        this.patientsFirstLoad = false
      },

      async editItem (item) {
        this.loadingPatientData = true
        try {
          const patientResponse = await getPatient(item.id_paciente)
          this.editedItem = Object.assign({}, patientResponse.data.paciente)
          getMunicipalities(this.editedItem.provincia)
          if (this.editedItem.apps !== null) {
            this.editedItem.hipertension = this.editedItem.apps.hipertension
            this.editedItem.diabetes = this.editedItem.apps.diabetes
            this.editedItem.asma = this.editedItem.apps.asma
            this.editedItem.obesidad = this.editedItem.apps.obesidad
            this.editedItem.insuficiencia_renal = this.editedItem.apps.insuficiencia_renal
            this.editedItem.oncologia = this.editedItem.apps.oncologia
            this.editedItem.otros_apps = this.editedItem.apps.otros
            if (this.editedItem.hipertension || this.editedItem.diabetes || this.editedItem.asma || this.editedItem.obesidad || this.editedItem.insuficiencia_renal || this.editedItem.oncologia || this.editedItem.otros_apps) {
              this.editedItem.noApp = false
            }
          }
          if (this.editedItem.sintomas !== null) {
            this.editedItem.fecha_sintomas = this.editedItem.sintomas.fecha_sintomas
            this.editedItem.fiebre = this.editedItem.sintomas.fiebre
            this.editedItem.rinorrea = this.editedItem.sintomas.rinorrea
            this.editedItem.congestion_nasal = this.editedItem.sintomas.congestion_nasal
            this.editedItem.tos = this.editedItem.sintomas.tos
            this.editedItem.expectoracion = this.editedItem.sintomas.expectoracion
            this.editedItem.dificultad_respiratoria = this.editedItem.sintomas.dificultad_respiratoria
            this.editedItem.cefalea = this.editedItem.sintomas.cefalea
            this.editedItem.dolor_garganta = this.editedItem.sintomas.dolor_garganta
            this.editedItem.otros_sint = this.editedItem.sintomas.otros
            if (this.editedItem.fecha_sintomas || this.editedItem.fiebre || this.editedItem.rinorrea || this.editedItem.congestion_nasal || this.editedItem.tos || this.editedItem.expectoracion || this.editedItem.dificultad_respiratoria || this.editedItem.cefalea || this.editedItem.dolor_garganta || this.editedItem.otros_sint) {
              this.editedItem.asymptomatic = false
            }
          }
          if (this.editedItem.contacto !== null) {
            this.editedItem.fecha_contacto = this.editedItem.contacto.fecha_contacto
            this.editedItem.lugar_contacto = this.editedItem.contacto.lugar_contacto
            this.editedItem.tipo_contacto = this.editedItem.contacto.tipo_contacto
            if (this.editedItem.fecha_contacto || this.editedItem.lugar_contacto || this.editedItem.tipo_contacto) {
              this.editedItem.isContact = true
            }
          }
          if (this.editedItem.arribo !== null) {
            this.editedItem.pais_procedencia = this.editedItem.arribo.pais_procedencia
            this.editedItem.lugar_estancia = this.editedItem.arribo.lugar_estancia
            this.editedItem.fecha_arribo = this.editedItem.arribo.fecha_arribo
            if (this.editedItem.pais_procedencia || this.editedItem.lugar_estancia || this.editedItem.fecha_arribo) {
              this.editedItem.arrived = true
            }
          }
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
        this.loadingPatientData = false
        this.editedIndex = this.patients.indexOf(item)
        this.dialog = true
      },
      paginatePatients (pageInfo) {
        if (this.patientsFirstLoad) {
          this.patientsFirstLoad = false
        } else {
          this.patientsFilters.page = pageInfo.page
          this.loadPatientsData()
        }
      },

      deleteItem (item) {
        this.toDeleteId = item.id_paciente
        this.editedIndex = this.patients.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },
      async deleteItemConfirm () {
        this.loadingPatientsData = true
        this.patients.splice(this.editedIndex, 1)
        try {
          await deletePatient(this.toDeleteId)
          this.$toast.success('Registro eliminado correctamente', {
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
          this.loadPatientsData()
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
        this.closeDelete()
        this.loadingPatientsData = false
      },
      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },
      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },
      closeDetails () {
        this.infoPatient = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },
    },

  }
</script>
<style scoped>
.fix-title {
  word-break: normal;
}
.toolbar-btn {
  margin: 4px
}
</style>

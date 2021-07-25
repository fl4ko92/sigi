<template>
  <v-card>
    <v-card-title class="fix-title">
      <span class="text-h5">{{ title }}</span><v-spacer /> <v-btn
        icon
        @click="sendClose"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-card-title>
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
    >
      <v-card-text>
        <v-autocomplete
          v-model="patient.categoria"
          :items="categories"
          item-text="nombre"
          :rules="healthAreaRules"
          item-value="id"
          label="Categoría"
        />
        <v-container>
          <v-card style="margin-bottom: 4px">
            <v-card-title>Datos Personales</v-card-title>
            <v-card-text>
              <v-row>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-text-field
                    v-model="patient.nombre"
                    label="Nombre"
                    :rules="nameRules"
                  />
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="8"
                >
                  <v-text-field
                    v-model="patient.apellidos"
                    label="Apellidos"
                    :rules="lastNameRules"
                  />
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-text-field
                    v-model="patient.ci"
                    label="Carné de Identidad"
                    :counter="11"
                    :rules="ciRules"
                  />
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-text-field
                    v-model="patient.edad"
                    label="Edad"
                    :rules="numberRules"
                  />
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-autocomplete
                    v-model="patient.sexo"
                    :items="sexes"
                    item-text="nombre"
                    item-value="id"
                    :rules="healthAreaRules"
                    label="Sexo"
                  />
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
          <v-card>
            <v-card-title>Dirección</v-card-title>
            <v-card-text>
              <v-row>
                <v-col
                  cols="12"
                >
                  <v-text-field
                    v-model="patient.direccion"
                    label="Dirección"
                    :rules="healthAreaRules"
                  />
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-autocomplete
                    v-model="patient.provincia"
                    :items="provinces"
                    item-text="nombre"
                    no-data-text="No se pudo conectar con el servidor"
                    item-value="id"
                    :rules="healthAreaRules"
                    label="Provincia"
                    @change="loadMunicipalitiesData"
                  />
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-autocomplete
                    v-model="patient.municipio"
                    :items="municipalities"
                    no-data-text="Debe seleccionar una provincia"
                    item-text="nombre"
                    item-value="id"
                    :rules="healthAreaRules"
                    label="Municipio"
                    @change="getHealthAreaData(patient.municipio)"
                  />
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
          <v-card
            style="margin-top: 4px"
          >
            <v-card-text>
              <v-row>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-autocomplete
                    v-model="patient.area_salud"
                    :items="healthAreas"
                    :rules="healthAreaRules"
                    item-text="nombre"
                    item-value="id"
                    label="Área de Salud"
                    no-data-text="Debe seleccionar un municipio"
                  />
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-text-field
                    v-model="patient.cmf"
                    label="C.M.F."
                  />
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-combobox
                        v-model="patient.remite_caso"
                        v-bind="attrs"
                        :items="remissionTypes"
                        label="Remite el Caso"
                        v-on="on"
                      />
                    </template>
                    <span>En caso de no estar escriba de donde lo remiten</span>
                  </v-tooltip>
                </v-col>
                <!-- <v-col
                          cols="12"
                          sm="6"
                          md="4"
                        >
                          <v-text-field
                            v-model="patient.remissionCenter.name"
                            :disabled="disableRemissionCenterName"
                            label="Nombre"
                          />
                        </v-col> -->
              </v-row>
            </v-card-text>
          </v-card>
          <v-card
            style="margin-top: 4px"
            fluid
          >
            <v-card-title>Sintomatología</v-card-title>
            <v-card-text>
              <v-row>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-checkbox
                    v-model="patient.asymptomatic"
                    label="Asintomático(a)"
                  />
                </v-col>
                <v-col
                  v-if="!patient.asymptomatic"
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-menu
                    ref="menu"
                    v-model="menu"
                    :close-on-content-click="false"
                    :return-value.sync="patient.fecha_sintomas"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="patient.fecha_sintomas"

                        label="FIS"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      />
                    </template>
                    <v-date-picker
                      v-model="patient.fecha_sintomas"

                      no-title
                      scrollable
                    >
                      <v-spacer />
                      <v-btn
                        text
                        color="primary"
                        @click="menu = false"
                      >
                        Cancelar
                      </v-btn>
                      <v-btn
                        text
                        color="primary"
                        @click="$refs.menu.save(patient.fecha_sintomas)"
                      >
                        OK
                      </v-btn>
                    </v-date-picker>
                  </v-menu>
                </v-col>
              </v-row>
              <v-row
                v-if="!patient.asymptomatic"
              >
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-checkbox
                    v-model="patient.fiebre"
                    label="Fiebre >38ºC"
                  />
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-checkbox
                    v-model="patient.rinorrea"
                    label="Rinorrea"
                  />
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-checkbox
                    v-model="patient.congestion_nasal"
                    label="Congestión Nasal"
                  />
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-checkbox
                    v-model="patient.tos"
                    label="Tos"
                  />
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-checkbox
                    v-model="patient.expectoracion"
                    label="Expectoracion"
                  />
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-checkbox
                    v-model="patient.dolor_garganta"
                    label="Dolor de garganta"
                  />
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-checkbox
                    v-model="patient.cefalea"
                    label="Cefalea"
                  />
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-checkbox
                    v-model="patient.dificultad_respiratoria"
                    label="Dificultad Respiratoria"
                  />
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-checkbox
                    v-model="othersS"
                    label="Otros"
                  />
                </v-col>
                <v-col
                  cols="12"
                  sm="12"
                  md="12"
                >
                  <v-text-field
                    v-model="patient.otros_sint"
                    :disabled="!othersS"
                    label="Otros Síntomas"
                  />
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
          <v-card
            style="margin-top: 4px"
            fluid
          >
            <v-card-title>Antecedentes Patológicos Personales</v-card-title>
            <v-card-text>
              <v-row>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-checkbox
                    v-model="patient.noApp"
                    label="No refiere"
                  />
                </v-col>
              </v-row>
              <v-row
                v-if="!patient.noApp"
              >
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-checkbox
                    v-model="patient.hipertension"
                    label="HTA"
                  />
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-checkbox
                    v-model="patient.diabetes"
                    label="Diabetes"
                  />
                </v-col>
                <!-- <v-col
                          cols="12"
                          sm="6"
                          md="4"
                        >
                          <v-checkbox
                            v-model="patient.apps."
                            label="DM Tipo II"
                            value="dm2"
                          />
                        </v-col> -->
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-checkbox
                    v-model="patient.asma"
                    label="Asma"
                  />
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-checkbox
                    v-model="patient.obesidad"
                    label="Obesidad"
                  />
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-checkbox
                    v-model="patient.insuficiencia_renal"
                    label="Insuficiencia Renal"
                  />
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-checkbox
                    v-model="patient.oncologia"
                    label="Oncología"
                  />
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-checkbox
                    v-model="othersApp"
                    label="Otros"
                  />
                </v-col>
                <v-col
                  cols="12"
                  sm="12"
                  md="12"
                >
                  <v-text-field
                    v-model="patient.otros_apps"
                    :disabled="!othersApp"
                    label="Otros APP de interés"
                  />
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
          <v-card
            style="margin-top: 4px"
            fluid
          >
            <v-card-title>Contacto de Caso Positivo</v-card-title>
            <v-card-text>
              <v-row>
                <v-col
                  cols="12"
                  sm="6"
                  md="6"
                >
                  <v-checkbox
                    v-model="patient.isContact"
                    label="Es contacto de Caso Positivo"
                  />
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="6"
                >
                  <v-menu
                    ref="menu2"
                    v-model="menu2"
                    :disabled="!patient.isContact"
                    :close-on-content-click="false"
                    :return-value.sync="patient.fecha_contacto"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="patient.fecha_contacto"
                        :disabled="!patient.isContact"
                        label="Fecha de Contacto"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      />
                    </template>
                    <v-date-picker
                      v-model="patient.fecha_contacto"
                      :disabled="!patient.isContact"
                      no-title
                      scrollable
                    >
                      <v-spacer />
                      <v-btn
                        text
                        color="primary"
                        @click="menu2 = false"
                      >
                        Cancelar
                      </v-btn>
                      <v-btn
                        text
                        color="primary"
                        @click="$refs.menu2.save(patient.fecha_contacto)"
                      >
                        OK
                      </v-btn>
                    </v-date-picker>
                  </v-menu>
                </v-col>
                <v-col
                  cols="12"
                >
                  <v-text-field
                    v-model="patient.tipo_contacto"
                    :disabled="!patient.isContact"
                    label="Tipo de Contacto"
                  />
                </v-col>
                <v-col
                  cols="12"
                >
                  <v-text-field
                    v-model="patient.lugar_contacto"
                    :disabled="!patient.isContact"
                    label="Lugar de Contacto"
                  />
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
          <v-card
            style="margin-top: 4px"
            fluid
          >
            <v-card-title>Arribado</v-card-title>
            <v-card-text>
              <v-row>
                <v-col
                  cols="12"
                  sm="8"
                  md="8"
                >
                  <v-checkbox
                    v-model="patient.arrived"
                    label="¿Ha arribado del extranjero en los últimos 15 días?"
                  />
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-autocomplete
                    v-model="patient.pais_procedencia"
                    :disabled="!patient.arrived"
                    :items="countriesD"
                    item-text="name_es"
                    item-value="name_es"
                    label="País de procedencia"
                  />
                </v-col>
                <v-col
                  cols="12"
                  sm="12"
                  md="12"
                >
                  <v-text-field
                    v-model="patient.lugar_estancia"
                    :disabled="!patient.arrived"
                    label="Lugar de Residencia"
                  />
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="6"
                >
                  <v-menu
                    ref="menu3"
                    v-model="menu3"
                    :disabled="!patient.arrived"
                    :close-on-content-click="false"
                    :return-value.sync="patient.fecha_arribo"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="patient.fecha_arribo"
                        :disabled="!patient.arrived"
                        label="Fecha de Arribo"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      />
                    </template>
                    <v-date-picker
                      v-model="patient.fecha_arribo"
                      :disabled="!patient.arrived"
                      no-title
                      scrollable
                    >
                      <v-spacer />
                      <v-btn
                        text
                        color="primary"
                        @click="menu3 = false"
                      >
                        Cancelar
                      </v-btn>
                      <v-btn
                        text
                        color="primary"
                        @click="$refs.menu3.save(patient.fecha_arribo)"
                      >
                        OK
                      </v-btn>
                    </v-date-picker>
                  </v-menu>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
          <v-card
            style="margin-top: 4px"
            fluid
          >
            <v-card-title>Otros Datos de Interés</v-card-title>
            <v-card-text>
              <v-row>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-autocomplete
                    v-model="patient.test_antigeno"
                    :items="antigens"
                    item-text="nombre"
                    item-value="id"
                    no-data-text="No se pudo conectar con el servidor"
                    label="Test Antígeno"
                  />
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-autocomplete
                    v-model="patient.estado_sistema"
                    :items="systemStatuses"
                    item-text="nombre"
                    no-data-text="No se pudo conectar con el servidor"
                    item-value="id"
                    label="Estado en el sistema"
                  />
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-autocomplete
                    v-model="patient.estado_salud"
                    :items="healthStatuses"
                    item-text="nombre"
                    no-data-text="No se pudo conectar con el servidor"
                    item-value="id"
                    label="Estado de salud"
                  />
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-autocomplete
                    v-model="patient.clasificacion"
                    :items="clasifications"
                    item-text="nombre"
                    no-data-text="No se pudo conectar con el servidor"
                    item-value="id"
                    label="Clasificación"
                  />
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-checkbox
                    v-model="patient.trabajador_salud"
                    label="ES TRABAJADOR DE SALUD"
                  />
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-checkbox
                    v-model="patient.vacunado"
                    label="ESTÁ VACUNADO"
                  />
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-checkbox
                    v-model="patient.embarazada"
                    :disabled="disablePregnant"
                    label="Embarazada"
                  />
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-checkbox
                    v-model="patient.ninho"
                    :disabled="disableChild"
                    label="Niño"
                    value="child"
                  />
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-container>
      </v-card-text>
    </v-form>

    <v-card-actions>
      <v-spacer />
      <v-btn
        color="blue darken-1"
        text
        @click="sendClose"
      >
        Cancelar
      </v-btn>
      <v-btn
        color="blue darken-1"
        text
        :loading="loadingPatientData"
        @click="save"
      >
        Guardar
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  import { getCategories, getProvinces, getHealthAreas, getMunicipalities, getHealthStatus, getClasifications } from '@/axios/nomenclators'
  import { COUNTRIES } from '@/utils/constants'
  import { postPatient, putPatient, getPatients } from '@/axios/patients'
  import { isLastName, isId, isPositiveNumber, isCmf } from '@/utils/regex'
  export default {
    name: 'PatientForm',

    props: {
      index: {
        type: Number,
        default: -1,
      },
      title: {
        type: String,
        default: 'Paciente',
      },
      patient: {
        type: Object,
        default: null,
      },
    },
    data: () => ({
      loadingPatientData: false,
      menu: false,
      remissionTypes: ['Policlínico', 'C.M.F.', 'Hospital'],
      othersS: false,
      othersApp: false,
      menu2: false,
      menu3: false,
      sexes: [
        { nombre: 'Masculino', id: 'M' }, { nombre: 'Femenino', id: 'F' },
      ],
      valid: false,
      healthAreaRules: [
        v => !!v || 'Este campo es requerido',
      ],
      cmfRules: [
        v => isCmf(v) || 'Este campo es requerido',
      ],
      numberRules: [
        v => !!v || 'Este campo es requerido',
        v => isPositiveNumber(v) || 'Debe chequear la edad',
      ],
      ciRules: [
        v => !!v || 'El Carné es requerido',
        v => isId(v) || 'Debe chequear el carné',
      ],
      nameRules: [
        v => !!v || 'Este campo es requerido',
        v => isLastName(v) || 'Debe chequear el nombre',
      ],
      lastNameRules: [
        v => !!v || 'Este campo es requerido',
        v => isLastName(v) || 'Debe chequear el nombre',
      ],
    }),
    computed: {
      countriesD () {
        return COUNTRIES
      },
      provinces () {
        return this.$store.getters.provinces
      },
      categories () {
        return this.$store.getters.categories
      },
      municipalities () {
        return this.$store.getters.municipalities
      },
      healthAreas () {
        return this.$store.getters.healthAreas
      },
      healthStatuses () {
        return this.$store.getters.healthStatuses
      },
      antigens () {
        return this.$store.getters.antigens
      },
      systemStatuses () {
        return this.$store.getters.systemStatuses
      },
      disablePregnant () {
        return this.patient.ninho
      },
      disableChild () {
        return this.patient.embarazada
      },
      clasifications () {
        return this.$store.getters.clasifications
      },
    },
    created () {
      console.log(this.index)
      if (this.$store.getters.categories.length === 0) {
        getCategories()
      }
      if (this.$store.getters.provinces.length === 0) {
        getProvinces()
      }
      if (this.patient.provincia !== '') {
        getMunicipalities(this.patient.provincia)
      }
      if (this.patient.municipio !== '' && this.$store.getters.healthAreas.length === 0) {
        getHealthAreas(this.patient.municipio)
      }
      if (this.$store.getters.healthStatuses !== '') {
        getHealthStatus()
      }
      if (this.$store.getters.clasifications.length === 0) {
        getClasifications()
      }
    },
    methods: {
      close () {
        this.$refs.form.resetValidation()

        this.$nextTick(() => {
          this.patient = Object.assign({}, this.defaultItem)
          this.index = -1
        })
        this.sendClose()
      },
      clearData () {
        this.patient = Object.assign({}, this.defaultItem)
      },
      async getHealthAreaData () {
        try {
          await getHealthAreas(this.patient.municipio)
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
      async loadMunicipalitiesData () {
        try {
          await getMunicipalities(this.patient.provincia)
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
      sendClose () {
        this.$emit('close-click')
      },
      async save () {
        console.log(this.index)
        if (this.$refs.form.validate()) {
          if (this.index > -1) {
            this.patientsLoading = true
            // Actualizar
            try {
              await putPatient(this.patient)
              this.$toast.success('Datos actualizados correctamente', {
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

              this.$refs.form.reset()
              this.$refs.form.resetValidation()
              this.clearData()
              this.close()
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
          } else {
            // Añadir
            try {
              await postPatient(this.patient)
              this.$toast.success('Registro exitoso', {
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
              this.$refs.form.reset()
              this.$refs.form.resetValidation()
              this.clearData()
              this.close()
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
          }
          getPatients()
        } else {
          this.$toast.error('Chequee los datos incorrectos', {
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

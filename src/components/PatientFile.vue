<template>
  <v-card style="padding: 8px">
    <v-row no-gutters>
      <v-col
        cols="12"
        sm="6"
        md="2"
      >
        <v-avatar
          size="100"
          color="info"
        >
          <v-icon
            x-large
            color="white"
          >
            mdi-account
          </v-icon>
        </v-avatar>
      </v-col>
      <v-col
        cols="12"
        sm="5"
        md="10"
      >
        <v-row no-gutters>
          <v-col
            cols="12"
          >
            <v-row no-gutters>
              <div class="text-h5">
                {{ patient.nombre }} {{ patient.apellidos }}
              </div>
              <v-spacer />
              <v-btn
                icon
                @click="sendClose"
              >
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-row>
          </v-col>
          <v-col
            cols="12"
            sm="5"
            md="1"
          >
            <v-icon sty>
              mdi-card-account-details
            </v-icon>
          </v-col>
          <v-col
            cols="12"
            sm="5"
            md="11"
          >
            {{ patient.ci }}
          </v-col>
          <v-col
            cols="12"
            sm="5"
            md="1"
          >
            <v-icon sty>
              mdi-timer-sand-full
            </v-icon>
          </v-col>
          <v-col
            cols="12"
            sm="5"
            md="11"
          >
            {{ patient.edad }} años
          </v-col>
          <v-col
            cols="12"
            sm="5"
            md="1"
          >
            <v-icon sty>
              mdi-gender-male-female
            </v-icon>
          </v-col>
          <v-col
            cols="12"
            sm="5"
            md="11"
          >
            {{ patient.sexo }}
          </v-col>
          <v-col
            cols="12"
            sm="5"
            md="1"
          >
            <v-icon sty>
              mdi-map-marker
            </v-icon>
          </v-col>
          <v-col
            cols="12"
            sm="5"
            md="11"
          >
            {{ patient.direccion }} => {{ patient.provincia }}  / {{ patient.municipio }}
          </v-col>
          <v-col
            cols="12"
            sm="5"
            md="1"
          >
            <v-icon sty>
              mdi-hospital-building
            </v-icon>
          </v-col>
          <v-col
            cols="12"
            sm="5"
            md="11"
          >
            {{ patient.area_salud }}
          </v-col>
          <v-col
            cols="12"
            sm="5"
            md="1"
          >
            <v-icon sty>
              mdi-domain
            </v-icon>
          </v-col>
          <v-col
            cols="12"
            sm="5"
            md="11"
          >
            {{ patient.cmf }}
          </v-col>
          <v-col
            cols="12"
            sm="5"
            md="1"
          >
            <v-icon sty>
              mdi-directions
            </v-icon>
          </v-col>
          <v-col
            cols="12"
            sm="5"
            md="11"
          >
            {{ patient.remite_caso }}
          </v-col>
          <v-col
            cols="12"
          >
            <v-card style="margin-top: 4px">
              <v-card-subtitle>
                <b>Sintomatología</b>
              </v-card-subtitle>
              <v-card-text v-if="!asymptomatic">
                <span
                  v-if="patient.fecha_sintomas"
                  style="margin: 4px"
                >{{ fecha_sintomas }}</span>
                <span
                  v-if="patient.fiebre"
                  style="margin: 4px"
                >Fiebre >38°C</span>
                <span
                  v-if="patient.rinorrea"
                  style="margin: 4px"
                >Rinorrea</span>
                <span
                  v-if="patient.congestion_nasal"
                  style="margin: 4px"
                >Congestión Nasal</span>
                <span
                  v-if="patient.tos"
                  style="margin: 4px"
                >Tos</span>
                <span
                  v-if="patient.expectoracion"
                  style="margin: 4px"
                >Expectoración</span>
                <span
                  v-if="patient.dificultad_respiratoria"
                  style="margin: 4px"
                >Dificultad Respiratoria</span>
                <span
                  v-if="patient.cefalea"
                  style="margin: 4px"
                >Cefalea</span>
                <span
                  v-if="patient.dolor_garganta"
                  style="margin: 4px"
                >Dolor de Garganta</span>
                <span
                  v-if="patient.otros"
                  style="margin: 4px"
                >{{ patient.otros_sint }}</span>
              </v-card-text>
              <v-card-text v-else>
                <span>Asintomático</span>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col
            cols="12"
          >
            <v-card style="margin-top: 4px">
              <v-card-subtitle>
                <b>APP</b>
              </v-card-subtitle>
              <v-card-text v-if="!noapp">
                <span
                  v-if="patient.hipertension"
                  style="margin: 4px"
                >HTA</span>
                <span
                  v-if="patient.diabetes"
                  style="margin: 4px"
                >Diabetes</span>
                <span
                  v-if="patient.asma"
                  style="margin: 4px"
                >Asma</span>
                <span
                  v-if="patient.obesidad"
                  style="margin: 4px"
                >Obesidad</span>
                <span
                  v-if="patient.insuficiencia_renal"
                  style="margin: 4px"
                >Insuficiencia Renal</span>
                <span
                  v-if="patient.oncologia"
                  style="margin: 4px"
                >Oncología</span>
                <span
                  v-if="patient.otros_apps"
                  style="margin: 4px"
                >{{ patient.otros_apps }}</span>
              </v-card-text>
              <v-card-text v-else>
                <span>No refiere</span>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col
            v-if="arrived"
            cols="12"
          >
            <v-card style="margin-top: 4px">
              <v-card-subtitle>
                <b>Arribado</b>
              </v-card-subtitle>
              <v-card-text>
                <span
                  v-if="patient.pais_procedencia"
                  style="margin: 4px"
                >{{ patient.pais_procedencia }}</span>
                <span
                  v-if="patient.lugar_estancia"
                  style="margin: 4px"
                >{{ patient.lugar_estancia }}</span>
                <span
                  v-if="patient.fecha_arribo"
                  style="margin: 4px"
                >{{ patient.fecha_arribo }}</span>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col
            cols="12"
          >
            <v-card style="margin-top: 4px">
              <v-card-subtitle>
                <b>Contacto</b>
              </v-card-subtitle>
              <v-card-text v-if="contact">
                <span
                  v-if="patient.fecha_contacto"
                  style="margin: 4px"
                >{{ patient.fecha_contacto }}</span>
                <span
                  v-if="patient.lugar_contacto"
                  style="margin: 4px"
                >{{ patient.lugar_contacto }}</span>
                <span
                  v-if="patient.tipo_contacto"
                  style="margin: 4px"
                >{{ patient.tipo_contacto }}</span>
              </v-card-text>
              <v-card-text v-else>
                <span>No refiere contacto con positivo</span>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col
            cols="12"
          >
            <v-card style="margin-top: 4px">
              <v-card-subtitle>
                <b>Otros Datos</b>
              </v-card-subtitle>
              <v-card-text>
                <span
                  v-if="patient.estado_sistema"
                  style="margin: 4px"
                >{{ patient.estado_sistema }}</span>
                <span
                  v-if="patient.trabajador_salud"
                  style="margin: 4px"
                >Trabajador de Salud</span>
                <span
                  v-if="patient.ninho"
                  style="margin: 4px"
                >Niño</span>
                <span
                  v-if="patient.embarazada"
                  style="margin: 4px"
                >Embarazada</span>
                <span
                  v-if="patient.vacunado"
                  style="margin: 4px"
                >Vacunado</span>
                <span
                  v-if="patient.test_antigeno"
                  style="margin: 4px"
                >Test antígeno {{ patient.test_antigeno }}</span>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-card-actions>
      <v-spacer />
      <v-btn
        color="blue darken-1"
        text
        @click="sendClose"
      >
        OK
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  export default {
    name: 'PatientFile',
    props: {
      patient: {
        type: {},
        default: null,
      },
    },
    data: () => ({
      formTitle: 'Datos del Paciente',
    }),
    computed: {
      noApp () {
        return (this.patient.hipertension || this.patient.diabetes || this.patient.asma || this.patient.obesidad || this.patient.insuficiencia_renal || this.patient.oncologia || this.patient.otros_apps)
      },
      asymptomatic () {
        return !(this.patient.fecha_sintomas || this.patient.fiebre || this.patient.rinorrea || this.patient.congestion_nasal || this.patient.tos || this.patient.expectoracion || this.patient.dificultad_respiratoria || this.patient.cefalea || this.patient.dolor_garganta || this.patient.otros_sint)
      },
      arrived () {
        return (this.patient.pais_procedencia || this.patient.lugar_estancia || this.patient.fecha_arribo)
      },
      contact () {
        return (this.patient.fecha_contacto || this.patient.lugar_contacto || this.patient.tipo_contacto)
      },
    },
    methods: {
      sendClose () {
        this.$emit('close-click')
      },
    },
  }
</script>

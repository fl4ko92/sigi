<template>
  <div style="margin: 8px">
    <info-box :stats="myStats" />
    <v-data-table
      style="margin-top: 8px"
      :headers="headers"
      :items="patients"
      sort-by="ci"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Pacientes Registrados</v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          />
          <v-spacer />
          <!--  <router-link
            :to="{name: Admit}"
            style="margin : 4px"
          >
            <v-btn
              color="success"
              dark
              class="mb-2"
            >
              <v-icon>mdi-notebook-check</v-icon>Ingresar Paciente(s)
            </v-btn>
          </router-link> -->
          <v-dialog
            v-model="dialog"
            max-width="800px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="success"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>mdi-plus</v-icon>Registrar Paciente
              </v-btn>
            </template>
            <v-card>
              <v-card-title class="fix-title">
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-select
                  :items="patientsStatus"
                  label="Concepto por el que se registra"
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
                            v-model="editedItem.name"
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
                            v-model="editedItem.lastname"
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
                            v-model="editedItem.ci"
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
                            v-model="editedItem.age"
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
                            v-model="editedItem.sex"
                            :items="sexes"
                            item-text="name"
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
                          sm="6"
                          md="4"
                        >
                          <v-text-field
                            v-model="editedItem.address.street"
                            label="Calle"
                          />
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="2"
                        >
                          <v-text-field
                            v-model="editedItem.address.number"
                            label="Número"
                          />
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="6"
                        >
                          <v-text-field
                            v-model="editedItem.address.between"
                            label="Entrecalles"
                          />
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                        >
                          <v-autocomplete
                            v-model="editedItem.address.province"
                            :items="provinces"
                            item-text="name"
                            label="Provincia"
                          />
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                        >
                          <v-autocomplete
                            v-model="editedItem.address.municipality"
                            :items="municipalities"
                            item-text="name"
                            label="Municipio"
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
                            v-model="editedItem.healthArea"
                            :items="healthAreas"
                            :rules="healthAreaRules"
                            item-text="name"
                            label="Área de Salud"
                          />
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                        >
                          <v-text-field
                            v-model="editedItem.cmf"
                            label="C.M.F."
                            :rules="cmfRules"
                          />
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                          class="hidden-sm-and-down"
                        />

                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                        >
                          <v-autocomplete
                            v-model="editedItem.remissionCenter.type"
                            :items="centerTypes"
                            item-text="name"
                            label="Centro que remite el caso"
                          />
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                        >
                          <v-text-field
                            v-model="editedItem.remissionCenter.name"
                            :disabled="disableRemissionCenterName"
                            label="Nombre"
                          />
                        </v-col>
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
                            v-model="editedItem.asyn"
                            label="Asintomático(a)"
                          />
                        </v-col>
                        <v-col
                          v-if="!editedItem.asyn"
                          cols="12"
                          sm="6"
                          md="4"
                        >
                          <v-menu
                            ref="menu"
                            v-model="menu"
                            :disabled="editedItem.asyn"
                            :close-on-content-click="false"
                            :return-value.sync="editedItem.fis"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                v-model="editedItem.fis"
                                :disabled="editedItem.asyn"
                                label="FIS"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                              />
                            </template>
                            <v-date-picker
                              v-model="editedItem.fis"
                              :disabled="editedItem.asyn"
                              no-title
                              scrollable
                            >
                              <v-spacer />
                              <v-btn
                                text
                                color="primary"
                                @click="menu = false"
                              >
                                Cancel
                              </v-btn>
                              <v-btn
                                text
                                color="primary"
                                @click="$refs.menu.save(editedItem.fis)"
                              >
                                OK
                              </v-btn>
                            </v-date-picker>
                          </v-menu>
                        </v-col>
                      </v-row>
                      <v-row
                        v-if="!editedItem.asyn"
                      >
                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                        >
                          <v-checkbox
                            v-model="editedItem.synptoms"
                            :disabled="editedItem.asyn"
                            label="Fiebre >38ºC"
                            value="fever"
                          />
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                        >
                          <v-checkbox
                            v-model="editedItem.synptoms"
                            :disabled="editedItem.asyn"
                            label="Rinorrea"
                            value="sneezing"
                          />
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                        >
                          <v-checkbox
                            v-model="editedItem.synptoms"
                            :disabled="editedItem.asyn"
                            label="Congestión Nasal"
                            value="nasal"
                          />
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                        >
                          <v-checkbox
                            v-model="editedItem.synptoms"
                            :disabled="editedItem.asyn"
                            label="Tos"
                            value="cough"
                          />
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                        >
                          <v-checkbox
                            v-model="editedItem.synptoms"
                            :disabled="editedItem.asyn"
                            label="Expectoracion"
                            value="expectoration"
                          />
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                        >
                          <v-checkbox
                            v-model="editedItem.synptoms"
                            :disabled="editedItem.asyn"
                            label="Dolor de garganta"
                            value="troath"
                          />
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                        >
                          <v-checkbox
                            v-model="editedItem.synptoms"
                            :disabled="editedItem.asyn"
                            label="Cefalea"
                            value="headache"
                          />
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                        >
                          <v-checkbox
                            v-model="editedItem.synptoms"
                            :disabled="editedItem.asyn"
                            label="Dificultad Respiratoria"
                            value="breathe"
                          />
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                        >
                          <v-checkbox
                            v-model="editedItem.synptoms"
                            :disabled="editedItem.asyn"
                            label="Otros"
                            value="others"
                          />
                        </v-col>
                        <v-col
                          cols="12"
                          sm="12"
                          md="12"
                        >
                          <v-text-field
                            v-model="editedItem.othersSynptoms"
                            :disabled="othersS"
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
                            v-model="editedItem.noReferApp"
                            label="No refiere"
                          />
                        </v-col>
                      </v-row>
                      <v-row
                        v-if="!editedItem.noReferApp"
                      >
                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                        >
                          <v-checkbox
                            v-model="editedItem.app"
                            label="HTA"
                            value="hta"
                          />
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                        >
                          <v-checkbox
                            v-model="editedItem.app"
                            label="DM Tipo I"
                            value="dm1"
                          />
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                        >
                          <v-checkbox
                            v-model="editedItem.app"
                            label="DM Tipo II"
                            value="dm2"
                          />
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                        >
                          <v-checkbox
                            v-model="editedItem.app"
                            label="Asma"
                            value="asma"
                          />
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                        >
                          <v-checkbox
                            v-model="editedItem.app"
                            label="Obesidad"
                            value="obesity"
                          />
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                        >
                          <v-checkbox
                            v-model="editedItem.app"
                            label="Insuficiencia Renal"
                            value="insufR"
                          />
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                        >
                          <v-checkbox
                            v-model="editedItem.app"
                            label="Oncología"
                            value="onco"
                          />
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                        >
                          <v-checkbox
                            v-model="editedItem.app"
                            label="Otros"
                            value="others"
                          />
                        </v-col>
                        <v-col
                          cols="12"
                          sm="12"
                          md="12"
                        >
                          <v-text-field
                            v-model="editedItem.othersApp"
                            :disabled="othersApp"
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
                            v-model="editedItem.contactWithPositive.isContact"
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
                            :disabled="!editedItem.contactWithPositive.isContact"
                            :close-on-content-click="false"
                            :return-value.sync="editedItem.contactWithPositive.dateOfContact"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                v-model="editedItem.contactWithPositive.dateOfContact"
                                :disabled="!editedItem.contactWithPositive.isContact"
                                label="Fecha de Contacto"
                                prepend-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                              />
                            </template>
                            <v-date-picker
                              v-model="editedItem.contactWithPositive.dateOfContact"
                              :disabled="!editedItem.contactWithPositive.isContact"
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
                                @click="$refs.menu2.save(editedItem.contactWithPositive.dateOfContact)"
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
                            v-model="editedItem.contactWithPositive.placeOfContact"
                            :disabled="!editedItem.contactWithPositive.isContact"
                            label="Lugar y Tipo de Contacto"
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
                            v-model="editedItem.arribado"
                            label="¿Ha arribado del extranjero en los últimos 15 días?"
                          />
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                        >
                          <v-autocomplete
                            v-model="editedItem.arrivalData.countryOfArrival"
                            :disabled="!editedItem.arribado"
                            :items="countries"
                            item-text="name"
                            label="País de procedencia"
                          />
                        </v-col>
                        <v-col
                          cols="12"
                          sm="12"
                          md="12"
                        >
                          <v-text-field
                            v-model="editedItem.arrivalData.residencePlace"
                            :disabled="!editedItem.arribado"
                            label="Lugar de Residencia"
                          />
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
                          <v-checkbox
                            v-model="editedItem.healthWorker"
                            label="ES TRABAJADOR DE SALUD"
                          />
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                        >
                          <v-checkbox
                            v-model="editedItem.app"
                            :disabled="disablePregnant"
                            label="Embarazada"
                            value="pregnant"
                          />
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                        >
                          <v-checkbox
                            v-model="editedItem.app"
                            :disabled="disableChild"
                            label="Niño"
                            value="child"
                          />
                        </v-col>
                        <!-- <v-col
                          cols="12"
                          sm="6"
                          md="4"
                        >
                          <v-autocomplete
                            v-model="editedItem.status"
                            :items="statuses"
                            item-text="name"
                            label="Estado"
                          />
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                        >
                          <v-autocomplete
                            v-model="editedItem.isolationCenter"
                            :items="isolationCenters"
                            item-text="name"
                            label="Centro de Aislamiento"
                          />
                        </v-col> -->
                      </v-row>
                    </v-card-text>
                  </v-card>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer />
                <v-btn
                  color="blue darken-1"
                  text
                  @click="close"
                >
                  Cancelar
                </v-btn>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="save"
                >
                  Guardar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog
            v-model="dialogDelete"
            max-width="500px"
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
                  Cancel
                </v-btn>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="deleteItemConfirm"
                >
                  OK
                </v-btn>
                <v-spacer />
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog
            v-model="dialogDeleteUnavailable"
            max-width="500px"
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
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              class="mr-2"
              color="orange"
              v-bind="attrs"
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
          <span>Ingresar</span>
        </v-tooltip>
        <v-tooltip
          v-if="!item.isolationCenter"
          bottom
        >
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              class="mr-2"
              color="grey"
              v-bind="attrs"
              v-on="on"
              @click="admit(item)"
            >
              mdi-clipboard-check
            </v-icon>
          </template>
          <span>Asignar Capacidad</span>
        </v-tooltip>
      </template>
      <template v-slot:no-data>
        <v-btn
          color="primary"
          @click="initialize"
        >
          Reset
        </v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
  import InfoBox from '../../components/InfoBox.vue'
  import { isLastName, isId, isPositiveNumber, isCmf } from '@/utils/regex'
  export default {
    components: { InfoBox },
    data: () => ({
      healthAreaRules: [
        v => !!v || 'El área de salud es requerida',
      ],
      cmfRules: [
        v => isCmf(v) || 'El área de salud es requerida',
      ],
      numberRules: [
        v => isPositiveNumber(v) || 'Debe chequear la edad',
      ],
      ciRules: [
        v => !!v || 'El Carné es requerido',
        v => isId(v) || 'Debe chequear el carné',
      ],
      nameRules: [
        v => !!v || 'El nombre es requerido',
        v => isLastName(v) || 'Debe chequear el nombre',
      ],
      lastNameRules: [
        v => !!v || 'Los apellidos son requeridos',
        v => isLastName(v) || 'Debe chequear el nombre',
      ],
      patientsStatus: ['Sospechoso', 'Positivo', 'Contacto'],
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      menu: false,
      modal: false,
      menu2: false,
      countries: [
        { name: 'Cuba' },
        { name: 'Rusia' },
        { name: 'España' },
        { name: 'EE.UU.' },
      ],
      myStats: [
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
      statuses: [
        { name: 'Ingresado' },
        { name: 'En transporte' },
        { name: 'Pendiente' },
        { name: 'En IRA del AS' },
      ],
      isolationCenters: [
        { name: 'Perez Quintosa' },
        { name: 'Pedagogico' },
        { name: 'Hospital Militar' },
        { name: 'Minerva' },
        { name: 'UCLV' },
        { name: 'Politecnico de la Salud' },
      ],
      dialogDeleteUnavailable: false,
      dialog: false,
      dialogDelete: false,
      centerTypes: [
        { name: 'Policlínico' },
        { name: 'C.M.F' },
        { name: 'Hospital' },
        { name: 'Otro' },
      ],
      healthAreas: [
        { name: 'Santa Clara' },
        { name: 'XX Aniversario' },
        { name: 'C.R.F.' },
        { name: 'Martha Abreu' },
        { name: 'Chiqui Gómez' },
        { name: 'J.R.L.A.' },
      ],
      sexes: [
        { name: 'Masculino' },
        { name: 'Femenino' },
      ],
      provinces: [
        { name: 'Villa Clara' },
        { name: 'Matanzas' },
        { name: 'Cienfuegos' },
      ],
      municipalities: [
        { name: 'Santa Clara', abbr: 'SC', id: 1 },
        { name: 'Manicaragua', abbr: 'MC', id: 2 },
        { name: 'Remedios', abbr: 'RE', id: 3 },
        { name: 'Camajuani', abbr: 'CA', id: 4 },
      ],
      categories: [
        { name: 'Sospechoso', id: 1 },
        { name: 'Positivo', id: 2 },
        { name: 'Contacto', id: 3 },
      ],
      headers: [
        {
          text: 'CI',
          align: 'start',
          sortable: true,
          value: 'ci',
        },
        { text: 'Nombre', value: 'name' },
        { text: 'Apellidos', value: 'lastname' },
        { text: 'Estado', value: 'status' },
        { text: 'Centro de Aislamiento', value: 'isolationCenter' },
        { text: 'Area', value: 'isolationArea' },
        { text: 'Acciones', value: 'actions', sortable: false },
      ],
      patients: [],
      editedIndex: -1,
      editedItem: {
        nombre: '',
        apellidos: '',
        ci: '',
        edad: 0,
        sexo: '',
        direccion: {
          calle: '',
          numero: '',
          entrecalles: '',
          municipio: '',
          provincia: '',
        },
        cmf: '',
        area_salud: '',
        remite_caso: {
          tipo: '',
          nombre: '',
        },
        fecha_sintomas: '',
        sintomas: [],
        app: [],
        contacto_positivo: {
          es_contacto: false,
          lugar_contacto: '',
          fecha_contacto: null,
        },
        estado_sistema: '',
        trabajador_salud: false,
        arribado: false,
        datos_arribo: {
          pais: '',
          residencia: '',
        },
      },
      defaultItem: {
        name: '',
        lastname: '',
        ci: '',
        age: 0,
        sex: '',
        address: {
          calle: '',
          number: '',
          between: '',
          municipality: '',
          province: '',
        },
        cmf: '',
        healthArea: '',
        remissionCenter: {
          type: '',
          name: '',
        },
        fis: '',
        synptoms: [],
        app: [],
        contactWithPositive: {
          isContact: false,
          placeOfContact: '',
          dateOfContact: null,
        },
        status: '',
        isolationCenter: '',
        healthWorker: false,
        others: '',
        asyn: false,
        noReferApp: false,
        arribado: false,
        arrivalData: {
          countryOfArrival: '',
          residencePlace: '',
        },
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Registrar Paciente' : 'Editar datos de paciente'
      },
      othersS () {
        return this.editedItem.synptoms.indexOf('others') === -1
      },
      othersApp () {
        return this.editedItem.app.indexOf('others') === -1
      },
      disablePregnant () {
        return this.editedItem.app.indexOf('child') !== -1
      },
      disableChild () {
        return this.editedItem.app.indexOf('pregnant') !== -1
      },
      disableRemissionCenterName () {
        return (this.editedItem.remissionCenter.type !== 'Hospital') && (this.editedItem.remissionCenter.type !== 'Otro')
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    created () {
      this.initialize()
    },

    methods: {
      detailsItem (item) {
        this.editedIndex = this.patients.indexOf(item)
        this.editedItem = Object.assign({}, item)
      },
      closeDeleteU () {
        this.dialogDeleteUnavailable = false
      },
      initialize () {
        this.patients = [
          {
            name: 'Yoelvis',
            lastname: 'González Pérez',
            ci: '92121234063',
            age: 28,
            sex: 'M',
            address: {
              calle: 'Oquendo',
              number: '109',
              between: 'Ateneo y Cornelio',
              municipality: 'Santa Clara',
              province: 'Villa Clara',
            },
            cmf: '20-31',
            healthArea: 'Martha Abreu',
            remissionCenter: {
              type: 'Policlinico',
              name: 'Marta Abreu',
            },
            fis: '12/5/2021',
            synptoms: [],
            app: [],
            contactWithPositive: {
              isContact: false,
              placeOfContact: 'Directo Hogar',
              dateOfContact: '12/5/2021',
            },
            status: 'Ingresado',
            isolationCenter: 'Perez Quintosa',
            isolationArea: 'Sospechosos Bajo Riesgo',
            healthWorker: false,
            others: '',
            asyn: false,
          },
          {
            name: 'Jose Armando',
            lastname: 'Hdez Rguez',
            ci: '96165214563',
            age: 24,
            sex: 'M',
            address: {
              calle: 'Oquendo',
              number: '109',
              between: 'Ateneo y Cornelio',
              municipality: 'Santa Clara',
              province: 'Villa Clara',
            },
            cmf: '20-31',
            healthArea: 'Martha Abreu',
            remissionCenter: {
              type: 'Policlinico',
              name: 'Marta Abreu',
            },
            fis: '12/5/2021',
            synptoms: [],
            app: [],
            contactWithPositive: {
              isContact: false,
              placeOfContact: 'Directo Hogar',
              dateOfContact: '12/5/2021',
            },
            status: 'En transporte',
            isolationCenter: 'Perez Quintosa',
            isolationArea: 'Contactos Directos',
            healthWorker: false,
            others: '',
            asyn: false,
          },
          {
            name: 'Yoelvis',
            lastname: 'González Pérez',
            ci: '92121234063',
            age: 28,
            sex: 'M',
            address: {
              calle: 'Oquendo',
              number: '109',
              between: 'Ateneo y Cornelio',
              municipality: 'Santa Clara',
              province: 'Villa Clara',
            },
            cmf: '20-31',
            healthArea: 'Martha Abreu',
            remissionCenter: {
              type: 'Policlinico',
              name: 'Marta Abreu',
            },
            fis: '12/5/2021',
            synptoms: [],
            app: [],
            contactWithPositive: {
              isContact: false,
              placeOfContact: 'Directo Hogar',
              dateOfContact: '12/5/2021',
            },
            status: 'En el hogar',
            isolationCenter: '',
            isolationArea: '',
            healthWorker: false,
            others: '',
            asyn: false,
          },
          {
            name: 'Yoelvis',
            lastname: 'González Pérez',
            ci: '92121234063',
            age: 28,
            sex: 'M',
            address: {
              calle: 'Oquendo',
              number: '109',
              between: 'Ateneo y Cornelio',
              municipality: 'Santa Clara',
              province: 'Villa Clara',
            },
            cmf: '20-31',
            healthArea: 'Martha Abreu',
            remissionCenter: {
              type: 'Policlinico',
              name: 'Marta Abreu',
            },
            fis: '12/5/2021',
            synptoms: [],
            app: [],
            contactWithPositive: {
              isContact: false,
              placeOfContact: 'Directo Hogar',
              dateOfContact: '12/5/2021',
            },
            status: 'En la IRA del AS Marta Abreu',
            isolationCenter: 'Perez Quintosa',
            isolationArea: 'Positivos',
            healthWorker: false,
            others: '',
            asyn: false,
          },
        ]
      },

      editItem (item) {
        this.editedIndex = this.patients.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.patients.indexOf(item)
        this.editedItem = Object.assign({}, item)
        if (this.editedItem.cap_disponible < this.editedItem.cap_total) {
          this.dialogDeleteUnavailable = true
        } else {
          this.dialogDelete = true
        }
      },
      deleteItemConfirm () {
        this.patients.splice(this.editedIndex, 1)
        this.closeDelete()
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

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.patients[this.editedIndex], this.editedItem)
        } else {
          this.patients.push(this.editedItem)
        }
        this.close()
      },
    },

  }
</script>
<style scoped>
.fix-title {
  word-break: normal;
}
</style>

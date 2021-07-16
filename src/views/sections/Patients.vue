<template>
  <div style="margin: 8px">
    <info-box :stats="myStats" />
    <v-data-table
      locale="es-es"
      style="margin-top: 8px"
      :headers="headers"
      :items="patients"
      sort-by="ci"
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
            persistent
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
                <span class="text-h5">{{ formTitle }}</span><v-spacer /> <v-btn
                  icon
                  @click="close"
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
                  <v-select
                    :v-model="editedItem.categoria"
                    :items="categories"
                    item-text="nombre"
                    item-value="id"
                    :rules="healthAreaRules"
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
                              v-model="editedItem.nombre"
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
                              v-model="editedItem.apellidos"
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
                              item-text="nombre"
                              item-value="id"
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
                              v-model="editedItem.direccion"
                              label="Dirección"
                            />
                          </v-col>
                          <!-- <v-col
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
                        </v-col> -->
                          <v-col
                            cols="12"
                            sm="6"
                            md="4"
                          >
                            <v-autocomplete
                              v-model="editedItem.provincia"
                              :items="provinces"
                              item-text="nombre"
                              item-value="id"
                              label="Provincia"
                            />
                          </v-col>
                          <v-col
                            cols="12"
                            sm="6"
                            md="4"
                          >
                            <v-autocomplete
                              v-model="editedItem.municipio"
                              :items="municipalities"
                              item-text="nombre"
                              item-value="id"
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
                              v-model="editedItem.area_salud"
                              :items="healthAreas"
                              :rules="healthAreaRules"
                              item-text="nombre"
                              item-value="id"
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
                            />
                          </v-col>
                          <v-col
                            cols="12"
                            sm="6"
                            md="4"
                          >
                            <v-text-field
                              v-model="editedItem.remite_caso"
                              label="Centro que remite el caso"
                            />
                          </v-col>
                        <!-- <v-col
                          cols="12"
                          sm="6"
                          md="4"
                        >
                          <v-text-field
                            v-model="editedItem.remissionCenter.name"
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
                              v-model="asymptomatic"
                              label="Asintomático(a)"
                            />
                          </v-col>
                          <v-col
                            v-if="!asymptomatic"
                            cols="12"
                            sm="6"
                            md="4"
                          >
                            <v-menu
                              ref="menu"
                              v-model="menu"
                              :close-on-content-click="false"
                              :return-value.sync="editedItem.fecha_sintomas"
                              transition="scale-transition"
                              offset-y
                              min-width="auto"
                            >
                              <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                  v-model="editedItem.fecha_sintomas"

                                  label="FIS"
                                  readonly
                                  v-bind="attrs"
                                  v-on="on"
                                />
                              </template>
                              <v-date-picker
                                v-model="editedItem.fecha_sintomas"

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
                                  @click="$refs.menu.save(editedItem.fecha_sintomas)"
                                >
                                  OK
                                </v-btn>
                              </v-date-picker>
                            </v-menu>
                          </v-col>
                        </v-row>
                        <v-row
                          v-if="!asymptomatic"
                        >
                          <v-col
                            cols="12"
                            sm="6"
                            md="4"
                          >
                            <v-checkbox
                              v-model="editedItem.fiebre"
                              label="Fiebre >38ºC"
                            />
                          </v-col>
                          <v-col
                            cols="12"
                            sm="6"
                            md="4"
                          >
                            <v-checkbox
                              v-model="editedItem.sintomas.rinorrea"
                              label="Rinorrea"
                            />
                          </v-col>
                          <v-col
                            cols="12"
                            sm="6"
                            md="4"
                          >
                            <v-checkbox
                              v-model="editedItem.congestion_nasal"
                              label="Congestión Nasal"
                            />
                          </v-col>
                          <v-col
                            cols="12"
                            sm="6"
                            md="4"
                          >
                            <v-checkbox
                              v-model="editedItem.tos"
                              label="Tos"
                            />
                          </v-col>
                          <v-col
                            cols="12"
                            sm="6"
                            md="4"
                          >
                            <v-checkbox
                              v-model="editedItem.expectoracion"
                              label="Expectoracion"
                            />
                          </v-col>
                          <v-col
                            cols="12"
                            sm="6"
                            md="4"
                          >
                            <v-checkbox
                              v-model="editedItem.dolor_garganta"
                              label="Dolor de garganta"
                            />
                          </v-col>
                          <v-col
                            cols="12"
                            sm="6"
                            md="4"
                          >
                            <v-checkbox
                              v-model="editedItem.cefalea"
                              label="Cefalea"
                            />
                          </v-col>
                          <v-col
                            cols="12"
                            sm="6"
                            md="4"
                          >
                            <v-checkbox
                              v-model="editedItem.dificultad_respiratoria"
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
                              v-model="editedItem.otros_sint"
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
                              v-model="noApp"
                              label="No refiere"
                            />
                          </v-col>
                        </v-row>
                        <v-row
                          v-if="!noApp"
                        >
                          <v-col
                            cols="12"
                            sm="6"
                            md="4"
                          >
                            <v-checkbox
                              v-model="editedItem.hipertension"
                              label="HTA"
                            />
                          </v-col>
                          <v-col
                            cols="12"
                            sm="6"
                            md="4"
                          >
                            <v-checkbox
                              v-model="editedItem.diabetes"
                              label="Diabetes"
                            />
                          </v-col>
                          <!-- <v-col
                          cols="12"
                          sm="6"
                          md="4"
                        >
                          <v-checkbox
                            v-model="editedItem.apps."
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
                              v-model="editedItem.asma"
                              label="Asma"
                            />
                          </v-col>
                          <v-col
                            cols="12"
                            sm="6"
                            md="4"
                          >
                            <v-checkbox
                              v-model="editedItem.obesidad"
                              label="Obesidad"
                            />
                          </v-col>
                          <v-col
                            cols="12"
                            sm="6"
                            md="4"
                          >
                            <v-checkbox
                              v-model="editedItem.insuficiencia_renal"
                              label="Insuficiencia Renal"
                            />
                          </v-col>
                          <v-col
                            cols="12"
                            sm="6"
                            md="4"
                          >
                            <v-checkbox
                              v-model="editedItem.oncologia"
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
                              v-model="editedItem.otros_apps"
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
                              v-model="isContact"
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
                              :disabled="!isContact"
                              :close-on-content-click="false"
                              :return-value.sync="editedItem.fecha_contacto"
                              transition="scale-transition"
                              offset-y
                              min-width="auto"
                            >
                              <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                  v-model="editedItem.fecha_contacto"
                                  :disabled="!isContact"
                                  label="Fecha de Contacto"
                                  prepend-icon="mdi-calendar"
                                  readonly
                                  v-bind="attrs"
                                  v-on="on"
                                />
                              </template>
                              <v-date-picker
                                v-model="editedItem.fecha_contacto"
                                :disabled="!isContact"
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
                                  @click="$refs.menu2.save(editedItem.fecha_contacto)"
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
                              v-model="editedItem.tipo_contacto"
                              :disabled="!isContact"
                              label="Tipo de Contacto"
                            />
                          </v-col>
                          <v-col
                            cols="12"
                          >
                            <v-text-field
                              v-model="editedItem.lugar_contacto"
                              :disabled="!isContact"
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
                              v-model="arrived"
                              label="¿Ha arribado del extranjero en los últimos 15 días?"
                            />
                          </v-col>
                          <v-col
                            cols="12"
                            sm="6"
                            md="4"
                          >
                            <v-autocomplete
                              v-model="editedItem.pais_procedencia"
                              :disabled="!arrived"
                              :items="countries"
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
                              v-model="editedItem.lugar_residencia"
                              :disabled="!arrived"
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
                              :disabled="!arrived"
                              :close-on-content-click="false"
                              :return-value.sync="editedItem.fecha_arribo"
                              transition="scale-transition"
                              offset-y
                              min-width="auto"
                            >
                              <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                  v-model="editedItem.fecha_arribo"
                                  :disabled="!arrived"
                                  label="Fecha de Arribo"
                                  prepend-icon="mdi-calendar"
                                  readonly
                                  v-bind="attrs"
                                  v-on="on"
                                />
                              </template>
                              <v-date-picker
                                v-model="editedItem.fecha_arribo"
                                :disabled="!arrived"
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
                                  @click="$refs.menu3.save(editedItem.fecha_arribo)"
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
                              v-model="editedItem.test_antigeno"
                              :items="testVariants"
                              item-text="nombre"
                              item-value="id"
                              label="Test Antígeno"
                            />
                          </v-col>
                          <v-col
                            cols="12"
                            sm="6"
                            md="4"
                          >
                            <v-autocomplete
                              v-model="editedItem.test_antigeno"
                              :items="statuses"
                              item-text="nombre"
                              item-value="id"
                              label="Estado Salud"
                            />
                          </v-col>
                          <v-col
                            cols="12"
                            sm="6"
                            md="4"
                          >
                            <v-checkbox
                              v-model="editedItem.trabajador_salud"
                              label="ES TRABAJADOR DE SALUD"
                            />
                          </v-col>
                          <v-col
                            cols="12"
                            sm="6"
                            md="4"
                          >
                            <v-checkbox
                              v-model="editedItem.vacunado"
                              label="ESTÁ VACUNADO"
                            />
                          </v-col>
                          <v-col
                            cols="12"
                            sm="6"
                            md="4"
                          >
                            <v-checkbox
                              v-model="editedItem.embarazada"
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
                              v-model="editedItem.ninho"
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
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              class="mr-2"
              color="orange"
              v-bind="attrs"
              :loading="loadingPatientsData"
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
        <!-- <v-tooltip
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
        </v-tooltip> -->
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
    <v-dialog
      v-model="infoPatient"
      persistent
      max-width="800px"
    >
      <patient-file
        :patient="editedItem"
        @close-click="infoPatient = !infoPatient"
      />
    </v-dialog>
  </div>
</template>

<script>
  import InfoBox from '../../components/InfoBox.vue'
  import PatientFile from '@/components/PatientFile.vue'
  import { isLastName, isId, isPositiveNumber, isCmf } from '@/utils/regex'
  import { getPatients, getPatient, postPatient, deletePatient, putPatient } from '@/axios/patients'
  export default {
    components: { InfoBox, PatientFile },
    data: () => ({
      patientsFilters: {
        page: 1,
      },
      patientsFirstLoad: true,
      totalPatientsItems: 0,
      infoPatient: false,
      toDeleteId: -1,
      loadingPatientsData: false,
      valid: false,
      arrived: false,
      isContact: false,
      noApp: true,
      othersS: false,
      othersApp: false,
      asymptomatic: true,
      healthAreaRules: [
        v => !!v || 'Este campo es requerido',
      ],
      cmfRules: [
        v => isCmf(v) || 'Este campo es requerido',
      ],
      numberRules: [
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
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      menu: false,
      modal: false,
      menu2: false,
      menu3: false,
      countries: [{
                    name_en: 'Afghanistan',
                    name_es: 'Afganistán',
                    dial_code: '+93',
                    code: 'AF',
                  },
                  {
                    name_en: 'Albania',
                    name_es: 'Albania',
                    dial_code: '+355',
                    code: 'AL',
                  },
                  {
                    name_en: 'Algeria',
                    name_es: 'Argelia',
                    dial_code: '+213',
                    code: 'DZ',
                  },
                  {
                    name_en: 'AmericanSamoa',
                    name_es: 'Samoa Americana',
                    dial_code: '+1684',
                    code: 'AS',
                  },
                  {
                    name_en: 'Andorra',
                    name_es: 'Andorra',
                    dial_code: '+376',
                    code: 'AD',
                  },
                  {
                    name_en: 'Angola',
                    name_es: 'Angola',
                    dial_code: '+244',
                    code: 'AO',
                  },
                  {
                    name_en: 'Anguilla',
                    name_es: 'Anguilla',
                    dial_code: '+1264',
                    code: 'AI',
                  },
                  {
                    name_en: 'Antarctica',
                    name_es: 'Antártida',
                    dial_code: '+672',
                    code: 'AQ',
                  },
                  {
                    name_en: 'Antigua and Barbuda',
                    name_es: 'Antigua y Barbuda',
                    dial_code: '+1268',
                    code: 'AG',
                  },
                  {
                    name_en: 'Argentina',
                    name_es: 'Argentina',
                    dial_code: '+54',
                    code: 'AR',
                  },
                  {
                    name_en: 'Armenia',
                    name_es: 'Armenia',
                    dial_code: '+374',
                    code: 'AM',
                  },
                  {
                    name_en: 'Aruba',
                    name_es: 'Aruba',
                    dial_code: '+297',
                    code: 'AW',
                  },
                  {
                    name_en: 'Australia',
                    name_es: 'Australia',
                    dial_code: '+61',
                    code: 'AU',
                  },
                  {
                    name_en: 'Austria',
                    name_es: 'Austria',
                    dial_code: '+43',
                    code: 'AT',
                  },
                  {
                    name_en: 'Azerbaijan',
                    name_es: 'Azerbaiyán',
                    dial_code: '+994',
                    code: 'AZ',
                  },
                  {
                    name_en: 'Bahamas',
                    name_es: 'Bahamas',
                    dial_code: '+1242',
                    code: 'BS',
                  },
                  {
                    name_en: 'Bahrain',
                    name_es: 'Baréin',
                    dial_code: '+973',
                    code: 'BH',
                  },
                  {
                    name_en: 'Bangladesh',
                    name_es: 'Banglades',
                    dial_code: '+880',
                    code: 'BD',
                  },
                  {
                    name_en: 'Barbados',
                    name_es: 'Barbados',
                    dial_code: '+1246',
                    code: 'BB',
                  },
                  {
                    name_en: 'Belarus',
                    name_es: 'Bielorrusia',
                    dial_code: '+375',
                    code: 'BY',
                  },
                  {
                    name_en: 'Belgium',
                    name_es: 'Bélgica',
                    dial_code: '+32',
                    code: 'BE',
                  },
                  {
                    name_en: 'Belize',
                    name_es: 'Belice',
                    dial_code: '+501',
                    code: 'BZ',
                  },
                  {
                    name_en: 'Benin',
                    name_es: 'Benin',
                    dial_code: '+229',
                    code: 'BJ',
                  },
                  {
                    name_en: 'Bermuda',
                    name_es: 'Bermudas',
                    dial_code: '+1441',
                    code: 'BM',
                  },
                  {
                    name_en: 'Bhutan',
                    name_es: 'Butan',
                    dial_code: '+975',
                    code: 'BT',
                  },
                  {
                    name_en: 'Bolivia',
                    name_es: 'Bolivia',
                    dial_code: '+591',
                    code: 'BO',
                  },
                  {
                    name_en: 'Bosnia and Herzegovina',
                    name_es: 'Bosnia-Herzegovina',
                    dial_code: '+387',
                    code: 'BA',
                  },
                  {
                    name_en: 'Botswana',
                    name_es: 'Botsuana',
                    dial_code: '+267',
                    code: 'BW',
                  },
                  {
                    name_en: 'Brazil',
                    name_es: 'Brasil',
                    dial_code: '+55',
                    code: 'BR',
                  },
                  {
                    name_en: 'British Indian Ocean Territory',
                    name_es: 'Territorio Británico del Océano Índico',
                    dial_code: '+246',
                    code: 'IO',
                  },
                  {
                    name_en: 'Brunei Darussalam',
                    name_es: 'Brunei',
                    dial_code: '+673',
                    code: 'BN',
                  },
                  {
                    name_en: 'Bulgaria',
                    name_es: 'Bulgaria',
                    dial_code: '+359',
                    code: 'BG',
                  },
                  {
                    name_en: 'Burkina Faso',
                    name_es: 'Burkina Faso',
                    dial_code: '+226',
                    code: 'BF',
                  },
                  {
                    name_en: 'Burundi',
                    name_es: 'Burundi',
                    dial_code: '+257',
                    code: 'BI',
                  },
                  {
                    name_en: 'Cambodia',
                    name_es: 'Camboya',
                    dial_code: '+855',
                    code: 'KH',
                  },
                  {
                    name_en: 'Cameroon',
                    name_es: 'Camerún',
                    dial_code: '+237',
                    code: 'CM',
                  },
                  {
                    name_en: 'Canada',
                    name_es: 'Canadá',
                    dial_code: '+1',
                    code: 'CA',
                  },
                  {
                    name_en: 'Cape Verde',
                    name_es: 'Cabo Verde',
                    dial_code: '+238',
                    code: 'CV',
                  },
                  {
                    name_en: 'Cayman Islands',
                    name_es: 'Islas Caimán',
                    dial_code: '+ 345',
                    code: 'KY',
                  },
                  {
                    name_en: 'Central African Republic',
                    name_es: 'República Centroafricana',
                    dial_code: '+236',
                    code: 'CF',
                  },
                  {
                    name_en: 'Chad',
                    name_es: 'Chad',
                    dial_code: '+235',
                    code: 'TD',
                  },
                  {
                    name_en: 'Chile',
                    name_es: 'Chile',
                    dial_code: '+56',
                    code: 'CL',
                  },
                  {
                    name_en: 'China',
                    name_es: 'China',
                    dial_code: '+86',
                    code: 'CN',
                  },
                  {
                    name_en: 'Christmas Island',
                    name_es: 'Isla de Navidad',
                    dial_code: '+61',
                    code: 'CX',
                  },
                  {
                    name_en: 'Cocos (Keeling) Islands',
                    name_es: 'Islas Cocos',
                    dial_code: '+61',
                    code: 'CC',
                  },
                  {
                    name_en: 'Colombia',
                    name_es: 'Colombia',
                    dial_code: '+57',
                    code: 'CO',
                  },
                  {
                    name_en: 'Comoros',
                    name_es: 'Comoras',
                    dial_code: '+269',
                    code: 'KM',
                  },
                  {
                    name_en: 'Congo',
                    name_es: 'Congo',
                    dial_code: '+242',
                    code: 'CG',
                  },
                  {
                    name_en: 'Congo, The Democratic Republic of the',
                    name_es: 'República Democrática del Congo',
                    dial_code: '+243',
                    code: 'CD',
                  },
                  {
                    name_en: 'Cook Islands',
                    name_es: 'Islas Cook',
                    dial_code: '+682',
                    code: 'CK',
                  },
                  {
                    name_en: 'Costa Rica',
                    name_es: 'Costa Rica',
                    dial_code: '+506',
                    code: 'CR',
                  },
                  {
                    name_en: "Cote d'Ivoire",
                    name_es: 'Costa de Marfil',
                    dial_code: '+225',
                    code: 'CI',
                  },
                  {
                    name_en: 'Croatia',
                    name_es: 'Croacia',
                    dial_code: '+385',
                    code: 'HR',
                  },
                  {
                    name_en: 'Cuba',
                    name_es: 'Cuba',
                    dial_code: '+53',
                    code: 'CU',
                  },
                  {
                    name_en: 'Cyprus',
                    name_es: 'Chipre',
                    dial_code: '+537',
                    code: 'CY',
                  },
                  {
                    name_en: 'Czechia',
                    name_es: 'Chequia',
                    dial_code: '+420',
                    code: 'CZ',
                  },
                  {
                    name_en: 'Denmark',
                    name_es: 'Dinamarca',
                    dial_code: '+45',
                    code: 'DK',
                  },
                  {
                    name_en: 'Djibouti',
                    name_es: 'Yibuti',
                    dial_code: '+253',
                    code: 'DJ',
                  },
                  {
                    name_en: 'Dominica',
                    name_es: 'Dominica',
                    dial_code: '+1767',
                    code: 'DM',
                  },
                  {
                    name_en: 'Dominican Republic',
                    name_es: 'República Dominicana',
                    dial_code: '+1849',
                    code: 'DO',
                  },
                  {
                    name_en: 'Ecuador',
                    name_es: 'Ecuador',
                    dial_code: '+593',
                    code: 'EC',
                  },
                  {
                    name_en: 'Egypt',
                    name_es: 'Egipto',
                    dial_code: '+20',
                    code: 'EG',
                  },
                  {
                    name_en: 'El Salvador',
                    name_es: 'El Salvador',
                    dial_code: '+503',
                    code: 'SV',
                  },
                  {
                    name_en: 'Equatorial Guinea',
                    name_es: 'Guinea Ecuatorial',
                    dial_code: '+240',
                    code: 'GQ',
                  },
                  {
                    name_en: 'Eritrea',
                    name_es: 'Eritrea',
                    dial_code: '+291',
                    code: 'ER',
                  },
                  {
                    name_en: 'Estonia',
                    name_es: 'Estonia',
                    dial_code: '+372',
                    code: 'EE',
                  },
                  {
                    name_en: 'Ethiopia',
                    name_es: 'Etiopía',
                    dial_code: '+251',
                    code: 'ET',
                  },
                  {
                    name_en: 'Falkland Islands (Malvinas)',
                    name_es: 'Islas Malvinas',
                    dial_code: '+500',
                    code: 'FK',
                  },
                  {
                    name_en: 'Faroe Islands',
                    name_es: 'Islas Feroe',
                    dial_code: '+298',
                    code: 'FO',
                  },
                  {
                    name_en: 'Fiji',
                    name_es: 'Fiyi',
                    dial_code: '+679',
                    code: 'FJ',
                  },
                  {
                    name_en: 'Finland',
                    name_es: 'Finlandia',
                    dial_code: '+358',
                    code: 'FI',
                  },
                  {
                    name_en: 'France',
                    name_es: 'Francia',
                    dial_code: '+33',
                    code: 'FR',
                  },
                  {
                    name_en: 'French Guiana',
                    name_es: 'Guayana Francesa',
                    dial_code: '+594',
                    code: 'GF',
                  },
                  {
                    name_en: 'French Polynesia',
                    name_es: 'Polinesia Francesa',
                    dial_code: '+689',
                    code: 'PF',
                  },
                  {
                    name_en: 'Gabon',
                    name_es: 'Gabón',
                    dial_code: '+241',
                    code: 'GA',
                  },
                  {
                    name_en: 'Gambia',
                    name_es: 'Gambia',
                    dial_code: '+220',
                    code: 'GM',
                  },
                  {
                    name_en: 'Georgia',
                    name_es: 'Georgia',
                    dial_code: '+995',
                    code: 'GE',
                  },
                  {
                    name_en: 'Germany',
                    name_es: 'Alemania',
                    dial_code: '+49',
                    code: 'DE',
                  },
                  {
                    name_en: 'Ghana',
                    name_es: 'Ghana',
                    dial_code: '+233',
                    code: 'GH',
                  },
                  {
                    name_en: 'Gibraltar',
                    name_es: 'Gibraltar',
                    dial_code: '+350',
                    code: 'GI',
                  },
                  {
                    name_en: 'Greece',
                    name_es: 'Grecia',
                    dial_code: '+30',
                    code: 'GR',
                  },
                  {
                    name_en: 'Greenland',
                    name_es: 'Groenlandia',
                    dial_code: '+299',
                    code: 'GL',
                  },
                  {
                    name_en: 'Grenada',
                    name_es: 'Granada',
                    dial_code: '+1473',
                    code: 'GD',
                  },
                  {
                    name_en: 'Guadeloupe',
                    name_es: 'Guadalupe',
                    dial_code: '+590',
                    code: 'GP',
                  },
                  {
                    name_en: 'Guam',
                    name_es: 'Guam',
                    dial_code: '+1671',
                    code: 'GU',
                  },
                  {
                    name_en: 'Guatemala',
                    name_es: 'Guatemala',
                    dial_code: '+502',
                    code: 'GT',
                  },
                  {
                    name_en: 'Guernsey',
                    name_es: 'Guernsey',
                    dial_code: '+44',
                    code: 'GG',
                  },
                  {
                    name_en: 'Guinea',
                    name_es: 'Guinea',
                    dial_code: '+224',
                    code: 'GN',
                  },
                  {
                    name_en: 'Guinea-Bissau',
                    name_es: 'Guinea-Bisau',
                    dial_code: '+245',
                    code: 'GW',
                  },
                  {
                    name_en: 'Guyana',
                    name_es: 'Guyana',
                    dial_code: '+595',
                    code: 'GY',
                  },
                  {
                    name_en: 'Haiti',
                    name_es: 'Haití',
                    dial_code: '+509',
                    code: 'HT',
                  },
                  {
                    name_en: 'Holy See (Vatican City State)',
                    name_es: 'Ciudad del Vaticano',
                    dial_code: '+379',
                    code: 'VA',
                  },
                  {
                    name_en: 'Honduras',
                    name_es: 'Honduras',
                    dial_code: '+504',
                    code: 'HN',
                  },
                  {
                    name_en: 'Hong Kong',
                    name_es: 'Hong Kong',
                    dial_code: '+852',
                    code: 'HK',
                  },
                  {
                    name_en: 'Hungary',
                    name_es: 'Hungría',
                    dial_code: '+36',
                    code: 'HU',
                  },
                  {
                    name_en: 'Iceland',
                    name_es: 'Islandia',
                    dial_code: '+354',
                    code: 'IS',
                  },
                  {
                    name_en: 'India',
                    name_es: 'India',
                    dial_code: '+91',
                    code: 'IN',
                  },
                  {
                    name_en: 'Indonesia',
                    name_es: 'Indonesia',
                    dial_code: '+62',
                    code: 'ID',
                  },
                  {
                    name_en: 'Iran, Islamic Republic of',
                    name_es: 'Irán',
                    dial_code: '+98',
                    code: 'IR',
                  },
                  {
                    name_en: 'Iraq',
                    name_es: 'Iraq',
                    dial_code: '+964',
                    code: 'IQ',
                  },
                  {
                    name_en: 'Ireland',
                    name_es: 'Irlanda',
                    dial_code: '+353',
                    code: 'IE',
                  },
                  {
                    name_en: 'Isle of Man',
                    name_es: 'Isla de Man',
                    dial_code: '+44',
                    code: 'IM',
                  },
                  {
                    name_en: 'Israel',
                    name_es: 'Israel',
                    dial_code: '+972',
                    code: 'IL',
                  },
                  {
                    name_en: 'Italy',
                    name_es: 'Italia',
                    dial_code: '+39',
                    code: 'IT',
                  },
                  {
                    name_en: 'Jamaica',
                    name_es: 'Jamaica',
                    dial_code: '+1876',
                    code: 'JM',
                  },
                  {
                    name_en: 'Japan',
                    name_es: 'Japón',
                    dial_code: '+81',
                    code: 'JP',
                  },
                  {
                    name_en: 'Jersey',
                    name_es: 'Jersey',
                    dial_code: '+44',
                    code: 'JE',
                  },
                  {
                    name_en: 'Jordan',
                    name_es: 'Jordania',
                    dial_code: '+962',
                    code: 'JO',
                  },
                  {
                    name_en: 'Kazakhstan',
                    name_es: 'Kazajistán',
                    dial_code: '+7',
                    code: 'KZ',
                  },
                  {
                    name_en: 'Kenya',
                    name_es: 'Kenia',
                    dial_code: '+254',
                    code: 'KE',
                  },
                  {
                    name_en: 'Kiribati',
                    name_es: 'Kiribati',
                    dial_code: '+686',
                    code: 'KI',
                  },
                  {
                    name_en: "Korea, Democratic People's Republic of",
                    name_es: 'Corea del Norte',
                    dial_code: '+850',
                    code: 'KP',
                  },
                  {
                    name_en: 'Korea, Republic of',
                    name_es: 'Corea del Sur',
                    dial_code: '+82',
                    code: 'KR',
                  },
                  {
                    name_en: 'Kosovo',
                    name_es: 'Kosovo',
                    dial_code: '+383',
                    code: 'XK',
                  },
                  {
                    name_en: 'Kuwait',
                    name_es: 'Kuwait',
                    dial_code: '+965',
                    code: 'KW',
                  },
                  {
                    name_en: 'Kyrgyzstan',
                    name_es: 'Kirguistán',
                    dial_code: '+996',
                    code: 'KG',
                  },
                  {
                    name_en: "Lao People's Democratic Republic",
                    name_es: 'Laos',
                    dial_code: '+856',
                    code: 'LA',
                  },
                  {
                    name_en: 'Latvia',
                    name_es: 'Letonia',
                    dial_code: '+371',
                    code: 'LV',
                  },
                  {
                    name_en: 'Lebanon',
                    name_es: 'Líbano',
                    dial_code: '+961',
                    code: 'LB',
                  },
                  {
                    name_en: 'Lesotho',
                    name_es: 'Lesoto',
                    dial_code: '+266',
                    code: 'LS',
                  },
                  {
                    name_en: 'Liberia',
                    name_es: 'Liberia',
                    dial_code: '+231',
                    code: 'LR',
                  },
                  {
                    name_en: 'Libyan Arab Jamahiriya',
                    name_es: 'Libia',
                    dial_code: '+218',
                    code: 'LY',
                  },
                  {
                    name_en: 'Liechtenstein',
                    name_es: 'Liechtenstein',
                    dial_code: '+423',
                    code: 'LI',
                  },
                  {
                    name_en: 'Lithuania',
                    name_es: 'Lituania',
                    dial_code: '+370',
                    code: 'LT',
                  },
                  {
                    name_en: 'Luxembourg',
                    name_es: 'Luxemburgo',
                    dial_code: '+352',
                    code: 'LU',
                  },
                  {
                    name_en: 'Macao',
                    name_es: 'Macao',
                    dial_code: '+853',
                    code: 'MO',
                  },
                  {
                    name_en: 'Macedonia, The Former Yugoslav Republic of',
                    name_es: 'República de Macedonia',
                    dial_code: '+389',
                    code: 'MK',
                  },
                  {
                    name_en: 'Madagascar',
                    name_es: 'Madagascar',
                    dial_code: '+261',
                    code: 'MG',
                  },
                  {
                    name_en: 'Malawi',
                    name_es: 'Malaui',
                    dial_code: '+265',
                    code: 'MW',
                  },
                  {
                    name_en: 'Malaysia',
                    name_es: 'Malasia',
                    dial_code: '+60',
                    code: 'MY',
                  },
                  {
                    name_en: 'Maldives',
                    name_es: 'Maldivas',
                    dial_code: '+960',
                    code: 'MV',
                  },
                  {
                    name_en: 'Mali',
                    name_es: 'Malí',
                    dial_code: '+223',
                    code: 'ML',
                  },
                  {
                    name_en: 'Malta',
                    name_es: 'Malta',
                    dial_code: '+356',
                    code: 'MT',
                  },
                  {
                    name_en: 'Marshall Islands',
                    name_es: 'Islas Marshall',
                    dial_code: '+692',
                    code: 'MH',
                  },
                  {
                    name_en: 'Martinique',
                    name_es: 'Martinica',
                    dial_code: '+596',
                    code: 'MQ',
                  },
                  {
                    name_en: 'Mauritania',
                    name_es: 'Mauritania',
                    dial_code: '+222',
                    code: 'MR',
                  },
                  {
                    name_en: 'Mauritius',
                    name_es: 'Mauricio',
                    dial_code: '+230',
                    code: 'MU',
                  },
                  {
                    name_en: 'Mayotte',
                    name_es: 'Mayotte',
                    dial_code: '+262',
                    code: 'YT',
                  },
                  {
                    name_en: 'Mexico',
                    name_es: 'México',
                    dial_code: '+52',
                    code: 'MX',
                  },
                  {
                    name_en: 'Micronesia, Federated States of',
                    name_es: 'Estados Federados de Micronesia',
                    dial_code: '+691',
                    code: 'FM',
                  },
                  {
                    name_en: 'Moldova, Republic of',
                    name_es: 'Moldavia',
                    dial_code: '+373',
                    code: 'MD',
                  },
                  {
                    name_en: 'Monaco',
                    name_es: 'Monaco',
                    dial_code: '+377',
                    code: 'MC',
                  },
                  {
                    name_en: 'Mongolia',
                    name_es: 'Mongolia',
                    dial_code: '+976',
                    code: 'MN',
                  },
                  {
                    name_en: 'Montenegro',
                    name_es: 'Montenegro',
                    dial_code: '+382',
                    code: 'ME',
                  },
                  {
                    name_en: 'Montserrat',
                    name_es: 'Montserrat',
                    dial_code: '+1664',
                    code: 'MS',
                  },
                  {
                    name_en: 'Morocco',
                    name_es: 'Marruecos',
                    dial_code: '+212',
                    code: 'MA',
                  },
                  {
                    name_en: 'Mozambique',
                    name_es: 'Mozambique',
                    dial_code: '+258',
                    code: 'MZ',
                  },
                  {
                    name_en: 'Myanmar',
                    name_es: 'Birmania',
                    dial_code: '+95',
                    code: 'MM',
                  },
                  {
                    name_en: 'Namibia',
                    name_es: 'Namibia',
                    dial_code: '+264',
                    code: 'NA',
                  },
                  {
                    name_en: 'Nauru',
                    name_es: 'Nauru',
                    dial_code: '+674',
                    code: 'NR',
                  },
                  {
                    name_en: 'Nepal',
                    name_es: 'Nepal',
                    dial_code: '+977',
                    code: 'NP',
                  },
                  {
                    name_en: 'Netherlands',
                    name_es: 'Holanda',
                    dial_code: '+31',
                    code: 'NL',
                  },
                  {
                    name_en: 'Netherlands Antilles',
                    name_es: 'Antillas Holandesas',
                    dial_code: '+599',
                    code: 'AN',
                  },
                  {
                    name_en: 'New Caledonia',
                    name_es: 'Nueva Caledonia',
                    dial_code: '+687',
                    code: 'NC',
                  },
                  {
                    name_en: 'New Zealand',
                    name_es: 'Nueva Zelanda',
                    dial_code: '+64',
                    code: 'NZ',
                  },
                  {
                    name_en: 'Nicaragua',
                    name_es: 'Nicaragua',
                    dial_code: '+505',
                    code: 'NI',
                  },
                  {
                    name_en: 'Niger',
                    name_es: 'Niger',
                    dial_code: '+227',
                    code: 'NE',
                  },
                  {
                    name_en: 'Nigeria',
                    name_es: 'Nigeria',
                    dial_code: '+234',
                    code: 'NG',
                  },
                  {
                    name_en: 'Niue',
                    name_es: 'Niue',
                    dial_code: '+683',
                    code: 'NU',
                  },
                  {
                    name_en: 'NorfolkIsland',
                    name_es: 'IslaNorfolk',
                    dial_code: '+672',
                    code: 'NF',
                  },
                  {
                    name_en: 'NorthernMarianaIslands',
                    name_es: 'IslasMarianasdelNorte',
                    dial_code: '+1670',
                    code: 'MP',
                  },
                  {
                    name_en: 'Norway',
                    name_es: 'Noruega',
                    dial_code: '+47',
                    code: 'NO',
                  },
                  {
                    name_en: 'Oman',
                    name_es: 'Omán',
                    dial_code: '+968',
                    code: 'OM',
                  },
                  {
                    name_en: 'Pakistan',
                    name_es: 'Pakistán',
                    dial_code: '+92',
                    code: 'PK',
                  },
                  {
                    name_en: 'Palau',
                    name_es: 'Palaos',
                    dial_code: '+680',
                    code: 'PW',
                  },
                  {
                    name_en: 'Panama',
                    name_es: 'Panamá',
                    dial_code: '+507',
                    code: 'PA',
                  },
                  {
                    name_en: 'Papua New Guinea',
                    name_es: 'Papúa Nueva Guinea',
                    dial_code: '+675',
                    code: 'PG',
                  },
                  {
                    name_en: 'Paraguay',
                    name_es: 'Paraguay',
                    dial_code: '+595',
                    code: 'PY',
                  },
                  {
                    name_en: 'Peru',
                    name_es: 'Perú',
                    dial_code: '+51',
                    code: 'PE',
                  },
                  {
                    name_en: 'Philippines',
                    name_es: 'Filipinas',
                    dial_code: '+63',
                    code: 'PH',
                  },
                  {
                    name_en: 'Pitcairn',
                    name_es: 'Islas Pitcairn',
                    dial_code: '+872',
                    code: 'PN',
                  },
                  {
                    name_en: 'Poland',
                    name_es: 'Polonia',
                    dial_code: '+48',
                    code: 'PL',
                  },
                  {
                    name_en: 'Portugal',
                    name_es: 'Portugal',
                    dial_code: '+351',
                    code: 'PT',
                  },
                  {
                    name_en: 'Puerto Rico',
                    name_es: 'Puerto Rico',
                    dial_code: '+1939',
                    code: 'PR',
                  },
                  {
                    name_en: 'Qatar',
                    name_es: 'Qatar',
                    dial_code: '+974',
                    code: 'QA',
                  },
                  {
                    name_en: 'Romania',
                    name_es: 'Rumania',
                    dial_code: '+40',
                    code: 'RO',
                  },
                  {
                    name_en: 'Russia',
                    name_es: 'Rusia',
                    dial_code: '+7',
                    code: 'RU',
                  },
                  {
                    name_en: 'Rwanda',
                    name_es: 'Ruanda',
                    dial_code: '+250',
                    code: 'RW',
                  },
                  {
                    name_en: 'Réunion',
                    name_es: 'Reunion',
                    dial_code: '+262',
                    code: 'RE',
                  },
                  {
                    name_en: 'Saint Barthélemy',
                    name_es: 'San Bartolome',
                    dial_code: '+590',
                    code: 'BL',
                  },
                  {
                    name_en: 'Saint Helena, Ascension and Tristan Da Cunha',
                    name_es: 'Santa Elena, Ascensión y Tristán de Acuña',
                    dial_code: '+290',
                    code: 'SH',
                  },
                  {
                    name_en: 'Saint Kitts and Nevis',
                    name_es: 'San Cristóbal y Nieves',
                    dial_code: '+1869',
                    code: 'KN',
                  },
                  {
                    name_en: 'Saint Lucia',
                    name_es: 'Santa Lucía',
                    dial_code: '+1758',
                    code: 'LC',
                  },
                  {
                    name_en: 'Saint Martin',
                    name_es: 'Isla de San Martín',
                    dial_code: '+590',
                    code: 'MF',
                  },
                  {
                    name_en: 'Saint Pierre and Miquelon',
                    name_es: 'San Pedro y Miquelon',
                    dial_code: '+508',
                    code: 'PM',
                  },
                  {
                    name_en: 'Saint Vincent and the Grenadines',
                    name_es: 'San Vicente y las Granadinas',
                    dial_code: '+1784',
                    code: 'VC',
                  },
                  {
                    name_en: 'Samoa',
                    name_es: 'Samoa',
                    dial_code: '+685',
                    code: 'WS',
                  },
                  {
                    name_en: 'San Marino',
                    name_es: 'San Marino',
                    dial_code: '+378',
                    code: 'SM',
                  },
                  {
                    name_en: 'Sao Tome and Principe',
                    name_es: ' Santo Tomé y Príncipe',
                    dial_code: '+239',
                    code: 'ST',
                  },
                  {
                    name_en: 'Saudi Arabia',
                    name_es: 'Arabia Saudita',
                    dial_code: '+966',
                    code: 'SA',
                  },
                  {
                    name_en: 'Senegal',
                    name_es: 'Senegal',
                    dial_code: '+221',
                    code: 'SN',
                  },
                  {
                    name_en: 'Serbia',
                    name_es: 'Serbia',
                    dial_code: '+381',
                    code: 'RS',
                  },
                  {
                    name_en: 'Seychelles',
                    name_es: 'Seychelles',
                    dial_code: '+248',
                    code: 'SC',
                  },
                  {
                    name_en: 'Sierra Leone',
                    name_es: 'Sierra Leona',
                    dial_code: '+232',
                    code: 'SL',
                  },
                  {
                    name_en: 'Singapore',
                    name_es: 'Singapur',
                    dial_code: '+65',
                    code: 'SG',
                  },
                  {
                    name_en: 'Slovakia',
                    name_es: 'Eslovaquia',
                    dial_code: '+421',
                    code: 'SK',
                  },
                  {
                    name_en: 'Slovenia',
                    name_es: 'Eslovenia',
                    dial_code: '+386',
                    code: 'SI',
                  },
                  {
                    name_en: 'Solomon Islands',
                    name_es: 'Islas Salomón',
                    dial_code: '+677',
                    code: 'SB',
                  },
                  {
                    name_en: 'Somalia',
                    name_es: 'Somalia',
                    dial_code: '+252',
                    code: 'SO',
                  },
                  {
                    name_en: 'South Africa',
                    name_es: 'Sudáfrica',
                    dial_code: '+27',
                    code: 'ZA',
                  },
                  {
                    name_en: 'South Sudan',
                    name_es: 'Sudán del Sur',
                    dial_code: '+211',
                    code: 'SS',
                  },
                  {
                    name_en: 'Spain',
                    name_es: 'España',
                    dial_code: '+34',
                    code: 'ES',
                  },
                  {
                    name_en: 'Sri Lanka',
                    name_es: 'Sri Lanka',
                    dial_code: '+94',
                    code: 'LK',
                  },
                  {
                    name_en: 'State of Palestine',
                    name_es: 'Estado de Palestina',
                    dial_code: '+970',
                    code: 'PS',
                  },
                  {
                    name_en: 'Sudan',
                    name_es: 'Sudán',
                    dial_code: '+249',
                    code: 'SD',
                  },
                  {
                    name_en: 'Suriname',
                    name_es: 'Surinam',
                    dial_code: '+597',
                    code: 'SR',
                  },
                  {
                    name_en: 'Svalbard and Jan Mayen',
                    name_es: 'Svalbard y Jan Mayen',
                    dial_code: '+47',
                    code: 'SJ',
                  },
                  {
                    name_en: 'Swaziland',
                    name_es: 'Suazilandia',
                    dial_code: '+268',
                    code: 'SZ',
                  },
                  {
                    name_en: 'Sweden',
                    name_es: 'Suecia',
                    dial_code: '+46',
                    code: 'SE',
                  },
                  {
                    name_en: 'Switzerland',
                    name_es: 'Suiza',
                    dial_code: '+41',
                    code: 'CH',
                  },
                  {
                    name_en: 'Syrian Arab Republic',
                    name_es: 'Siria',
                    dial_code: '+963',
                    code: 'SY',
                  },
                  {
                    name_en: 'Taiwan, Province of China',
                    name_es: 'Taiwán',
                    dial_code: '+886',
                    code: 'TW',
                  },
                  {
                    name_en: 'Tayikistan',
                    name_es: 'Tayikistán',
                    dial_code: '+992',
                    code: 'TJ',
                  },
                  {
                    name_en: 'Tanzania, United Republic of',
                    name_es: 'Tanzania',
                    dial_code: '+255',
                    code: 'TZ',
                  },
                  {
                    name_en: 'Thailand',
                    name_es: 'Tailandia',
                    dial_code: '+66',
                    code: 'TH',
                  },
                  {
                    name_en: 'Timor-Leste',
                    name_es: 'Timor Oriental',
                    dial_code: '+670',
                    code: 'TL',
                  },
                  {
                    name_en: 'Togo',
                    name_es: 'Togo',
                    dial_code: '+228',
                    code: 'TG',
                  },
                  {
                    name_en: 'Tokelau',
                    name_es: 'Tokelau',
                    dial_code: '+690',
                    code: 'TK',
                  },
                  {
                    name_en: 'Tonga',
                    name_es: 'Tonga',
                    dial_code: '+676',
                    code: 'TO',
                  },
                  {
                    name_en: 'Trinidad and Tobago',
                    name_es: 'Trinidad y Tobago',
                    dial_code: '+1868',
                    code: 'TT',
                  },
                  {
                    name_en: 'Tunisia',
                    name_es: 'Túnez',
                    dial_code: '+216',
                    code: 'TN',
                  },
                  {
                    name_en: 'Turkey',
                    name_es: 'Turquía',
                    dial_code: '+90',
                    code: 'TR',
                  },
                  {
                    name_en: 'Turkmenistan',
                    name_es: 'Turkmenistán',
                    dial_code: '+993',
                    code: 'TM',
                  },
                  {
                    name_en: 'Turks and Caicos Islands',
                    name_es: 'Islas Turcas y Caicos',
                    dial_code: '+1649',
                    code: 'TC',
                  },
                  {
                    name_en: 'Tuvalu',
                    name_es: 'Tuvalu',
                    dial_code: '+688',
                    code: 'TV',
                  },
                  {
                    name_en: 'Uganda',
                    name_es: 'Uganda',
                    dial_code: '+256',
                    code: 'UG',
                  },
                  {
                    name_en: 'Ukraine',
                    name_es: 'Ucrania',
                    dial_code: '+380',
                    code: 'UA',
                  },
                  {
                    name_en: 'United Arab Emirates',
                    name_es: 'Emiratos Árabes Unidos',
                    dial_code: '+971',
                    code: 'AE',
                  },
                  {
                    name_en: 'United Kingdom',
                    name_es: 'Reino Unido',
                    dial_code: '+44',
                    code: 'GB',
                  },
                  {
                    name_en: 'United States',
                    name_es: 'Estados Unidos',
                    dial_code: '+1',
                    code: 'US',
                  },
                  {
                    name_en: 'Uruguay',
                    name_es: 'Uruguay',
                    dial_code: '+598',
                    code: 'UY',
                  },
                  {
                    name_en: 'Uzbekistan',
                    name_es: 'Uzbekistán',
                    dial_code: '+998',
                    code: 'UZ',
                  },
                  {
                    name_en: 'Vanuatu',
                    name_es: 'Vanuatu',
                    dial_code: '+678',
                    code: 'VU',
                  },
                  {
                    name_en: 'Venezuela, Bolivarian Republic of',
                    name_es: 'Venezuela',
                    dial_code: '+58',
                    code: 'VE',
                  },
                  {
                    name_en: 'Vietnam',
                    name_es: 'Vietnam',
                    dial_code: '+84',
                    code: 'VN',
                  },
                  {
                    name_en: 'Virgin Islands, British',
                    name_es: 'Islas Vírgenes Británicas',
                    dial_code: '+1284',
                    code: 'VG',
                  },
                  {
                    name_en: 'Virgin Islands, U.S.',
                    name_es: 'Islas Vírgenes de los Estados Unidos',
                    dial_code: '+1340',
                    code: 'VI',
                  },
                  {
                    name_en: 'Wallis and Futuna',
                    name_es: 'Wallis y Futuna',
                    dial_code: '+681',
                    code: 'WF',
                  },
                  {
                    name_en: 'Yemen',
                    name_es: 'Yemen',
                    dial_code: '+967',
                    code: 'YE',
                  },
                  {
                    name_en: 'Zambia',
                    name_es: 'Zambia',
                    dial_code: '+260',
                    code: 'ZM',
                  },
                  {
                    name_en: 'Zimbabwe',
                    name_es: 'Zimbabue',
                    dial_code: '+263',
                    code: 'ZW',
                  },
                  {
                    name_en: 'Åland Islands',
                    name_es: 'Åland',
                    dial_code: '+358',
                    code: 'AX',
                  },
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
        { nombre: 'Ingresado' },
        { nombre: 'En transporte' },
        { nombre: 'Pendiente' },
        { nombre: 'En IRA del AS' },
      ],
      isolationCenters: [
        { nombre: 'Perez Quintosa' },
        { nombre: 'Pedagogico' },
        { nombre: 'Hospital Militar' },
        { nombre: 'Minerva' },
        { nombre: 'UCLV' },
        { nombre: 'Politecnico de la Salud' },
      ],
      dialogDeleteUnavailable: false,
      dialog: false,
      dialogDelete: false,
      centerTypes: [
        { nombre: 'Policlínico' },
        { nombre: 'C.M.F' },
        { nombre: 'Hospital' },
        { nombre: 'Otro' },
      ],
      testVariants: [
        { nombre: 'Positivo', id: 1 },
        { nombre: 'Negativo', id: 0 },
        { nombre: 'No realizado', id: 2 },
      ],
      healthAreas: [
        { nombre: 'Santa Clara', id: 1 },
        { nombre: 'XX Aniversario', id: 2 },
        { nombre: 'C.R.F.', id: 3 },
        { nombre: 'Martha Abreu', id: 4 },
        { nombre: 'Chiqui Gómez', id: 5 },
        { nombre: 'J.R.L.A.', id: 6 },
      ],
      sexes: [
        { nombre: 'Masculino' },
        { nombre: 'Femenino' },
      ],
      provinces: [
        { nombre: 'Villa Clara', id: 1 },
        { nombre: 'Matanzas', id: 2 },
        { nombre: 'Cienfuegos', id: 3 },
      ],
      municipalities: [
        { nombre: 'Santa Clara', abbr: 'SC', id: 1 },
        { nombre: 'Manicaragua', abbr: 'MC', id: 2 },
        { nombre: 'Remedios', abbr: 'RE', id: 3 },
        { nombre: 'Camajuani', abbr: 'CA', id: 4 },
      ],
      categories: [
        { nombre: 'Sospechoso', id: 1 },
        { nombre: 'Positivo', id: 2 },
        { nombre: 'Contacto', id: 3 },
      ],
      headers: [
        {
          text: 'CI',
          align: 'start',
          sortable: true,
          value: 'ci',
        },
        { text: 'Nombre', value: 'nombre' },
        { text: 'Apellidos', value: 'apellidos' },
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
        direccion: '',
        municipio: '',
        provincia: '',
        cmf: '',
        area_salud: '',
        remite_caso: '',
        estado_sistema: '',
        trabajador_salud: false,
        ninho: false,
        embarazada: false,
        vacunado: false,
        categoria: null,
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
        sintomas: [],
        app: [],
        estado_sistema: '',
        trabajador_salud: false,
        ninho: false,
        embarazada: false,
        vacunado: false,
        categoria: null,
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
      formTitle () {
        return this.editedIndex === -1 ? 'Registrar Paciente' : 'Editar datos de paciente'
      },
      disablePregnant () {
        return this.editedItem.ninho
      },
      disableChild () {
        return this.editedItem.embarazada
      },
      disableRemissionCenterName () {
        return (this.editedItem.remissionCenter.type !== 'Hospital') && (this.editedItem.remissionCenter.type !== 'Otro')
      },
      patientIsAsymptomatic () {
        return this.editedItem.sintomas.fecha_sintomas !== null
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
      async detailsItem (item) {
        this.loadingPatientsData = true
        try {
          const patientResponse = await getPatient(item.id_paciente)
          this.editedItem = Object.assign({}, patientResponse.data.paciente)
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
          this.editedItem.fecha_contacto = this.editedItem.contacto.fecha_contacto
          this.editedItem.lugar_contacto = this.editedItem.contacto.lugar_contacto
          this.editedItem.tipo_contacto = this.editedItem.contacto.tipo_contacto
          if (this.editedItem.fecha_contacto || this.editedItem.lugar_contacto || this.editedItem.tipo_contacto) {
            this.isContact = true
          }
          this.editedItem.pais_procedencia = this.editedItem.arribo.pais_procedencia
          this.editedItem.lugar_estancia = this.editedItem.arribo.lugar_estancia
          this.editedItem.fecha_arribo = this.editedItem.arribo.fecha_arribo
          if (this.editedItem.pais_procedencia || this.editedItem.lugar_estancia || this.editedItem.fecha_arribo) {
            this.arrived = true
          }
          this.loadingPatientsData = false
          this.infoPatient = true
        } catch (e) {
          console.log(e)
        }
      },
      closeDeleteU () {
        this.dialogDeleteUnavailable = false
      },
      async loadPatientsData (page = 1) {
        this.loadingPatientsData = true
        try {
          const patientsResponse = await getPatients(page)
          console.log(patientsResponse)
          this.totalPatientsItems = patientsResponse.data.meta.total
          this.patients = patientsResponse.data.pacientes
          this.loadingPatientsData = false
        } catch (err) {
          console.log(err)
        }
      },
      initialize () {
        this.loadPatientsData()
      },

      async editItem (item) {
        this.loadingPatientsData = true
        try {
          const patientResponse = await getPatient(item.id_paciente)
          this.editedItem = Object.assign({}, patientResponse.data.paciente)
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
          this.editedItem.fecha_contacto = this.editedItem.contacto.fecha_contacto
          this.editedItem.lugar_contacto = this.editedItem.contacto.lugar_contacto
          this.editedItem.tipo_contacto = this.editedItem.contacto.tipo_contacto
          if (this.editedItem.fecha_contacto || this.editedItem.lugar_contacto || this.editedItem.tipo_contacto) {
            this.isContact = true
          }
          this.editedItem.pais_procedencia = this.editedItem.arribo.pais_procedencia
          this.editedItem.lugar_estancia = this.editedItem.arribo.lugar_estancia
          this.editedItem.fecha_arribo = this.editedItem.arribo.fecha_arribo
          if (this.editedItem.pais_procedencia || this.editedItem.lugar_estancia || this.editedItem.fecha_arribo) {
            this.arrived = true
          }
        } catch (e) {
          console.log(e)
        }
        this.editedIndex = this.patients.indexOf(item)
        this.dialog = true
        this.loadingPatientsData = false
      },
      paginatePatients (pageInfo) {
        if (this.patientsFirstLoad) {
          this.patientsFirstLoad = false
          return
        }
        this.patientsFilters.page = pageInfo.page
        this.loadPatientsData(pageInfo.page)
      },

      deleteItem (item) {
        console.log(item)
        console.log(item.nombre)
        console.log(item.apellidos)
        console.log(item.id_paciente)
        this.toDeleteId = item.id_paciente
        console.log(item.ci)
        console.log(this.toDeleteId)
        this.editedIndex = this.patients.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },
      async deleteItemConfirm () {
        this.loadingPatientsData = true
        this.patients.splice(this.editedIndex, 1)
        try {
          await deletePatient(this.toDeleteId)
          this.loadPatientsData()
        } catch (e) {
          console.log(e)
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

      clearData () {
        this.editedItem = Object.assign({}, this.defaultItem)
      },

      async save () {
        if (this.$refs.form.validate()) {
          if (this.editedIndex > -1) {
            this.patientsLoading = true
            // Actualizar
            await putPatient(this.editedItem)
            this.clearData()
            this.loadPatientsData()
            Object.assign(this.patients[this.editedIndex], this.editedItem)
          } else {
            // Añadir
            try {
              await postPatient(this.editedItem)
              this.clearData()
              this.loadPatientsData()
            } catch (e) {
              console.log(e)
            }
            this.patients.push(this.editedItem)
          }
          this.close()
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

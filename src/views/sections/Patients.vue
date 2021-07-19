<template>
  <div style="margin: 8px">
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
                  <v-autocomplete
                    v-model="editedItem.categoria"
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
                              v-model="editedItem.edad"
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
                              v-model="editedItem.sexo"
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
                              v-model="editedItem.direccion"
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
                              v-model="editedItem.provincia"
                              :items="provinces"
                              item-text="nombre"
                              no-data-text="No se pudo conectar con el servidor"
                              item-value="id"
                              :rules="healthAreaRules"
                              label="Provincia"
                              @change="loadMunicipalitiesData(editedItem.provincia)"
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
                              no-data-text="Debe seleccionar una provincia"
                              item-text="nombre"
                              item-value="id"
                              :rules="healthAreaRules"
                              label="Municipio"
                              @change="getHealthAreaData(editedItem.municipio)"
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
                              no-data-text="Debe seleccionar un municipio"
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
                            <v-combobox
                              v-model="editedItem.remite_caso"
                              :items="remissionTypes"
                              label="Remite el Caso"
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
                              v-model="editedItem.rinorrea"
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
                              v-model="editedItem.lugar_estancia"
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
                              :items="antigensData"
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
                              v-model="editedItem.estado_sistema"
                              :items="systemStatusesData"
                              item-text="nombre"
                              no-data-text="No se pudo conectar con el servidor"
                              item-value="id"
                              label="Estado de Salud"
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
                  @click="showMeData"
                >
                  Cancelar
                </v-btn>
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
        No hay datos disponibles
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

  import InfoBox from '@/components/InfoBox.vue'
  import { COUNTRIES } from '@/utils/constants'
  import PatientFile from '@/components/PatientFile.vue'
  import { isLastName, isId, isPositiveNumber, isCmf } from '@/utils/regex'
  import { getPatients, getPatient, postPatient, deletePatient, putPatient } from '@/axios/patients'
  import { getCategories, getHealthStatus, getSystemStatus, getAntigenos, getProvinces, getMunicipalities, getHealthAreas } from '@/axios/nomenclators'
  export default {
    components: { InfoBox, PatientFile },
    data: () => ({
      remissionTypes: ['Policlínico', 'C.M.F.', 'Hospital'],
      antigensData: [],
      systemStatusesData: [],
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
      menu: false,
      modal: false,
      menu2: false,
      menu3: false,
      dialogDeleteUnavailable: false,
      dialog: false,
      dialogDelete: false,
      healthAreas: [],
      sexes: [
        { nombre: 'Masculino', id: 'M' }, { nombre: 'Femenino', id: 'F' },
      ],
      provinces: [],
      municipalities: [],
      categories: [],
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
      countriesD () {
        return COUNTRIES
      },
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
      this.loadPatientsData()
      // this.getCategoriesData()
      this.getSystemStatusData()
      this.getHealthStatusData()
      this.getProvincesData()
      this.getAntigenData()
    },

    methods: {
      showMeData () {
        console.log(this.editedItem)
      },
      async loadMunicipalitiesData (id) {
        console.log('Hello world!!')
        try {
          const municipalitiesRes = await getMunicipalities(id)
          this.municipalities = municipalitiesRes.data
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
      async getCategoriesData () {
        try {
          const categoriesResponse = await getCategories()
          this.categories = categoriesResponse.data
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
      async getSystemStatusData () {
        try {
          const systemResponse = await getSystemStatus()
          this.systemStatusesData = systemResponse.data
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
      async getHealthStatusData () {
        try {
          const healthResponse = await getHealthStatus()
          this.healthData = healthResponse.data
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
      async getProvincesData () {
        try {
          const provincesResponse = await getProvinces()
          this.provinces = provincesResponse.data
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
      async getHealthAreaData (id) {
        try {
          const healthAreaResponse = await getHealthAreas(id)
          this.healthAreas = healthAreaResponse.data
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
      async detailsItem (item) {
        this.loadingPatientsData = true
        try {
          const patientResponse = await getPatient(item.id_paciente)
          this.editedItem = Object.assign({}, patientResponse.data.paciente)
          if (this.editedItem.apps !== null) {
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
          if (this.editeditem.sintomas !== null) {
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
          }
          this.loadingPatientsData = false
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
      },
      closeDeleteU () {
        this.dialogDeleteUnavailable = false
      },
      async loadPatientsData (page = 1) {
        this.loadingPatientsData = true
        try {
          const patientsResponse = await getPatients(page)
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
      },

      async editItem (item) {
        this.loadingPatientsData = true
        try {
          const patientResponse = await getPatient(item.id_paciente)
          this.editedItem = Object.assign({}, patientResponse.data.paciente)
          if (this.editedItem.apps !== null) {
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

      clearData () {
        this.editedItem = Object.assign({}, this.defaultItem)
      },

      async save () {
        if (this.$refs.form.validate()) {
          if (this.editedIndex > -1) {
            this.patientsLoading = true
            // Actualizar
            try {
              await putPatient(this.editedItem)
              this.clearData()
              this.loadPatientsData()
              this.close()
            } catch (e) {
              console.log(e)
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
              await postPatient(this.editedItem)
              this.clearData()
              this.loadPatientsData()
              this.close()
            } catch (e) {
              console.log(e)
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

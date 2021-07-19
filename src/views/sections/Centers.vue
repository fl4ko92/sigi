<template>
  <div style="padding: 8px">
    <div
      v-if="init"
    >
      <v-data-table
        :headers="headers"
        :items="centers"
        :loading="loadingCentersData"
        :footer-props="{
          'disable-items-per-page': true,
          'items-per-page-text': 'Centros por página'
        }"
        sort-by="name"
        :server-items-length="totalCentersItems"
        class="elevation-1"
        loading-text="Cargando Centros..."
        @pagination="paginateCenters"
      >
        <template v-slot:top>
          <v-toolbar
            flat
          >
            <v-toolbar-title>Centros de aislamiento</v-toolbar-title>
            <v-divider
              class="mx-4"
              inset
              vertical
            />
            <v-spacer />
            <v-dialog
              v-model="dialog"
              max-width="500px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="success"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon>mdi-plus</v-icon>Añadir Centro
                </v-btn>
              </template>
              <v-card>
                <v-card-title class="fix-title">
                  <span class="text-h5">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col
                        cols="12"
                        sm="6"
                        md="4"
                      >
                        <v-text-field
                          v-model="editedItem.nombre_centro"
                          label="Nombre"
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
                          color="white"
                          item-text="name"
                          label="Municipio"
                        />
                      </v-col>
                      <v-col
                        cols="12"
                        sm="6"
                        md="4"
                      >
                        <v-text-field
                          v-model="editedItem.organismo"
                          label="Organismo"
                        />
                      </v-col>
                    </v-row>
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
                color="info"
                v-bind="attrs"
                v-on="on"
                @click="detailsItem(item)"
              >
                mdi-dots-horizontal-circle
              </v-icon>
            </template>
            <span>Detalles</span>
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
    <div
      v-else-if="area"
    >
      <v-card>
        <v-btn
          style="margin: 12px"
          @click="init= true"
        >
          <v-icon>
            mdi-arrow-left
          </v-icon> Atras
        </v-btn>
        <v-card-title>
          <v-icon
            large
          >
            mdi-hospital-building
          </v-icon>
          <v-card-title class="text-h5">
            {{ editedItem.nombre_centro }} / {{ editedItem.organismo }}
          </v-card-title>
        </v-card-title>
        <v-card-subtitle>{{ editedItem.municipio }}</v-card-subtitle>
        <v-card-text>
          <info-box
            :stats="myStats"
            :more="false"
          />
          <v-data-table
            v-if="area"
            style="margin: 8px"
            :headers="areaHeaders"
            :items="areas"
            :loading="loadingAreasData"
            :footer-props="{
              'disable-items-per-page': true,
              'items-per-page-text': 'Areas por página'
            }"
            sort-by="nombre"
            :server-items-length="totalAreasItems"
            class="elevation-1"
            loading-text="Cargando Areas..."
            @pagination="paginateAreas"
          >
            <template v-slot:top>
              <v-toolbar
                flat
              >
                <v-toolbar-title>Areas</v-toolbar-title>
                <v-divider
                  class="mx-4"
                  inset
                  vertical
                />
                <v-spacer />
                <v-dialog
                  v-model="areaDialog"
                  max-width="500px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      color="success"
                      dark
                      class="mb-2"
                      v-bind="attrs"
                      v-on="on"
                    >
                      <v-icon>mdi-plus</v-icon>Añadir Area
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title class="fix-title">
                      <span class="text-h5">{{ areaFormTitle }}</span>
                    </v-card-title>

                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col
                            cols="12"
                            sm="6"
                            md="4"
                          >
                            <v-text-field
                              v-model="editedAreaItem.nombre"
                              label="Nombre"
                            />
                          </v-col>
                          <v-col
                            cols="12"
                            sm="6"
                            md="4"
                          >
                            <v-autocomplete
                              v-model="editedAreaItem.categoria"
                              :items="categories"
                              color="white"
                              item-text="name"
                              label="Categoria"
                            />
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer />
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="closeArea"
                      >
                        Cancelar
                      </v-btn>
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="saveArea"
                      >
                        Guardar
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <v-dialog
                  v-model="dialogAreaDelete"
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
                        @click="closeAreaDelete"
                      >
                        Cancel
                      </v-btn>
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="deleteAreaItemConfirm"
                      >
                        OK
                      </v-btn>
                      <v-spacer />
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <v-dialog
                  v-model="dialogAreaDeleteUnavailable"
                  max-width="500px"
                >
                  <v-card>
                    <v-card-title class="text-h5">
                      Esta Area no se puede eliminar porque tiene camas en uso!!!!
                    </v-card-title>
                    <v-card-actions>
                      <v-spacer />
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="closeAreaDeleteU"
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
                    @click="editAreaItem(item)"
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
                    @click="deleteAreaItem(item)"
                  >
                    mdi-delete
                  </v-icon>
                </template>
                <span>Eliminar</span>
              </v-tooltip>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                    color="info"
                    v-bind="attrs"
                    v-on="on"
                    @click="detailsAreaItem(item)"
                  >
                    mdi-dots-horizontal-circle
                  </v-icon>
                </template>
                <span>Detalles</span>
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
        </v-card-text>
      </v-card>
    </div>
    <div
      v-else-if="room"
    >
      <v-card>
        <v-btn
          style="margin: 12px"
          @click="area = true"
        >
          <v-icon>
            mdi-arrow-left
          </v-icon> Atras
        </v-btn>
        <v-card-title>
          <v-icon
            large
          >
            mdi-hospital-building
          </v-icon>
          <v-card-title class="text-h5">
            {{ editedItem.nombre_centro }} / {{ editedItem.organismo }}
          </v-card-title>
        </v-card-title>
        <v-card-subtitle>{{ editedItem.municipio }}</v-card-subtitle>
        <v-card-text>
          <v-card>
            <v-card-title>
              <v-icon>
                mdi-domain
              </v-icon>{{ editedAreaItem.nombre }}
            </v-card-title>
            <v-card-subtitle>{{ editedAreaItem.categoria }}</v-card-subtitle>
            <info-box
              style="margin: 4px"
              :stats="myAreaStats"
              :more="false"
            />
            <v-data-table
              v-if="room"
              style="margin: 14px"
              :headers="roomsHeaders"
              :items="rooms"
              sort-by="calories"
              class="elevation-1"
            >
              <template v-slot:top>
                <v-toolbar
                  flat
                >
                  <v-toolbar-title>Habitaciones</v-toolbar-title>
                  <v-divider
                    class="mx-4"
                    inset
                    vertical
                  />
                  <v-spacer />
                  <v-dialog
                    v-model="roomsDialog"
                    max-width="500px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        color="success"
                        dark
                        class="mb-2"
                        v-bind="attrs"
                        v-on="on"
                      >
                        <v-icon>mdi-plus</v-icon>Añadir Habitación
                      </v-btn>
                    </template>
                    <v-card>
                      <v-card-title class="fix-title">
                        <span class="text-h5">{{ roomsFormTitle }}</span>
                      </v-card-title>

                      <v-card-text>
                        <v-container>
                          <v-row>
                            <v-col
                              cols="12"
                              sm="6"
                              md="4"
                            >
                              <v-text-field
                                v-model="editedRoomItem.number"
                                label="Numero"
                              />
                            </v-col>
                            <v-col
                              cols="12"
                              sm="6"
                              md="4"
                            >
                              <v-text-field
                                v-model="editedRoomItem.capacity"
                                label="Capacidad"
                                type="number"
                              />
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-card-text>

                      <v-card-actions>
                        <v-spacer />
                        <v-btn
                          color="blue darken-1"
                          text
                          @click="closeRoom"
                        >
                          Cancelar
                        </v-btn>
                        <v-btn
                          color="blue darken-1"
                          text
                          @click="saveRoom"
                        >
                          Guardar
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                  <v-dialog
                    v-model="dialogRoomDelete"
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
                          @click="closeRoomDelete"
                        >
                          Cancel
                        </v-btn>
                        <v-btn
                          color="blue darken-1"
                          text
                          @click="deleteRoomItemConfirm"
                        >
                          OK
                        </v-btn>
                        <v-spacer />
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                  <v-dialog
                    v-model="dialogRoomDeleteUnavailable"
                    max-width="500px"
                  >
                    <v-card>
                      <v-card-title class="text-h5">
                        Esta Habitacion no se puede eliminar porque tiene camas en uso!!!!
                      </v-card-title>
                      <v-card-actions>
                        <v-spacer />
                        <v-btn
                          color="blue darken-1"
                          text
                          @click="closeRoomDeleteU"
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
                      @click="editRoomItem(item)"
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
                      @click="deleteRoomItem(item)"
                    >
                      mdi-delete
                    </v-icon>
                  </template>
                  <span>Eliminar</span>
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
          </v-card>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script>
  import InfoBox from '@/components/InfoBox.vue'
  import { getCenters, getCenter, postCenter, putCenter, deleteCenter } from '@/axios/centers'
  import { getAreas, getArea, postArea, putArea, deleteArea } from '@/axios/areas'
  export default {
    components: { InfoBox },
    data: () => ({
      centersFilters: {
        page: 1,
      },
      areasFilters: {
        page: 1,
      },
      centersFirstLoad: true,
      areasFirstLoadL: true,
      loadingAreasData: true,
      loadingCentersData: true,
      totalCentersItems: 0,
      totalAreasItems: 0,
      myStats: [
        {
          bgColor: 'success  ligthen-1',
          iconClass: 'blue lighten-3 white--text',
          icon: 'mdi-bunk-bed-outline',
          title: 'Camas Totales',
          data: '450',
          action: {
            label: 'more',
            link: '',
          },
        },
        {
          bgColor: 'success  ligthen-1',
          iconClass: 'blue lighten-3 white--text',
          icon: 'mdi-bed',
          title: 'Camas Usadas',
          data: '200',
          action: {
            label: 'more',
            link: '',
          },
        },
        {
          bgColor: 'success  ligthen-1',
          iconClass: 'blue lighten-3 white--text',
          icon: 'mdi-bed-empty',
          title: 'Camas Disponibles',
          data: '250',
          action: {
            label: 'more',
            link: '',
          },
        },
      ],
      myAreaStats: [
        {
          bgColor: 'success  ligthen-1',
          iconClass: 'blue lighten-3 white--text',
          icon: 'mdi-bunk-bed-outline',
          title: 'Camas Totales',
          data: '200',
          action: {
            label: 'more',
            link: '',
          },
        },
        {
          bgColor: 'success  ligthen-1',
          iconClass: 'blue lighten-3 white--text',
          icon: 'mdi-bed',
          title: 'Camas Usadas',
          data: '150',
          action: {
            label: 'more',
            link: '',
          },
        },
        {
          bgColor: 'success  ligthen-1',
          iconClass: 'blue lighten-3 white--text',
          icon: 'mdi-bed-empty',
          title: 'Camas Disponibles',
          data: '50',
          action: {
            label: 'more',
            link: '',
          },
        },
      ],
      area: false,
      init: true,
      room: false,
      dialogDeleteUnavailable: false,
      dialogAreaDeleteUnavailable: false,
      dialogRoomDeleteUnavailable: false,
      dialog: false,
      areaDialog: false,
      roomsDialog: false,
      dialogDelete: false,
      dialogAreaDelete: false,
      dialogRoomDelete: false,
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
          text: 'Nombre',
          align: 'start',
          sortable: true,
          value: 'nombre_centro',
        },
        { text: 'Municipio', value: 'municipio' },
        { text: 'Organismo', value: 'organismo' },
        { text: 'Acciones', value: 'actions', sortable: false },
      ],
      areaHeaders: [
        {
          text: 'Nombre',
          align: 'start',
          sortable: true,
          value: 'nombre',
        },
        { text: 'Categoria', value: 'categoria' },
        { text: 'Acciones', value: 'actions', sortable: false },
      ],
      roomsHeaders: [
        {
          text: 'Numero',
          align: 'start',
          sortable: true,
          value: 'number',
        },
        { text: 'Capacidad', value: 'capacity' },
        { text: 'Acciones', value: 'actions', sortable: false },
      ],
      centers: [],
      areas: [],
      rooms: [],
      editedIndex: -1,
      editedAreaIndex: -1,
      editedRoomIndex: -1,
      editedItem: {
        nombre_centro: '',
        municipio: '',
        organismo: '',
        cap_total: 0,
        cap_disponible: 0,
        id: -1,
      },
      defaultItem: {
        nombre_centro: '',
        municipio: '',
        organismo: '',
        cap_total: 0,
        cap_disponible: 0,
        id: -1,
      },
      editedAreaItem: {
        nombre: '',
        categoria: '',
        capacity: 0,
        availability: 0,
      },
      defaultAreaItem: {
        nombre: '',
        categoria: '',
        capacity: 0,
        availability: 0,
      },
      editedRoomItem: {
        number: '',
        capacity: 0,
      },
      defaultRoomItem: {
        number: '',
        capacity: 0,
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Nuevo Centro' : 'Editar Centro'
      },
      areaFormTitle () {
        return this.editedAreaIndex === -1 ? 'Nueva Area' : 'Editar Area'
      },
      roomsFormTitle () {
        return this.editedRoomIndex === -1 ? 'Nueva Habitación' : 'Editar Habitación'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
      dialogArea (val) {
        val || this.closeArea()
      },
      dialogAreaDelete (val) {
        val || this.closeAreaDelete()
      },
      dialogRoom (val) {
        val || this.closeRoom()
      },
      dialogRoomDelete (val) {
        val || this.closeRoomDelete()
      },
    },

    async mounted () {
      this.initialize()
      this.loadCentersData()
    },

    methods: {
      async loadCentersData (page = 1) {
        this.loadingCentersData = true
        try {
          const centersResponse = await getCenters(page)
          this.totalCentersItems = centersResponse.data.meta.total
          this.centers = centersResponse.data.centros
          this.loadingCentersData = false
        } catch (err) {
          console.log(err)
        }
      },
      async loadAreasData (page = 1) {
        this.loadingAreasData = true
        try {
          const areasResponse = await getAreas(this.editedItem.id_centro, page)
          this.totalAreasItems = areasResponse.data.meta.total
          this.areas = areasResponse.data.areas
          this.loadingAreasData = false
        } catch (err) {
          console.log(err)
        }
      },
      detailsItem (item) {
        this.editedIndex = this.centers.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.loadAreasData()
        this.init = false
        this.area = true
      },
      detailsAreaItem (item) {
        this.editedAreaIndex = this.areas.indexOf(item)
        this.editedAreaItem = Object.assign({}, item)
        this.area = false
        this.room = true
      },
      closeDeleteU () {
        this.dialogDeleteUnavailable = false
      },
      closeAreaDeleteU () {
        this.dialogAreaDeleteUnavailable = false
      },
      closeRoomDeleteU () {
        this.dialogRoomDeleteUnavailable = false
      },
      initialize () {
        this.centers = [
          {
            nombre_centro: 'EIA',
            municipio: 'Santa Clara',
            organismo: 'MINED',
            cap_positivos: 100,
            cap_sospechosos: 67,
            cap_contactos: 67,
            dis_positivos: 80,
            dis_sospechosos: 25,
            dis_contactos: 50,
          },
          {
            nombre_centro: 'UCLV',
            municipio: 'Santa Clara',
            organismo: 'MES',
            cap_positivos: 100,
            cap_sospechosos: 67,
            cap_contactos: 67,
            dis_positivos: 80,
            dis_sospechosos: 25,
            dis_contactos: 50,
          },
          {
            nombre_centro: 'Pedagogico',
            municipio: 'Santa Clara',
            organismo: 'MES',
            cap_positivos: 100,
            cap_sospechosos: 67,
            cap_contactos: 67,
            dis_positivos: 80,
            dis_sospechosos: 25,
            dis_contactos: 50,
          },
          {
            nombre_centro: 'Perez Quintosa',
            municipio: 'Santa Clara',
            organismo: 'MINED',
            cap_positivos: 100,
            cap_sospechosos: 67,
            cap_contactos: 67,
            dis_positivos: 80,
            dis_sospechosos: 25,
            dis_contactos: 50,
          },
        ]
        this.areas = [
          {
            name: '900-A',
            category: 'Sospechosos',
            capacity: 45,
            availability: 20,
          },
          {
            name: '900-B',
            category: 'Sospechosos',
            capacity: 45,
            availability: 15,
          },
          {
            name: '900-C',
            category: 'Sospechosos',
            capacity: 53,
            availability: 20,
          },
        ]
        this.rooms = [
          {
            number: 101,
            capacity: 20,
          },
          {
            number: 102,
            capacity: 25,
          },
        ]
      },

      editItem (item) {
        this.editedIndex = this.centers.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },
      editAreaItem (item) {
        this.editedAreaIndex = this.areas.indexOf(item)
        this.editedAreaItem = Object.assign({}, item)
        this.areaDialog = true
      },
      editRoomItem (item) {
        this.editedRoomIndex = this.rooms.indexOf(item)
        this.editedRoomItem = Object.assign({}, item)
        this.roomsDialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.centers.indexOf(item)
        this.editedItem = Object.assign({}, item)
        if (this.editedItem.cap_disponible < this.editedItem.cap_total) {
          this.dialogDeleteUnavailable = true
        } else {
          this.dialogDelete = true
        }
      },
      deleteAreaItem (item) {
        this.editedAreaIndex = this.areas.indexOf(item)
        this.editedAreaItem = Object.assign({}, item)
        this.dialogAreaDelete = true
      },
      deleteRoomItem (item) {
        this.editedRoomIndex = this.rooms.indexOf(item)
        this.editedRoomItem = Object.assign({}, item)
        this.dialogRoomDelete = true
      },

      async deleteItemConfirm () {
        try {
          await deleteCenter(this.editedItem.id_centro)
          this.loadCentersData()
        } catch (err) {
          console.log(err)
        }
        this.centers.splice(this.editedIndex, 1)
        this.closeDelete()
      },
      async deleteAreaItemConfirm () {
        try {
          await deleteArea(this.editedAreaItem.id_area)
          this.loadAreasData()
        } catch (err) {
          console.log(err)
        }
        this.areas.splice(this.editedAreaIndex, 1)
        this.closeAreaDelete()
      },
      deleteRoomItemConfirm () {
        this.rooms.splice(this.editedRoomIndex, 1)
        this.closeRoomDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },
      closeArea () {
        this.areaDialog = false
        this.$nextTick(() => {
          this.editedAreaItem = Object.assign({}, this.defaultAreaItem)
          this.editedAreaIndex = -1
        })
      },
      closeRoom () {
        this.roomsDialog = false
        this.$nextTick(() => {
          this.editedRoomItem = Object.assign({}, this.defaultRoomItem)
          this.editedRoomIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },
      closeAreaDelete () {
        this.dialogAreaDelete = false
        this.$nextTick(() => {
          this.editedAreaItem = Object.assign({}, this.defaultAreaItem)
          this.editedAreaIndex = -1
        })
      },
      closeRoomDelete () {
        this.dialogRoomDelete = false
        this.$nextTick(() => {
          this.editedRoomItem = Object.assign({}, this.defaultRoomItem)
          this.editedRoomIndex = -1
        })
      },

      async save () {
        if (this.editedIndex > -1) {
          await putCenter(this.editedItem)
          this.loadCentersData()
          // TODO: DELETE THIS !!
          Object.assign(this.centers[this.editedIndex], this.editedItem)
        } else {
          await postCenter(this.editedItem)
          this.loadCentersData()
          // TODO: DELETE THIS !!
          this.centers.push(this.editedItem)
        }
        this.close()
      },
      async saveArea () {
        if (this.editedAreaIndex > -1) {
          await putArea(this.editedAreaItem)
          this.loadAreasData()
          Object.assign(this.areas[this.editedAreaIndex], this.editedAreaItem)
        } else {
          await postArea(this.editedItem.id_centro, this.editedAreaItem)
          this.loadAreasData()
          this.areas.push(this.editedAreaItem)
        }
        this.closeArea()
      },
      saveRoom () {
        console.log(this.editedRoomItem)
        if (this.editedRoomIndex > -1) {
          Object.assign(this.rooms[this.editedRoomIndex], this.editedRoomItem)
        } else {
          this.rooms.push(this.editedRoomItem)
        }
        this.closeRoom()
      },
      paginateCenters (pageInfo) {
        if (this.centersFirstLoad) {
          this.centersFirstLoad = false
          return
        }
        this.centersFilters.page = pageInfo.page
        this.loadCentersData(pageInfo.page)
      },
      paginateAreas (pageInfo) {
        if (this.areasFirstLoad) {
          this.areasFirstLoad = false
          return
        }
        this.areasFilters.page = pageInfo.page
        this.loadAreasData(pageInfo.page)
      },
    },
  }
</script>
<style scoped>
.fix-title {
    word-break: normal;
  }
</style>

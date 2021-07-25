<template>
  <v-expansion-panel>
    <v-expansion-panel-header>Filtros</v-expansion-panel-header>
    <v-expansion-panel-content>
      <v-row>
        <v-col
          cols="12"
          sm="4"
          md="2"
        >
          <v-text-field
            v-model="filters.ci"
            label="Carné de Identidad"
            :counter="11"
            :rules="ciRules"
          />
        </v-col>
        <v-col
          cols="12"
          sm="4"
          md="2"
        >
          <v-text-field
            v-model="filters.nombre"
            label="Nombre"
            clearable
          />
        </v-col>
        <v-col
          cols="12"
          sm="4"
          md="2"
        >
          <v-text-field
            v-model="filters.apellidos"
            label="Apellidos"
            clearable
          />
        </v-col>
        <v-col
          v-if="categories !==null"
          cols="12"
          sm="4"
          md="2"
        >
          <v-autocomplete
            v-model="filters.categoria"
            :items="categories"
            item-value="id"
            item-text="nombre"
            label="Categoría"
            clearable
          />
        </v-col>
        <v-col
          v-if="systemStatuses !== null"
          cols="12"
          sm="4"
          md="2"
        >
          <v-autocomplete
            v-model="filters.estado_sistema"
            :items="systemStatuses"
            item-value="id"
            item-text="nombre"
            label="Estado en el Sistema"
            clearable
          />
        </v-col>
        <v-col
          v-if="provinces !== null"
          cols="12"
          sm="4"
          md="2"
        >
          <v-autocomplete
            v-model="filters.provincia"
            :items="provinces"
            item-value="id"
            item-text="nombre"
            label="Provincia"
            no-data-text="Ocurrió un problema con el servidor"
            clearable
          />
        </v-col>
        <v-col
          v-if="municipalities !== null"
          cols="12"
          sm="4"
          md="2"
        >
          <v-autocomplete
            v-model="filters.municipio"
            :items="municipalities"
            item-value="id"
            item-text="nombre"
            label="Municipio"
            clearable
            no-data-text="Debe seleccionar una provincia"
            @change="searchMunicipalities"
          />
        </v-col>
        <v-col
          cols="12"
          sm="4"
          md="2"
        >
          <v-autocomplete
            v-model="filters.centro"
            :items="centers"
            item-value="id_centro"
            item-text="nombre_centro"
            no-data-text="Debe seleccionar un municipio"
            label="Institucion hospitalaria"
            clearable
          />
        </v-col>
        <v-col
          cols="12"
          sm="4"
          md="2"
        >
          <v-autocomplete
            v-model="filters.clasificacion"
            :items="clasifications"
            item-value="id"
            item-text="nombre"
            no-data-text="Ocurrió un problema con el servidor"
            label="Clasificación"
            clearable
          />
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-spacer />
        <v-btn
          color="info"
          :loading="loading"
          @click="sendFilter"
        >
          <v-icon>mdi-filter-variant</v-icon> Filtrar
        </v-btn>
        <v-spacer />
      </v-row>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
  import { getCategories, getSystemStatus, getProvinces, getMunicipalities, getClasifications } from '@/axios/nomenclators'
  import { isLastName, isId, isPositiveNumber, isCmf } from '@/utils/regex'
  import { getCenters } from '@/axios/centers'
  export default {
    name: 'FilterTool',

    props: {
      loading: {
        type: Boolean,
        default: false,
      },
      filters: {
        type: Object,
        default: null,
      },
    },
    data: () => ({
      ciRules: [
        v => isId(v) || 'Debe chequear el carné',
      ],

    }),
    computed: {
      categories () {
        return this.$store.getters.categories
      },
      systemStatuses () {
        return this.$store.getters.systemStatuses
      },
      centers () {
        return this.$store.getters.centers
      },
      clasifications () {
        return this.$store.getters.clasifications
      },
      provinces () {
        return this.$store.getters.provinces
      },
      municipalities () {
        return this.$store.getters.municipalities
      },
    },
    mounted () {
      if (!this.$store.getters.categories.lenght === 0) {
        getCategories()
      }
      if (!this.$store.getters.systemStatuses === null) {
        getSystemStatus()
      }
      if (!this.$store.getters.provinces.lenght === 0) {
        getProvinces()
      }
      getClasifications()
    },
    methods: {
      async searchMunicipalities () {
        console.log('HELLOOOOO')
      },
      sendFilter () {
        this.$emit('filter-click')
      },
      sendClose () {
        this.$emit('close-click')
      },
    },
  }
</script>

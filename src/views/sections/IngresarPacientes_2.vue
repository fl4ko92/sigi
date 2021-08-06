
<template>

  <div>
    <div class="row">
      <div class="col-md-7">
        <v-data-table
          v-model="selected"
          :headers="headers"
          :items="patients"
          :single-select="singleSelect"
          item-key="id_paciente"
          show-select
          class="elevation-1"
        >
          <template v-slot:top>
            <v-switch
              v-model="singleSelect"
              label="Selección Única"
              class="pa-3"
            ></v-switch>
          </template>
        </v-data-table>
      </div>
      <div class="col-md-5" id="centers-table">
        <v-data-table
          v-model="selectedCenters"
          :headers="headers_cat"
          :single-select="singleSelectCenters"
          :items="centers"
          item-key="nombre_centro"
          show-select
          class="elevation-1"
          :search="search"
          :custom-filter="customFilter"
        >
          <template v-slot:top>
            <div class="row">

              <div class="col-md-5" id="filter-organism">
                <v-autocomplete
                  :label="`Organismo`"

                  :items="items"
                  chips
                  small-chips
                  multiple


                ></v-autocomplete>
              </div>

              <div class="col-md-5" id="filter-categorie">
                <v-select
                  :label="`Categoria`"
                  :items="categorias_name"
                  chips
                  small-chips
                  multiple
                  v-model="search"
                ></v-select>
              </div>
            </div>
          </template>
        </v-data-table>
      </div>
    </div>
  </div>
</template>


<script>
import {getPatients, getPatient, postPatient, deletePatient, putPatient} from '@/axios/patients'
import {getCategories} from '@/axios/nomenclators'
import {getCenters} from '@/axios/centers'
import {forInRight} from 'lodash'

export default {
// eslint-disabled
  data() {
    return {
      singleSelect: false,
      selected: [],
      headers: [
        {
          text: 'Nombre',
          align: 'start',
          sortable: true,
          value: 'nombre',
        },
        {text: 'Apellidos', value: 'apellidos'},
        {text: 'Edad', value: 'edad'},
        {text: 'Sexo', value: 'sexo'},
        {text: 'Categoría', value: 'categoria'},
        {text: 'Clasificación', value: 'clasificacion'},
      ],
      patients: [],
      singleSelectCenters: true,
      selectedCenters: [],
      headers_cat: [
        {
          text: 'Nombre',
          align: 'start',
          sortable: true,
          value: 'nombre_centro',
        },
        {text: 'Municipio', value: 'municipio'},
        {text: 'Organismo', value: 'organismo'},
        /*  { text: 'Sexo', value: 'sexo' },
          { text: 'Categoría', value: 'categoria' },
          { text: 'Clasificación', value: 'clasificacion' },*/
      ],
      search: '',
      centers: [],
      categorias: [],
      categorias_name: [],
    }
  },
  created() {
    this.getPatientsData(),
      this.getCentersData()
  },
  methods: {
    customFilter(items, search, filter) {
      console.log("bdkwbdkjwkjwjwjjjjjjjjjjjjjjjjjjjjjjjjj");
      search = search.toString().toLowerCase()
      return items.filter(row => filter(row["type"], search));

    },
    async printValue(val) {
      console.log("VALUE: ", val);
    },
    async getPatientsData() {
      try {
        const patientsResponse = await getPatients()
        const pacientes = await patientsResponse.data.pacientes;
        this.getCategoriesData(pacientes);
        /*let i = 0;
    for (const p in pacientes) {
        console.log("Entre aqui");
         const p = pacientes[i];
            let classification = 'niño'
            if(p.embarazada!=0){
              classification = 'embarazada';
            }
            if(p.trabajador_salud!=0){
              classification = 'trabajador de la salud';
            }
            p.clasificacion = classification;
            pacientes[i] = p;
            i+=1;
    }*/
        this.patients = pacientes;
        console.log('Patientsss', pacientes);
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
    async getCategoriesData(pacientes) {
      try {
        const categoriesResponse = await getCategories()
        const categories = await categoriesResponse.data;
        let i = 0;
        console.log("MOCK CAT ", categories);
        let has_run = false;
        for (const p in pacientes) {

          const p = pacientes[i];
          categories.forEach(element => {
            if (!has_run) {
              this.categorias_name.push(element.nombre);
            }
            if (element.id == p.categoria) {
              p.categoria = element.nombre;
            }
          });
          has_run = true;
          pacientes[i] = p;
          i += 1;
        }
        //  this.patients = pacientes;
        console.log('Fix patients categorie', pacientes);
        console.log('categorias_name', this.categorias_name);
        console.log('categorias', this.categorias);
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
    async getCentersData(pacientes) {
      try {
        const centersResponse = await getCenters();
        const centers = await centersResponse.data.centros;
        let i = 0;

        /* for (const p in pacientes) {

              const p = pacientes[i];
                 categories.forEach(element => {
                     if(element.id == p.categoria){
                       p.categoria = element.nombre;
                     }
                 });
                 pacientes[i] = p;
                 i+=1;
         }*/
        this.centers = centers;
        console.log('Centers', centers);
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
  },

}
</script>
<style>
#centers-table {
  margin-top: 30px;
}

#filter-organism, #filter-categorie {
  margin-left: 10px;

}
</style>

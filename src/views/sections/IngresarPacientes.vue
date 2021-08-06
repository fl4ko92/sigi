<template>

  <div>
    <div class="row">
      <div class="col-md-7">
        <v-data-table
          v-model="selected"
          :headers="headers"
          :items="patients"
          @item-selected="update_selected_patients"
          @toggle-select-all="update_selected_patients"
          :single-select="singleSelect"
          item-key="id_paciente"
          show-select
          class="elevation-1"
        >
          <template v-slot:top>
            <div class="row">
              <div class="col-md-5" id="selection">
                <v-switch
                  v-model="singleSelect"
                  label="Selección Única"
                  class="pa-3"
                ></v-switch>
              </div>

              <div class="col-md-5" id="add-patients">
                <v-btn
                  depressed
                  @click="addPatients"
                  color="primary"
                >
                  Agregar Paciente
                </v-btn>

              </div>
            </div>
            <div class="row">
              <div class="col-md-5" id="patients-name">
                <v-text-field
                  v-model="text_field"
                  label="Nombre Paciente"
                  outlined
                  clearable
                  @input="getPatientsByName"
                ></v-text-field>
              </div>
              <div class="col-md-5" id="filter-categorie-patients">
                <v-select
                  :label="`Categoria`"
                  :items="categorias_name"
                  chips
                  small-chips
                  multiple
                  @change="filterByCategoriesPatients"

                ></v-select>
              </div>
            </div>
          </template>
        </v-data-table>
      </div>
      <div class="col-md-5" id="centers-table">
        <v-data-table
          v-model="selectedCenters"
          :headers="headers_cat"
          @item-selected="update_selected_center"
          :single-select="singleSelectCenters"
          :items="centers"
          item-key="nombre_centro"
          show-select
          class="elevation-1"
        >
          <template v-slot:top>
            <div class="row">

              <div class="col-md-5" id="filter-organism">
                <v-autocomplete
                  :label="`Organismo`"
                  :items="centers_name"
                  chips
                  small-chips
                  multiple
                  @change="filterByOrganismos"

                ></v-autocomplete>
              </div>

              <div class="col-md-5" id="filter-categorie">
                <v-select
                  :label="`Categoria`"
                  :items="categorias_name"
                  chips
                  small-chips
                  multiple
                  @change="filterByCategories"

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
import {getCategories, getClasifications} from '@/axios/nomenclators'
import {deleteCenter, getCenters} from '@/axios/centers'
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
      centers_name: [],
      selected_patients: [],
      selected_centers: [],
      text_field: "",
    }
  },
  created() {
    this.getPatientsData(),
      this.getCentersData(),
      this.getCentersCategoriesData()
  },
  methods: {
    update_selected_patients(values) {
      console.log("SELECTED ITEMS: entre ", values);
      if (values.value) {
        if (values.items !== undefined) {
          for (let val of values.items) {
            this.selected_patients.push(val);
          }
        } else {
          this.selected_patients.push(values.item);
        }
      } else {
        if (values.items !== undefined) {
          const neo_selected_list = [];
          for (const p of this.selected_patients) {
            if (p.id_paciente !== val.id_paciente) {
              neo_selected_list.push(values);
            }
          }
          this.selected_patients = neo_selected_list;
        } else {
          const neo_selected_list = [];
          for (const p of this.selected_patients) {
            if (p.id_paciente !== values.item.id_paciente) {
              neo_selected_list.push(values.item);
            }
          }
          this.selected_patients = [];
          this.selected_patients = neo_selected_list;
        }
      }
      console.log("SELECTED ITEMS: ", this.selected_patients);
    },
    update_selected_center(values) {
      console.log("SELECTED ITEMS: entre ", values);
      if (values.value) {
        if (values.items !== undefined) {
          for (let val of values.items) {
            this.selected_centers.push(val);
          }
        } else {
          this.selected_centers.push(values.item);
        }
      } else {
        if (values.items !== undefined) {
          const neo_selected_list = [];
          for (const p of this.selected_centers) {
            if (p.id_centro !== val.id_centro) {
              neo_selected_list.push(values);
            }
          }
          this.selected_centers = neo_selected_list;
        } else {
          const neo_selected_list = [];
          for (const p of this.selected_centers) {
            if (p.id_centro !== values.item.id_centro) {
              neo_selected_list.push(values.item);
            }
          }
          this.selected_centers = [];
          this.selected_centers = neo_selected_list;
        }
      }
      console.log("SELECTED ITEMS CENTERS: ", this.selected_centers);
    },
    async filterByOrganismos(val) {
      console.log("VALUE", val);
      await this.getCentersData();
      if (val.length > 0) {
        const neo_centers = [];
        for (const organismo of val) {
          for (const cen of this.centers) {
            console.log("CEN org ", this.centers);
            if (cen.organismo === organismo) {
              neo_centers.push(cen);
            }
          }
        }
        this.centers = neo_centers;
        console.log("Neo centers", neo_centers);
      }
    }, async filterByCategories(val) {
      console.log("VALUE", val);
      await this.getCentersData();
      if (val.length > 0) {
        const neo_centers = [];
        for (const categorie of val) {
          for (const cen of this.centers) {
            console.log("CEN CAT ", this.centers);
            if (cen.categoria === this.translateCategorie(categorie)) {
              neo_centers.push(cen);
            }
          }
        }
        this.centers = neo_centers;
        console.log("Neo centers", neo_centers);
      }
    },
    async filterByCategoriesPatients(val) {
      console.log("VALUE", val);
      await this.getPatientsData();
      if (val.length > 0) {
        const neo_centers = [];
        for (const categorie of val) {
          for (const cen of this.patients) {
            // console.log("CEN CAT ", cen.categoria);
            // console.log("CATEGORIE ", this.translateCategorie(categorie));
            if (cen.categoria === categorie) {
              neo_centers.push(cen);
            }
          }
        }
        this.patients = neo_centers;
        console.log("Neo patients", neo_centers);
      }
    }, async getPatientsByName() {
      console.log("VALUE", this.text_field);
      // await this.getPatientsData();
      await this.getPatientsData();
      const neo_centers = [];
      console.log("Patients list size ", this.patients.length)
      for (let i = 0; i < this.patients.length; i++) {
        const cen = this.patients[i];
        console.log("CEN CAT ", cen.id_paciente);
        // console.log("CATEGORIE ", this.translateCategorie(categorie));
        if (cen.nombre.includes(this.text_field)) {
          neo_centers.push(cen);
        }
      }
      this.patients = neo_centers;
      console.log("Neo patients", neo_centers);

    },
    translateCategorie(categorie) {
      let id = -1;
      for (const cat of this.categorias) {
        if (cat.nombre === categorie) {
          console.log("Cat nombre ", cat.nombre, " categoria ", categorie);
          id = cat.id;
        }
      }
      return id;
    },
    async printValue(val) {
      console.log("VALUE: ", val);
    },
    async getCentersCategoriesData() {
      try {
        const catResponse = await getClasifications();
        this.categorias = await catResponse.data;
        for (const cat of this.categorias) {
          this.categorias_name.push(cat.nombre);
        }
        console.log('cent categorias', this.categorias);
        console.log('categorias name', this.categorias_name);
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
    }, async getPatientsData() {
      try {
        const patientsResponse = await getPatients()
        this.patients = await patientsResponse.data.pacientes;
        await this.getCategoriesData();
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
        // this.patients = pacientes;
        // console.log('Patientsss', pacientes);
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
    async getCategoriesData() {
      try {
        const categoriesResponse = await getCategories()
        const categories = await categoriesResponse.data;
        this.categorias = categories;
        this.categorias_name = [];
        let i = 0;
        // console.log("MOCK CAT ", categories);
        let has_run = false;
        for (const p of this.patients) {

          categories.forEach(element => {
            if (!has_run) {
              this.categorias_name.push(element.nombre);
            }
            if (element.id == p.categoria) {
              p.categoria = element.nombre;
            }
          });
          has_run = true;
          this.patients[i] = p;
          i += 1;
        }
        //  this.patients = pacientes;
        // console.log('Fix patients categorie', pacientes);
        // console.log('categorias_name', this.categorias_name);
        // console.log('categorias', this.categorias);

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
        for (const c of centers) {
          this.centers_name.push(c.organismo);
        }
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
    },
    async addPatients() {
      try {
        console.log("Selected Patients", this.selected_patients);
        console.log("Selected Centers", this.selected_centers);
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

#add-patients {
  margin-top: 20px;
}

#filter-organism, #filter-categorie, #filter-categorie-patients, #patients-name {
  margin-left: 10px;

}
</style>

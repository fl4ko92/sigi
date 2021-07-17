<template>
  <base-section id="404">
    <v-main>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-12">
              <v-toolbar
                dark
                color="success"
              >
                <v-toolbar-title>
                  <v-avatar>
                    <img
                      :src="require('@/assets/icon.png')"
                      alt="SIGI"
                    >
                  </v-avatar>SIGI / Inicio de sesión
                </v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form 
                ref="form"
                v-model="valid"
                lazy-validation
                >
                  <v-text-field
                    v-model="username"
                    :rules="usernameRules"
                    prepend-icon="mdi-account"
                    name="login"
                    label="Usuario"
                    required
                   
                    type="text"
                  />
                  <v-text-field
                    v-model="password"
                    id="password"
                     :rules="passwordRules"
                    prepend-icon="mdi-lock"
                    name="password"
                    required
                    label="Contraseña"
                    type="password"
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn
                   :disabled="!valid"
                  submit
                  @click="submit"
                >
                  Entrar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </base-section>
</template>


<script>
export default {
  name: "Login",
  data: () => ({
    valid: true,
    users: [],
    stateId: -1,
    password: "",
    show1: false,
    error: "",
    alert: false,
    passwordRules: [
      v => !!v || "Contraseña es requerida",
      v => (v && v.length <= 20) || "La contraseña no debe tener más de 20 caracteres"
    ],
    usernameRules: [
      v => !!v || "Nombre de usuario es requerido",
    ],
    username: ""
  }),
  created() {

  },
 /* beforeCreate() {
    if (this.$store.getters.getUidUser !== null && this.$store.getters.getUidUser !== 'null') {
      this.$router.replace('/home');
    }
  }
  ,*/

  methods: {
    getToken() {
      if (this.$store.getters.getToken !== null && this.$store.getters.getToken !== 'null') {
        this.$router.replace('/home');
      }
      return this.$store.getters.getToken
    }
    ,
    submit() {
      let data_user = this.users
      let state_id = -1
      this.$refs.form.validate();
      if (this.$refs.form.validate(true)) {
        this.$store.dispatch('actionsLogin', {
          'axios': this.$axios,
          'user': this.username,
          'password': this.password
        })
        let token = this.getToken()

        if (token === null) {
          this.token = 'Credenciales erróneas'
          this.alert = true
          setTimeout(() => {
            this.alert = false
          }, 5000)
          return console.log('Credenciales erróneas');

        }
      }
    }
    ,

  }
  ,
  computed: {

  }
  ,
  mounted() {
   
  }
  ,
}

</script>

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
                  </v-avatar>Inicio de sesión
                </v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    prepend-icon="mdi-account"
                    name="login"
                    label="Usuario"
                    type="text"
                  />
                  <v-text-field
                    id="password"
                    prepend-icon="mdi-lock"
                    name="password"
                    label="Contraseña"
                    type="password"
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn
                  color="success"
                  to="/home"
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
    name: 'FourOhFour',

    provide: {
      heading: { align: 'center' },
    },
  }
</script>

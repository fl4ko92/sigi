<template>
  <base-section id="Login">
    <v-main>
      <v-container>
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
                    id="password"
                    v-model="password"
                    :rules="passwordRules"
                    prepend-icon="mdi-lock"
                    name="password"
                    required
                    label="Contraseña"
                    type="password"
                    @keydown.native.enter="submit"
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn
                  :disabled="!valid"
                  submit
                  :loading="tryLogin"
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
  import { login } from '@/axios/auth'
  import { encrypt } from '@/utils/enc'
  export default {
    name: 'Login',
    data: () => ({
      tryLogin: false,
      valid: true,
      password: '',
      show1: false,
      error: '',
      alert: false,
      passwordRules: [
        v => !!v || 'Contraseña es requerida',
      ],
      username: '',
      usernameRules: [
        v => !!v || 'Usuario es requerido',
      ],
      checkbox: false,
    }),
    methods: {
      async submit () {
        this.$refs.form.validate()
        if (this.$refs.form.validate(true)) {
          this.tryLogin = true
          try {
            const loginResponse = await login(this.username, this.password)
            const token = loginResponse.data.token
            const role = loginResponse.data.user.role
            localStorage.setItem('role', role)
            localStorage.setItem('tkn', token)
            this.$router.push({ name: 'Control' })
            this.tryLogin = false
          } catch (e) {
            this.$toast.error('No autorizado', {
              position: 'bottom-center',
              timeout: 3000,
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
            this.tryLogin = false
          }
        }
      },
    },
  }
</script>

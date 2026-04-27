<script setup>
import { ref } from 'vue'
import { supabase } from '../supabase/client.js'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const password = ref('')
const loading = ref(false)
const errorMessage = ref('')
const visible = ref(false)

const handleLogin = async () => {
  loading.value = true
  errorMessage.value = ''
  
  const { error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  })

  if (error) {
    errorMessage.value = error.message
    loading.value = false
  } else {
    router.push('/dashboard')
  }
}
</script>

<template>
  <v-app>
    <v-container class="fill-height">
      <v-responsive class="align-center text-center fill-height">
        <v-card
          class="mx-auto pa-12 pb-8"
          elevation="8"
          max-width="448"
          rounded="xl"
        >
          <v-img
            class="mx-auto my-6"
            max-width="120"
            src="https://supabase.com/dashboard/img/supabase-logo.svg"
          ></v-img>

          <div class="text-subtitle-1 text-medium-emphasis">Cuenta</div>

          <v-text-field
            v-model="email"
            density="compact"
            placeholder="Dirección de correo"
            prepend-inner-icon="mdi-email-outline"
            variant="outlined"
            required
          ></v-text-field>

          <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
            Contraseña
          </div>

          <v-text-field
            v-model="password"
            :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
            :type="visible ? 'text' : 'password'"
            density="compact"
            placeholder="Ingresa tu contraseña"
            prepend-inner-icon="mdi-lock-outline"
            variant="outlined"
            @click:append-inner="visible = !visible"
            required
          ></v-text-field>

          <v-alert
            v-if="errorMessage"
            color="error"
            icon="$error"
            title="Error de acceso"
            :text="errorMessage"
            variant="tonal"
            class="mb-4"
          ></v-alert>

          <v-btn
            block
            class="mb-8"
            color="blue"
            size="large"
            variant="flat"
            :loading="loading"
            @click="handleLogin"
          >
            Iniciar Sesión
          </v-btn>
        </v-card>
      </v-responsive>
    </v-container>
  </v-app>
</template>
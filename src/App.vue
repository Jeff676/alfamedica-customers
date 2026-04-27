<script setup>
import { supabase } from './supabase/client.js'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const authListener = supabase.auth.onAuthStateChange((event, session) => {
  if (event === 'SIGNED_IN') {
    console.log('Usuario autenticado:', session.user)
  }
  if (event === 'SIGNED_OUT') {
    router.push({ name: 'Login' })
    console.log('Usuario desautenticado')
  }
})

onMounted(() => {
  authListener
})

</script>

<template>
  <router-view />
</template>

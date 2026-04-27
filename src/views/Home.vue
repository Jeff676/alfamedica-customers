<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../supabase/client.js'

const doctors = ref([])

const getDoctors = async () => {
    const { data } = await supabase.from('doctors').select()

    doctors.value = data
}

onMounted(() => {
    getDoctors()
})
</script>

<template>
   <v-container fluid>
    <v-row>
      <v-col 
        v-for="n in 3" 
        :key="n"
        cols="12" 
        sm="6" 
        md="4"
      >
        <v-card class="pa-4" elevation="2">
          <v-card-title>Cliente {{ n }}</v-card-title>
          <v-card-text>Integración con Supabase activa.</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card class="bg-indigo-darken-1"  elevation="4" border-color="yellow">
          <v-card-title>Bienvenido a la página de inicio</v-card-title>
          <v-card-text>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore
            voluptatibus! Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero rerum
            unde voluptatem!
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="4">
        <div class="bg-primary border-xl" border-color="red">1</div>
      </v-col>
      <v-col>
        <div class="border-md bg-primary pa-4">
  Div con borde grueso Indigo Darken 2
</div>
      </v-col>
    </v-row>
  </v-container>
</template>
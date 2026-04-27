<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../supabase/client.js'
import { useRouter } from 'vue-router'

const router = useRouter()
const doctors = ref([])

const getDoctors = async () => {
    const { data } = await supabase.from('doctors').select()

    doctors.value = data
}

const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
        console.error('Error al cerrar sesión:', error.message);
        return;
    }
    // Redirección imperativa a la vista de acceso
    router.push('/login');
};


onMounted(() => {
    getDoctors()
})
</script>

<template>
    <h1>Dashboard</h1>
    <ul>
        <li v-for="doctor in doctors" :key="doctor.id">
            {{ doctor.name }} {{ doctor.lastname }}
        </li>
    </ul>

    <v-btn color="error" variant="flat" prepend-icon="mdi-logout" @click="handleLogout">
        Cerrar Sesión
    </v-btn>
</template>
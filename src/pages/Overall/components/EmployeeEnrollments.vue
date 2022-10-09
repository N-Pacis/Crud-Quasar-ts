<template>
  <q-page padding>
    <!-- content -->
  </q-page>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import {getEmployeesEnrollmentsData} from '../data'

  const chartData = ref({
    labels: [''],
    datasets: [
      {
        data: [0]
      }
    ]
  })

  function loadComponent() {
    getEmployeesEnrollmentsData()
    .then((data)=>chartData.value=data)
  }

  onMounted(()=>{
    loadComponent()
  })

</script>

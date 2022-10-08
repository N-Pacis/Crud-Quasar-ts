<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <SimpleTable
    :columns="employeeColumns"
    :data="employeeData"
    :loading="employeeDataLoading"
    :download-csv="downloadEmployeesCsv"
  />
</template>

<script setup lang="ts">
import { response } from 'express';
import { api } from 'src/boot/axios';
import SimpleTable from 'src/components/SimpleTable.vue';
import { Column } from 'src/types/Column';
import { Ref, ref, onMounted } from 'vue';
import { getEmployeesData } from '../data';
import { Employee } from '../types';


const employeeDataLoading: Ref<boolean> = ref(true);

const employeeData: Ref<Employee[] | Array<object>> = ref([{}]);

const employeeColumns: Array<Column> = [
  {
    label: 'Name',
    field: 'Name',
    loadingWidth: '60%',
    width: '25%'
  },
  {
    label: 'National ID',
    field: 'NationalId',
    loadingWidth: '60%',
    width: '25%'
  },
  {
    label: 'Phone',
    field: 'Phone',
    loadingWidth: '40%',
    width: '15%'
  },
  {
    label: 'Email',
    field: 'Email',
    loadingWidth: '60%',
    width: '25%'
  },
  {
    label: 'Code',
    field: 'Code',
    loadingWidth: '60%',
    width: '25%'
  }
]

function downloadEmployeesCsv() {
  api.get('/employees/download-csv',{responseType: 'blob'})
  .then((response)=>{
    var fileUrl = window.URL.createObjectURL(new Blob([response.data]))
    var fileLink = document.createElement('a');

    fileLink.href = fileUrl
    fileLink.setAttribute('download','Employees.csv')
    document.body.appendChild(fileLink)

    fileLink.click()
  })
}

function loadEmployees() {
  employeeDataLoading.value = true;
  getEmployeesData()
    .then((data) => {
      employeeData.value = data
      employeeDataLoading.value = false;
    })
}

function loadComponent() {
  loadEmployees()
}

onMounted(() => {
  loadComponent();
})
</script>

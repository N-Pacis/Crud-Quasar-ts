<template>
  <div>
    <div class="text-right">
      <q-btn
        style="z-index: 1"
        flat
        round
        aria-label="Download"
        icon="img:icons/download.svg"
        @click="props.downloadCsv"
      >
        <q-tooltip>Export to CSV</q-tooltip>
      </q-btn>
    </div>
    <q-markup-table
      separator="cell"
      flat
      class="table q-my-md"
      wrap-cells
    >
      <thead>
        <tr>
          <th
            v-for="(column,index) in props.columns"
            :key="index"
            class="bg-gray-1"
            style="border-left: none;border-bottom:none"
          >
            <q-tooltip
              v-if="column.help"
              class="text-black"
              anchor="top middle"
              self="top middle"
            >
              {{column.help}}
            </q-tooltip>
            <p class="cell-text text-gray-4 q-py-lg">{{column.label}}</p>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row,row_index) in props.data" :key="row_index">
          <td
            :style="{
              backgroundColor: column.cellColor
                ? column.cellColor(row[column.field])
                : column.color,
              width: column.width,
              height: '70px'
            }"
            v-for="(column,column_index) in props.columns"
            :key="column_index"
          >
            <div
              class="full-height full-width column justify-center"
              :class="{
                'q-px-md': ['start', 'end'].includes(column.align ?? ''),
              }"
              :style="{ alignItems: column.align ?? 'center' }"
            >
              <q-skeleton
                style="position: absolute"
                v-show="props.loading"
                type="text"
                :width="column.loadingWidth"
                height="50%"
              />
              <div
                class="cell-text text-center"
                :style="{
                  visibility: loading ? 'hidden' : 'visible',
                }"
              >
                {{
                  row[column.field]
                }}
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </q-markup-table>
  </div>
</template>

<script setup lang="ts">
import { Column } from 'src/types/Column';
import { PropType } from 'vue';

  const props = defineProps({
    columns:{
      type: Array as PropType<Array<Column>>,
      required: true
    },
    data:{
      type: Object,
      required: true
    },
    loading:{
      type: Boolean,
      default:false
    },
    sort:{
      type: Function
    },
    downloadCsv: {
      type: Function
    }
  })
</script>
<style scoped>
  .table{
    border-radius: 10px;
    border: 1px solid #ebebeb;
  }
  .table td{
    padding: 0;
  }

  .cell-text{
    margin: 0;
    font-style: normal;
    font-weight:500;
    font-size:15px;
    letter-spacing: 0.04em;
    color: #4f4e4e;
    border-radius: 20px;
  }
</style>

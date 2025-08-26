<template>
  <div class="container">

  <div class="card">
    <div class="card_cont">
      <div class="card_header">herder</div>
      <div class="card_body">
        <div
          style="
            display: grid;
            grid-template-columns: 1fr 1fr 1fr 1fr;
            gap: 10px;
          "
        >
          <!-- <a-input />
          <a-input />
          <a-input /> -->
          <a-select
            v-model:value="value"
            placeholder="custom dropdown render"
            :options="options"
            :dropdownMatchSelectWidth="false"
            :popupClassName="'pop_grid'"
            :dropdownStyle="{
              width: '400px',
              height: '300px',
            }"
          >
            <template #dropdownRender> test content </template>
          </a-select>
          <button @click="handleClick">模拟大数据量服务调用</button>
        </div>
      </div>
    </div>
  </div>
  <!-- <template v-if="gridReady"> -->
  <div style="height: 500px;">

    <ag-grid-vue
          id="TEST_MAINGRID"
          ref="mainGridRef"
          style="width: 100%; height: 100%"
          class="ag-theme-balham"
          :enableRtl="false"
          :singleClickEdit="true"
          :rowData="[]"
          :columnDefs="mainGridColumnDefs"
          :defaultColDef="mainGridDefaultColDef"
          rowSelection="multiple"
          groupDisplayType="groupRows"
          rowGroupPanelShow="always"
          :stopEditingWhenCellsLoseFocus="true"
          :checkboxSelection="true"
          :suppressRowClickSelection="true"
          @grid-ready="onGridReady"
          @first-data-rendered="onFirstDataRendered"
          @cell-focused="onCellFocused">
      </ag-grid-vue>
  </div>
  <!-- </template> -->
  <div> 其他区域</div>
  </div>

</template>
<script setup lang="ts">
import { onBeforeUnmount, onUnmounted, ref } from "vue";
import { GridApi } from '@ag-grid-community/core';

declare const window: Window & Record<string, any>;
const value = ref();
const options = ref([]);
const mainGridApi = ref<GridApi>();
const mainGridDefaultColDef = ref({
  sortable: true,
  editable: false,
  filter: 'agMultiColumnFilter',
  resizable: true
});

const mainGridRowData = ref<any[]>([]);

// SELECT  , , , , , , , , , , , , , ,,
// FROM IPLAT4C.HEDLOG;
const mainGridColumnDefs = ref([
  {
    field: 'ID',
    headerName: 'ID',
    enableRowGroup: true
  },
  {
    field: 'CREATE_TIME',
    headerName: 'CREATE_TIME',
    enableRowGroup: true
  },
  {
    field: 'TIME_INTERVAL',
    headerName: 'TIME_INTERVAL',
    enableRowGroup: true
  },
  {
    field: 'PID',
    headerName: 'PID',
    enableRowGroup: true
  },
  {
    field: 'IP',
    headerName: 'IP',
    enableRowGroup: true
  },
  {
    field: 'MAC',
    headerName: 'MAC',
    enableRowGroup: true
  },
  {
    field: 'USERID',
    headerName: 'USERID',
    enableRowGroup: true
  },
  {
    field: 'SVC_NAME',
    headerName: 'SVC_NAME',
    enableRowGroup: true
  },
  {
    field: 'FUNC_NAME',
    headerName: 'FUNC_NAME',
    enableRowGroup: true
  },
  {
    field: 'CAT_NAME',
    headerName: 'CAT_NAME',
    enableRowGroup: true
  },
  {
    field: 'PRIORITY',
    headerName: 'PRIORITY',
    enableRowGroup: true
  },
  {
    field: 'I18N_FLAG',
    headerName: 'I18N_FLAG',
    enableRowGroup: true,
    type: 'numericColumn'
  },
  {
    field: 'MSG',
    headerName: 'MSG',
    enableRowGroup: true
  },
  {
    field: 'KEY1_VALUE',
    headerName: 'KEY1_VALUE',
    enableRowGroup: true
  },
  {
    field: 'KEY2_VALUE',
    headerName: 'KEY2_VALUE',
    enableRowGroup: true
  },
  {
    field: 'KEY3_VALUE',
    headerName: 'KEY3_VALUE',
    enableRowGroup: true
  },
  {
    field: 'KEY4_VALUE',
    headerName: 'KEY4_VALUE',
    enableRowGroup: true
  },
  {
    field: 'KEY5_VALUE',
    headerName: 'KEY5_VALUE',
    enableRowGroup: true
  },
  {
    field: 'FORMNAME',
    headerName: 'FORMNAME',
    enableRowGroup: true
  }
]);

const onGridReady = (params: any) => {
  mainGridApi.value = params.api;
  // const body = document.querySelector('body');
  // params.api.setPopupParent(body);
};


const onCellFocused = (params: any) => {
  // console.log("onCellFocused", params);

};
const onFirstDataRendered = (params: any) => {
  // 只会自适应可见区域
  params.columnApi.autoSizeAllColumns();
};

const handleClick = () => {
  // 使用fetch获取本地mock数据
  fetch('/mock-data/query_result_1756190304096.json')
    .then(response => response.json())
    .then((mockData) => {
      // console.log('Mock data loaded:', mockData);
      const data = mockData.queryResult;

      // // 将查询结果保存到JSON文件
      // const jsonData = {
      //   timestamp: new Date().toISOString(),
      //   queryResult: data,
      //   totalRecords: data.length
      // };

      // // 创建下载链接保存JSON文件
      // const blob = new Blob([JSON.stringify(jsonData, null, 2)], { type: 'application/json' });
      // const url = URL.createObjectURL(blob);
      // const link = document.createElement('a');
      // link.href = url;
      // link.download = `query_result_${new Date().getTime()}.json`;
      // document.body.appendChild(link);
      // link.click();
      // document.body.removeChild(link);
      // URL.revokeObjectURL(url);

      mainGridApi.value!.setRowData(data);
    })
    .catch(error => {
      console.error('Error loading mock data:', error);
    });

};

</script>
<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.card {
  padding: 5px;
}
.card_cont {
  border: 1px solid #99d2ff;
  border-radius: 4px;
}
.card_header {
  padding: 0 10px;
  color: #2f80ed;
  height: 25px;
  background-color: #dbefff;
}
.card_body {
  padding: 5px;
}
.pop_grid > div {
  width: 100% !important;
  height: 100% !important;
}
</style>

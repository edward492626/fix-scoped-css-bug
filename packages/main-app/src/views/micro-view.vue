<template>
  <div style="width: 100%; height: 100%; display: flex">
    <div class="menu">
      <button @click="handleLoadApp">加载</button>
      <br>
      <button @click="handleCleanCacheAndRefresh">清除缓存并刷新</button>
      <br>
      <button @click="handleRefresh">刷新</button>
      <br>
      <button @click="handleUnmountApp">卸载应用</button>
    </div>
    <div class="main">
      <div class="header">head</div>
      <div v-if="loadApp">
        <micro-app
          :name="appName"
          :url="url"
          :router-mode="'state'"
          :data="config"
          iframe
          @created="handleCreate"
          @beforemount="handleBeforeMount"
          @mounted="handleMount"
          @unmount="handleUnmount"
          @error="handleError"
          @datachange="handleDataChange"
        ></micro-app>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import {ref} from 'vue';
import microApp from "@micro-zoe/micro-app";

const url = "http://localhost:5175/#/";
const appName = 'DEMO01_c02a55b1-ffec-4967-8889-5dace329f33f';
const config = ref<Record<string, any>>({
  appContext:"/test/",
  data: {}
});

const loadApp = ref(false)
const handleCreate = () => {
  console.log("[LifeCycle] created %c%s", "color: green;", appName);
};
const handleBeforeMount = (e: CustomEvent) => {
  console.log("[LifeCycle] before mount %c%s", "color: green;", appName
  );
};
const handleMount = () => {
  console.log("[LifeCycle] mounted %c%s", "color: green;", appName);
};
const handleUnmount = (e: CustomEvent) => {
  console.log("[LifeCycle] unmount %c%s", "color: green;",appName);
};
const handleError = (e: CustomEvent) => {
  console.log( "failed to load %c%s, detail:", "color: red;", appName, e.detail.error);
};
const handleDataChange = (e: CustomEvent) => {
  console.log("from child:", e.detail.data);
};
const handleLoadApp = () => {
  loadApp.value = true;
}
const handleRefresh = (e: any) => {
  if (!loadApp.value) {
    alert('请先加载应用');
    return;
  }
  microApp.reload(appName);
}
const handleCleanCacheAndRefresh = (e: any) => {
  if (!loadApp.value) {
     alert('请先加载应用');
    return;
  }
  microApp.reload(appName, true);
}

const handleUnmountApp = (e: any) => {
  if (!loadApp.value) {
     alert('请先加载应用');
    return;
  }
  // microApp.unmount(appName);
  microApp.unmountApp(appName, {
    destroy: true
  });
   loadApp.value = false;
}
</script>
<style scoped lang="scss">
.menu {
  width: 300px;
  height: 100%;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: antiquewhite;
}
.header {
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: antiquewhite;
}
.main {
  width: calc(100% - 300px);
  height: 100%;
  /* background-color: azure; */
}
.main micro-app {
  height: calc(100% - 48px);
}
</style>

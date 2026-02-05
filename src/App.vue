<template>
  <el-container>
    <el-header>
      <div class="header-content">
        <h1>Vue 3 test projects</h1>
        <el-menu mode="horizontal" :default-active="activeIndex" class="header-menu">
          <el-menu-item index="solutions">
            <router-link to="/solutions">Решения</router-link>
          </el-menu-item>
          <el-menu-item index="tasks">
            <router-link to="/tasks">Задания</router-link>
          </el-menu-item>
          <el-menu-item index="about">
            <router-link to="/about">О проекте</router-link>
          </el-menu-item>
        </el-menu>
      </div>
    </el-header>
    <el-main>
      <router-view />
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const activeIndex = computed(() => {
  const path = route.path
  if (path.startsWith('/projects')) return 'projects'
  if (path.startsWith('/tasks')) return 'tasks'
  if (path.startsWith('/about')) return 'about'
  return 'projects'
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.el-header {
  background-color: #409eff;
  color: white;
  padding: 0;
  height: 60px !important;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  height: 100%;
}

.header-content h1 {
  margin: 0;
  font-size: 20px;
  font-weight: 500;
}

.header-menu {
  background-color: transparent;
  border-bottom: none;
}

.header-menu .el-menu-item {
  color: white;
  border-bottom: 2px solid transparent;
}

.header-menu .el-menu-item.is-active {
  color: white !important;

  border-bottom-color: white;
}

.header-menu .el-menu-item.is-active:hover {
  color: #409eff !important;
}

.header-menu .el-menu-item a {
  color: inherit;
  text-decoration: none;
}

.el-main {
  padding: 20px;
}
</style>

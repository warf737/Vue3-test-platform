<template>
  <div class="solution-module-loader">
    <div v-if="loading" class="loading-container">
      <el-skeleton :rows="5" animated />
    </div>
    <div v-else-if="error" class="error-container">
      <el-alert :title="error" type="error" :closable="false" show-icon />
    </div>
    <component :is="moduleComponent" v-else-if="moduleComponent" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineAsyncComponent, type Component } from 'vue'

interface Props {
  moduleName: string
}

const props = defineProps<Props>()

const loading = ref(true)
const error = ref<string | null>(null)
const moduleComponent = ref<Component | null>(null)

const loadModule = async () => {
  try {
    loading.value = true
    error.value = null

    // Динамическая загрузка модуля по имени
    const module = await import(
      `@/views/Solutions/solutions/${props.moduleName}/${props.moduleName}.vue`
    )

    moduleComponent.value = defineAsyncComponent(() => Promise.resolve(module.default || module))
  } catch (err) {
    console.error('Failed to load solution module:', err)
    error.value = `Не удалось загрузить модуль "${props.moduleName}"`
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  if (props.moduleName) {
    loadModule()
  } else {
    error.value = 'Имя модуля не указано'
    loading.value = false
  }
})
</script>

<style scoped>
.solution-module-loader {
  width: 100%;
  min-height: 200px;
}

.loading-container {
  padding: 20px;
}

.error-container {
  padding: 20px;
}
</style>

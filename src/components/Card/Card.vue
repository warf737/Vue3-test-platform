<template>
  <el-card
    :class="['task-card', customClass]"
    :shadow="shadow"
    :style="computedStyle"
    @click="handleClick"
  >
    <template v-if="$slots.header" #header>
      <slot name="header" />
    </template>
    <slot />
  </el-card>
</template>

<script setup lang="ts">
import { useComputedStyle } from '@/composables/useComputedStyle'

interface Props {
  shadow?: 'always' | 'hover' | 'never'
  customClass?: string
  customStyle?: string | Record<string, string>
  bodyPadding?: string
  clickable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  shadow: 'hover',
  customClass: '',
  customStyle: () => ({}),
  bodyPadding: '10px 20px',
  clickable: true,
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const handleClick = (event: MouseEvent) => {
  if (props.clickable) {
    emit('click', event)
  }
}

const computedStyle = useComputedStyle(props.customStyle)
</script>

<style scoped>
.task-card {
  margin-bottom: 20px;
  cursor: pointer;
  transition: transform 0.2s;
}

.task-card:hover {
  transform: translateY(-5px);
}

.task-card :deep(.el-card__body) {
  padding: v-bind('props.bodyPadding') !important;
}
</style>

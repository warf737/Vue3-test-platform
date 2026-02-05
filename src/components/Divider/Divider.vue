<template>
  <el-divider
    :border-style="borderStyle"
    :direction="direction"
    :content-position="contentPosition"
    :class="customClass"
    :style="computedStyle"
  >
    <slot />
  </el-divider>
</template>

<script setup lang="ts">
import { useComputedStyle } from '@/composables/useComputedStyle'

interface Props {
  borderStyle?: 'solid' | 'dashed' | 'dotted'
  direction?: 'horizontal' | 'vertical'
  contentPosition?: 'left' | 'center' | 'right'
  customClass?: string
  customStyle?: string | Record<string, string>
  margin?: string
}

const props = withDefaults(defineProps<Props>(), {
  borderStyle: 'solid',
  direction: 'horizontal',
  contentPosition: 'center',
  customClass: '',
  customStyle: () => ({}),
  margin: '24px 0',
})

const computedStyle = useComputedStyle(props.customStyle, { margin: props.margin })
</script>

<style scoped></style>

<script setup lang="ts">
import { computed } from 'vue'
import { useSlideContext } from '@slidev/client'
import Kodee from './Kodee.vue'

const slideContext = useSlideContext()

// Get kodee configuration from frontmatter
const kodeeConfig = computed(() => {
  return slideContext.$frontmatter?.kodee || null
})

// Check if kodee should be shown on this slide
const showKodee = computed(() => {
  return kodeeConfig.value !== null && kodeeConfig.value !== false
})
</script>

<template>
  <Kodee
    v-if="showKodee"
    :variant="kodeeConfig.variant"
    :size="kodeeConfig.size"
    :position="kodeeConfig.position"
    :x="kodeeConfig.x"
    :y="kodeeConfig.y"
    :scale="kodeeConfig.scale"
  />
</template>

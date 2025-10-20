<script setup lang="ts">
import KodeeWrapper from '../components/KodeeWrapper.vue'
</script>

<template>
  <div class="slidev-layout intro">
    <div class="my-auto">
      <slot />
    </div>
    <KodeeWrapper />
  </div>
</template>

<script setup lang="ts">
import {computed} from 'vue'

interface Props {
  variant?: string
  size?: 'small' | 'large' | 'medium'
  position?: 'corner' | 'featured' | 'custom'
  x?: number
  y?: number
  scale?: number
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'greeting',
  size: 'small',
  position: 'corner',
  x: undefined,
  y: undefined,
  scale: undefined,
})

// Compute image source
const imageSrc = computed(() => {
  const variant = props.variant.startsWith('kodee-') ? props.variant : `kodee-${props.variant}`
  return `/${variant}.svg`
})

// Compute size classes and dimensions
const sizeConfig = computed(() => {
  switch (props.size) {
    case 'large':
      if (imageSrc.value == "/kodee-wave.svg") {
        return {width: '500px', height: '500px'}
      } else {
        return {width: '600px', height: '600px'}
      }
    case 'small':
    default:
      return {width: '200px', height: '200px'}
  }
})

// Compute position styles
const positionStyles = computed(() => {
  const styles: Record<string, string> = {
    position: 'absolute',
    width: sizeConfig.value.width,
    height: sizeConfig.value.height,
  }

  styles.right = '0px'
  if (props.position === 'corner') {
    if (imageSrc.value == "/kodee-greeting.svg") {
      styles.bottom = '-42px'
    } else if (imageSrc.value == "/kodee-wink.svg") {
      styles.bottom = '-35px'
    } else if (imageSrc.value == "/kodee-wave.svg") {
      styles.bottom = '-15px'
    } else {
      styles.bottom = '-42px'
    }

  } else if (props.position === 'featured') {
    styles.right = '-5%'
    styles.transform = 'translateY(-40%)'

    if (imageSrc.value == "/kodee-greeting.svg") {
      styles.top = '13%'
    } else if (imageSrc.value == "/kodee-wink.svg") {
      styles.top = '10%'
    } else if (imageSrc.value == "/kodee-wave.svg") {
      styles.top = '16%'
      styles.right = '3%'
    } else {
      styles.top = '0%'
    }

  } else if (props.position === 'custom' && props.x !== undefined && props.y !== undefined) {
    styles.left = `${props.x}px`
    styles.top = `${props.y}px`
  }

  return styles
})

// Compute v-motion animation config
const motionConfig = computed(() => {
  const baseScale = props.scale || 1

  return {
    initial: {
      opacity: 0,
      scale: baseScale * 0.8,
    },
    enter: {
      opacity: 1,
      scale: baseScale,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
        mass: 1,
      },
    },
    leave: {
      opacity: 0,
      scale: baseScale * 0.8,
      transition: {
        duration: 300,
      },
    },
  }
})
</script>

<template>
  <img
      v-motion
      :initial="motionConfig.initial"
      :enter="motionConfig.enter"
      :leave="motionConfig.leave"
      :src="imageSrc"
      :alt="`Kodee ${variant}`"
      :style="positionStyles"
      class="kodee-character"
  />
</template>

<style scoped>
.kodee-character {
  pointer-events: none;
  object-fit: contain;
  view-transition-name: kodee-mascot;
}
</style>

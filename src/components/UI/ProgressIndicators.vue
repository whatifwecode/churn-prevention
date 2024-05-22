<template>
  <div class="flex items-center justify-between flex-col gap-1 mb-8">
    <div class="text-sm font-bold"><span data-test="current-step">{{ stepToShow }}</span>/{{ totalSteps }}</div>
    <div class="flex items-center">
      <div v-for="index in totalSteps" :key="index" :class="indicatorClasses(index)">
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue';

export default defineComponent({
  props: {
    currentStep: {
      type: Number as PropType<number>,
      required: true
    }
  },
  computed: {
    totalSteps(): number {
      return 4; // You can adjust this value as needed
    },
    stepToShow(): number {
      if (this.currentStep > 4) {
        return 4;
      } else if (this.currentStep === 4) {
        return 3; // Visually show as step 3 when on step 4
      } else {
        return this.currentStep;
      }
    }
  },
  methods: {
    indicatorClasses(index: number) {
      return [
        'h-1',
        'w-6',
        'md:w-10',
        'mr-1',
        'rounded',
        index <= this.stepToShow ? 'bg-blue-500' : 'bg-gray-200'
      ];
    }
  }
});
</script>
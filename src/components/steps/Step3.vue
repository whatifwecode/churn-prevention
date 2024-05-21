<template>
  <div>
    <p class="text-lg md:text-xl font-bold mb-4 text-center">
      Kirjuta meile oma probleemist, et saaksime Sind aidata või lahendust pakkuda.
    </p>
    <div class="relative">
      <textarea
          v-model="cancellationDescription"
          placeholder="Siseta siia kommentaar"
          class="p-2 mb-8 w-full bg-gray-100 h-24 rounded-lg resize-none"
          @input="limitChars"
      ></textarea>
      <div class="absolute bottom-1 right-1 text-sm text-gray-400">
        Järelejäänud: {{ remainingChars }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'Step3',
  setup() {
    const store = useStore();
    const cancellationDescription = ref(store.state.cancellationDescription);
    const maxChars = 200;

    const remainingChars = computed(() => maxChars - cancellationDescription.value.length);

    const limitChars = (event: Event) => {
      const target = event.target as HTMLTextAreaElement;
      if (target.value.length > maxChars) {
        target.value = target.value.slice(0, maxChars);
      }
      cancellationDescription.value = target.value;
    };

    watch(cancellationDescription, (newVal) => {
      store.dispatch('updateCancellationDescription', newVal);
    });

    return {
      cancellationDescription,
      remainingChars,
      limitChars,
    };
  },
});
</script>

<template>
  <div>
    <p class="text-lg md:text-xl font-bold mb-4 text-center">Miks soovid tellimust tühistada?</p>
    <div class="mb-4 flex flex-col gap-3">
      <label v-for="(reason, index) in cancellationReasons()" :key="index" class="custom-radio-label">
        <input type="radio" v-model="selectedReason" :value="reason" name="cancellationReason" class="hidden">
        <span class="custom-radio"></span> {{ reason }}
      </label>
    </div>
    <div class="flex items-center justify-evenly text-center mb-5 text-sm sm:text-sm">
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref, watch} from 'vue';
import { useStore } from 'vuex';
import {cancellationReasons} from "@/config/cancellationReasons";

export default defineComponent({
  name: 'Step2',
  methods: {
    cancellationReasons() {
      return cancellationReasons
    }
  },
  setup() {
    const store = useStore();
    const selectedReason = ref(store.state.cancellationReason);

    watch(selectedReason, (newValue) => {
      store.dispatch('updateCancellationReason', newValue);
    });
    return {
      selectedReason,
    };
  }
});
</script>

<style scoped>
/* Hide the default radio button */
input[type="radio"].hidden {
  display: none;
}

/* Custom radio button styling */
.custom-radio {
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid #d1d5db;
  background-color: transparent;
  vertical-align: middle;
  margin-right: 8px;
  position: relative;
  cursor: pointer;
}

/* Selected state */
input[type="radio"]:checked + .custom-radio::after {
  content: '';
  display: block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #3b82f6;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>

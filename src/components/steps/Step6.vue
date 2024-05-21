<template>
  <div class="flex items-center justify-evenly text-center mb-5 mt-8 flex-col gap-7">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="56" height="56" fill="#00d46e">
      <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM11.0026 16L6.75999 11.7574L8.17421 10.3431L11.0026 13.1716L16.6595 7.51472L18.0737 8.92893L11.0026 16Z"></path>
    </svg>
    <p>Mein on nii kahju, et oled soovinud tellimuse tühistada.</p>
    <p>Sinu praegune tellimus kehtib kuni <strong>{{ subscriptionEnds }}</strong></p>
    <button @click="redirectToDelfi" class="bg-blue-500 text-white px-8 md:px-12 py-3 rounded-full mr-2 uppercase hover:bg-green-600 transition duration-300 ease-in-out">Lugema</button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const subscriptionEnds = computed(() => {
  const currentDate = new Date();
  const daysLeft = store.getters.daysLeft;
  currentDate.setDate(currentDate.getDate() + daysLeft);
  const day = String(currentDate.getDate()).padStart(2, '0');
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const year = currentDate.getFullYear();
  return `${day}.${month}.${year}`;
});

const redirectToDelfi = () => {
  window.open('https://www.delfi.ee', '_blank');
};
</script>

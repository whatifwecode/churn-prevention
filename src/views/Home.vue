<template>
  <div class="container mx-auto p-4">
    <h1 class="text-4xl font-bold mb-4">Home</h1>
    <p class="mb-4">{{ message }}</p>
    <input v-model="newMessage" placeholder="Update message" class="border p-2 mb-4"/>
    <button @click="updateMessage" class="bg-blue-500 text-white px-4 py-2 rounded">Update Message</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'Home',
  setup() {
    const store = useStore();
    const message = store.getters.message;
    const newMessage = ref('');

    const updateMessage = () => {
      store.dispatch('updateMessage', newMessage.value);
    };

    return {
      message,
      newMessage,
      updateMessage
    };
  }
});
</script>

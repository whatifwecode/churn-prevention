<template>
  <div id="app">
    <router-view/>
    <ChurnPreventionModal />
    <button @click="showModal" data-test="start-flow-button" class="start-flow-button fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded">
      Start Flow
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from 'vuex';
import ChurnPreventionModal from './components/ChurnPreventionModal.vue';

export default defineComponent({
  name: 'App',
  components: {
    ChurnPreventionModal
  },
  setup() {
    const store = useStore();

    const showModal = async () => {
      try {
        await store.dispatch('startChurnFlow');
        console.log('Churn flow started successfully');
      } catch (error) {
        console.error('Error starting churn flow:', error);
      }
    };

    return {
      showModal
    };
  }
});
</script>

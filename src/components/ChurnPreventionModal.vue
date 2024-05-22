<template>
  <div v-if="isVisible" class="fixed inset-0 bg-gray-300 bg-opacity-75 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg px-1.5 sm:p-6 py-1.5 md:p-10 w-full max-w-lg md:max-w-xl relative mx-4 sm:max-h-[80vh] md:max-h-[70vh] overflow-auto">

      <CloseButton @close="closeModal" />
      <ProgressIndicators :currentStep="currentStep"/>

      <!-- Step components -->
      <component :is="currentStepComponent" v-bind="currentStepProps" />

      <!-- Action buttons -->
      <div v-if="showActionButtons" class="flex items-center justify-evenly text-center mb-5 text-sm sm:text-sm">
        <button @click="continueSubscription" class="bg-[#00d46e] text-white px-8 md:px-6 py-3 rounded-full mr-2 uppercase hover:bg-green-600 transition duration-300 ease-in-out">Jätkan tellimusega</button>
        <button @click="requiredMutation" class="bg-gray-100 text-black px-8 md:px-6 py-3 rounded-full uppercase font-bold hover:bg-gray-300 transition duration-300 ease-in-out">Edasi tühistama</button>
      </div>

      <!-- Help section -->
      <HelpSection />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, watch, defineAsyncComponent } from 'vue';
import { useStore } from 'vuex';

const Step1 = defineAsyncComponent(() => import('@/components/steps/Step1.vue'));
const Step2 = defineAsyncComponent(() => import('@/components/steps/Step2.vue'));
const Step3 = defineAsyncComponent(() => import('@/components/steps/Step3.vue'));
const Step4 = defineAsyncComponent(() => import('@/components/steps/Step4.vue'));
const Step5 = defineAsyncComponent(() => import('@/components/steps/Step5.vue'));
const Step6 = defineAsyncComponent(() => import('@/components/steps/Step6.vue'));
const CloseButton = defineAsyncComponent(() => import('@/components/UI/CloseButton.vue'));
const ProgressIndicators = defineAsyncComponent(() => import('@/components/UI/ProgressIndicators.vue'));
const HelpSection = defineAsyncComponent(() => import('@/components/UI/HelpSection.vue'));
const Offer = defineAsyncComponent(() => import('@/components/Offer.vue'));

export default defineComponent({
  name: 'ChurnPreventionModal',
  components: {
    Step1,
    Step2,
    Step3,
    Step4,
    Step5,
    Step6,
    CloseButton,
    ProgressIndicators,
    HelpSection,
    Offer
  },
  setup() {
    const store = useStore();
    const isVisible = computed(() => store.getters.isModalVisible);
    const currentStep = computed(() => store.getters.currentStep);

    const currentStepComponent = computed(() => {
      switch (currentStep.value) {
        case 1: return 'Step1';
        case 2: return 'Step2';
        case 3: return 'Step3';
        case 4: return 'Step4';
        case 5: return 'Step5';
        case 6: return 'Step6';
        default: return null;
      }
    });

    const currentStepProps = computed(() => {
      switch (currentStep.value) {
        case 2: return { cancellationReason: cancellationReason.value };
        case 3: return { cancellationDescription: cancellationDescription.value };
        default: return {};
      }
    });

    const cancellationReason = computed({
      get: () => store.getters.cancellationReason,
      set: (value) => store.dispatch('updateCancellationReason', value)
    });

    const cancellationDescription = computed({
      get: () => store.getters.cancellationDescription,
      set: (value) => store.dispatch('updateCancellationDescription', value)
    });

    const updateCancellationReason = (reason: string) => {
      store.dispatch('updateCancellationReason', reason);
      nextStep();
    };

    const updateCancellationDescription = (description: string) => {
      store.dispatch('updateCancellationDescription', description);
      nextStep();
    };

    const requiredMutation = () => {
      switch (currentStep.value) {
        case 2:
          updateCancellationReason(cancellationReason.value);
          break;
        case 3:
          updateCancellationDescription(cancellationDescription.value);
          break;
        default:
          nextStep();
          break;
      }
    };

    const continueSubscription = () => {
      store.dispatch('closeModal');
    };

    const nextStep = () => {
      store.dispatch('nextModalStep');
    };

    const closeModal = () => {
      store.dispatch('closeModal');
    };

    watch(
        () => ({
          userInfo: store.state.userInfo,
          offer: store.state.offer,
          state: store.state
        }),
        (newState) => {
          store.dispatch('saveState', newState);
        },
        { deep: true }
    );

    const showActionButtons = computed(() => ![4, 5, 6].includes(currentStep.value));

    return {
      isVisible,
      currentStep,
      currentStepComponent,
      currentStepProps,
      showActionButtons,
      continueSubscription,
      requiredMutation,
      closeModal
    };
  }
});
</script>

<template>
  <div v-if="isVisible" class="modal-wrapper fixed inset-0 bg-gray-300 bg-opacity-75 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg px-1.5 sm:p-6 py-1.5 md:p-10 w-full max-w-lg md:max-w-xl relative mx-4 sm:max-h-[80vh] md:max-h-[70vh] overflow-auto">

      <CloseButton  @close="closeModal" />
      <ProgressIndicators :currentStep="currentStep"/>

      <!-- Step components -->
      <component :is="currentStepComponent" v-bind="currentStepProps" />

      <!-- Action buttons -->
      <div v-if="showActionButtons" class="flex items-center justify-evenly text-center mb-5 text-sm sm:text-sm">
        <button data-test="continue-subscription-button" @click="continueSubscription" class="bg-[#00d46e] text-white px-8 md:px-6 py-3 rounded-full mr-2 uppercase hover:bg-green-600 transition duration-300 ease-in-out">Jätkan tellimusega</button>
        <button data-test="continue-button" @click="requiredMutation" class="bg-gray-100 text-black px-8 md:px-6 py-3 rounded-full uppercase font-bold hover:bg-gray-300 transition duration-300 ease-in-out">Edasi tühistama</button>
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

<script lang="ts">
import { defineComponent, computed, watch, defineAsyncComponent } from 'vue';
import { useStore } from 'vuex';

// Importing async components for each step, UI components, and offer
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

    // Computed property to determine if the modal is visible
    const isVisible = computed(() => store.getters.isModalVisible);

    // Computed property to get the current step
    const currentStep = computed(() => store.getters.currentStep);

    // Computed property to dynamically determine which step component to display
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

    // Computed property to dynamically set props for current step component
    const currentStepProps = computed(() => {
      switch (currentStep.value) {
        case 2: return { cancellationReason: cancellationReason.value };
        case 3: return { cancellationDescription: cancellationDescription.value };
        default: return {};
      }
    });

    // Computed property to get and set cancellation reason from Vuex store
    const cancellationReason = computed({
      get: () => store.getters.cancellationReason,
      set: (value) => store.dispatch('updateCancellationReason', value)
    });

    // Computed property to get and set cancellation description from Vuex store
    const cancellationDescription = computed({
      get: () => store.getters.cancellationDescription,
      set: (value) => store.dispatch('updateCancellationDescription', value)
    });

    // Method to update cancellation reason and proceed to the next step
    const updateCancellationReason = (reason: string) => {
      store.dispatch('updateCancellationReason', reason);
      nextStep();
    };

    // Method to update cancellation description and proceed to the next step
    const updateCancellationDescription = (description: string) => {
      store.dispatch('updateCancellationDescription', description);
      nextStep();
    };

    // Method to handle required mutation based on the current step
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

    // Method to continue subscription and close the modal
    const continueSubscription = () => {
      store.dispatch('closeModal');
    };

    // Method to proceed to the next step
    const nextStep = () => {
      store.dispatch('nextModalStep');
    };

    // Method to close the modal
    const closeModal = () => {
      store.dispatch('closeModal');
    };

    // Watcher to save state changes to the Vuex store
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

    // Computed property to determine whether to show action buttons based on current step
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